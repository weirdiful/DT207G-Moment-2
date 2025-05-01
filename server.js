const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'workCV'
})

//Kolla anslutning

db.connect(err => {
    if (err) {
        console.error('Anslutningen misslyckades: ', err);
        return;
    }
    console.log('Ansluten till databasen.');
});

//Routes

app.get("/api", (req, res) => {
    res.json({message: "Welcome" })
});

app.get("/api/workCV", (req, res) => {
    res.json({message: "Get table work experience" })
});

app.post("/api/workCV", (req, res) => {
    let id = req.body.id;
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    if (!id || !companyname) {
        return res.status(400).json({message: "Alla obligatoriska fält måste fyllas i."});
    }

    res.json({message: "Work experience added" })
});

app.put("/api/workCV/:id", (req, res) => {
    res.json({message: "Work experience updated: " + req.params.id})
});

app.delete("/api/workCV/:id", (req, res) => {
    res.json({message: "Work experience deleted: " + req.params.id})
});

app.listen(port, () => {
    console.log('Servern startad på port: ' + port)
});