const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")

const User = require('./models/User')
const sequelize = require("./config/db.config");
require("./config/db.config");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())

sequelize.sync({ force: false })
    .then(() => {
        console.log("All models were synchronized successfully.");
    })
    .catch(() => {
        console.log("Error occured in process model synchronized");
    })

app.get('/', async (req, res) => {
    const data = await User.findAll();
    res.send(data)
})

app.post('/', async (req, res) => {
    console.log(req.body);
    const data = await User.create(req.body);
    res.send(data)
})
app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await User.update(req.body, {
        where: {
            id: id
        }
    }).then((rows) => {
        if (rows[0] === 1) {
            res.status(200).send({
                message: 'User was updated successfully.'
            });
        }
        else {
            res.status(404).send({
                message: "Cannot update User. Maybe Post was not found or req.body is empty!"
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: `Error updating User: ${err}`
        });
    })
});

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`)
})