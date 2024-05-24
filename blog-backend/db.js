require('dotenv').config();
// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_DB_DEV);
}

module.exports = mongoose;
