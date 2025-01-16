from venv import logger
from bs4 import BeautifulSoup
from datetime import datetime
from selenium.webdriver.chrome.options import Options
from time import sleep
from database import get_data_from_DB
from get_24h import (
    get_company_name_24,
    get_title_24,
    get_job_24,
    # get_headquater_24,
    get_NumEmployee_24,
    get_Exp_24,
    get_level_24,
    get_Salary_24,
    # get_Edu_24,
    # get_Requirement_24,
    # get_Description_24,
    get_Date_24,
    # get_SrcPic_24,
    # get_Time_24,
    get_City_24,
    # get_Age_24,
    # get_probation,
    # get_Sex_24,
    # get_Way_24,
    # get_right_24,
)
# from ai import detect
from urllib.parse import urlparse
from ws_handler import sio


def get_profile_urls_24(driver, url):
    page_source = BeautifulSoup(driver.page_source, "html.parser")
    # with open("page_source.txt", "w", encoding="utf-8") as f:
    #     # Ghi dữ liệu vào tệp
    #     f.write(str(page_source))
    try:
        # class_name = "relative lg:h-[115px] w-full flex rounded-sm border lg:mb-3 mb-2 lg:hover:shadow-md !hover:bg-white !bg-[#FFF5E7] border-se-blue-10"
        a = page_source.find_all("a", target="_blank")
        all_profile_urls = []
        for profile in a:
            profile_url = "https://vieclam24h.vn" + profile.get("href")
            if profile_url not in all_profile_urls:
                all_profile_urls.append(profile_url)
        return all_profile_urls
    except Exception as e:
        logger.error(f"Error occurred while extracting profile URLs from {url}: {e}")
        return []


def convertDateToTimestamp(date_str):
    date_obj = datetime.strptime(date_str, "%d/%m/%Y")

    # Chuyển đổi đối tượng datetime thành timestamp
    return int(date_obj.timestamp()) * 1000


def get_profile_info_24(driver, url):
    try:
        driver.get(url)
        sleep(2)
        page_source = BeautifulSoup(driver.page_source, "html.parser")
        title = get_title_24(page_source)
        company_name = get_company_name_24(page_source)
        city = get_City_24(page_source)
        time = get_Date_24(page_source)
        # time = convertDateToTimestamp(get_Time_24(page_source))  # new
        num_of_employee = get_NumEmployee_24(page_source)
        # major_category_id = int(detect(title))
        salary = get_Salary_24(page_source)
        level = get_level_24(page_source)
        exp_year = get_Exp_24(page_source)
        link = get_main_url(url)
        type = "vieclam24h"
        # src_pic = str(({"description": company_name + date, "src": get_SrcPic_24(page_source)}))
        # edu = get_Edu_24(page_source)
        # head_quater = get_headquater_24(page_source)
        # description = get_Description_24(page_source)
        # requirement = get_Requirement_24(page_source)
        job = get_job_24(page_source)
        # age = get_Age_24(page_source)
        # sex = get_Sex_24(page_source)
        # probation = get_probation(page_source)
        # way = get_Way_24(page_source)
        # right = get_right_24(page_source)

        return [
            title,
            company_name,
            job,
            # time,
            city,
            time,
            num_of_employee,
            salary,
            level,
            exp_year,
            link,
            type,
            # age,
            # sex,
            # probation,
            # way,
            # head_quater,
            # edu,
            # right,
            # description,
            # requirement,
            # src_pic,
            # major_category_id,
        ]
    except Exception as e:
        logger.error(f"Error occurred while scraping data from {url}: {e}")
        return []


def is_duplicated(info, data):
    try:
        for record in data:
            if (
                len(record) >= 7 and
                record[1] == info[0] and
                record[2] == info[4] and
                record[3] == info[3] and
                record[9] == info[1] and
                record[10] == info[2] and
                record[13] == info[8] and
                record[15] == info[6]
            ):
                return True
        return False
    except Exception as e:
        print(f"Error in is_duplicated: {e}")
        return False

async def get_vieclam24(driver, num_pages):
    try:
        page_start = 1
        data = []
        while page_start <= num_pages:
            url = f"https://vieclam24h.vn/tim-kiem-viec-lam-nhanh?page={page_start}&sort_q=priority_max%2Cdesc"
            print(">>>URL: ", url)
            await sio.emit("log", url)
            driver.get(url)
            profile_urls = get_profile_urls_24(driver, url)
            urls = profile_urls[:3]
            print(">>>Profile URL: ", urls)
            data_DB = get_data_from_DB("root", "04082001")
            for _url in urls:
                info = get_profile_info_24(driver, _url)
                print(">> Vieclam24h: ", str(info))
                await sio.emit("log", str(info))
                if not info:
                    pass
                else:
                    if not is_duplicated(info, data_DB):
                        print(">> Have Not Exist In DB")
                        data.append(info)
                    else:
                        print(">> Data already in the DB")
            page_start += 1
        return data
    except Exception as e:
        print(f"Error occurred while get data 24h: {e}")
        return []


def get_main_url(link):
    parsed_url = urlparse(link)
    return "https://" + parsed_url.hostname + parsed_url.path
