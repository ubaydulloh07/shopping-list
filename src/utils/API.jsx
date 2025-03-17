import axios from "axios";

const API = axios.create({
    baseURL: "https://nt-shopping-list.onrender.com/api"
})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers['x-auth-token'] = `${localStorage.getItem('token')}`
    }
    return req
});
API.interceptors.response.use((res) => {


    
    return res
}, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return Promise.reject(error)
})

// Add methods directly to API object
API.login = async (credentials) => {
    const response = await API.post("/auth", credentials);
    return response.data;
};

API.getMe = async () => {
    const response = await API.get("/");
    return response.data;
};

API.register = async (userData) => {
    const response = await API.post("/users", userData);
    return response.data;
};

API.deleteUser = async () => {
    const response = await API.delete("/");
    return response.data;
};

API.searchUsers = async (query) => {
    const response = await API.get(`/search?q=${query}`);
    return response.data;
};

API.getMyGroups = async () => {
    try {
        const response = await API.get("/groups");
        return response.data;
    } catch (error) {
        console.error("Get groups error:", error.response?.data || error.message);
        throw error;
    }
};

API.getGroupById = async (groupId) => {
    try {
        const response = await API.get(`/groups/${groupId}`);
        return response.data;
    } catch (error) {
        console.error("Get group error:", error.response?.data || error.message);
        throw error;
    }
};

API.createGroup = async (data) => {
    try {
        const response = await API.post("/groups/create", {
            name: data.name,
            password: data.password
        });
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Guruh yaratishda xatolik yuz berdi");
    }
};

API.deleteGroup = async (groupId) => {
    const response = await API.delete(`/groups/${groupId}`);
    return response.data;
};

API.addMember = async (groupId, memberId) => {
    const response = await API.post(`/groups/${groupId}/members`, { memberId });
    return response.data;
};

API.removeMember = async (groupId, memberId) => {
    const response = await API.delete(`/groups/${groupId}/members/${memberId}`);
    return response.data;
};

API.joinGroup = async (groupId, password) => {
    try {
        const response = await API.post(`/groups/join/${groupId}`, { password });
        return response.data;
    } catch (error) {
        console.error("Join group error:", error.response?.data || error.message);
        throw error;
    }
};

API.acceptInvitation = async (invitationId) => {
    try {
        const response = await API.post(`/invitations/${invitationId}/accept`);
        return response.data;
    } catch (error) {
        console.error("Accept invitation error:", error.response?.data || error.message);
        throw error;
    }
};

API.rejectInvitation = async (invitationId) => {
    try {
        const response = await API.post(`/invitations/${invitationId}/reject`);
        return response.data;
    } catch (error) {
        console.error("Reject invitation error:", error.response?.data || error.message);
        throw error;
    }
};

API.getInvitations = async () => {
    try {
        const response = await API.get('/invitations');
        return response.data;
    } catch (error) {
        console.error("Get invitations error:", error.response?.data || error.message);
        throw error;
    }
};

API.leaveGroup = async (groupId) => {
    const response = await API.post(`/groups/${groupId}/leave`);
    return response.data;
};

API.searchGroups = async (query) => {
    try {
        const response = await API.get(`/groups/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("Search groups error:", error.response?.data || error.message);
        throw error;
    }
};

API.createGroupItem = async (groupId, data) => {
    const response = await API.post(`/groups/${groupId}/items`, data);
    return response.data;
};

API.getGroupItems = async (groupId) => {
    const response = await API.get(`/groups/${groupId}/items`);
    return response.data;
};

API.deleteGroupItem = async (groupId, itemId) => {
    const response = await API.delete(`/groups/${groupId}/items/${itemId}`);
    return response.data;
};

API.getGroupMembers = async (groupId) => {
    const response = await API.get(`/groups/${groupId}/members`);
    return response.data;
};

export default API ;


