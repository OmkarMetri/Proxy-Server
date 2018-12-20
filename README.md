# Proxy-Server
TASK 1: WHO WILL SHARE MY LOAD?

• OBJECTIVE : Building a proxy website that serves out web pages for a particular request, i.e., IPL match.

## Description:
• Setting up the proxy server of our web browser to point to the address of the web server that we have built.

• On the first request from the client side, Along with storing in it cache, we will also  download the webpage from the particular host site, i.e., espncricinfo.com and present it to the client.

• On subsequent request from the client for the same page, we will return it from the cache.

• Points to be noted:
    
    1.  Rendering from internet: Serving the page for the first time and downloading it & storing it the cache.
    2.  Rendering from cache: Searching for the request page and returning it from cache.

• Tool used: Node.js

• Node.js is a JavaScript run-time environment that executes JavaScript code server-side. Therefore, it helps to produce dynamic web page content before the page is sent to the user’s web browser and represents ‘JavaScript Everywhere’ paradigm.

• Node.js has the strategy of asynchronous execution and parallel running where in multiple servers can run simultaneously.

• Round Robin Algorithm: In computer networks and the world of internet, heavy load is one aspect which has to be dealt. Here in, we have used 4 proxy servers and share the load among these, i.e., all the servers are assigned numbers from 0,1,2,3 in a list and the next server in the list will respond to the request.

## Alternative Approach for Round Robin Algorithm:
• To maintain a weighted list of servers, where a heavier weight indicates better preferences.

• Result: Traffic will be distributed more efficiently to the servers that we rank as being more capable of handling requests.

• Way to Achieve : Priority Queue where in higher weighted server gets higher priority over the other servers among a list of servers.

