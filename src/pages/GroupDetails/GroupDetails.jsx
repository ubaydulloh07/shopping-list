import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/API";
import { toast } from "sonner";
import "./GroupDetails.css";
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([]);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroupDetails();
  }, [id]);

  const fetchGroupDetails = async () => {
    try {
      setLoading(true);
      const groupResponse = await API.getGroupById(id);

      if (groupResponse?.data) {
        setGroup(groupResponse.data);
        setMembers(groupResponse.data.members || []);
        setItems(groupResponse.data.items || []);
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
      await API.createGroupItem(id, { title: newItemTitle });
      setNewItemTitle("");
      fetchGroupDetails();
      toast.success("Item qo'shildi");
    } catch (error) {
      toast.error("Item qo'shishda xatolik");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="group-details">
      <div className="group-details-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <FiArrowLeft /> Back
        </button>
        <h1>{group?.name || "Loading..."}</h1>
      </div>

      <div className="group-content">
        <div className="items-section">
          <h2>Items <span className="count">{items.length}</span></h2>
          <form onSubmit={handleAddItem} className="add-item">
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
                  {member.username?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="member-info">
                  <h3>{member.username}</h3>
                  <p>{member.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 