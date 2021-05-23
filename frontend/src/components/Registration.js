import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loading, notloading } from '../utilities/ReduxStore/reducers/loading';
import LoginRegistration from './LoginRegistration';
import { urls } from '../config.json';
import toObject from '../utilities/toObject';
import { setuser } from '../utilities/ReduxStore/reducers/user';
import { Redirect } from 'react-router';
import { setcompany } from '../utilities/ReduxStore/reducers/company';
import { setemployees } from '../utilities/ReduxStore/reducers/employees';



const Registration = () => {
  const [error, setError] = useState({ email: '',password:'', confirmpassword: '', error: '' });
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmpassword.value) {
      setError({ confirmpassword: "Password Did't Match" });
      return;
    }
    dispatch(loading());
    
    try {
      const user = await axios.post(urls.register, { ...toObject(e.target), superUser: true }, {
        headers: {
          "Content-Type": 'application/json',
        },
        withCredentials: true
      });
      if (user.data.data.superUser) {
        dispatch(setemployees(user.data.data.company.employees));
        delete user.data.data.company.employees;
      }
      setRedirect(true);
      dispatch(setcompany(user.data.data.company));
      delete user.data.data.company;
      dispatch(setuser(user.data.data));
    } catch (err) {
      if (err.response && err.response.status===400) setError({...error,...err.response.data.error})
      else alert("Something went wrong!!");
    }
    dispatch(notloading())
  }

  return redirect ? <Redirect to="/updateProfile"/> : <LoginRegistration propError={error} onSubmit={onSubmit} registration/>
}

export default Registration;