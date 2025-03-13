import { useState } from "react";
import "./group.css";
import { FiMessageCircle } from "react-icons/fi";

 function Group() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="group-container">
    
      <button onClick={() => setIsOpen(!isOpen)} className="group-btn">
      <FiMessageCircle /> <span>Groups ▼</span>
      </button>

      
      <div className={`dropdown ${isOpen ? "show" : ""}`}>
        <button onClick={() => setIsModalOpen(true)} className="dropdown-item">
          ➕ Create Group
        </button>
      </div>

   
      <div className={`modal-overlay ${isModalOpen ? "show" : ""}`}>
        <div className="modal">
          <h2>Create Group</h2>
          <input type="text" placeholder="Group Name" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <div className="modal-buttons">
            <button className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="btn primary">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Group;
