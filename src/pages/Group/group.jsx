import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/API";
import { toast } from "sonner";
import "./group.css";
import { FiMessageCircle } from "react-icons/fi";

export default function GroupMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [joinPassword, setJoinPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchGroups();
  }, [navigate]);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await API.getMyGroups();
      if (response) {
        setGroups(response);
      }
    } catch (error) {
      if (error.message === "Unauthorized") {
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error("Error fetching groups");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && !event.target.closest(".modal-2")) {
        setIsModalOpen(false);
      }
      if (isOpen && !event.target.closest(".menu-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen, isOpen]);

  const handleCreateGroup = async () => {
    if (!groupName || !password) {
      toast.error("Group Name va Password bo'sh bo'lishi mumkin emas!");
      return;
    }

    try {
      setLoading(true);
      const response = await API.createGroup({
        name: groupName,
        password: password
      });

      if (response?.id) {
        toast.success("Group yaratildi!");
        setIsModalOpen(false);
        setGroupName("");
        setPassword("");
        await fetchGroups();
        navigate(`/group/${response.id}`);
      } else {
        toast.error("Guruh yaratilmadi. Qaytadan urinib ko'ring");
      }
    } catch (error) {
      console.error("Create group error:", error);
      toast.error(error.message || "Guruh yaratishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await API.searchGroups(query);
      if (response) {
        setSearchResults(response);
      }
    } catch (error) {
      toast.error("Error searching groups");
    }
  };

  const handleJoinGroup = async () => {
    if (!selectedGroup || !joinPassword) {
      toast.error("Please enter the password");
      return;
    }

    try {
      setLoading(true);
      await API.joinGroup(selectedGroup.id, joinPassword);
      toast.success("Successfully joined the group!");
      setIsJoinModalOpen(false);
      setJoinPassword("");
      setSelectedGroup(null);
      fetchGroups();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error joining group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="groups-page">
      <div className="groups-header">
        <div className="groups-menu">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="groups-menu-btn"
          >
            <FiMessageCircle /> <span>Groups ▼</span>
          </button>

          <div className={`groups-dropdown ${isOpen ? "show" : ""}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className="groups-dropdown-item"
            >
              ➕ Create Group
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSearch("");
                setIsJoinModalOpen(true);
                setIsOpen(false);
              }}
              className="groups-dropdown-item"
            >
              🔍 Join Group
            </button>
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {isModalOpen && (
        <div className="modal-overlay-2" onClick={() => setIsModalOpen(false)}>
          <div className="modal-2" onClick={(e) => e.stopPropagation()}>
            <h2>Create Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <div className="modal-buttons-2">
              <button 
                className="btn-2" 
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn-2 primary-2" 
                onClick={handleCreateGroup}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {isJoinModalOpen && (
        <div className="modal-overlay-2" onClick={() => setIsJoinModalOpen(false)}>
          <div className="modal-2" onClick={(e) => e.stopPropagation()}>
            <h2>Join Group</h2>
            <input
              type="text"
              placeholder="Search groups..."
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <div className="search-results">
              {searchResults.map((group) => (
                <div
                  key={group.id}
                  className="search-result-item"
                  onClick={() => setSelectedGroup(group)}
                >
                  <h4>{group.name}</h4>
                  <span>Members: {group.membersCount || 0}</span>
                </div>
              ))}
            </div>
            {selectedGroup && (
              <>
                <h3>Join {selectedGroup.name}</h3>
                <input
                  type="password"
                  placeholder="Enter group password"
                  value={joinPassword}
                  onChange={(e) => setJoinPassword(e.target.value)}
                  disabled={loading}
                />
              </>
            )}
            <div className="modal-buttons-2">
              <button 
                className="btn-2" 
                onClick={() => {
                  setIsJoinModalOpen(false);
                  setSelectedGroup(null);
                  setJoinPassword("");
                }}
                disabled={loading}
              >
                Cancel
              </button>
              {selectedGroup && (
                <button 
                  className="btn-2 primary-2" 
                  onClick={handleJoinGroup}
                  disabled={loading || !joinPassword}
                >
                  {loading ? "Joining..." : "Join Group"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Groups List */}
      <div className="groups-list">
        {/* <h2>My Groups</h2> */}
        <div className="groups-grid">
          {groups.map((group) => (
            <div
              key={group.id}
              className="group-card"
              onClick={() => navigate(`/group/${group.id}`)}
            >
              <h3>{group.name}</h3>
              {/* <div className="group-meta">
                <span>Members: {group.membersCount || 0}</span>
                <span>Items: {group.itemsCount || 0}</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
