import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const LessonDialog = ({ open, onClose, lessons }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

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
        if (selectedTime === newSelectedTime) {
            setSelectedTime(null);
        } else {
            setSelectedTime(newSelectedTime);
        }
    };

    const isTimeValid = () => {
        return selectedTime && availableTimes.some(time =>
            dayjs(selectedTime).isSame(dayjs(time.date + 'T' + time.startTime), 'minute')
        );
    };

    const handleConfirm = () => {
        if (selectedTime && isTimeValid()) {
            alert(`You have confirmed the lesson on: ${dayjs(selectedTime).format('YYYY-MM-DD HH:mm')}`);
            handleClose();
        } else {
            alert('Please select a valid date and time.');
        }
    };

    const handleClose = () => {
        onClose();
        setSelectedDate(null);
        setSelectedTime(null);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="lesson-dialog-title">
            <DialogTitle id="lesson-dialog-title">
                Sign up for a lesson
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {selectedDate ? (
                        <List component="nav" aria-label="available times">
                            {availableTimes.map((lesson, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    selected={selectedTime === dayjs(lesson.date + 'T' + lesson.startTime).toISOString()}
                                    onClick={() => handleTimeSelection(lesson)}
                                >
                                    <ListItemText primary={`${lesson.startTime} - ${lesson.endTime}`} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            value={selectedDate}
                            onChange={setSelectedDate}
                            shouldDisableDate={disablePastAndUnavailableDates}
                            minDate={dayjs().startOf('year')}
                            maxDate={dayjs().add(1, 'year').endOf('year')}
                            ampm={false}  // 24-hour format
                            showToolbar={false}
                        />
                    )}
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                {selectedDate && (
                    <Button onClick={() => setSelectedDate(null)} color="primary">
                        Change Date
                    </Button>
                )}
                <Button
                    onClick={handleConfirm}
                    disabled={!isTimeValid()}
                >
                    Confirm the selected time
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LessonDialog;
