
// import { useQuery } from '@tanstack/react-query';
// import API from '../utils/API';


// const searchGroup = async (searchText) => {
 
//     if(!searchText  || searchText.length === 2) return [];

//     const {data} = await API.get(`/groups/search?q=${searchText}`);
//     return data;
    
// };



// const useGroups = (searchText) => {

//  const {data: groups , isLoading: groupsLoading , error: groupsError}  = useQuery( {
//     queryKey: searchText.length > 0 ? ['search', searchText] : ['groups'] ,


//     queryFn: () => searchGroup(searchText),
//     enabled: searchText.length > 0
//  })

//  return {groups , groupsLoading , groupsError}
// }

// export default useGroups;





import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import API from "../utils/API";

const searchGroup = async (searchText) => {
  if (!searchText || searchText.length < 3) return [];
  const { data } = await API.get(`/groups/search?q=${searchText}`);
  return data;
};

const joinGroup = async (groupId, password) => {
  try {
    const response = await API.post(`/groups/${groupId}/join`, { password });
    return response.data;
  } catch (error) {
    console.error("Join error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to join group");
  }
};

const useGroups = (searchText) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [password, setPassword] = useState("");
  const [joinError, setJoinError] = useState(null);

  const { data: groups, isLoading: groupsLoading, error: groupsError } = useQuery({
    queryKey: searchText.length > 0 ? ["search", searchText] : ["groups"],
    queryFn: () => searchGroup(searchText),
    enabled: searchText.length > 0,
  });

  const openModal = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPassword("");
    setJoinError(null);
  };

  const handleJoinGroup = async () => {
    if (!selectedGroup || !password) return;

    try {
      await joinGroup(selectedGroup.id, password);
      alert("Successfully joined the group!");
      closeModal();
    } catch (error) {
      setJoinError(error.message);
    }
  };

  return {
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
  };
};

export default useGroups;
