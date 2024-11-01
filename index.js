
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');
const app = express();
const port = 3000;

const userRoute = require('./routes/user_route')
app.use(cors());  
app.use(bodyParser.json());

app.use('/user' , userRoute),

db.sequelize.sync().then(() => {
    console.log('Database synced');
  });
  
  // Démarrer le serveur
  app.listen(port ,'127.0.0.1',() => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
  });