const express = require('express');
const cors = require('cors');

// Permet d'avoir une propagation des erreurs avec les async/await dans express
require('express-async-errors');

// Load env file
require('dotenv-flow').config();

// Get env variable
const { PORT, NODE_ENV } = process.env;

// Create Web API
const app = express();

// Add Middlewares
app.use(express.json());
app.use(cors());

// Initialize Database


// Add Routing
const router = require('./routes');
app.use('/api', router);

// Start Web API
app.listen(PORT, () => {
    console.log(`Web API up on port ${PORT}  [${NODE_ENV}]`);
   
});
console.log("test")
app._router.stack.forEach((r) => {
   // console.log(r.route && r.route.path)
   
   console.log(r)
  })