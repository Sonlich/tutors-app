import React, {useState} from 'react';
import {
    Autocomplete,
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography
} from '@mui/material';

const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) => `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${index % 2 === 0 ? "00" : "30"}`
);

export default function WorkHours() {
    const [selectedDays, setSelectedDays] = useState({});

    const handleCheck = (day) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: !prev[day] ? {startTime: '10:00', endTime: '19:00'} : undefined
        }));
    };

    const handleTimeChange = (day, newValue, isStartTime) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                ...(isStartTime ? {startTime: newValue} : {endTime: newValue})
            }
        }));
    };

    const filteredTimeSlots = (day, isStartTime) => {
        if (!selectedDays[day]) return timeSlots;
        const {startTime, endTime} = selectedDays[day];
        return timeSlots.filter(time => {
            if (isStartTime) {
                return time < endTime;
            } else {
                return time > startTime;
            }
        });
    };

    return (
        <Container maxWidth="sm"
                   sx={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{width: '100%', maxWidth: 600, bgcolor: 'background.paper'}}>
                <Typography variant="h5" gutterBottom sx={{textAlign: 'center', mb: 3}}>
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
                                    label={<Typography sx={{fontSize: '1rem'}}>{day}</Typography>}
                                    sx={{marginRight: 4}}
                                />
                                {selectedDays[day] && (
                                    <>
                                        <Autocomplete
                                            value={selectedDays[day].startTime}
                                            options={filteredTimeSlots(day, true)}
                                            onChange={(event, newValue) => handleTimeChange(day, newValue, true)}
                                            disableClearable
                                            sx={{width: 180, mr: 2}}
                                            renderInput={(params) => <TextField {...params} label="Start time"/>}
                                        />
                                        <Autocomplete
                                            value={selectedDays[day].endTime}
                                            options={filteredTimeSlots(day, false)}
                                            onChange={(event, newValue) => handleTimeChange(day, newValue, false)}
                                            disableClearable
                                            sx={{width: 180}}
                                            renderInput={(params) => <TextField {...params} label="End time"/>}
                                        />
                                    </>
                                )}
                            </FormGroup>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
