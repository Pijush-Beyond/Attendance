import mongoose from 'mongoose';

export default new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  employees: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
  timeSlot: [String],
  superUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: false,
  skipVersioning: { dontVersionMe: true },
})