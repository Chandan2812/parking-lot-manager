const express = require("express");
const {ParkingLotModel} = require("../models/parking.model");
const {RecordModel} = require("../models/record.model")

const parkingRouter = express.Router();


parkingRouter.post("/add",async(req,res)=>{
    try {
        const newParkingLot = new ParkingLotModel(req.body);
        await newParkingLot.save();
        res.status(201).send({msg:"Parking lot added",newParkingLot:newParkingLot});
    } catch (error) {
        res.status(500).send("Server Error");
    }
})



parkingRouter.post('/park', async (req, res) => {
    try {
      const { vehicleNumber, vehicleType, parkingLotId,parkingArea } = req.body;
      const parkingLot = await ParkingLotModel.findById(parkingLotId);
  
      if (!parkingLot) {
        return res.status(404).send("Parking lot not found");
      }
      if (parkingLot.availableSpaces[vehicleType] <= 0) {
        return res.status(400).send("No available space for this vehicle type");
      }
  
      parkingLot.availableSpaces[vehicleType] -= 1;
      await parkingLot.save();
  
      const newRecord = new RecordModel({
        vehicleNumber,
        vehicleType,
        parkingLot: parkingLotId,
        parkingArea,
        entryTime: new Date()
      });
      await newRecord.save();
  
      res.status(200).send({msg:`Vehicle number ${vehicleNumber} is parked at parking area ${parkingArea}`,newRecord});
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });



  parkingRouter.post('/exit', async (req, res) => {
    try {
      const { recordId } = req.body;
      const record = await RecordModel.findById(recordId).populate('parkingLot');
  
      if (!record) {
        return res.status(404).send("Parking record not found");
      }
  
      const durationHours = Math.ceil((new Date() - record.entryTime) / 3600000);
      const amountToPay = record.parkingLot.rates[record.vehicleType] * durationHours;
  
      record.exitTime = new Date();
      record.amountPaid = amountToPay;
      await record.save();
  
      record.parkingLot.availableSpaces[record.vehicleType] += 1;
      await record.parkingLot.save();
  
      res.status(200).send(`Vehicle is unparked and now he will have to pay ${amountToPay}`);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });
  



  parkingRouter.get('/history/:vehicleNumber', async (req, res) => {
    try {
      const { vehicleNumber } = req.params;
      const records = await RecordModel.find({ vehicleNumber }).populate('parkingLot');
      if (!records) {
        return res.status(404).send("No parking history found for this vehicle");
      }
      res.status(200).send(records);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });
  
  
  

module.exports = {parkingRouter};