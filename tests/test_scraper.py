import os
from pathlib import Path

import pytest

from scraper import scraper

BASE_DIR = Path(__file__).resolve(strict=True).parent


def test_login(driver):

    URL = str(os.path.join(BASE_DIR, "pages/login.html"))
    URL = "file://" + URL

    LOGIN_USER = "username"
    LOGIN_PW = "password"

    driver.get(URL)

    scraper.login(driver, user=LOGIN_USER, password=LOGIN_PW)


def test_add_page(driver):

    URL = str(os.path.join(BASE_DIR, "pages/product.html"))
    URL = "file://" + URL

    driver.get(URL)

    scraper.add_page(driver)


def test_add_cart(driver):

    URL = str(os.path.join(BASE_DIR, "pages/product_added.html"))
    URL = "file://" + URL

    driver.get(URL)

    scraper.add_cart(driver)


def test_checkout(driver):

    URL = str(os.path.join(BASE_DIR, "pages/cart.html"))
    URL = "file://" + URL

    driver.get(URL)

    scraper.checkout(driver)


@pytest.mark.parametrize(
    "page, payment",
    [
        ("pages/shipping.html", False),
        ("pages/shipping_confirm.html", False),
        ("pages/payment.html", True),
    ],
)
def test_continue(driver, page, payment):
    URL = str(os.path.join(BASE_DIR, page))
    URL = "file://" + URL

    driver.get(URL)

    scraper.click_continue(driver, page)
