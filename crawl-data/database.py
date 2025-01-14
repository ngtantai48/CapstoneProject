import mysql.connector
from venv import logger
import os


def save_data_into_DB(data):
    try:
        connection = mysql.connector.connect(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            database="recruitmentforecast-ml",
        )
        cursor = connection.cursor()
        # query = "INSERT INTO `crawl_data` (`title`, `company`, `time`, `city`, `age`, `sexual`, `probationTime`, `workWay`, `job`, `place`, `numberEmployees`, `experience`, `level`, `salary`, `education`, `right`, `description`, `requirements`, `deadline`, `images`, `link`, `type`, `major_category_id`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        query = "INSERT INTO `crawl_data` (`title`, `company`, `city`, `time`, `numberEmployees`, `major_category_id`, `salary`, `level`, `experience`, `link`, `type`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

        for i in data:
            cursor.execute(query, i)
        connection.commit()
        connection.close()
    except Exception as e:
        logger.error(f"Error occurred while saving data to DB: {e}")


def is_duplicate_data(link):
    try:
        connection = mysql.connector.connect(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            database="recruitmentforecast-ml",
        )
        cursor = connection.cursor()
        query = "SELECT * FROM `crawl_data` WHERE `link` = %s"
        cursor.execute(query, (link,))
        data = cursor.fetchall()
        connection.close()
        return len(data) > 0
    except Exception as e:
        print(f"Error occurred while retrieving data from database: {e}")
        return False


def get_data_from_DB(my_user, my_password):
    try:
        # create_database_if_not_exists(my_user, my_password)
        # create_table_if_not_exists()
        connection = mysql.connector.connect(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            database="recruitmentforecast-ml",
        )
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM `crawl_data`")
        data = cursor.fetchall()
        connection.close()
        return data
    except Exception as e:
        print(f"Error occurred while retrieving data from database: {e}")
        return []


# def create_database_if_not_exists(my_user, my_password):
#     try:
#         connection = mysql.connector.connect(
#             user=os.getenv("DB_USER"),
#             password=os.getenv("DB_PASSWORD"),
#             host=os.getenv("DB_HOST"),
#             # database=os.getenv("DB_NAME"),
#         )
#         cursor = connection.cursor()
#         cursor.execute("SELECT * FROM `crawl_data`")
#         data = cursor.fetchall()
#         connection.close()
#         return data
#     except Exception as e:
#         print(f"Error occurred while retrieving data from database: {e}")
#         return []


def create_table_if_not_exists():
    try:
        connection = mysql.connector.connect(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            database="job-management",
        )
        cursor = connection.cursor()

        # Câu lệnh SQL để tạo bảng nếu chưa tồn tại
        create_table_query = """
        CREATE TABLE IF NOT EXISTS crawl_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            company VARCHAR(255),
            time VARCHAR(100),
            city VARCHAR(100),
            age VARCHAR(50),
            sexual VARCHAR(20),
            probationTime VARCHAR(50),
            workWay VARCHAR(100),
            job VARCHAR(255),
            place VARCHAR(255),
            numberEmployees INT,
            experience VARCHAR(100),
            level VARCHAR(100),
            salary VARCHAR(100),
            education VARCHAR(100),
            `right` TEXT,
            description TEXT,
            requirements TEXT,
            deadline DATE,
            images TEXT,
            link VARCHAR(255) UNIQUE,
            type VARCHAR(50),
            major_category_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        cursor.execute(create_table_query)
        connection.commit()
        print("Table 'crawl_data' has been created or already exists.")

        cursor.close()
        connection.close()

    except mysql.connector.Error as err:
        print(f"Error occurred while creating table: {err}")
