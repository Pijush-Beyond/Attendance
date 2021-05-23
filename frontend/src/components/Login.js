import React, { useMemo, useState } from 'react'
import '../style.css'
import LoginRegistration from './LoginRegistration';
import { urls } from '../config.json';
import axios from "axios";
import toObject from '../utilities/toObject';
import { useDispatch, useSelector } from 'react-redux';
import { loading, notloading } from '../utilities/ReduxStore/reducers/loading';
import { Redirect } from 'react-router';
import { setuser } from '../utilities/ReduxStore/reducers/user';
import { setcompany } from '../utilities/ReduxStore/reducers/company';
import { setemployees } from '../utilities/ReduxStore/reducers/employees';


const Login = () => {
  const [error, setError] = useState({ email: '', password: '', error: '' });
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);

  // useMemo(() => setRedirect(true), [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loading());
    try {
      const user = await axios.post(urls.login, {...toObject(e.target)}, {
        headers: {
          "Content-Type": 'application/json',
        },
        "withCredentials":true,
      })
      if (user.data.data.superUser) {
        dispatch(setemployees(user.data.data.company.employees));
        delete user.data.data.company.employees;
      }
      dispatch(setcompany(user.data.data.company));
      delete user.data.data.company;
      dispatch(setuser(user.data.data));
      // setRedirect(true);
    } catch (e) {
      if (e.response) setError(e.response.data.error)
      else alert("Something went wrong!!");
    }
    dispatch(notloading())
  }
  return user? <Redirect to="/"/> : <LoginRegistration propError={error} onSubmit={onSubmit} />
}

export default Login;