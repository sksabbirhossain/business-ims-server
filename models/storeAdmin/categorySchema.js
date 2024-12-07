const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  picture: {
    type: String,
  },
  picture_info: {
    public_key: String,
  },
},{ timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
