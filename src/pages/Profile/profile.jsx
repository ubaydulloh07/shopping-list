
// import  useAuth  from "../../hooks/useAuth";

// function Profile() {
//     const {logout} = useAuth();
//     return (
        
//     )
// }   

// export default Profile


import React from "react";
import { Card, Avatar, Button, Tooltip } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import "./profile.css";

const Profile = () => {
  const username = "ubaydulloh_07";

  const copyUsername = () => {
    navigator.clipboard.writeText(username);
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
          <Avatar size={100} className="profile-avatar">
            U
          </Avatar>
          <div className="profile-info">
            <h2>Your Profile</h2>
            <h3>Ubaydulloh</h3>
            <p className="username">{username}</p>
            <span className="status">Active</span>
          </div>
        </div>
        <div className="profile-actions">
          <Tooltip title="Copy Username">
            <Button type="primary" icon={<CopyOutlined />} onClick={copyUsername}>
              Copy Username
            </Button>
          </Tooltip>
          <Tooltip title="Delete Account">
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete Account
            </Button>
          </Tooltip>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
