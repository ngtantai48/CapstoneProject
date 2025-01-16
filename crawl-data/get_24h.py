def get_company_name_24(source):
    return source.find("h2", class_="font-normal text-16 text-se-neutral-64 mb-4").get_text(" ", strip=True)


def get_title_24(source):
    return source.find("h1", class_="font-semibold text-18 md:text-24 leading-snug").get_text(" ", strip=True)


def get_job_24(source):
    elements = source.find("p", class_="text-14 text-se-accent font-semibold")
    result = [element.get_text(" ", strip=True) for element in elements]
    job = " ".join(result)
    return job


def get_headquater_24(source):
    div = source.find_all("div", class_="text-14 text-se-grey-48 font-semibold")
    return div[0].get_text(" ", strip=True)


# def get_NumEmployee_24(source):
#     div = source.find_all("div", class_="jsx-5b2773f86d2f74b md:flex md:border-b border-[#DDD6FE] mb-4")
#     number_employee = div[1].find_all("div", class_="flex items-center mb-4 md:w-[33%]")
#     if number_employee:
#         return number_employee[0].find("p", class_="text-14").get_text(" ", strip=True)
#     return None


def get_NumEmployee_24(source):
    divs = source.find_all("div", class_="jsx-5b2773f86d2f74b md:flex md:border-b border-[#DDD6FE] mb-4")
    
    for div in divs:
        items = div.find_all("div", class_="flex items-center mb-4 md:w-[33%]")
        for item in items:
            label = item.find("p", class_="mr-1 text-se-neutral-64 text-12")
            if label and label.get_text(" ", strip=True) == "Số lượng tuyển":
                value = item.find("p", class_="text-14")
                if value:
                    return value.get_text(" ", strip=True)
    return "N/A"


def get_Exp_24(source):
    div = source.find_all("div", class_="flex items-center mb-4 w-full md:w-[33%]")
    return div[1].find("p", class_="text-14").get_text(" ", strip=True)


def get_level_24(source):
    # div = source.find_all(
    #     "div", class_="jsx-d84db6a84feb175e md:flex md:border-b border-[#DDD6FE] mb-4"
    # )
    # div = div[0].find_all("div", class_="flex items-center mb-4 md:w-[33%]")
    # if len(div[0].find_all("div", class_="flex items-center mb-4 md:w-[33%]")) == 2:
    #     div_level = div[1]
    #     level = div_level.find("p", class_="text-14").get_text(" ", strip=True)
    # elif len(div[0].find_all("div", class_="flex items-center mb-4 md:w-[33%]")) == 3:
    #     div_level = div[2]
    #     level = div_level.find("p", class_="text-14").get_text(" ", strip=True)
    return "Intern"


def get_Salary_24(source):
    return source.find("p", class_="font-semibold text-14 text-[#8B5CF6]").get_text(" ", strip=True)


def get_Edu_24(source):
    div = source.find_all("div", class_="flex items-center mb-4 w-full md:w-[33%]")
    return div[1].find("p", class_="text-14").get_text(" ", strip=True)


def get_Requirement_24(source):
    div = source.find_all(
        "div",
        class_="jsx-5b2773f86d2f74b mb-2 text-14 break-words text-se-neutral-80 text-description",
    )
    return div[1].get_text(" ", strip=True)


def get_Description_24(source):
    div = source.find_all(
        "div",
        class_="jsx-5b2773f86d2f74b mb-2 text-14 break-words text-se-neutral-80 text-description",
    )
    return div[0].get_text(" ", strip=True)


def get_Date_24(source):
    h2 = source.find_all("h2", class_="text-14 leading-6 md:flex pt-0 md:pt-[0px] my-0")
    date_ = h2[1].get_text(" ", strip=True)
    part = date_.find(":")
    return date_[part + 2 :]


def get_SrcPic_24(source):
    div = source.find("div", class_="md:flex w-full items-start")
    return div.find("img").get("src")


def get_Time_24(source):
    div = source.find_all("div", class_="flex items-center mb-4 md:w-[33%]")
    time = div[0].find("p", class_="text-14").get_text(" ", strip=True)
    return time


# def get_City_24(source):
#     div = source.find_all("h2", class_="ml-3 text-14 md:flex pt-0 md:pt-[5px] my-0")
#     div_ = div[2].get_text(" ", strip=True)
#     part = div_.find(":")
#     return div_[part + 2 :]

def get_City_24(source):
    div = source.find("div", class_="flex items-center gap-2 sm_cv:items-center")
    if div:
        paragraph = div.find("p", class_="text-14 text-[#414045]")
        if paragraph:
            return paragraph.get_text(strip=True, separator=" ")
    return None


# def get_probation(source):
#     div = source.find_all(
#         "div", class_="jsx-5b2773f86d2f74b md:flex md:border-b border-[#DDD6FE] mb-4"
#     )
#     div = div[0].find_all("div", class_="flex items-center mb-4 md:w-[33%]")
#     if len(div[0].find_all("div", class_="flex items-center mb-4 md:w-[33%]")) == 3:
#         div_level = div[1]
#         probation = div_level.find("p", class_="text-14").get_text(" ", strip=True)
#         return probation
#     else:
#         return "None"


# def get_Sex_24(source):
#     div = source.find_all(
#         "div", class_="jsx-5b2773f86d2f74b md:flex md:border-b border-[#DDD6FE] mb-4"
#     )
#     if len(div[1].find_all("div", class_="flex items-center mb-4 md:w-[33%]")) == 2:
#         num_div = div[1].find_all("div", class_="flex items-center mb-4 md:w-[33%]")
#         sex = num_div[0].find("p", class_="text-14").get_text(" ", strip=True)
#         return sex
#     else:
#         return "None"


# def get_Way_24(source):
#     div = source.find_all(
#         "div", class_="jsx-5b2773f86d2f74b md:flex md:border-b border-[#DDD6FE] mb-4"
#     )
#     way = (
#         div[1]
#         .find("div", class_="flex items-center mb-4 w-full md:w-[33%]")
#         .find("p", class_="text-14")
#         .get_text(" ", strip=True)
#     )
#     return way


def get_Age_24(source):
    div = source.find_all(
        "div", class_="jsx-5b2773f86d2f74b md:flex md:border-b border-[#DDD6FE] mb-4"
    )
    if div[2].find("div", class_="flex items-center mb-4 md:w-[33%]"):
        age = (
            div[2]
            .find("div", class_="flex items-center mb-4 md:w-[33%]")
            .find("p", class_="text-14")
            .get_text(" ", strip=True)
        )
        return age
    else:
        return "None"


# def get_right_24(source):
#     div = source.find_all(
#         "div",
#         class_="jsx-d84db6a84feb175e mb-2 text-14 break-words text-se-neutral-80 text-description",
#     )
#     return div[2].get_text(" ", strip=True)
