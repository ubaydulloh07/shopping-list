import "./header.css";
import { FiRefreshCw, FiLogOut } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import useGroups from "../../hooks/useGroups";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState("");
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const {
    groups,
    groupsLoading,
    groupsError,
    isModalOpen,
    openModal,
    closeModal,
    password,
    setPassword,
    handleJoinGroup,
    joinError,
  } = useGroups(group);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setGroup("");
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <MdOutlineLocalGroceryStore style={{ fontSize: "30px" }} />
        <p>Store</p>
        {/* <button onClick={() => navigate("/")}>+ New</button> */}
      </div>

      <div className="header-search" ref={searchRef}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search groups..."
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </div>

        {group.length > 0 && (
          <div className="search-content">
            <h1>Groups</h1>
            {groupsLoading ? (
              <div className="search-loading">Loading...</div>
            ) : groupsError ? (
              <div className="search-error">Error loading groups</div>
            ) : groups?.length === 0 ? (
              
              <div className="search-empty">No groups found 🥲</div>
            ) : (
              groups?.map((group) => (
                <div key={group.id} className="search-item">
                  <div className="search-item-left">
                    <p>{group.name}</p>
                    <p>created by {group.creator?.name || "Unknown"}</p>
                  </div>
                  <div className="search-item-right">
                    <button onClick={() => openModal(group)}>Join</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="header-right">
        <ThemeToggle />
        <button className="refresh" title="Refresh">
          <FiRefreshCw />
        </button>
        <button className="notification" title="Notifications">
          <FaRegBell /> <span>9+</span>
        </button>

        <div className="menu-container" ref={menuRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="settings-btn"
            title="Settings"
          >
            <IoMdSettings />
          </button>

          <div className={`dropdown ${isOpen ? "show" : ""}`}>
            <button className="dropdown-item" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay-2" onClick={closeModal}>
          <div className="modal-2" onClick={(e) => e.stopPropagation()}>
            <h2>Enter Group Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{color: "black"}}
            />
            {joinError && <p className="error">{joinError}</p>}
            <div className="modal-buttons-2">
              <button className="btn-2" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-2 primary-2" onClick={handleJoinGroup}>
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
