const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  }
});
const customListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [itemsSchema]
});
const dailyList = new mongoose.model('dailyList', itemsSchema);
const customList = new mongoose.model('customList', customListSchema);
const models = {dailyList,customList,};

module.exports = models;
