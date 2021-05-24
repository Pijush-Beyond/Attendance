import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { urls } from "../config.json";
import Notifications from './Notifications';

export default function NavBar() {
  const user = useSelector(state => state.user.data);
  const mobile = useMediaQuery({ maxWidth: 576 });
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <React.Fragment>
      <nav className="navbar p-0">

        <div className="d-flex align-items-center">
          {mobile &&
            <React.Fragment>
            <button className="fas fa-bars mx-2 btn btn-outline-primary fw-bold btn-icon px-2 py-1 fs-1" onClick={() => { setOpenMenu(true); document.body.style.overflow = 'hidden';}}></button>
              <div className="position-fixed top-0 bottom-0 start-0 end-0 navbar padding-0 justify-content-start align-items-start flex-column" style={{ backgroundColor: '#fffffff0', display: openMenu ? 'flex' : 'none', zIndex:10 }}>
              <button className="fas fa-times mx-3 btn fw-bold btn-icon px-2 py-1 fs-1" onClick={() => { setOpenMenu(false); document.body.style.overflow = 'initial';}}></button>
                {user.superUser && <Link onClick={() => setOpenMenu(false)} to="/addEmployee" className="btn btn-outline-success btn-custom btn-block text-start">Add Employee</Link>}
                <Link to="/profile" onClick={() => setOpenMenu(false)} className="btn btn-outline-success btn-custom btn-block text-start">Profile</Link>
                <a href={urls.logout} className="btn btn-outline-warning btn-custom btn-block text-start">Logout</a>
              </div>
            </React.Fragment>
          }
          <Link to="/" style={{ cursor: 'pointer' }} className="d-block">
            <svg id="Group_1" data-name="Group 1" xmlns="http://www.w3.org/2000/svg" width={mobile ? '28vw' : 140} className="m-2" viewBox="0 0 217.198 91.565">
              <path id="Path_1" data-name="Path 1" d="M78.43,119.745H0v25.747H2.971v6.734L9.7,145.492H78.43Z" transform="translate(0 -89.64)" fill="#f0f0f0" />
              <rect id="Rectangle_1" data-name="Rectangle 1" width="74.072" height="20.598" transform="translate(2.179 32.612)" fill="#fff" />
              <rect id="Rectangle_2" data-name="Rectangle 2" width="35.664" height="1.082" transform="translate(8.729 38.824)" fill="#f0f0f0" />
              <rect id="Rectangle_3" data-name="Rectangle 3" width="62.159" height="1.082" transform="translate(8.729 42.568)" fill="#f0f0f0" />
              <rect id="Rectangle_4" data-name="Rectangle 4" width="62.098" height="1.082" transform="translate(8.729 46.312)" fill="#f0f0f0" />
              <path id="Path_2" data-name="Path 2" d="M692.073,598.134s.374-7.834,8.038-6.923" transform="translate(-560.326 -509.871)" fill="#f0f0f0" />
              <circle id="Ellipse_1" data-name="Ellipse 1" cx="3.836" cy="3.836" r="3.836" transform="translate(125.745 73.136)" fill="#f0f0f0" />
              <rect id="Rectangle_5" data-name="Rectangle 5" width="1.083" height="7.579" transform="translate(128.957 83.431)" fill="#f0f0f0" />
              <circle id="Ellipse_2" data-name="Ellipse 2" cx="30.998" cy="30.998" r="30.998" transform="translate(136.675 14.274)" fill="#3f3d56" />
              <path id="Path_3" data-name="Path 3" d="M748.946,411.086a8.2,8.2,0,0,1,12.591,0,9.117,9.117,0,1,0-12.89-.3Q748.793,410.94,748.946,411.086Z" transform="translate(-600.789 -363.325)" fill="#fff" />
              <path id="Path_4" data-name="Path 4" d="M846.858,411.086a8.2,8.2,0,0,1,12.591,0,9.117,9.117,0,1,0-12.89-.3Q846.705,410.939,846.858,411.086Z" transform="translate(-674.085 -363.325)" fill="#fff" />
              <circle id="Ellipse_3" data-name="Ellipse 3" cx="3.136" cy="3.136" r="3.136" transform="translate(148.207 34.925)" fill="#3f3d56" />
              <circle id="Ellipse_4" data-name="Ellipse 4" cx="3.136" cy="3.136" r="3.136" transform="translate(172.822 34.925)" fill="#3f3d56" />
              <circle id="Ellipse_5" data-name="Ellipse 5" cx="3.647" cy="3.647" r="3.647" transform="translate(141.689 49.375)" fill="#6c63ff" />
              <circle id="Ellipse_6" data-name="Ellipse 6" cx="3.647" cy="3.647" r="3.647" transform="translate(183.627 49.375)" fill="#6c63ff" />
              <path id="Path_5" data-name="Path 5" d="M653.346,181.886l-2.735,11.852,4.558-4.558Z" transform="translate(-487.041 -136.158)" fill="#6c63ff" />
              <path id="Path_6" data-name="Path 6" d="M687.548,308.871l-3.105-2.606.072,2.606h-.964l-.077-2.756-4.193,2.756h-1.755l5.916-3.889-.229-8.165-.171-6.167.962-.026.174,6.194.229,8.158,4.641,3.9Z" transform="translate(-507.189 -217.557)" fill="#3f3d56" />
              <path id="Path_7" data-name="Path 7" d="M629.529,308.871l-3.105-2.606.072,2.606h-.962l-.077-2.756-4.193,2.756h-1.755l5.914-3.889-.229-8.165-.171-6.167.964-.026.174,6.194.227,8.158,4.641,3.9Z" transform="translate(-463.758 -217.557)" fill="#3f3d56" />
              <path id="Path_8" data-name="Path 8" d="M806.923,304.749a2.552,2.552,0,0,0-2.1,1.676c-.442-1.526-1.371-2.587-2.456-2.587a1.644,1.644,0,0,0-.219.037c-.417-1.629-1.386-2.772-2.516-2.772-1.511,0-2.735,2.041-2.735,4.559s1.225,4.559,2.735,4.559a1.646,1.646,0,0,0,.219-.037c.417,1.629,1.386,2.772,2.516,2.772a2.552,2.552,0,0,0,2.1-1.675c.442,1.526,1.371,2.587,2.456,2.587,1.511,0,2.735-2.041,2.735-4.559S808.433,304.749,806.923,304.749Z" transform="translate(-638.794 -292.754)" fill="#3f3d56" />
              <path id="Path_9" data-name="Path 9" d="M648.826,442.952l-17.076-2.77a8.721,8.721,0,0,0-2.6-.158,2.947,2.947,0,0,0-2.167,1.3,2.175,2.175,0,0,0,2.3,3.231,5.5,5.5,0,0,0-2.739.381,1.89,1.89,0,0,0-1.01,2.318,2.081,2.081,0,0,0,.483.611,4.426,4.426,0,0,0,4.657.79c-.629.9-1.876,1.035-2.955,1.244s-2.326.819-2.367,1.917c-.045,1.234,1.424,1.89,2.633,2.141a34.548,34.548,0,0,0,19.314-1.574,7.788,7.788,0,0,0,1.945-.993,4.383,4.383,0,0,0-1.773-7.785" transform="translate(-510.379 -396.715)" fill="#3f3d56" />
              <path id="Path_10" data-name="Path 10" d="M948.406,460.984a34.549,34.549,0,0,0-12.865-14.49,7.79,7.79,0,0,0-1.963-.958,4.383,4.383,0,0,0-5.156,6.1l-1.336-.691,8.049,15.313a8.72,8.72,0,0,0,1.436,2.173,2.947,2.947,0,0,0,2.341.952,2.162,2.162,0,0,0,1.7-3.092,4.185,4.185,0,0,0,1.446,1.272,1.89,1.89,0,0,0,2.459-.586,2.08,2.08,0,0,0,.2-.753,4.426,4.426,0,0,0-2.167-4.2c1.1-.039,1.955.877,2.77,1.614s2.053,1.367,2.955.739C949.292,463.67,948.932,462.1,948.406,460.984Z" transform="translate(-736.255 -400.751)" fill="#3f3d56" />
              <path id="Path_11" data-name="Path 11" d="M55.757,0h113.2V37.16h-4.288v9.719l-9.719-9.719H55.757Z" transform="translate(-41.739)" fill="#cacaca" />
              <rect id="Rectangle_6" data-name="Rectangle 6" width="106.907" height="29.728" transform="translate(17.162 3.619)" fill="#fff" />
              <rect id="Rectangle_7" data-name="Rectangle 7" width="51.473" height="1.562" transform="translate(25.759 12.298)" fill="#6c63ff" />
              <rect id="Rectangle_8" data-name="Rectangle 8" width="89.713" height="1.562" transform="translate(25.759 17.702)" fill="#6c63ff" />
              <rect id="Rectangle_9" data-name="Rectangle 9" width="89.625" height="1.562" transform="translate(25.759 23.105)" fill="#6c63ff" />
              <path id="Path_12" data-name="Path 12" d="M745,630.606H649.211a.251.251,0,0,1,0-.5H745a.251.251,0,0,1,0,.5Z" transform="translate(-528.052 -539.041)" fill="#cacaca" />
            </svg>
          </Link>

          {!mobile &&
            <>
              {user.superUser && <Link onClick={() => setOpenMenu(false)} to="/addEmployee" className="btn btn-outline-success btn-custom mx-2">Add Employee</Link>}
              <Link onClick={() => setOpenMenu(false)} to="/profile" className="btn btn-outline-success btn-custom mx-2">Profile</Link>
            </>
          }
        </div>

        <div className="d-flex align-items-center">
          {
            user.profile.dp ?
              <img src={user.profile.dp} alt="Profile" className="rounded-circle mx-2 img" style={{ width: mobile ? '15vw' : 60, height: mobile ? '15vw' : 60 }} />
              :
              <i className="far fa-user-circle mx-2" style={{ fontSize: mobile ? '10vw' : 45 }}></i>
          }
          {/* {
            mobile ?
              <button className="fas fa-bell me-3 btn fw-bold btn-icon fs-3" onClick={() => setOpenNotification(true)}></button>
              :
              <a href={urls.logout} className="btn btn-outline-warning text-start me-2">Logout</a>
          } */}
          {!mobile && <a href={urls.logout} className="btn btn-outline-warning text-start me-2">Logout</a>}
        </div>
      </nav>
      {/* {
        mobile && openNotification &&
        <div className="position-fixed top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-start" style={{ backgroundColor: '#fffffff0', zIndex: 100}}>
          <button className="fas fa-times m-2 btn fw-bold btn-icon px-2 py-1 fs-1" onClick={() => setOpenNotification(false)}></button>
          <Notifications />
        </div>
      } */}
    </React.Fragment>
  )
}
