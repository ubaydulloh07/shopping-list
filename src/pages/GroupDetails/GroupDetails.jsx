import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from "../../utils/API";
import { toast } from "sonner";
import "./GroupDetails.css";
import { FiPlus, FiArrowLeft, FiUserPlus, FiUserMinus, FiTrash2, FiLogOut, FiMoreVertical } from "react-icons/fi";


export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([]);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [newMemberId, setNewMemberId] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchGroupDetails();
  }, [id]);

  const fetchGroupDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/groups/${id}`);
      if (response?.data) {
        setGroup(response.data);
        setMembers(response.data.members || []);
        setItems(response.data.items || []);
        setIsOwner(response.data.createdBy === localStorage.getItem('userId'));
      }
    } catch (error) {
      console.error("Error fetching group details:", error);
      toast.error("Guruh ma'lumotlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    try {
      const response = await API.post(`/groups/${id}/items`, { title: newItemTitle });
      if (response?.data) {
        setNewItemTitle("");
        toast.success("Item qo'shildi");
        fetchGroupDetails();
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Item qo'shishda xatolik");
    }
  };

  const handleAddMember = async () => {
    if (!newMemberId.trim()) {
      toast.error("A'zo ID'sini kiriting");
      return;
    }

    try {
      const response = await API.post(`/groups/${id}/members`, { userId: newMemberId });
      if (response?.data) {
        toast.success('A\'zo guruhga qo\'shildi');
        setShowAddMemberModal(false);
        setNewMemberId('');
        fetchGroupDetails();
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error('A\'zoni qo\'shishda xatolik yuz berdi');
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await API.delete(`/groups/${id}/members/${memberId}`);
      if (response?.data) {
        toast.success('A\'zo guruhdan chiqarildi');
        fetchGroupDetails();
      }
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error('A\'zoni chiqarishda xatolik yuz berdi');
    }
  };

  const handleDeleteGroup = async () => {
    if (window.confirm('Guruhni o\'chirishni xohlaysizmi?')) {
      try {
        const response = await API.delete(`/groups/${id}`);
        if (response?.data) {
          toast.success('Guruh o\'chirildi');
          navigate('/groups');
        }
      } catch (error) {
        console.error("Error deleting group:", error);
        toast.error('Guruhni o\'chirishda xatolik yuz berdi');
      }
    }
  };

  const handleLeaveGroup = async () => {
    if (window.confirm('Guruhdan chiqishni xohlaysizmi?')) {
      try {
        const response = await API.delete(`/groups/${id}/leave`);
        if (response?.data) {
          toast.success('Guruhdan chiqdingiz');
          navigate('/groups');
        }
      } catch (error) {
        console.error("Error leaving group:", error);
        toast.error('Guruhdan chiqishda xatolik yuz berdi');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="group-details">
      <div className="group-header">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate("/")}>
            <FiArrowLeft /> Back
          </button>
          <h1>{group?.name || "Group Name"}</h1>
        </div>
        <div className="owner-info">
          <div className="owner-avatar">U</div>
          <span>Owner: {group?.owner?.username || "Ubaydulloh"}</span>
          <div className="menu-wrapper">
            <FiMoreVertical className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <div className="menu-dropdown">
                {isOwner && <button onClick={() => setShowAddMemberModal(true)}>Add member</button>}
                {isOwner && <button onClick={handleDeleteGroup}>Delete Group</button>}
                {!isOwner && <button onClick={handleLeaveGroup}>Leave Group</button>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="group-content">
        <div className="items-section">
          <div className="section-header">
            <h2>Items <span className="count">{items.length}</span></h2>
            <form onSubmit={handleAddItem} className="add-item-form">
              <input
                type="text"
                placeholder="Title"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
              />
              <button type="submit">
                <FiPlus />
              </button>
            </form>
          </div>
          <div className="items-list">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="members-section">
          <h2>Members <span className="count">{members.length}</span></h2>
          <div className="members-list">
            {members.map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-avatar">
                  {member.username?.[0]?.toUpperCase()}
                </div>
                <div className="member-info">
                  <h3>{member.username}</h3>
                  <p>{member.username}</p>
                </div>
                {isOwner && member.id !== group.createdBy && (
                  <button className="remove-button" onClick={() => handleRemoveMember(member.id)}>
                    <FiUserMinus />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddMemberModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>A'zo qo'shish</h2>
            <input
              type="text"
              placeholder="A'zo ID'sini kiriting"
              value={newMemberId}
              onChange={(e) => setNewMemberId(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddMember}>Qo'shish</button>
              <button onClick={() => setShowAddMemberModal(false)}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 