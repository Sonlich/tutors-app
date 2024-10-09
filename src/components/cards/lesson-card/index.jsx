import React, {useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import ConfirmationDialog from './modal';
import TodayIcon from '@mui/icons-material/Today';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import dayjs from 'dayjs';

const LessonCard = ({lesson, onAccept, onCancel, showAcceptButton}) => {
    const [openModal, setOpenModal] = useState(false);

    const formattedDate = dayjs(lesson.date).format('dddd, D MMMM HH:mm');
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleConfirmCancel = () => {
        onCancel(lesson.id);
        handleCloseModal();
    };

    return (
        <>
            <Card sx={{mb: 2}}>
                <CardContent sx={{
                    m: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '40px',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Typography variant="h6" sx={{textAlign: 'center', flex: 1}}>
                        <PersonIcon fontSize="inherit" sx={{verticalAlign: "middle", mr: 0.5}}/>
                        {lesson.role.charAt(0).toUpperCase() + lesson.role.slice(1)} <br/>
                        {lesson.userNameSurname} <br/>
                        {lesson.age} years
                    </Typography>
                    <Typography color="textSecondary" sx={{textAlign: 'center'}}>
                        <TodayIcon fontSize="inherit" sx={{verticalAlign: "middle", mr: 0.5}}/>
                        Date <br/>
                        {formattedDate}
                    </Typography>
                    <Typography color="textSecondary" sx={{textAlign: 'center'}}>
                        <ClassIcon fontSize="inherit" sx={{verticalAlign: "middle", mr: 0.5}}/>
                        Subject <br/>
                        {lesson.subject}
                    </Typography>
                    <Typography color="textSecondary" sx={{textAlign: 'center'}}>
                        <CallIcon fontSize="inherit" sx={{verticalAlign: "middle", mr: 0.5}}/>
                        Contact <br/>
                        {lesson.contact}
                    </Typography>
                    <Grid container spacing={2} flex={1} display={'flex'} flexDirection={'column'}
                          alignItems={'center'}>
                        {showAcceptButton && (
                            <Grid item>
                                <Button variant="contained"
                                        sx={{
                                            backgroundColor: 'var(--secondary-dark-color)',
                                            '&:hover': {backgroundColor: 'var(--primary-element-color)'}
                                        }}
                                        onClick={() => onAccept(lesson.id)}>
                                    Accept
                                </Button>
                            </Grid>
                        )}
                        <Grid item>
                            <Button variant="contained"
                                    sx={{
                                        backgroundColor: 'var( --cancel-element-color)',
                                        '&:hover': {backgroundColor: 'var(--cancel-secondary-color)'}
                                    }}
                                    onClick={handleOpenModal}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <ConfirmationDialog open={openModal} onClose={handleCloseModal} onConfirm={handleConfirmCancel}/>
        </>
    );
};

export default LessonCard;
