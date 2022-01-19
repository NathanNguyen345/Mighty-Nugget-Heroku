const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
const mongoose = require("mongoose");
const path = require('path');
const Transaction = require('./models/transaction.model');
const Stake = require('./models/stake.model');

// dotenv config
require("dotenv").config();

// Configure public folder
app.use(express.static(path.join(__dirname, "public")));

// Request Data Params
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

// Connect to DB
const uri = process.env.ATLAS_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected to Mongo DB!");
});

app.get("/api/user", (req, res) => {
    res.status(200).json({ name: "Testtt" });
})

// Use User Router
const userRouter = require("./routes/user");
app.use('/user', userRouter);

const inventoryRouter = require("./routes/inventory");
app.use('/inventory', inventoryRouter);

const mintRouter = require("./routes/mint");
app.use('/mint', mintRouter);

const weaponRouter = require("./routes/weapon");
app.use('/weapon', weaponRouter);

const stakeRouter = require("./routes/stake");
app.use('/stake', stakeRouter);

const transactionRouter = require("./routes/transaction");
app.use('/transaction', transactionRouter);

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);

    Transaction.watch().on('change', (changes) => {
        Stake.find({}, (err, itemFound) => {
            if (itemFound) {
                const item = {
                    wood: itemFound[0].wood,
                    ore: itemFound[0].ore,
                    fish: itemFound[0].fish
                }
                socket.emit('transaction', {
                    info: {
                        transaction: changes.fullDocument,
                        stake: item
                    }
                })
            } else {
                // TODO: Error handeling
                console.log('error');
            }
        })
    })
});


http.listen(port, () => console.log(`Server listening on port: ${port}`));