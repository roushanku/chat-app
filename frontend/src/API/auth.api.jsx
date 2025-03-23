import axios from 'axios';
import React from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = "http://localhost:5000";
async function login(email, password) {
    try {
        
        console.log("Backend URL:", backendUrl);
        if (!backendUrl) {
            console.error("Backend URL is not defined.");
            toast.error("Configuration error: Backend URL missing.");
            return;
        }

        const response = await axios.post(`${backendUrl}/api/v1/auth/login`, 
            { email, password }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        console.error("Login failed:", error);
        toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
}

async function logout() {
    try {
        const backendUrl = "http://localhost:5000";
        console.log("Backend URL:", backendUrl);

        const response = await axios.post(`${backendUrl}/api/v1/auth/logout`, 
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        console.error("Logout failed:", error);
        toast.error(error.response?.data?.message || "Logout failed. Please try again.");
    }
}

async function getuserDetails(userId) {
    try{
        const response = await axios.get(`${backendUrl}/api/v1/auth/getUserdetails/?userId=${userId}`, {
            withCredentials: true,
        });
        console.log("response from getuserDetails" , response.data);
        return response;
    }
    catch(error) {
        console.error("Failed to get user details:", error);
        toast.error(error.response?.data?.message || "Failed to get user details.");
    }
}

export { login , logout , getuserDetails};
