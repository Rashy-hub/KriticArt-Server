// Load env file
require('dotenv-flow').config();
const express = require('express');
const cors = require('cors');
const dbo=require('./utils/db-conn');



// Permet d'avoir une propagation des erreurs avec les async/await dans express
require('express-async-errors');



// Get env variable
const { PORT, NODE_ENV } = process.env;

// Create Web API
const app = express();

// Add Middlewares
app.use(express.json());
app.use(cors());

// Initialize Database 
 dbo.connectDB()


// Add Routing
const router = require('./routes');

app.use('/api', router);

// Start Web API
app.listen(PORT, () => {
    console.log(`Web API up on port ${PORT}  [${NODE_ENV}]`);
   
});

