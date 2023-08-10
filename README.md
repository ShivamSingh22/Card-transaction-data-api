# Card-transaction-data-api

API Fetches data from a dataset of card transaction details in format CSV

# The solution of each test case can be found in the postman_screenshots folder

There are .png images showing the URL endpoints, params and the body of the request.

# The APIs of 4 types can be found

# API-1 totalItems<br />
Finds out the total items sold in any department for a specified time frame.<br />
<br />
# API-2 nthMostFrequentItems<br />
Finds out the nth most occuring item sold based on the card details.<br />
<br />
# API-3 percentage_of_sales<br />
Percentage of items sold department wise.<br />
<br />
API-4 monthlySales<br />
Lists the monthly sales of a product.<br />
<br />
# TO RUN THE PROJECT

Open The Terminal ---

1. Clone the project to local machine
2. Make Sure that Node environment is setup in the system (check node --version and npm version)
3. cd into the project folder i.e., cd Card-Transaction-Data (Keep in mind the case of the letters, uppercase/lowercase)
4. Type node index.js {You must recieve the message
   `Server is running on port 3000
Dataset loaded`
   }
5. Open postman and click on the + button. Set the request type to GET. Enter the URL endpoint of the API test case(for ex- http://localhost:3000/api/monthly_sales)
6. Click on params and add the required parametersin key value pair. Then click SEND.
7. You will recieve the requested result

NOTE- In case of node_modules error, just delete the node_modules folder and in the project directory, type `npm install`
