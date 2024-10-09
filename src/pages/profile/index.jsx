import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { users, subjects } from '../../mockData';
import ProfileCard from "../../components/cards/profile-card";
import { Route, Routes } from "react-router-dom";
import { EditProfilePage } from "./edit/profile";
import { EditSubjectsPage } from "./edit/subjects";

export const ProfilePages = () => {
    const userId = 8;
    const [user, setUser] = useState(null);
    const [subList, setSubList] = useState([]);

    useEffect(() => {
        const fetchUser = () => {
            const foundUser = users.find(user => user.id === userId);
            const foundSubjects = subjects.filter(subject => subject.tutorId === userId);
            setUser(foundUser);
            setSubList(foundSubjects);
        };

        fetchUser();
    }, [userId]);

    return (
        <Routes>
            <Route path='/' element={<ProfilePage user={user} subjects={subList}/>} />
            <Route path='editProfile' element={<EditProfilePage user={user}  />} />
            <Route path='editSubjects' element={<EditSubjectsPage user={user} subjects={subList} />} />
        </Routes>
    );
};

const ProfilePage = ({ user, subjects }) => {
    return (
        <>
            {user ? (
                <ProfileCard user={user} subjects={subjects}/>
            ) : (
                <Typography color="error">User not found.</Typography>
            )}
        </>
    )
}