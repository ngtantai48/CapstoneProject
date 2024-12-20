import requests
import pickle

COOKIE_FB = "cookies_fb.pkl"
COOKIE_VIECLAM24H = "cookies_vieclam24h.pkl"

TEST_URL_FB = "https://www.facebook.com/me"
TEST_URL_VIECLAM24H = "https://vieclam24h.vn/taikhoan/profile"


def load_cookies(file_path):
    with open(file_path, "rb") as file:
        return pickle.load(file)


def check_cookie(cookies):
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
