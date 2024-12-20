from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import pickle
import time

# Đường dẫn đến WebDriver (ví dụ với ChromeDriver)
driver_path = "..\\chromedriver-win64\\chromedriver.exe"

# Khởi tạo Service cho ChromeDriver
service = Service(driver_path)

# Khởi tạo trình duyệt Chrome với Service
driver = webdriver.Chrome(service=service)

# Mở trang vieclam24h.vn
driver.get("https://vieclam24h.vn/")

# Đọc cookie từ file Pickle
with open("cookies_vieclam24h.pkl", "rb") as f:
    cookies = pickle.load(f)

# Thêm từng cookie vào trình duyệt
for cookie in cookies:
    driver.add_cookie(cookie)

# Sau khi thêm cookie, truy cập vào trang profile
driver.get("https://vieclam24h.vn/taikhoan/profile")

# Chờ một chút để trang tải
time.sleep(5)

# Kiểm tra nếu bạn có thể lấy được phần tử với XPath
try:
    user_element = driver.find_element(
        By.XPATH, "//span[@class='text-se-neutral-48-n pr-2']"
    )
    print("Cookie hoạt động! Bạn đã truy cập vào trang profile thành công.")
except Exception as e:
    print(f"Cookie không hoạt động. Lỗi: {e}")

# Đóng trình duyệt
driver.quit()
