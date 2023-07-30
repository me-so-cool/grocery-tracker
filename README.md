# What is Grocery Tracker?

This is a simple grocery tracker app created using React Js, Node Js, Express and MongoDB. You're first asked to Signup/Login and then redirected to the main page where you can add items, quantity and price for current month and keep track of your expenses.

Note: This is just a demo project and the authentication used is not secure. Please use random temporary usernames and passwords when signing up.

## Steps to run the app

# Prerequisites
 - Node JS [https://www.geeksforgeeks.org/installation-of-node-js-on-windows/]
 - MongoDB [https://www.geeksforgeeks.org/how-to-install-mongodb-on-windows/]
 - React JS [https://www.geeksforgeeks.org/how-to-install-reactjs-on-windows/]
   
# Running the App

Once you install the above preqrequisites, You can git clone this project by using `gh repo clone me-so-cool/grocery-tracker` or downloading the zip file from [https://github.com/me-so-cool/grocery-tracker]

Then open two terminals and navigate to below paths in each terminal:

1. Root path - /grocery-tracker
2. backend path - /grocery-tracker/src/backend/

In the root path, run `npm install` to install the required node packages

First start the backend server by going to backend path mentioned above and type the following command - `node App.js`. This will start the backend server and create initial databases. (Note - As mentioned above, you need to install MongoDB and check thoroughly if it is working properly on the local)

Now run `npm start` in the root path terminal to start the react app (frontend). You can then go to [http://localhost:3000/] to access the site.


