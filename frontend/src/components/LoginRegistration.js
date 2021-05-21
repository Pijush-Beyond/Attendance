import React, { useMemo, useState } from 'react'
import '../style.css'
import { Link } from 'react-router-dom'


const Component = ({ propError, registration, onSubmit }) => {
  const [error, setError] = useState(propError);

  useMemo(() => setError(propError), [propError]);

  const onChange = (e) => {
    const iTag = e.target;
    setError({ ...error, [iTag.name]: '', error: '' });
  }

  document.title = registration ? 'Registration' : 'Login';

  return (
    <div className="d-flex justify-content-center align-items-center bg-white login-container py-4 min-vh-100" >
      <form className="border-0 px-3" onSubmit={onSubmit} >
        <h3 className="mb-3 text-success text-center">{registration? 'Registration' :'Login'}</h3>

        {registration && <div className="mb-3">
          <label className="form-label" htmlFor="company">Company Name</label>
          <input onChange={onChange} required type="text" name="company" placeholder="Company Name" className={`form-control ${error.company ? "text-danger border-danger" : ''}`} />
          <small className="text-danger">{error.company}</small>
        </div>}

        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input onChange={onChange} required type="email" name="email" placeholder="Enter a valid email address" className={`form-control ${error.email ? "text-danger border-danger" : ''}`} />
          <small className="text-danger">{error.email}</small>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input onChange={onChange} required pattern="\S{6,}" type="password" name="password" placeholder="Enter password" className={`form-control ${error.password ? "text-danger border-danger" : ''}`} />
          <small className="text-danger">{error.password}</small>
        </div>

        {registration && <div className="mb-3">
          <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
          <input onChange={onChange} required pattern="\S{6,}" type="password" name="confirmpassword" placeholder="Confirm Password" className={`form-control ${error.confirmpassword ? "text-danger border-danger" : ''}`} />
          <small className="text-danger">{error.confirmpassword}</small>
        </div>}

        {error.error && <div className="alert alert-danger">{error.error}</div>}

        <button type="submit" className="btn btn-blue mb-3">{!registration ? "Login" : "Register"}</button>

        {!registration ?
          <small className="font-weight-bold d-block">
            Don't have an account? <Link className="text-info" to='/register'>Register</Link>
          </small> :
          <small className="font-weight-bold d-block">
            Already have an account? <Link className="text-info" to='/login'>Sign In</Link>
          </small>
        }
      </form>
    </div>
  )
}

export default Component;