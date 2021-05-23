import mongoose from 'mongoose';

export default new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, "profile must reference a user"],
    unique: true,
  },
  dp: {
    type: String,
    get:(v)=> `/public/${v}`,
  },
  firstName: {type: String, trim: true},
  lastName: { type: String, trim: true },
  gender: {
    type: String,
    enum: ['Male','Female',"Others"],
    // get: (v) => {
    //   const genderToEmun = { 0: "Male", 1: "Female", 2: "Others" };
    //   return genderToEmun[v];
    // },
    // set: (v) => {
    //   const genderToEmun = {"Male": 0, "Female": 1, "Others": 2};
    //   return genderToEmun[v];
    // }
  },
  timeLine: {}
}, {
  timestamps: false,
  skipVersioning: { dontVersionMe: true },
  strict: false
})