from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import WebDriverException
from time import sleep
import pickle


def save_cookie(driver, url, output_file, wait_time):
    """
    Hàm lưu cookie từ một URL cụ thể sau khi chờ người dùng đăng nhập.

    Args:
        driver: Đối tượng trình duyệt Selenium.
        url: URL cần truy cập.
        output_file: Tên file để lưu cookie.
        wait_time: Thời gian chờ người dùng đăng nhập (giây).
    """
    try:
        print(f"Đang truy cập {url}...")
        driver.get(url)
        print(f"Vui lòng đăng nhập. Chờ {wait_time} giây...")
        sleep(wait_time)
        cookies = driver.get_cookies()
        with open(output_file, "wb") as file:
            pickle.dump(cookies, file)
        print(f"Đã lưu cookie vào {output_file}")
    except Exception as e:
        print(f"Lỗi khi lưu cookie từ {url}: {e}")


def initialize_driver():
    """
    Khởi tạo trình duyệt Selenium với các tùy chọn.

    Returns:
        driver: Đối tượng trình duyệt Selenium.
    """
    chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument("--headless")  # Không hiển thị cửa sổ trình duyệt
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--enable-unsafe-swiftshader")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--remote-debugging-port=9222")

    try:
        service = Service(executable_path="..\\chromedriver-win64\\chromedriver.exe")

        driver = webdriver.Chrome(service=service, options=chrome_options)
        print("Trình duyệt đã được khởi tạo.")
        return driver
    except WebDriverException as e:
        print(f"Lỗi khi khởi tạo trình duyệt: {e}")
        return None


def main():
    print("======== BẮT ĐẦU LƯU COOKIE ==========")
    driver = initialize_driver()
    if not driver:
        print("Không thể khởi tạo trình duyệt. Thoát chương trình.")
        return

    try:
        # save_cookie(driver, "https://www.facebook.com/login/", "cookies_fb.pkl", 60)
        save_cookie(driver, "https://vieclam24h.vn/", "cookies_vieclam24h.pkl", 30)
    except Exception as e:
        print(f"Lỗi trong quá trình xử lý: {e}")
    finally:
        driver.quit()
        print("Đã đóng trình duyệt.")
    print("======== HOÀN THÀNH ==========")


if __name__ == "__main__":
    main()
