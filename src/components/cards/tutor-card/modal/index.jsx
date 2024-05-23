import React, {useState} from 'react';
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
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider, StaticDatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const LessonDialog = ({open, onClose, lessons, tutorSubjects}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [alertInfo, setAlertInfo] = useState({show: false, message: '', severity: 'info'});

    const availableTimes = lessons.filter(lesson =>
        dayjs(selectedDate).isSame(dayjs(lesson.date), 'day')
    );

    const disablePastAndUnavailableDates = (date) => {
        const today = dayjs().startOf('day');
        const dateIsPast = dayjs(date).isBefore(today);
        const dateHasLessons = lessons.some(lesson =>
            dayjs(date).isSame(dayjs(lesson.date), 'day')
        );
        return dateIsPast || !dateHasLessons;
    };

    const handleTimeSelection = (time) => {
        const newSelectedTime = dayjs(time.date + 'T' + time.startTime).toISOString();
        setSelectedTime(newSelectedTime === selectedTime ? null : newSelectedTime);
    };

    const isTimeValid = () => {
        return selectedTime && availableTimes.some(time =>
            dayjs(selectedTime).isSame(dayjs(time.date + 'T' + time.startTime), 'minute')
        );
    };

    const handleConfirm = () => {
        if (selectedTime && selectedSubject && isTimeValid()) {
            setTimeout(() => {
                setAlertInfo({
                    show: true,
                    message: `You have send request for the lesson on: ${dayjs(selectedTime).format('YYYY-MM-DD HH:mm')} for ${selectedSubject}`,
                    severity: 'success'
                });
            }, 500);
            handleClose();
        } else {
            setTimeout(() => {
                setAlertInfo({
                    show: true,
                    message: 'Please select a valid date, time, and subject.',
                    severity: 'error'
                });
            }, 500);
        }
    };

    const handleClose = () => {
        onClose(); // Perform necessary cleanup
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
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {selectedDate && !selectedTime ? (
                            <List component="nav" aria-label="available times">
                                {availableTimes.map((lesson, index) => (
                                    <ListItem button key={index}
                                              selected={selectedTime === dayjs(lesson.date + 'T' + lesson.startTime).toISOString()}
                                              onClick={() => handleTimeSelection(lesson)}>
                                        <ListItemText primary={`${lesson.startTime} - ${lesson.endTime}`}/>
                                    </ListItem>
                                ))}
                            </List>
                        ) : selectedTime ? (
                            <List component="nav" aria-label="select subject">
                                {tutorSubjects.map(subject => (
                                    <ListItem button key={subject.id} selected={selectedSubject === subject.name}
                                              onClick={() => setSelectedSubject(subject.name)}>
                                        <ListItemText primary={subject.name}/>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <StaticDatePicker displayStaticWrapperAs="desktop" openTo="day" value={selectedDate}
                                              onChange={setSelectedDate}
                                              shouldDisableDate={disablePastAndUnavailableDates}
                                              minDate={dayjs().startOf('year')}
                                              maxDate={dayjs().add(1, 'year').endOf('year')} ampm={false}
                                              showToolbar={false}/>
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
                    <Button onClick={handleConfirm} disabled={!isTimeValid() || !selectedSubject}>
                        Confirm the selected time and subject
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alertInfo.show} autoHideDuration={6000}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={() => setAlertInfo({show: false, message: '', severity: 'info'})}>
                <Alert onClose={() => setAlertInfo({show: false, message: '', severity: 'info'})}
                       severity={alertInfo.severity} variant="filled" sx={{width: '100%'}}>
                    {alertInfo.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LessonDialog;
