const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
  name: String,
  capacities: {
    twoWheelers: Number,
    hatchbackCars: Number,
    suvCars: Number,
  },
  availableSpaces: {
    twoWheelers: Number,
    hatchbackCars: Number,
    suvCars: Number,
  }
});

const ParkingLotModel = mongoose.model('ParkingLot', parkingLotSchema);

module.exports = {ParkingLotModel}
