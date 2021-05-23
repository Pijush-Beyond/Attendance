import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import { autologin } from "./utilities/ReduxStore/reducers/user";

import Loading from './components/Loading';
import Login from './components/Login';
import Registration from "./components/Registration";
import UpdateProfile from "./components/UpdateProfile";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import AddEmployee from "./components/AddEmployee";

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  // const [user, setuser] = useState(userFromStore)
  
  // useMemo(() => setuser(userFromStore), [userFromStore]);
  useEffect(() => 
    dispatch(autologin())
  , []);

  // console.log(user);

  if (!user.fetched) return (
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    )
  else return (
    <Router>
      <Loading />
      <Switch>
        <Route exact path='/setProfile' component={() => <UpdateProfile type={0}/>} />
        {/* <RequireLogin />
        <NotRequireLogin /> */}
        <Route path={['/','/updateProfile','/profile','/addEmployee']} exact component={RequireLogin}/>
        <Route path='/' component={NotRequireLogin}/>
      </Switch>
    </Router>
  )
}

const RequireLogin = () => {
  const user = useSelector(state => state.user);
  // const [user, setuser] = useState(userFromStore);

  // useMemo(() => setuser(userFromStore), [userFromStore]);

  if (!user.data) return <Redirect to="/login" />
  else if(user && !user.data.profile) return <Redirect to="/setProfile" />
  else return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/updateProfile' component={() => <UpdateProfile type={1} />} />
        <Route exact path='/profile' component={() => <UpdateProfile type={2} />} />
        <Route exact path='/addEmployee' component={AddEmployee} />
        <Route path="/" exact component={Home}/>
      </Switch>
    </>
  )
}

const NotRequireLogin = () =>{ 
  const user = useSelector(state => state.user);
  // const [user, setuser] = useState(userFromStore)

  // useMemo(() => setuser(userFromStore), [userFromStore]);

  if(user.data && !user.data.profile) return <Redirect to="/setProfile" />
  else return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Registration} />
      <Route path='*' component={() => <Redirect to="/login"/>} />
    </Switch>
  )
}
export default App;



