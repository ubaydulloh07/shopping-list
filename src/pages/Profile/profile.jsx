


// import React from "react";
// import "antd/dist/reset.css";
// import "./profile.css";
// import Header from "../../components/header/header";
// import { IoPerson } from "react-icons/io5";
// import GroupMenu from "../Group/group";
// import { Link } from "react-router-dom";

// const Profile = () => {

//   return (
//     <div className="profile-container">

    
//     <div className="header">
//       <Header />
//     </div>

//     <div className="content">
//       <aside>
//       <div className="profile-menu">
//         <Link to="/profile"><IoPerson className="profile-icon" />Profile</Link>
//       </div>
//     <div>
//       <GroupMenu />
//     </div>
//       </aside>
     
//     </div>





//     </div>
//   );
// };

// export default Profile;





import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "./profile.css";
import Header from "../../components/header/header";
import { IoPerson } from "react-icons/io5";
import Group from "../Group/group";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/card-pro/card";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <div className="profile-container">
      <div className="header">
        <Header />
      </div>

      <div className="content">
        <aside>
          <div className="profile-menu">
            <Link to="/">
              <IoPerson className="profile-icon" />
              Profile
            </Link>
          </div>
          <div style={{position: "relative", zIndex: 1}}>
            <Group />
          </div>
        </aside>
        <div className="profile-content">
          {user ? (
            <ProfileCard name={user.name} username={user.username} />
          ) : (
            <p>Loading...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
