

import "./header.css";
import { FiRefreshCw } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import useGroups from "../../hooks/useGroups";




function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState("");

  const { groups, groupsLoading, groupsError } = useGroups(group);

  console.log(groups);

  return (
    <header>

      <div className="header-left">
        <img src="" alt="" />
        <button>+ New</button>
      </div>

      <div className="header-search">

        <div className="search-bar">
          <input type="text" placeholder="Search" value={group} onChange={e => setGroup(e.target.value)} />
        </div>

        {
          group.length > 0 && (
            <div className="search-content">
              <h1>Groups</h1>
              {
                groups?.map(user => (
                  
                  <div key={user.id} className="search-item">
                   <div className="search-item-left">
                   <p>{user.name}</p>
                   <p>created by ubaydulloh</p>
                   </div>
                   <div className="search-item-right">
                      <button>Join</button>
                   </div>
                  </div>
                ))
              }
              {
                groupsLoading && <p>Loading...</p>
              }
            </div>
          )
        }

      </div>

      <div className="header-right">
        <button className="refresh"><FiRefreshCw /></button>
        <button className="notification"><FaRegBell /> <span>9+</span></button>


        <div className="menu-container">
          <button onClick={() => setIsOpen(!isOpen)} className="settings-btn">
            <IoMdSettings />
          </button>

          <div className={`dropdown ${isOpen ? "show" : ""}`}>
            <button className="dropdown-item" onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>Log out</button>
          </div>
        </div>










      </div>





      {
        groupsError && <p>Error</p>
      }

    </header>
  );
}

export default Header;

