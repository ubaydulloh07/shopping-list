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

API.login = async (credentials) => {
    try {
        const response = await API.post("/auth", credentials);
        return response.data;
    } catch (error) {
        throw new Error("Login xatolik yuz berdi");
    }
};

API.getMe = async () => {
    try {
        const response = await API.get("/");
        return response.data;
    } catch (error) {
        throw new Error("Foydalanuvchi ma'lumotlarini olishda xatolik");
    }
};


API.register = async (userData) => {
    try {
        const response = await API.post("/users", userData);
        return response.data;
    } catch (error) {
        throw new Error("Ro'yxatdan o'tishda xatolik");
    }
};

API.deleteUser = async () => {
    try {
        const response = await API.delete("/");
        return response.data;
    } catch (error) {
        throw new Error("Foydalanuvchini o'chirishda xatolik");
    }
};

API.searchUsers = async (query) => {
    try {
        const response = await API.get(`/users/search?q=${query}`);
        return response.data;
    } catch (error) {
        throw new Error("Foydalanuvchilarni qidirishda xatolik");
    }
};


API.getMyGroups = async () => {
    try {
        const response = await API.get("/groups");
        return response.data;
    } catch (error) {
        throw new Error("Guruhlarni olishda xatolik");
    }


};

API.getGroupById = async (groupId) => {
    try {
        const response = await API.get(`/groups/${groupId}`);
        return response.data;
    } catch (error) {
        console.error("Get group error:", error);

        
        throw new Error("Guruh ma'lumotlarini olishda xatolik");
    }
};

API.createGroup = async (data) => {
    try {
        const response = await API.post("/groups", {
            name: data.name,
            password: data.password
        });
        return response.data;
    } catch (error) {
        console.error("Create group error:", error);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Guruh yaratishda xatolik yuz berdi");
    }
};

API.deleteGroup = async (groupId) => {
    try {
        const response = await API.delete(`/groups/:${groupId}`);
        return response.data;
    } catch (error) {
        throw new Error("Guruhni o'chirishda xatolik");
    }
};

API.addMember = async (groupId, memberId) => {
    try {
        const response = await API.post(`/groups/:${groupId}/members`, {
            memberId: memberId
        });
        return response.data;
    } catch (error) {
        console.error("Add member error:", error);
        throw new Error("A'zoni qo'shishda xatolik");
    }
};

API.removeMember = async (groupId, memberId) => {
    try {
        const response = await API.delete(`/groups/:${groupId}/members/:${memberId}`);
        return response.data;
    } catch (error) {
        throw new Error("A'zoni o'chirishda xatolik");
    }
};

API.joinGroup = async (groupId, password) => {
    try {
        const response = await API.post(`/groups/:${groupId}/join`, {
            password: password
        });
        return response.data;
    } catch (error) {
        throw new Error("Guruhga qo'shilishda xatolik");
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
    try {
        const response = await API.post(`/groups/:${groupId}/leave`);
        return response.data;
    } catch (error) {
        throw new Error("Guruhdan chiqishda xatolik");
    }
};

API.searchGroups = async (query) => {
    try {
        const response = await API.get(`/groups/search?q=${query}`);
        return response.data;
    } catch (error) {
        throw new Error("Guruhlarni qidirishda xatolik");
    }
};

API.createGroupItem = async ( data) => {
    try {
        const response = await API.post(`/groups`, data);
        return response.data;
    } catch (error) {
        console.error("Create item error:", error);
        throw new Error("Item qo'shishda xatolik");
    }
};

API.getGroupItems = async (groupId) => {
    try {
        const response = await API.get(`/groups`);
        return response.data;
    } catch (error) {
        throw new Error("Itemlarni olishda xatolik");
    }
};

API.deleteGroupItem = async (groupId, itemId) => {
    try {
        const response = await API.delete(`/groups`);
        return response.data;
    } catch (error) {
        throw new Error("Itemni o'chirishda xatolik");
    }
};

API.getGroupMembers = async (groupId) => {
    try {
        const response = await API.get(`/groups/:${groupId}/members`);
        return response.data;
    } catch (error) {
        throw new Error("A'zolarni olishda xatolik");
    }
};


const functionsToRemove = ['addMemberToGroup', 'deleteGroup', 'leaveGroup', 'removeMemberFromGroup'];


export default API;


