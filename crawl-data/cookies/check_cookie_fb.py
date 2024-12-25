import requests
import pickle
from selenium import webdriver

COOKIE_FB = "cookies_fb.pkl"

TEST_URL_FB = "https://www.facebook.com/me"


def load_cookies(file_path):
    with open(file_path, "rb") as file:
        return pickle.load(file)


def check_cookie(cookies):
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--enable-unsafe-swiftshader")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--remote-debugging-port=9222")
    
    session = requests.Session()
    for cookie in cookies:
        session.cookies.set(cookie["name"], cookie["value"])

    response = session.get(TEST_URL_FB)

    if response.status_code == 200 and "facebook.com" in response.url:
        print("Cookie hoạt động!")
    else:
        print("Cookie không hoạt động hoặc đã hết hạn.")


if __name__ == "__main__":
    try:
        cookies = load_cookies(COOKIE_FB)
        check_cookie(cookies)
    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")
