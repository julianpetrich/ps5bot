import argparse
import os
import time
from datetime import datetime

from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


class wait_for_page_load(object):
    def __init__(self, browser):
        self.browser = browser

    def __enter__(self):
        self.old_page = self.browser.find_element_by_tag_name("html")

    def page_has_loaded(self):
        new_page = self.browser.find_element_by_tag_name("html")
        return new_page.id != self.old_page.id

    def __exit__(self, *_):
        wait_for(self.page_has_loaded)


def wait_for(condition_function):
    start_time = time.time()
    while time.time() < start_time + 3:
        if condition_function():
            return True
        else:
            time.sleep(1)
    raise Exception("Timeout waiting for {}".format(condition_function.__name__))


def init_driver(headless=False):
    print(f"{datetime.now()} [INFO] Start init browser.")
    options = webdriver.ChromeOptions()

    if headless:
        options.add_argument("--headless")
        print(f"{datetime.now()} [INFO] Browser started headless.")

    options.add_argument("--window-size=1920x1080")

    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

    print(f"{datetime.now()} [INFO] Finished init browser.")

    return driver


def login(driver, user, password):
    print(f"{datetime.now()} [INFO] Started login with {user}.")

    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, "logonIdentifier"))
    )

    driver.find_element_by_id("logonIdentifier").clear()
    driver.find_element_by_id("logonIdentifier").send_keys(user)

    driver.find_element_by_id("password").clear()
    driver.find_element_by_id("password").send_keys(password)

    driver.find_element_by_id("next").click()

    print(f"{datetime.now()} [INFO] Finished login.")


def add_product(driver):
    print(f"{datetime.now()} [INFO] Started adding product to basket.")

    add_page(driver)
    add_cart(driver)

    print(f"{datetime.now()} [INFO] Finished adding product to basket.")


def add_page(driver):
    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.CLASS_NAME, "product__add-to-cart"))
    )

    driver.find_element_by_class_name("product__add-to-cart").click()


def add_cart(driver):
    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.CLASS_NAME, "mini-cart__inner"))
    )

    time.sleep(2)

    driver.find_element_by_xpath('//a[@href="/cart"]').click()


def checkout(driver):
    print(f"{datetime.now()} [INFO] Started checkout.")

    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.NAME, "checkout"))
    )
    driver.find_element_by_name("checkout").click()

    print(f"{datetime.now()} [INFO] Finished checkout.")


def click_continue(driver, step, payment_step=False):
    print(f"{datetime.now()} [INFO] Started clicking continue for {step}.")

    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, "continue_button"))
    )

    driver.find_element_by_id("continue_button").click()

    if payment_step:
        driver.implicitly_wait(2)
        WebDriverWait(driver, 15).until(EC.alert_is_present())
        driver.switch_to.alert.accept()

    print(f"{datetime.now()} [INFO] Finished clicking continue for {step}.")


def fillout_payment(
    driver,
    creditcard_number,
    creditcard_name,
    creditcard_month,
    creditcard_year,
    creditcard_security,
    email,
):
    print(f"{datetime.now()} [INFO] Started filling out payment.")

    visa_href = "javascript:formSubmit('VISA');"
    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.XPATH, f'//a[@href="{visa_href}"]'))
    )

    driver.find_element_by_xpath(f'//a[@href="{visa_href}"]').click()

    WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.ID, "cardNo2")))

    driver.find_element_by_id("cardNo2").clear()
    driver.find_element_by_id("cardNo2").send_keys(creditcard_number)

    driver.find_element_by_id("cardHolder2").clear()
    driver.find_element_by_id("cardHolder2").send_keys(creditcard_name)

    Select(driver.find_element_by_id("epMonth2")).select_by_value(creditcard_month)
    Select(driver.find_element_by_id("epYear2")).select_by_value(creditcard_year)

    driver.find_element_by_name("securityCode2").clear()
    driver.find_element_by_name("securityCode2").send_keys(creditcard_security)

    driver.find_element_by_name("holderEmail2").clear()
    driver.find_element_by_name("holderEmail2").send_keys(email)

    print(f"{datetime.now()} [INFO] Finished filling out payment.")


def run_process(
    product_url,
    username,
    password,
    creditcard_number,
    creditcard_name,
    creditcard_month,
    creditcard_year,
    creditcard_security,
    email,
    make_purchase=False,
):
    url_login = "https://login.sony-asia.com/10a6c4a3-6d70-4565-9c95-e3b2581b4018/oauth2/v2.0/authorize?p=B2C_1_eComTH_PRD_su_si&client_id=494e769b-af4a-40ac-bbd4-7bbc5c79ef2b&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fstore.sony.co.th%2Fapps%2Fmiddleware_api%2Fshopify%2Fvalidateuser&scope=openid&response_type=id_token&prompt=login&response_mode=query&ui_locales=en"
    url_product = product_url
    url_cart = "https://store.sony.co.th/cart"

    driver = init_driver()

    driver.get(url_login)
    with wait_for_page_load(driver):
        login(driver, username, password)

    driver.get(url_product)
    with wait_for_page_load(driver):
        add_product(driver)

    driver.get(url_cart)
    with wait_for_page_load(driver):
        checkout(driver)

    with wait_for_page_load(driver):
        click_continue(driver, "address confirmation")
    with wait_for_page_load(driver):
        click_continue(driver, "shipping confirmation")

    click_continue(driver, "payment confirmation", payment_step=True)

    with wait_for_page_load(driver):
        fillout_payment(
            driver,
            creditcard_number,
            creditcard_name,
            creditcard_month,
            creditcard_year,
            creditcard_security,
            email,
        )

    if make_purchase:
        driver.find_element_by_name("submitBut").click()

    driver.quit()


if __name__ == "__main__":

    start_time = time.time()
    print(f"{datetime.now()} [INFO] Start scraping process")

    load_dotenv()

    parser = argparse.ArgumentParser(description="Input data for scraper.")
    parser.add_argument("product", type=str, help="url for product to be bought")
    parser.add_argument(
        "--purchase", type=bool, default=True, help="if true purchase will be made"
    )
    args = parser.parse_args()

    PRODUCT_URL = args.product

    LOGIN_USER = os.getenv("LOGIN_USER")
    LOGIN_PW = os.getenv("LOGIN_PW")

    CREDITCARD_NUMBER = os.getenv("CREDITCARD_NUMBER")
    CREDITCARD_NAME = os.getenv("CREDITCARD_NAME")
    CREDITCARD_MONTH = os.getenv("CREDITCARD_MONTH")
    CREDITCARD_YEAR = os.getenv("CREDITCARD_YEAR")
    CREDITCARD_PIN = os.getenv("CREDITCARD_PIN")
    CREDITCARD_EMAIL = os.getenv("CREDITCARD_EMAIL")

    run_process(
        product_url=PRODUCT_URL,
        username=LOGIN_USER,
        password=LOGIN_PW,
        creditcard_number=CREDITCARD_NUMBER,
        creditcard_name=CREDITCARD_NAME,
        creditcard_month=CREDITCARD_MONTH,
        creditcard_year=CREDITCARD_YEAR,
        creditcard_security=CREDITCARD_PIN,
        email=CREDITCARD_EMAIL,
        make_purchase=args.purchase,
    )

    print(
        f"{datetime.now()} [INFO] Finished scraping process. It took {time.time()-start_time:.2f}s."
    )
