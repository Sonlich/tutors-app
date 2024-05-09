import React, { useState } from 'react';
import {TextField, MenuItem, FormControl, InputLabel, Select, Button, Chip, OutlinedInput, Box} from '@mui/material';

const subjects = [
    "Mathematics", "Physics", "English", "German", "Chemistry", "Biology", "History",
    "Geography", "Computer Science", "Economics", "Business Studies", "Accounting",
];

const timeSlots = [
    "00:00-6:00", "6:00-12:00", "12:00-18:00", "18:00-24:00"
];

export const DefaultFilter = ({ setCriteria }) => {
    const initialFilterState = {
        subject: '',
        minPrice: '',
        maxPrice: '',
        timeSlots: []
    };

    const [filter, setFilter] = useState(initialFilterState);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const handleTimeSlotChange = (event) => {
        const value = event.target.value;
        setFilter(prev => ({ ...prev, timeSlots: typeof value === 'string' ? value.split(',') : value }));
    };

    const handleApplyFilter = () => {
        setCriteria(filter);
    };

    const handleResetFilter = () => {
        setFilter(initialFilterState);
        setCriteria(initialFilterState);
    };

    return (
        <div>
            <h1>Find your ideal tutor!</h1>
            <FormControl fullWidth margin="normal">
                <InputLabel>Subject</InputLabel>
                <Select
                    name="subject"
                    value={filter.subject}
                    label="Subject"
                    onChange={handleFilterChange}
                >
                    {subjects.map(subject => (
                        <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    name="minPrice"
                    label="Min Price (₴)"
                    type="number"
                    value={filter.minPrice}
                    onChange={handleFilterChange}
                    fullWidth
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    name="maxPrice"
                    label="Max Price (₴)"
                    type="number"
                    value={filter.maxPrice}
                    onChange={handleFilterChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Time Slot</InputLabel>
                <Select
                    name="timeSlots"
                    multiple
                    value={filter.timeSlots}
                    onChange={handleTimeSlotChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Time Slot" />}
                    renderValue={(selected) => (
                        <div>
                            {selected.map(value => (
                                <Chip key={value} label={value} />
                            ))}
                        </div>
                    )}
                >
                    {timeSlots.map(slot => (
                        <MenuItem key={slot} value={slot}>
                            {slot}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleApplyFilter}
                        sx={{ backgroundColor: 'var(--secondary-dark-color)',
                            '&:hover': { backgroundColor: 'var(--primary-element-color)' },
                            width: '200px'  // Set a static width
                        }}>
                    Apply
                </Button>
                <Button variant="contained" onClick={handleResetFilter}
                        sx={{ ml: 2, backgroundColor: 'var(--reset-element-color)',
                            '&:hover': { backgroundColor: 'var(--primary-element-color)' },
                            width: '200px'  // Set a static width
                        }}>
                    Reset
                </Button>
            </Box>
        </div>
    );
}