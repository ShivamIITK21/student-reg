# How to use
1). This server requires mongod to be running on the default localhost and the server itself runs on localhost 3000.  
2). Start the server using **node app.js**.  
3). GET request to get all data -> make a get request on http://localhost:3000/students  
4). To filter the data -> add get query parameters eg. http://localhost:3000/students?branch=EE, multiple filters are supported.  
5). To delete all the data, make a DELETE reqest on http://localhost:3000/students  
6). To delete a particular student, make a DELETE request on http://localhost:3000/students/(roll number)  
7). To add a student, make a POST requests on http://localhost:3000/students with the necessary keys and values in the body.  
8). To update the info of a student, make a PUT request on http://localhost:3000/students/(roll number) with the necessary keys and values in the body.  
9). Postman can be used to make the requests.
