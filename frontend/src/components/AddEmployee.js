import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loading, notloading } from '../utilities/ReduxStore/reducers/loading';
import axios from 'axios';

import { urls } from "../config.json";
import { addemployee } from '../utilities/ReduxStore/reducers/employees';

import toObject from "../utilities/toObject";

export default function AddEmployee() {
  const mobile = useMediaQuery({ maxWidth: 576 });
  const [error, setError] = useState({});
  const company = useSelector(state => ({name: state.company.name, _id: state.company._id}));
  const dispatch = useDispatch();

  const onChange = (e) => {
    const iTag = e.target;
    setError({ ...error, [iTag.name]: '', error: '' });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(loading());
    axios.post(urls.addemployee, { ...toObject(form), company: company._id}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(data => {
        dispatch(addemployee(data.data.data));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        dispatch(notloading());
      })
      .catch(err => {
        if (err.response && err.response.data.status !== 400) alert('Something went wrong!!');
        else if(err.response)setError(err.response.data.error);
        dispatch(notloading());
      })
  }

  document.title = `${company.name} | Add User`;

  return (
    <form className={`flex-column d-flex justify-content-center align-items-center container-sm update-container`} style={{ minHeight: mobile ? 'calc(91vh)' : 'calc(100vh - 75.02px)' }} onSubmit={onSubmit} >
      <h3 className="mb-3 text-success text-center">Add User</h3>

      <div className="mb-3 w-100">
        <label className="form-label" htmlFor="email">Email Address</label>
        <input onChange={onChange} required type="email" name="email" placeholder="Enter a valid email address" className={`form-control ${error.email ? "text-danger border-danger" : ''}`} />
        <small className="text-danger">{error.email}</small>
      </div>

      <div className="mb-3 w-100">
        <label className="form-label" htmlFor="password">Password</label>
        <input onChange={onChange} required pattern="\S{6,}" type="text" name="password" placeholder="Enter password" className={`form-control ${error.password ? "text-danger border-danger" : ''}`} />
        <small className="text-danger">{error.password}</small>
      </div>

      {/* {error.error && <div className="alert alert-danger">{error.error}</div>} */}

      <button type="submit" className="btn btn-primary mb-3 btn-block">Add</button>
      <Link to="/" className="btn btn-outline-primary mb-3 btn-block">Done</Link>
    </form>
  )
}
