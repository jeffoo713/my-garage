const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  nickname: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  year: {
    type: String,
  },
  serviceHistory: [
    {
      serviceName: {
        type: String,
      },
      mileage: {
        type: Number,
      },
      date: {
        type: Date,
      },
      note: {
        type: String,
      },
    },
  ],
  vehicleImage: {
    type: Buffer,
  },
});

module.exports = Vehicle = mongoose.model('vehicle', VehicleSchema);
