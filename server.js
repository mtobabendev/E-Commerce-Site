import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql';
import { v4 as uuid } from 'uuid';
import argon2 from 'argon2';

dotenv.config();
// import posts from './placeholder.json' assert { type: 'json' };

let connection = mysql.createConnection({
    host: process.env.DB_HOST, // Where the database is running
    user: process.env.DB_USER, // Your username for the database
    password: process.env.DB_PASSWORD, // Your password (if there is one)
    database: process.env.DB_DATABASE, // The name of your database schema
});

connection.connect();

const app = express();

// Port number can be mostly anything you want, as long as it's above 2000
const port = 3000;

// Tells our server that we want to handle JSON requests
app.use(express.json());
app.use(cors()); // Let's out server bypass the CORS policy error

app.get('/', (req, res) => res.send('Hello'));

app.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    // Loops through our posts array and checks if each item has their userId
    // If it does, it keeps it in the array, otherwise filter it out
    const userPosts = posts.filter(item => userId === item.userId);

    res.json(userPosts);
});

app.post('/register', async (req, res) => {
    // Gets the username variable from the request body
    const username = req.body.username;
    const password = req.body.password;
    const userPicture = req.body.picture;
    const user_id = uuid();

    let hashedPassword;
    try {
        hashedPassword = await argon2.hash(password);
    } catch (error) {
        console.log(error);
    }

    let profilePicture = null;
    if (userPicture) {
        profilePicture = Buffer.from(picture, 'base64');
    }

    connection.query(
        'INSERT INTO users (user_id, username, password, userPicture) VALUES (?, ?, ?, ?)',
        [user_id, username, hashedPassword, profilePicture],
        function (err, rows, fields) {
            if (err) console.error(err);

            console.log('Rows is: ', rows);
            console.log('Fields is: ', fields)
        }
    );

    // Send the response back as a JSON
    // res.json(`Your username is ${username} and password is ${password}`);
    res.json({ status: 200, message: 'Register Successful'});
});

app.post('/check-username', (req, res) => {
    const username = req.body.username;

    connection.query('SELECT username FROM users WHERE username = ?',
        [username],
        function (err, rows) {
            if (err) {
                return res.status(400).json('Error: ', err);
            }

            // If the username exists, it will put it in 'rows' in an array
            // rows = [username]
            if (rows[0]) {
                return res.json('Is already a patient here. HAHAHA!');
            } else {
                return res.json('We are happy to commit you. LOL!');
            }
        }
    )
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query(
        'SELECT username, password FROM users WHERE username = ?',
        [username],
        async function(err, rows) {
            if (err) {
                return res.status(500).json(err);
            }
            if (rows.length === 0) {
                return res.status(404).json('Invalid username or password');
            }
            const passwordMatch = await argon2.verify(rows[0].password, password)
            if (!passwordMatch) {
                return res.status(404).json('Invalid username or password');
            }
            // You can only send one response back
            res.status(200).json('Login Successful');
        }
    )
});

app.post('/send-to-cart', (req, res) => {
    const cart = req.body.cart;
    const cartID = uuid();
    const username = req.body.username;

    const values = cart.map( item => [cartID, item.name, item.quantity, username]);
    // If the cart exists and there is nothing in the cart...
    // Delete everything from their cart in the DB and return early so that it doesn't run the rest of this app.post
    if (cart && cart.length == 0) {
        connection.query(
            'DELETE FROM cart WHERE username = ?',
            [username],
            function (err, rows) {
                if (err, rows) {
                    if (err) return res.status(404).json('User not found');
                    return res.status(200).json('Cleared cart');
                }
            }
        )
        return;
    }

    connection.query(
        'SELECT * FROM cart WHERE  username = ?',
        [username],
        function (err, rows) {
            if (err) {
                return res.status(404).json(err);
            }
            let sql = 'INSERT INTO cart VALUES ?';
            // If it doesn't find the username, rows will be []
            if (rows.length != 0 && cart.length != 0) {
                connection.query(
                    'DELETE FROM cart WHERE username = ?',
                    [username],
                    function (err) {
                        if (err) {
                            return res.status(404).json(err);
                        }
                    }
                )
            }
            connection.query(
                sql,
                // Uses a 'bulk insert' to loop through our values and put each one in a new row
                [values],
                function (err, rows) {
                    if (err) {
                        return res.status(404).json(err);
                    }
                    // If there's something in the cart
                    if (rows) {
                        console.log('rows: ', rows);
                        return res.status(200).json('Cart successfully saved');
                    }
                }
            );  
        }
    )
});

app.post ('/get-cart', (req, res) => {
    const username = req.body.username;
    console.log(username);

    connection.query (
        'SELECT product_name, product_quantity FROM cart WHERE username =?',
        [username],
        function (err, rows) {
            if (err) return res.status(404).json('Error: ', err);
            if (rows.length == 0) return res.status(404).json('No Cart Found');
            return res.status(200).json(rows);
        }
    )
});

//When they order something, put (order_id, cart_id, user_id) in the 'orders' table.

app.post('/add-order', (req, res) => {
    const username = req.body.username;
    const orderID = uuid();

    connection.query(
        'SELECT cart_id from cart WHERE username = ?',
        [username],
        function(err, rows) {
            if (err) return res.status(404).json(err);
            if (rows.length == 0) return res.status(404).json('No username found');
            connection.query(
                'INSERT INTO orders VALUES (?, ?, ?)',
                [orderID, rows[0].cart_id, username],
                function (err, rows) {
                    if (err) return res.status(404).json(err);
                    if (rows.length == 0) return res.status(404).json('Unsuccessful orders');
                    return res.status(200).json('Successful order placed');
                }
            )
        }
    )
});

//Save their shipping information in the shipping table if it's not already there for that user.



// app.listen(port);

// Optionally, you can have it run a function when the server starts
app.listen(port, () => console.log('Server running'));

// If you want to stop the server once it's running, click in the terminal and press CTRL + C
// Open web browser and type 'localhost:3000' in the URL line to see the output message.

export default app;

