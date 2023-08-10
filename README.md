# OrderBook Mid-Prices

Expose a REST API which gives us the global price index of the trading pair BTC/USDT, computed from 3 different exchanges :

1. Binance
2. Kraken
3. Huobi

SPECIFICATIONS :
It will be to fetch the BTC/USDT order book from the 3 exchanges written above; compute for each orderbook a mid-price and finally return an average of these mid-prices. You have to take into consideration that you may add new exchanges later.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Running the Application](#running-the-application)
-   [Running Tests](#running-tests)

## Prerequisites

Before you can run the application, you'll need the following tools and software installed on your machine:

-   Node.js and npm (https://nodejs.org/)

## Installation

To install the project and its dependencies, follow these steps:

1. Clone the repository from GitHub:

    ```bash
    git clone https://github.com/aungkoko0606/aung-order-book
    cd {your-project}

    ```

2. Install dependencies using npm

    ```bash
    npm install

    ```

## Running the application

You can run the application with the command

    npm start

## Running tests

Lastly, you can try run the unit tests that I've created

    npx jest
