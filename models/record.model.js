const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  vehicleNumber: String,
  vehicleType: String,
  parkingLot: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingLot' 
  },
  parkingArea:String,
  entryTime: Date,
  exitTime: Date,
  amountPaid: Number
});

const RecordModel = mongoose.model('ParkingHistory', recordSchema);

module.exports = { RecordModel };
