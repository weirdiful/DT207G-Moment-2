const express = require('express');
const cors = require("cors");
const initDB = require('./db');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



let db;
initDB().then(database => {
  db = database;

  app.listen(port, () => {
    console.log('Servern körs på port ' + port);
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome" });
});

app.get("/api/workCV", async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM workexperience');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/workCV", async (req, res) => {
  const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
  if (!companyname || !jobtitle || !location || !startdate || !enddate) {
    return res.status(400).json({ message: "Obligatoriska fält saknas" });
  }

  try {
    const result = await db.run(
      `INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [companyname, jobtitle, location, startdate, enddate, description]
    );
    res.status(201).json({
         message: "Arbetserfarenhet tillagd", 
         work: {
            id: result.lastID,
            companyname, 
            jobtitle,
            location, 
            startdate, 
            enddate, 
            description

         }
         });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/workCV/:id", async (req, res) => {
  const { id } = req.params;
  const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
  if (!companyname || !jobtitle || !location || !startdate || !enddate) {
    return res.status(400).json({ message: "Obligatoriska fält saknas" });
  }

  try {
    const result = await db.run(
      `UPDATE workexperience
       SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ?
       WHERE id = ?`,
      [companyname, jobtitle, location, startdate, enddate, description, id]
    );

    if (result.changes === 0) return res.status(404).json({ message: "Ingen post hittades" });

    res.json({ message: "Arbetserfarenhet uppdaterad" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/workCV/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.run(`DELETE FROM workexperience WHERE id = ?`, id);
    if (result.changes === 0) return res.status(404).json({ message: "Ingen post hittades" });
    res.json({ message: "Arbetserfarenhet borttagen" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
