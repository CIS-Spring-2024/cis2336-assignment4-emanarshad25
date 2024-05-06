const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory

// Serve the menu page as the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle form submissions via POST
app.post('/submit-order', (req, res) => {
    const order = req.body;
    let total = 0;

    // Assume each item has a fixed price for simplicity
    const prices = {
        espresso: 2.00,
        americano: 2.50,
        latte: 3.00,
        "green tea": 1.50,
        "black tea": 1.50,
        croissant: 2.50,
        muffin: 2.00,
        "chicken sandwich": 4.50,
        "grilled cheese": 3.75
    };

    // Calculate the total price
    for (let item in order) {
        const quantity = parseInt(order[item], 10);
        if (isNaN(quantity) || quantity < 0) {
            return res.status(400).send('Invalid quantity for one or more items.');
        }
        total += quantity * (prices[item] || 0);
    }

    // Send confirmation page with the total
    res.send(`Thank you for your order. The total amount is $${total.toFixed(2)}.`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
