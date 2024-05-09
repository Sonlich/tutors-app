import React, {useState} from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LessonDialog from "./modal";
import dayjs from 'dayjs';

export const TutorCard = ({tutor}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const age = dayjs().diff(tutor.birthDate, 'year');

    return (
        <Card sx={{ maxWidth: 400, m: 2 }}>
            <CardMedia
                component="img"
                height="300"
                image={tutor.photo}
                alt="Tutor"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {tutor.firstName} {tutor.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    <PersonIcon fontSize="inherit" sx={{ verticalAlign: "middle", mr: 0.5 }} />
                    Age: {age}
                </Typography>
                {tutor.tutorSubject.map((subject) => (
                    <React.Fragment key={subject.id}>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            <ClassIcon fontSize="inherit" sx={{ verticalAlign: "middle", mr: 0.5 }} />
                            {subject.name} - Since {dayjs(subject.experienceSince).format('MMMM YYYY')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ pl: 3, mt: 0.5 }}>
                            <AttachMoneyIcon fontSize="inherit" sx={{ verticalAlign: "middle", mr: 0.5 }} />
                            {subject.pricePerLesson} ₴/lesson
                        </Typography>
                    </React.Fragment>
                ))}
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    {tutor.description}
                </Typography>
            </CardContent>
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleOpen} variant="contained"
                        sx={{ backgroundColor: 'var(--secondary-dark-color)',
                            '&:hover': { backgroundColor: 'var(--primary-element-color)' } }}>
                    Sign up for a lesson
                </Button>
            </CardContent>
            <LessonDialog open={open} onClose={handleClose} lessons={tutor.lessons} />
        </Card>
    )
}