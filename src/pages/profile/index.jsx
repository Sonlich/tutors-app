import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { users } from '../../mockData';

export const ProfilePage = () => {
    const userId = 1;
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const response = await fetch(`/api/users/${userId}`);
    //         const data = await response.json();
    //         setUser(data);
    //     };
    //
    //     fetchUser();
    // }, [userId]);

    useEffect(() => {
        const fetchUser = () => {
            const foundUser = users.find(user => user.id === userId);
            setUser(foundUser);
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Error</div>;
    }

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Avatar src={user.photo} sx={{ width: 100, height: 100, mb: 2 }} />
                        <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
                        <Typography variant="body1" color="text.secondary">{user.description}</Typography>
                        <Typography variant="body2" color="text.secondary">Birthdate: {new Date(user.birthDate).toLocaleDateString()}</Typography>
                        <Typography variant="body2" color="text.secondary">Email: {user.email}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">Subjects:</Typography>
                        <List>
                            {user.tutorSubject.map(subject => (
                                <ListItem key={subject.id}>
                                    <ListItemText primary={subject.name} secondary={`$${subject.pricePerLesson}/lesson - Since ${new Date(subject.experienceSince).getFullYear()}`} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
