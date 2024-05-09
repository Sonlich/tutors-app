import React, { useState } from 'react';
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import {
    TextField, Button, FormControl, Grid, Typography, Container, Select, MenuItem, InputLabel
} from '@mui/material'
import {PasswordField} from "../login-forms";

const registrationValidationSchema = yup.object({
    firstName: yup.string('Enter your first name').required('First name is required'),
    lastName: yup.string('Enter your last name').required('Last name is required'),
    birthDate: yup.date('Enter your birth date').required('Birth date is required').nullable(),
    description: yup.string('Enter your description').required('Description is required'),
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').required('Password is required'),
    role: yup.string('Select your role').required('Role is required'),
});

export const RegistrationForm = () => {
    const [role, setRole] = useState('student');


    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '95vh' }}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    description: '',
                    email: '',
                    password: '',
                    role: 'student',
                }}
                validationSchema={registrationValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors, values, getFieldProps }) => (

                    <Form onSubmit={handleSubmit} noValidate>
                        <h1>Register</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                    <InputLabel id="role-select-label">Register as</InputLabel>
                                    <Select
                                        labelId="role-select-label"
                                        id="role"
                                        name="Register as"
                                        value={values.role}
                                        label="Register as"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.role && Boolean(errors.role)}
                                        {...getFieldProps('role')}
                                    >
                                        <MenuItem value="student">Student</MenuItem>
                                        <MenuItem value="teacher">Tutor</MenuItem>
                                    </Select>
                                    {touched.role && errors.role && (
                                        <Typography variant="caption" display="block" color="error" sx={{ mt: 1, ml: 1.5 }}>
                                            {errors.role}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="birthDate"
                                    name="birthDate"
                                    label="Birth Date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.birthDate && Boolean(errors.birthDate)}
                                    helperText={touched.birthDate && errors.birthDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordField />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    fullWidth
                                    sx={{ backgroundColor: 'var(--secondary-dark-color)', '&:hover': { backgroundColor: 'var(--primary-element-color)' } }}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
