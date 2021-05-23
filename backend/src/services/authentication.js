import db from "../database/db.js"

export const getUser = (userData, bool = false) => new Promise(async (resolve, reject) => {
  await db.Profile();
  await db.Company();
  let user;
  if (typeof (userData) ==='string')
    user = await (await db.User()).findById(userData, { __v: 0 })
      .populate('profile')
      .populate({
        path: 'company',
        select: '-__v',
        populate:{
          path: 'superUser',
          select: 'email _id'
        }
      })
      .catch(e => reject(e));
    else
      user = await (await db.User()).findOne({ $and: [{ email: userData.email }, { password: userData.password }]}, { __v: 0 })
      .populate('profile')
      .populate({
        path: 'company',
        select: '-__v',
        populate:{
          path: 'superUser',
          select: 'email _id'
        },
        // populate: {
        //   path: 'employees',
        //   select: '_id email active',
        //   populate: {
        //     path: 'profile',
        //     select: 'firstName lastName dp upComingSlot',
        //   }
        // }
      })
      .catch(e => reject(e));
    
      // console.log(user.toJSON());
  if (Boolean(user)) {
    if (!user.get('superUser')) delete user.company.employees;
    else {
      if (user.company)user.company.employees =  await (await db.User()).find({ company: user.company }, { _id: true, email: true, active: true, profile: true })
        .populate('profile','-__v')
        .catch(e => reject(e));
      user._doc.company?.employees.splice(user.company.employees.find(employee => employee.id === user.id), 1);
    }
    resolve(bool ? Boolean(user) : user);
  }
  else {
    const err = new Error('user not exsist');
    err.status = 404;
    err.error = {
      error: "Invalid Creadintials"
    }
    reject(err);
  }
})

export const registerEmployee = (userData) => new Promise(async (resolve, reject) => {
  const company = await (await db.Company()).findById(userData.company)
    .catch(e => reject(e));
  
  if (!company) {
    const error = new Error('Company not found')
    error.status = 404;
    error.error = {
      company: "Company not found",
    }
    reject(error);
  }
  
  const user = await (await db.User()).create(userData)
  .catch(e => {
    e.status = 400;
    e.error = {
      email: "Email already Exists"
    }
    reject(e);
  });
  if (!user) return;
  company.employees.push(user);
  await company.save();
  delete user._doc.__v;
  delete user._doc.company;
  resolve(await user.populate({
    path: 'profile',
    select: '-__v',
  }).execPopulate());
})

export const registerEmployer = (userData) => new Promise(async (resolve, reject) => {
  const company = await (await db.Company()).create({ name: userData.company })
    .catch(e => {
      e.status = 400;
      e.error = {
        company: "Company Alleady Registerd",
      }
      reject(e)
    });
  if (!company) return;

  delete userData.company;

  const user = await (await db.User()).create({ ...userData, company: company.id})
    .catch(async e => {
      await company.remove();
      e.status = 400;
      e.error = {
        email: "Email already Exists"
      }
      reject(e);
    });
  if (!user) return;
  company.superUser = user;
  await company.save();
  delete user._doc.__v;
  resolve(await user.populate({
    path: 'company',
    select: '-__v',
    // populate: {
    //   path: 'superUser',
    //   select: 'email _id',
    // },
    populate: {
      path: 'employees',
      select: '_id email active',
      populate: {
        path: 'profile',
        select: 'firstName lastName dp upComingSlot',
      }
    }
  }).execPopulate());
})

export const updateProfile = (userID, userUpdate) => new Promise(async (resolve, reject) => {
  const userUpdateData = {...userUpdate};
  delete userUpdateData.profile;
  const profileUpdateData = { ...userUpdate };
  
  await db.Profile();
  const user = await (await db.User()).findById(userID, { __v: 0 })
    .populate('profile');

  if (!user) {
    const err = new Error('user not exsist');
    err.status = 404;
    err.error = {
      error: "Your account does not exist"
    }
    reject(err);
    return;
  }

  if (!user.populated('profile')) {
    const profile = await (await db.Profile())(profileUpdateData);
    user.profile = profile;
  }

  console.log(JSON.stringify(user,null,2))

  user.set({ ...userUpdateData, active: true });
  user.profile.set({...profileUpdateData, user})
  delete user.profile._doc.__v;


  user.save().then(userd =>
    user.profile.save().then(() => resolve(true))
  ).catch(e => {
    e.status = 400;
    e.error = {unknown: "Went something wrong"}
    reject(e);
  })
})