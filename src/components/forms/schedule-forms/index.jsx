import React, { useState, useEffect } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);

const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const timeSlots = Array.from({ length: 24 }, (_, index) => `${index < 10 ? "0" : ""}${index}:00`);

export default function WorkHours({ tutorId = 2 }) {
    const [selectedDays, setSelectedDays] = useState({});
    const [lessons, setLessons] = useState([]);

    const handleCheck = (day) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: !prev[day] ? { startTime: '09:00', endTime: '18:00' } : undefined
        }));
    };

    const handleTimeChange = (day, newValue, isStartTime) => {
        if (selectedDays[day]) {
            setSelectedDays(prev => ({
                ...prev,
                [day]: {
                    ...prev[day],
                    ...(isStartTime ? { startTime: newValue } : { endTime: newValue })
                }
            }));
        }
    };

    const filteredTimeSlots = (day, isStartTime) => {
        if (!selectedDays[day]) return timeSlots;
        const { startTime, endTime } = selectedDays[day];
        return timeSlots.filter(time => isStartTime ? time < endTime : time > startTime);
    };

    useEffect(() => {
        const newLessons = [];
        Object.keys(selectedDays).forEach(day => {
            const dayConfig = selectedDays[day];
            if (dayConfig) {
                const startIndex = timeSlots.indexOf(dayConfig.startTime);
                const endIndex = timeSlots.indexOf(dayConfig.endTime) - 1;

                for (let index = startIndex; index <= endIndex; index++) {
                    for (let weekOffset = 0; weekOffset <= 4; weekOffset++) {
                        const date = dayjs().add(weekOffset, 'week').day(daysOfWeek.indexOf(day)).hour(index).minute(0).second(0);
                        if (date.isAfter(dayjs())) {
                            newLessons.push({
                                date: date.format('YYYY-MM-DDTHH:mm'),
                                studentId: null,
                                tutorId: tutorId,
                                subjectId: null,
                                accepted: false
                            });
                        }
                    }
                }
            }
        });
        setLessons(newLessons);
    }, [selectedDays, tutorId]);

    const handleConfirmSchedule = () => {
        console.log(lessons);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, display: 'flex',  alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                    Work hours
                </Typography>
                <Grid container spacing={2}>
                    {daysOfWeek.map(day => (
                        <Grid item xs={12} key={day}>
                            <FormGroup row alignItems="center" justifyContent="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!selectedDays[day]}
                                            onChange={() => handleCheck(day)}
                                        />
                                    }
                                    label={<Typography sx={{ fontSize: '1rem' }}>{day}</Typography>}
                                    sx={{ marginRight: 4, width: 120, height: 60 }}
                                />
                                {selectedDays[day] && (
                                    <>
                                        <Autocomplete
                                            value={selectedDays[day].startTime}
                                            options={filteredTimeSlots(day, true)}
                                            onChange={(event, newValue) => handleTimeChange(day, newValue, true)}
                                            disableClearable
                                            sx={{ width: 180, mr: 2 }}
                                            renderInput={(params) => <TextField {...params} label="Start time" />}
                                        />
                                        <Autocomplete
                                            value={selectedDays[day].endTime}
                                            options={filteredTimeSlots(day, false)}
                                            onChange={(event, newValue) => handleTimeChange(day, newValue, false)}
                                            disableClearable
                                            sx={{ width: 180 }}
                                            renderInput={(params) => <TextField {...params} label="End time" />}
                                        />
                                    </>
                                )}
                            </FormGroup>
                        </Grid>
                    ))}
                </Grid>
                <Button
                    onClick={handleConfirmSchedule}
                    variant="contained"
                    type="submit"
                    sx={{
                        mt: 3,
                        mb: 3,
                        maxWidth: 200,
                        backgroundColor: 'var(--secondary-dark-color)',
                        '&:hover': { backgroundColor: 'var(--primary-element-color)' }
                    }}>
                    Confirm Schedule
                </Button>
            </Box>
        </Container>
    );
}
