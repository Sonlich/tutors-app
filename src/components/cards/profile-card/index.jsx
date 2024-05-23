import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import TodayIcon from "@mui/icons-material/Today";
import ClassIcon from "@mui/icons-material/Class";
import CallIcon from "@mui/icons-material/Call";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import dayjs from "dayjs";
import ConfirmationDeletionDialog from "./modal";
import {NavLink} from "react-router-dom";

const ProfileCard = ({user}) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleConfirmDeletion = () => {
        // onDelete(user.id);
        handleCloseModal();
    };

    if (!user) {
        return <div>Error</div>;
    }

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} mt={6} mb={6}>
                <Card>
                    <CardContent>
                        <Avatar src={user.photo} sx={{width: 100, height: 100, mb: 2}}/>
                        <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
                        <Typography variant="body1" color="text.secondary">{user.description}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            <TodayIcon fontSize="inherit" sx={{verticalAlign: "middle", mr: 0.5}}/>
                            Birthdate: {new Date(user.birthDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <AlternateEmailIcon fontSize="inherit" sx={{verticalAlign: "middle", mr: 0.5}}/>
                            Email: {user.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <CallIcon fontSize="inherit" sx={{verticalAlign: "middle", mr: 0.5}}/>
                            Contact: {user.contact}
                        </Typography>
                        {user.role === 'tutor' && (
                            <>
                                <Divider sx={{my: 2}}/>
                                <Typography variant="h6">Subjects:</Typography>
                                <List>
                                    {user.tutorSubject.map(subject => (
                                        <ListItem key={subject.id}>
                                            <ClassIcon fontSize="inherit" sx={{verticalAlign: "middle", mr: 0.5}}/>
                                            <ListItemText primary={subject.name}
                                                          secondary={`$${subject.pricePerLesson}/lesson - Since ${dayjs(subject.experienceSince).format('MMMM YYYY')}`}/>
                                        </ListItem>
                                    ))}
                                </List>
                                <Button variant="contained"
                                        sx={{
                                            mt: 2, backgroundColor: 'var(--secondary-dark-color)',
                                            '&:hover': {backgroundColor: 'var(--primary-element-color)'}
                                        }}
                                        component={NavLink} to="/profile/editSubjects">
                                    Edit/Add Subjects
                                </Button>
                            </>
                        )}
                        <Divider sx={{my: 2}}/>
                        <Button variant="contained"
                                sx={{
                                    mt: 2, backgroundColor: 'var(--secondary-dark-color)',
                                    '&:hover': {backgroundColor: 'var(--primary-element-color)'}
                                }}
                                component={NavLink} to="/profile/editProfile"
                        >
                            Edit Profile
                        </Button>
                        <Button variant="contained"
                                sx={{
                                    mt: 2, ml: 2, backgroundColor: 'var( --cancel-element-color)',
                                    '&:hover': {backgroundColor: 'var(--cancel-secondary-color)'}
                                }}
                                onClick={handleOpenModal}
                        >
                            Delete Profile
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <ConfirmationDeletionDialog open={openModal} onClose={handleCloseModal} onConfirm={handleConfirmDeletion}/>
        </Grid>
    );
};

export default ProfileCard;