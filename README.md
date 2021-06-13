# PS5 Bot

I have felt quite defeated on my journey of buying a PlayStation 5. Every unit is sold out. 
And if there is a restock, bots will grab all of them within seconds. So now there some PS5 available - but for triple the normal price. No, thank you!

I decided to fight fire with fire and build my own bot. This bot is faster at buying a PS5, than you can say "Fuck off, scalpers!"

## Instructions
### Set up environmental variables

Make an account on the TH Sony Store and add your address.

Then create a .env file in your root with the following variables defined. The variables with prefix LOGIN are your credentials for the store. 
The other ones refer to your payment option (VISA).

    LOGIN_USER=
    LOGIN_PW=
    
    CREDITCARD_NUMBER=
    CREDITCARD_NAME=
    CREDITCARD_MONTH=
    CREDITCARD_YEAR=
    CREDITCARD_PIN=
    CREDITCARD_EMAIL=

### Run the Bot via the command line

You can run the bot with the following command. PRODUCT_URL refers to the product page of the product you want to purchase.

    python scraper/scraper.py PRODUCT_URL

If you want to just play around a.k.a. you don't want to automatically pull the purchase trigger, you may add the following argument:

    python scraper/scraper.py PRODUCT_URL --purchase False