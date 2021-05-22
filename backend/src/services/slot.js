import db from "../database/db.js";

export const actionOnSlotAsigning =async (_id, slot,accept) => {
  await db.Profile();
  const user = await (await db.User()).findById(_id, 'active profile').populate('profile', 'timeLine');
  if (!user) {
    const err = new Error('user not exsist');
    err.status = 401;
    err.error = {
      error: "user not exsist"
    }
    throw err;
  }
  if (!user.active) {
    const error = new Error('Your account is not active yet.');
    error.status = 403;
    error.error={
      error: "Your account is not active yet."
    }
    throw error;
  }
  if (!user.profile.timeLine?.[slot.year]?.[slot.month]?.[slot.date]) {
    const error = new Error('Slot not found.');
    error.status = 404;
    error.error = {
      error: "Slot not found."
    }
    throw error;
  }
  if (accept)
    user.profile.timeLine[slot.year][slot.month][slot.date].status = accept;
  else delete user.profile.timeLine[slot.year][slot.month][slot.date];
  // user.profile.timeLine = { ...user.profile.timeLine };
  try {
    // console.log(JSON.stringify(user.profile,null,2));
    await user.profile.update({ $set: {timeLine: user.profile.timeLine}});
  }catch(e){
    e.status = 400;
    e.error = { unknown: "Went something wrong" }
    throw e;
  }
}

export const giveSlot = async (_id, d, employeeId, slot) => {
  await db.Profile();
  const superUser = await(await db.User()).findById(_id, 'company superUser -_id');
  const employee = await(await db.User()).findById(employeeId, 'superUser active profile company').populate('profile', 'timeLine');
  if (!superUser) {
    const err = new Error('user not exsist');
    err.status = 404;
    err.error = {
      error: "user not exsist"
    }
    throw err;
  }  
  if (!superUser.superUser) {
    const err = new Error('You can not assign slot to employee');
    err.status = 401;
    err.error = {
      error: "You can not assign slot to employee"
    }
    throw err;
  }
  if (!employee) {
    const err = new Error('Employee not exsist');
    err.status = 404;
    err.error = {
      error: "Employee not exsist"
    }
    throw err;
  }
  if (employee.company.toString() !== superUser.company.toString()) {
    // console.log(employeeRaw.company !== superUser.company)
    const err = new Error('Employee not employeed to your company');
    err.status = 404;
    err.error = {
      error: "Employee not employeed to your company"
    }
    throw err;
  }
  if (employee.superUser) {
    const err = new Error("You can't assign a slot to a superUser");
    err.status = 403;
    err.error = {
      error: "You can't assign a slot to a superUser"
    }
    throw err;
  }
  if (!employee.active) {
    const error = new Error('Employee is not active yet.');
    error.status = 403;
    error.error = {
      error: "Employee is not active yet."
    }
    throw error;
  }
  if (!employee.profile.timeLine) employee.profile.timeLine = { [d.year]: { [d.month]: { [d.date]: { slot, status: false } } } };
  else if (!employee.profile.timeLine[d.year]) employee.profile.timeLine = { ...employee.profile.timeLine,[d.year]: { [d.month]: { [d.date]: { slot, status: false } } } };
  else if (!employee.profile.timeLine[d.year][d.month]) employee.profile.timeLine = { ...employee.profile.timeLine, [d.year]: { ...employee.profile.timeLine[d.year],[d.month]: { [d.date]: { slot, status: false } } } };
  else employee.profile.timeLine = { ...employee.profile.timeLine, [d.year]: { ...employee.profile.timeLine[d.year], [d.month]: { ...employee.profile.timeLine[d.year][d.month], [d.date]: { slot, status: false } } } };

  try {
    await employee.profile.save();
    // console.log(JSON.stringify(employee,null,2));
  } catch (e) {
    e.status = 400;
    e.error = { unknown: "Went something wrong" }
    throw e;
  }
}