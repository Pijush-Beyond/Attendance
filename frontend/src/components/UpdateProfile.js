import React, {  useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loading, notloading } from '../utilities/ReduxStore/reducers/loading';
import { urls } from "../config.json";
import axios from 'axios';
import { setprofile } from '../utilities/ReduxStore/reducers/user';
import toObject from '../utilities/toObject';
import { Link, Redirect } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { setchanged, setunchanged } from '../utilities/ReduxStore/reducers/prfileChanged';

export default function UpdateProfile({ type }) {
  const user = useSelector(state => state.user.data);
  // const [user, setUser] = useState(userFromStore);
  const changed = useSelector(state => state.profileChanged);
  const [error, setError] = useState({ dp: false, error: '', firstName: false });
  const [submitFlag, setSubmitFlag] = useState(false);
  const [dp, setDp] = useState(user?.profile?.dp);
  const dispatch = useDispatch();
  // const [redirect, setRedirect] = useState(false);
  const mobile = useMediaQuery({ maxWidth: 576 });

  const handleImageLoad = async (e) => {
    URL.revokeObjectURL(dp);
    if (e.currentTarget.files[0]) setDp(URL.createObjectURL(new Blob([new Uint8Array(await e.currentTarget.files[0].arrayBuffer())])));
    else setDp(user?.profile?.dp);
  }

  // useMemo(() => {
  //   console.log(changed);
  //   if (changed) setRedirect(true);
  // }, [changed]);
  useEffect(() => {
    dispatch(setunchanged());
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = [...e.currentTarget].slice(0, 7);
    dispatch(loading());
    for (let iTag of form)
      if (!iTag.validity.valid) {
        setError({ ...error, [iTag.name]: true });
        setSubmitFlag(true);
        dispatch(notloading());
        return;
      }

    try {
      await axios.put(urls.update, new FormData(e.currentTarget), {
        "withCredentials": true,
      })
      // setRedirect(true);
      dispatch(setchanged());
      dispatch(setprofile({ ...toObject(form), dp }));
    } catch (e) {
      if (e.response) setError({ ...error, ...e.response.data.error });
      else alert("Something went wrong!!");
      setSubmitFlag(true);
    }
    dispatch(notloading());
  }

  const onChange = (e) => {
    const iTag = e.currentTarget;
    setError({ ...error, [iTag.name]: false, error: '' });
  }

  // console.log(redirect, user);

  document.title = type === 2 ? `Profile | ${user.profile.firstName} ${user.profile.lastname || ''}`:user?.active ? 'Update Profile' : 'Setup Profile';
  // debugger;
  if (changed) return <Redirect to="/" />
  // if (redirect) return <Redirect to="/" />
  else if (!user) return <Redirect to="/login" />
  else if (user.active && type===0) return <Redirect to="/updateProfile" />
  else return (
    // <div className="d-flex justify-content-center align-items-center min-vh-100 login-container">
    <form method="post" encType="multipart/form-data" className={`flex-column d-flex justify-content-center align-items-center container-sm update-container`} onSubmit={onSubmit} style={{minHeight:type===0?'100vh':mobile?'calc(91vh)':'calc(100vh - 75px)'}}>
      <div className="d-flex justify-content-center align-items-center w-100" >
        {dp ?
          <img id="dp" onClick={(e) => type !== 2 ? e.currentTarget.parentElement.nextElementSibling.click() : ''} disabled={type === 2} src={dp} alt="prfile" className="border-dark rounded-circle border mb-2" style={{ cursor: type !== 2 ? 'pointer' : 'initial', objectFit: 'cover' }} /> :
          <i onClick={(e) => type !== 2 ? e.currentTarget.parentElement.nextElementSibling.click() : ''} disabled={type === 2} className="fas fa-user-alt border-dark rounded-circle border mb-2" style={{ cursor: type !== 2 ? 'pointer' : 'initial' }}></i>
        }
      </div>
      <input type="file" name="dp" id="dp" hidden onChange={(e) => { onChange(e); handleImageLoad(e); }} />
      {/* <input type="file" name="dp" id="dp" hidden onChange={(e) => { onChange(e); handleImageLoad(e); }} className={submitFlag && error.dp ?'is-invalid':''}/> */}
      {/* <div className="invalid-feedback text-center mb-2">Please provide your photo.</div> */}

      {
        type!==2 &&
        <>
          <div className="mb-2 w-100">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input defaultValue={(user.profile && user.profile.firstName) || ''} required onChange={onChange} name="firstName" id="firstName" type="text" className={`form-control ${submitFlag && error.firstName ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">You must provide first name.</div>
          </div>

          <div className="mb-2 w-100">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input defaultValue={(user.profile && user.profile.lastName) || ''} name="lastName" id="lastName" type="text" className="form-control" />
          </div>

          <div className="mb-2 w-100">
            <label className="form-label d-block" defaultValue={(user.profile && user.profile.gender) || ''}>Gender</label>
            <span className="form-check d-inline-block mx-2">
              <input className="form-check-input" type="radio" name="gender" id="male" value="male" defaultChecked={!user.profile?.gender || user.profile.gender === 'male'} />
              <label className="form-check-label" htmlFor="male">Male</label>
            </span>
            <span className="form-check d-inline-block mx-2">
              <input className="form-check-input" type="radio" name="gender" id="female" value="female" defaultChecked={user.profile?.gender === 'female'} />
              <label className="form-check-label" htmlFor="female">Female</label>
            </span>
            <span className="form-check d-inline-block mx-2">
              <input className="form-check-input" type="radio" name="gender" id="others" value="others" defaultChecked={user.profile?.gender === 'others'} />
              <label className="form-check-label" htmlFor="others">Others</label>
            </span>
          </div>
          {error.error && <div className="alert alert-danger w-100">{error.error}</div>}
    
          <button type="submit" className="btn btn-primary btn-block mb-2">{type === 1?'Update':'Alomst Set'}</button>
          {type === 1 && <Link to="/" className="btn btn-outline-primary btn-block">Cancel</Link>}
        </>
      }
      {
        type === 2 &&
        <>
          <div className="mb-2 d-flex">
            <div className="d-flex flex-column">
              <span className="form-label">Name:</span>
              <span className="form-label">Gender: &nbsp;</span>
            </div>
            <div className="d-flex flex-column">
              <span className="form-label">{`${user.profile.firstName} ${user.profile.lastname || ''}`}</span>
              <span className="form-label">{user.profile.gender || "Male"}</span>
            </div>
          </div>
          <Link to="/updateProfile" className="btn btn-blue">Edit Profile</Link>
        </>
      }
    </form>
    // </div>
  )
}
