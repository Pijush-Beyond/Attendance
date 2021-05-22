import express from 'express';
import { actionOnSlotAsigning, giveSlot } from "../services/slot.js";
import authentication from "../utilities/authentication.js";
// import Router from "../utilities/Router.js";

const router = express.Router()

// export default class Slot extends Router {
//   midleware = [authentication];
//   get = async (req, res, next) => {
//     try {
//       await actionOnSlotAsigning(req.user, req.query, true);
//       return null;
//     } catch(e) {
//       throw e;
//     }
//   }
//   delete = async (req, res, next) => {
//     try {
//       await actionOnSlotAsigning(req.user, req.query, false);
//       return null;
//     } catch(e) {
//       throw e;
//     }
//   }
//   post = async (req, res, next) => {
//     console.log('>>>>', req.params);
//     try {
//       await giveSlot(req.user, req.query, req.body.employeeId, req.body.slot);
//       return null;
//     } catch (e) {
//       // console.log('>>>\t',e)
//       throw e;
//     }
//   }
// }

router.use(authentication);

router.get('/slot/:year/:month/:date',async (req, res, next) => {
  try {
    await actionOnSlotAsigning(req.user, req.params, true);
    res.status(200).json({ data: null, message: "Successfull!", error_message: null, status: 200, error: {} })
  } catch (e) {
    next(e);
  }
})
router.delete('/slot/:year/:month/:date', async (req, res, next) => {
  try {
    await actionOnSlotAsigning(req.user, req.params, false);
    res.status(200).json({ data: null, message: "Successfull!", error_message: null, status: 200, error: {} })
  } catch (e) {
    next(e);
  }
})
router.post('/slot/:year/:month/:date', async (req, res, next) => {
  // console.log('>>>>', req.params);
  try {
    await giveSlot(req.user, req.params, req.body.employeeId, req.body.slot);
    res.status(200).json({ data: null, message: "Successfull!", error_message: null, status: 200, error: {} })
  } catch (e) {
    // console.log('>>>\t',e)
    next(e);
  }
})

export default router;