import React, { useState } from 'react';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const LessonDialog = ({ open, onClose, lessons, tutorSubjects, studentId = 8, tutorId}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });


    const availableLessons = lessons.filter(lesson =>
        dayjs(lesson.date).isAfter(dayjs().startOf('day')) && !lesson.accepted
    );

    const availableTimes = availableLessons.filter(lesson =>
        dayjs(selectedDate).isSame(dayjs(lesson.date), 'day')
    );

    const disablePastAndUnavailableDates = (date) => {
        return dayjs(date).isBefore(dayjs().startOf('day')) || !availableLessons.some(lesson =>
            dayjs(date).isSame(dayjs(lesson.date), 'day')
        );
    };

    const handleTimeSelection = (lesson) => {
        setSelectedTime(lesson.date);
        setSelectedSubject(null);
    };

    const handleConfirm = () => {
        const subject = tutorSubjects.find(sub => sub.name === selectedSubject);
        if (selectedTime && subject) {
            const lessonConfirmation = {
                date: selectedTime,
                studentId: studentId,
                tutorId: tutorId,
                subjectId: subject.id,
                accepted: false
            };
            console.log('Confirmed Lesson:', lessonConfirmation);
            setAlertInfo({
                show: true,
                message: `You have sent the request for lesson on ${dayjs(selectedTime).format('YYYY-MM-DD HH:mm')}`,
                severity: 'success'
            });
            setTimeout(handleClose, 500);
        } else {
            setAlertInfo({
                show: true,
                message: 'Please select a valid date, time, and subject.',
                severity: 'error'
            });
        }
    };

    const handleClose = () => {
        onClose();
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedSubject(null);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="lesson-dialog-title">
                <DialogTitle id="lesson-dialog-title">
                    Sign up for a lesson
                    <IconButton aria-label="close" onClick={handleClose} sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {selectedDate && !selectedTime ? (
                            <List component="nav" aria-label="available times">
                                {availableTimes.map((lesson, index) => (
                                    <ListItem button key={index} onClick={() => handleTimeSelection(lesson)}>
                                        <ListItemText primary={`${dayjs(lesson.date).format('HH:mm')} - ${dayjs(lesson.date).add(1, 'hour').format('HH:mm')}`} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : selectedTime && !selectedSubject ? (
                            <List component="nav" aria-label="select subject">
                                {tutorSubjects.map(subject => (
                                    <ListItem button key={subject.id} onClick={() => setSelectedSubject(subject.name)}>
                                        <ListItemText primary={subject.name} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <StaticDatePicker displayStaticWrapperAs="desktop" openTo="day" value={selectedDate}
                                              onChange={setSelectedDate} shouldDisableDate={disablePastAndUnavailableDates}
                                              minDate={dayjs().startOf('year')} maxDate={dayjs().add(1, 'year').endOf('year')} />
                        )}
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    {selectedDate && !selectedTime && (
                        <Button onClick={() => setSelectedDate(null)} color="primary">
                            Change Date
                        </Button>
                    )}
                    {selectedTime && (
                        <Button onClick={() => setSelectedTime(null)} color="primary">
                            Change Time
                        </Button>
                    )}
                    <Button onClick={handleConfirm} disabled={!selectedTime || !selectedSubject}>
                        Confirm the selected time and subject
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alertInfo.show} autoHideDuration={6000}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      onClose={() => setAlertInfo({ show: false, message: '', severity: 'info' })}>
                <Alert onClose={() => setAlertInfo({ show: false, message: '', severity: 'info' })}
                       severity={alertInfo.severity} variant="filled" sx={{ width: '100%' }}>
                    {alertInfo.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LessonDialog;
