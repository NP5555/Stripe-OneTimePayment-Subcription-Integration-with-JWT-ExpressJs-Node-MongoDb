const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  stripeProductId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  description: String,
  price: Number,
  priceId: String,
  active: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);