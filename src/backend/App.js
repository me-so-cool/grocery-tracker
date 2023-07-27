const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const bcrypt = require('bcrypt')




const app = express();
//Allow cross origin resource sharing
app.use(cors())

//Body parser by express
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//Create two new databases, One for storing grocery items and other for user database
const groceryConn = mongoose.createConnection("mongodb://0.0.0.0:27017/groceryDB", { useNewUrlParser: true });
const userConn = mongoose.createConnection("mongodb://0.0.0.0:27017/userDB", { useNewUrlParser: true });

//Schema for grocery database
const itemSchema = {
    name: String,
    quantity: String,
    price: Number,
    month: String,
    year: Number,
    username : String,
}

//Schema for user database
const userSchema = {
    username : {type : String, unique:true},
    password : String
}


//Create models for the two databases
const Items = groceryConn.model("Item", itemSchema);
const Users = userConn.model("User", userSchema);

//Home Route Methods
app.route("/")
    //get all the items in the list
    .get((req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        let monthNumber = req.query.month;
        let username = req.query.username;
        let filter = {};
        if(monthNumber){
            monthNumber = monthNumber.replace(/[{}"]/g, '');
            filter.month = monthNumber;
        }
        if(username){
            username = username.replace(/[{}"]/g, '');
            filter.username = username;
        }
        Items.find(filter)
            .then(foundItems => {
                console.log(filter);
                res.send(foundItems);
            });
    })
    //Post a new item to the list
    .post(async (req,res) => {
        try {

            const date = new Date();
            const month = date.getMonth() + 1; // getMonth() returns a zero-based value (0-11), so we add 1 to get the correct month number (1-12)
            const year = date.getFullYear();

            const newItem = await new Items({
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                month : month,
                year : year,
                username : req.body.username,
            });
            await newItem.save();
            console.log(newItem);
            res.send("Successfully added new item!");    
        } catch (error) {
            res.send(error);
        }
    })
    //Delete one item in the list
    .delete(async (req, res) => {
        const id = await req.body.id;
        Items.deleteOne({
            _id: id,
        }).then((reply) => {
            res.send(reply)
        })
          .catch((err) => {
                res.send(err);
        })

    });



//User Signup Routes
app.route("/Signup")
    .post(async (req,res) => {
    try {
        
        const existingUser = await Users.findOne({ username: req.body.username });
        //Check if the given username already exists
        if (existingUser) {
            res.send("Username already exists!");
            return;
        } else {

        const password = req.body.password;
        var newPassword = "";
        bcrypt.hash(password, 2)
        .then(function(hash){
            newPassword = hash;
            const newUser =  new Users({
                username : req.body.username,
                password : hash,
               });
    
               newUser.save();
               console.log(newUser);
               res.send("Successfully created new user");
        })
    }    
    } catch (error) {
        res.send(error);
    }
})


//User Login routes
app.route("/Login")
.post(async (req, res) => {
    try{
        const existingUser = await Users.findOne({ username: req.body.username });
        //Check if the given username already exists
        if (!existingUser) {
            res.send("Username doesn't exist, Please Signup using the Signup button below!");
            return;
        } else {
            const password = req.body.password;
            const existingPassword = existingUser.password;
            console.log(password);
                console.log(existingPassword);
            checkUser(password);

            async function checkUser(password){
                console.log(password);
                console.log(existingPassword);
               
                const match = await bcrypt.compare(password, existingPassword);
                if(match){
                    res.send("User logged in successfully!");
                } else {
                    res.send("Wrong password, please try again!");
                }
            }
        }
    } catch(err){
        res.send(err)
    }
});





app.listen(9000, function () {
    console.log("Server started successfully on port 9000");
});