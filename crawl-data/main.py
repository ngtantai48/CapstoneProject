import sys
from pathlib import Path
from importlib import import_module
import uvicorn
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from time import sleep
import pickle
import concurrent.futures
from ws_handler import sio, socket_app, status_handler
from webdriver_manager.chrome import ChromeDriverManager
from contextlib import asynccontextmanager
from get_info import get_vieclam24
import database


app = FastAPI(title="HANDLE CRAWL DATA")
executor = concurrent.futures.ThreadPoolExecutor(max_workers=5)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CrawlRequest(BaseModel):
    type: str


sys.path.append(str(Path(__file__).resolve().parent / "utils"))
facebook = import_module("facebook")


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up the server")


async def crawl_facebook(driver):
    driver.get("https://www.facebook.com/login/")
    sleep(3)
    cookies = pickle.load(open(".\\cookies\\cookies_fb.pkl", "rb"))
    for cookie in cookies:
        driver.add_cookie(cookie)
    await facebook.get_facebook(
        driver, "https://www.facebook.com/groups/vieclamCNTTDaNang"
    )


async def crawl_vieclam24h(driver):
    driver.get("https://vieclam24h.vn/")
    sleep(3)
    # cookies = pickle.load(open(".\\cookies\\cookies_vieclam24h.pkl", "rb"))
    # for cookie in cookies:
    #     driver.add_cookie(cookie)
    return await get_vieclam24(driver, 3)


async def _start_vieclam24h():
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--enable-unsafe-swiftshader")
    chrome_options.add_argument("--remote-debugging-port=9222")
    try:
        crawl_status = "PROCESSING"
        status_handler.set_status(crawl_status)
        await sio.emit("current_status", crawl_status)

        # Use ChromeDriverManager to manage the ChromeDriver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)

        data = await crawl_vieclam24h(driver)
        database.save_data_into_DB(data)

        await sio.emit("broadcast", "END")
    except Exception as e:
        await sio.emit("broadcast", str(e))
        print(f"Error occurred while scraping data: {str(e)}")

    print(">> Done")
    await sio.emit("log", "Crawl done")
    crawl_status = "READY"
    status_handler.set_status(crawl_status)
    await sio.emit("current_status", crawl_status)


async def _start_facebook():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--enable-unsafe-swiftshader")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--remote-debugging-port=9222")
    try:
        crawl_status = "PROCESSING"
        status_handler.set_status(crawl_status)
        await sio.emit("current_status", crawl_status)

        # Use ChromeDriverManager to manage the ChromeDriver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)

        await crawl_facebook(driver)

        await sio.emit("broadcast", "END")
    except Exception as e:
        await sio.emit("broadcast", str(e))
        print(f"Error occurred while scraping data: {str(e)}")

    print(">> Done")
    await sio.emit("log_fb", "Crawl done")
    crawl_status = "READY"
    status_handler.set_status(crawl_status)
    await sio.emit("current_status", crawl_status)


@app.post("/crawl/trigger")
async def crawl(request: CrawlRequest, background_tasks: BackgroundTasks):
    type = request.type.lower()
    if type == "vieclam24h":
        if status_handler.get_status() != "PROCESSING":
            print("crawling vieclam24h")
            crawl_status = "PROCESSING"
            status_handler.set_status(crawl_status)
            await sio.emit("log", "LOG:: Crawl vieclam24h starting...")
            await sio.emit("current_status", crawl_status)
            background_tasks.add_task(_start_vieclam24h)
            return {"message": "Crawling started"}
        else:
            return {"message": "Crawling is processing"}
    elif type == "facebook":
        if status_handler.get_status() != "PROCESSING":
            print("crawling facebook")
            crawl_status = "PROCESSING"
            status_handler.set_status(crawl_status)
            await sio.emit("log_fb", "LOG:: Crawl facebook starting...")
            await sio.emit("current_status", crawl_status)
            background_tasks.add_task(_start_facebook)
            return {"message": "Crawling started"}
        else:
            return {"message": "Crawling is processing"}


@app.get("/crawl/whoami")
async def whoami():
    return "CRAWL DATA SERVER"


# Mount the socket_app under the same app instance
app.mount("/crawl", socket_app)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)
