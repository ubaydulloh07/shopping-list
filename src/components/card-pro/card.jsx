import React from "react";
import "./card.css";
import { Avatar, Button, Tooltip } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";

const ProfileCard = ({ name, username }) => {
  const copyUsername = () => {
    navigator.clipboard.writeText(username);
  };

  return (
    <div className="profile-card">

    <div className="profile-header">
    <h2>Your Profile</h2>
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

    </div>

    <div className="profile-info">

    <div>
    <Avatar size={150} className="profile-avatar">{name.charAt(0)}</Avatar>
    </div>

    <div className="profile-name">

        <h2>{name}<span className="status">Active</span></h2>
          <p className="username">{username}</p>
          
    </div>


    </div>


      
    </div>
  );
};

export default ProfileCard;
