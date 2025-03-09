

import { toast } from "sonner";
import API from "../utils/API";


import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";



const login = async ({
    username,
    password
}) => {

    const response = await API.post('/auth' , {
        username,
        password

    })
 return response ;


};


const register = async ({
    username,
    password ,
    name
}) => {

    const response = await API.post('/users' , {
        username,
        password ,
        name

    })
 return response ;


};


const logout = async () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};


const useAuth = () => {
    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            localStorage.setItem('token' , data.data.token);
            localStorage.setItem('user' , JSON.stringify(data.data.user));
            navigate('/');
            toast.success('Login successful');
        } ,
        onError: (error) => {
            toast.error('Login failed');
        }
    });


    const  registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            localStorage.setItem('token' , data.data.token);
             localStorage.setItem('user' , JSON.stringify(data.data.user));
            navigate('/');
            toast.success('Register successful');
        } ,
        onError: (error) => {
            toast.error('Register failed');
        }
    });
    return {
        loginMutation ,
        registerMutation,
        logout
    }

};

export default useAuth ; 