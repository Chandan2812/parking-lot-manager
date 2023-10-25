const mongoose = require('mongoose');

const rateCardSchema = new mongoose.Schema({
  vehicleType: String,  // twoWheelers, hatchbackCars, suvCars
  hourlyRate: Number
});

const RateCardModel = mongoose.model('RateCard', rateCardSchema);

module.exports = {RateCardModel}
