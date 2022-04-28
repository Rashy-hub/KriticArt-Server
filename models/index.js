const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_LOCAL;
db.users = require("./users-model.js")(mongoose);
// Todo : les requires des model
module.exports = db;