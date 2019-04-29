## Time to put some of the SQL Work into Practice!

 Head on over to the [SQL Practice Site](https://www.w3schools.com/sql/trysql.asp?filename=trysql_desc). This site has prebuilt tables that will work out quite nicely for what we want to do.

 Rather than have you try to hop back and forth, here's an overview of each of the tables:

 |CUSTOMERS|||||||
 |-|-|-|-|-|-|-|
 |CustomerID|CustomerName|ContactName|Address|City|PostalCode|Country|

 
 |CATEGORIES|||
 |-|-|-|
 |CategoryID|CategoryName|Description|

 |EMPLOYEES||||||
 |-|-|-|-|-|-|
 |EmployeeID|LastName|FirstName|BirthDate|Photo|Notes|

 |ORDERDETAILS||||
 |-|-|-|-|
 |OrderDetailID|OrderID|ProductID|Quantity

 |ORDERS|||||
 |-|-|-|-|-|
 |OrderID|CustomerID|EmployeeID|OrderDate|ShipperID|

 |PRODUCTS||||||
 |-|-|-|-|-|-|
 |ProductID|ProductName|SupplierID|CategoryID|Unit|Price|

 |SHIPPERS|||
 |-|-|-|
 |ShipperID|ShipperName|Phone|

|SUPPLIERS|||||||
 |-|-|-|-|-|-|-|
 |SupplierID|SupplierName|Address|City|PostalCode|Country|



 ## Now that we know our Schema, let's do the following (making sure that the table returns all useful data, not just the bare minimum): 
1. Find all Customers in the USA or Mexico ordered Alphabetically by Customer Name
    * Solution: 
    
2. Find all Products that cost more than 40
    * Solution: 

3. Find all Employees born before 1960.
    * Solution: 
    
4. Find all Products that are Beverages
    * Solution: 
    
5. Find all Employees Who have ordered something that shipped to Spain
    * Solution: 
    
6. Find all Orders with a total price over 2000 sorted from most expensive to least expensive.
    * Solution: 
    

## Node Practice

1. To start we're going to make a simple node program for some back to basics.
    * Create two separate .js files. One will contain a single function, the other will be the one you run though the command line. 
    * The js file with the function should export a function that takes two numbers, and logs a random number between the two. The arguments should be able to be passed in either order (2,6) and (6,2) should both return a random number between 2 and 6.
    * Create a main file that can be called with two arguments via the command line.
    * If two numbers aren't provided, send a message to the console that one (or both) of the arguments aren't numbers.
    * If two numbers ARE provided, call the function from the other file.

2. We're going to write a command line API caller.
    * Set up a node file that will take in several arguments.
    * Snag an API key from [here](https://www.alphavantage.co/documentation/)
    * Take the first argument they put in. It should be one of the following, otherwise give them an error: 
        1. ExchangeRate (or another word you prefer)
            * Will take two arguments: From Currency and To Currency.
            * Accesses [Currency Exchange](https://www.alphavantage.co/documentation/#currency-exchange)
            * Display the relevant data based off inputs
        2. StockPrice (or another word you prefer)
            * Will take a Stock Symbol and return the [Latest Price](https://www.alphavantage.co/documentation/#latestprice)
            * If no quote is returned, let the user know something went wrong.
            * For added effect, have any change in price be shown in red for a loss, or green for an increase.