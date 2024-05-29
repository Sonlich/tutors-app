import React, {useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import {users} from '../../mockData';
import ProfileCard from "../../components/cards/profile-card";
import {Route, Routes} from "react-router-dom";
import {EditProfilePage} from "./edit/profile";
import {EditSubjectsPage} from "./edit/subjects";

export const ProfilePages = () => {
    return (
        <Routes>
            <Route path='/' element={<ProfilePage/>}/>
            <Route path='editProfile' element={<EditProfilePage/>}/>
            <Route path='editSubjects' element={<EditSubjectsPage/>}/>
        </Routes>
    )
}

const ProfilePage = () => {
    const userId = 8;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = () => {
            const foundUser = users.find(user => user.id === userId);
            setUser(foundUser);
        };

        fetchUser();
    }, [userId]);

    return (
        <>
            {user ? (
                <ProfileCard user={user}/>
            ) : (
                <Typography color="error">User not found.</Typography>
            )}
        </>
    );
};