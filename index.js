const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7tlf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const userCollection = client.db(`${process.env.DB_NAME}`).collection("allUsers");

  app.post('/newUser', (req, res) => {
    console.log(req.body)
      userCollection.insertOne(req.body)
      .then(data => {
          res.send(data.insertedCount > 0);
          console.log(data)
      })
  })



  app.get('/', (req, res) => {
      res.send('Mongodb Connencted')
  })
});

app.listen(5050)