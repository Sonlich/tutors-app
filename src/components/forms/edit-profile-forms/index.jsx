import React, {useState} from 'react';
import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import {Avatar, Button, Container, Grid, TextField, Typography} from '@mui/material';
import {PasswordField} from "../login-forms";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {enUS} from 'date-fns/locale';
import dayjs from "dayjs";

const descriptionSchema = yup.string()
    .max(200, 'Description must be at most 200 characters');

export const EditProfileForm = ({ user }) => {
    const registrationValidationSchema = yup.object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        photo: user.role === 'student' ? yup.mixed().nullable() : yup.mixed().required('Profile photo is required for tutors'),
        description: user.role === 'student' ? descriptionSchema : descriptionSchema.required('Description is required'),
        birthDate: yup.date().max(new Date(), "Birth date must be in the past").required('Birth date is required'),
        contact: yup.string()
            .required('Contact is required')
            .matches(
                /^(\+\d{1,3}[- ]?)?\d{10}$/,
                'Contact number must be valid'
            ),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        oldPassword: yup.string()
            .required('Old password is required')
            .test('is-correct', 'Old password is incorrect', function (value) {
                return value === user.password;
            }),
        newPassword: yup.string()
            .min(6, 'Password should be minimum 6 characters')
            .matches(/\d/, 'Password should contain at least one number')
            .required('New password is required'),
    });

    const [photoPreview, setPhotoPreview] = useState(user.photo);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handlePasswordChangeClick = () => {
        setIsChangingPassword(!isChangingPassword);
    };

    console.log(user)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}>
            <Container component="main" maxWidth="xs" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                mt: 6
            }}>
                <Formik
                    initialValues={{
                        firstName: user.firstName || '',
                        lastName: user.lastName || '',
                        photo: user.photo || null,
                        description: user.description || '',
                        birthDate: user.birthDate || '',
                        contact: user.contact || '',
                        email: user.email || '',
                        oldPassword: '',
                        newPassword: '',
                    }}
                    validationSchema={registrationValidationSchema}
                    enableReinitialize={true}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log(values);
                        setSubmitting(false);
                    }}
                    validateOnMount
                >
                    {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          touched,
                          errors,
                          values,
                          setFieldValue,
                          setFieldTouched,
                      }) => {
                        const handlePhotoChange = (event) => {
                            if (event.target.files[0]) {
                                setFieldValue("photo", event.target.files[0]);
                                setPhotoPreview(URL.createObjectURL(event.target.files[0]));
                            }
                        };

                        const handleRemovePhoto = () => {
                            setFieldValue("photo", null);
                            setPhotoPreview(null);
                        };

                        return (
                            <Form onSubmit={handleSubmit} noValidate>
                                <h1>Edit Profile</h1>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        {photoPreview ? (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                marginBottom: '10px'
                                            }}>
                                                <Avatar src={photoPreview} alt="Profile Photo"
                                                        sx={{mb: 1, width: 70, height: 70}}/>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleRemovePhoto}
                                                    sx={{
                                                        mt: 1,
                                                        mb: 2,
                                                        backgroundColor: 'var( --cancel-element-color)',
                                                        '&:hover': {backgroundColor: 'var(--cancel-secondary-color)'}
                                                    }}
                                                >
                                                    Delete Photo
                                                </Button>
                                            </div>
                                        ) : (
                                            <Field>
                                                {({field}) => (
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        marginBottom: '10px'
                                                    }}>
                                                        <input
                                                            accept="image/*"
                                                            id="photo"
                                                            name="photo"
                                                            type="file"
                                                            hidden
                                                            onChange={handlePhotoChange}
                                                        />
                                                        <label htmlFor="photo">
                                                            <Button variant="contained" component="span"
                                                                    sx={{
                                                                        mb: 2,
                                                                        backgroundColor: 'var(--secondary-dark-color)',
                                                                        '&:hover': {backgroundColor: 'var(--primary-element-color)'}
                                                                    }}
                                                            >
                                                                Upload Profile Photo
                                                            </Button>
                                                        </label>
                                                        {touched.profilePhoto && errors.profilePhoto && (
                                                            <Typography variant="caption" display="block" color="error"
                                                                        sx={{mb: 1.5, mt: -0.5}}>
                                                                Profile photo is required
                                                            </Typography>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            value={values.firstName}
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
                                            value={values.lastName}
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
                                        <DesktopDatePicker
                                            label="Birth Date"
                                            inputFormat="DD/MM/YYYY"
                                            value={values.birthDate ? dayjs(values.birthDate, "YYYY-MM-DD").toDate() : null}
                                            onChange={date => {
                                                setFieldValue('birthDate', date ? dayjs(date).format("YYYY-MM-DD") : null);
                                                setFieldTouched('birthDate', true, false);
                                            }}
                                            sx={(theme) => ({
                                                width: '100%',
                                                ...(touched.birthDate && errors.birthDate && {
                                                    label: {
                                                        color: theme.palette.error.main,
                                                    },
                                                    fieldset: {
                                                        borderColor: theme.palette.error.main,
                                                    },
                                                }),
                                            })}
                                            maxDate={dayjs().subtract(4, 'year').toDate()}
                                        />
                                        {touched.birthDate && errors.birthDate && (
                                            <Typography variant="caption" display="block" color="error"
                                                        sx={{mt: 1, ml: 1.5}}>
                                                {errors.birthDate}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="description"
                                            name="description"
                                            value={values.description}
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
                                            id="contact"
                                            name="contact"
                                            value={values.contact}
                                            label="Contact"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.contact && Boolean(errors.contact)}
                                            helperText={touched.contact && errors.contact}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    {isChangingPassword ? (
                                        <>
                                            <Grid item xs={12}>
                                                <PasswordField name="oldPassword" label="Old Password"/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <PasswordField name="newPassword" label="New Password"/>
                                            </Grid>
                                        </>
                                    ) : null}
                                    <Grid item xs={12}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            fullWidth
                                            sx={isChangingPassword ?
                                                {
                                                    mb: 1.5,
                                                    backgroundColor: 'var( --cancel-element-color)',
                                                    '&:hover': {backgroundColor: 'var(--cancel-secondary-color)'}
                                                } :
                                                {
                                                    mb: 1.5,
                                                    backgroundColor: 'var(--reset-element-color)',
                                                    '&:hover': {backgroundColor: 'var(--primary-element-color)'}
                                                }
                                            }
                                            onClick={handlePasswordChangeClick}
                                        >
                                            {isChangingPassword ? 'Cancel Changing Password' : 'Change Password'}
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}
                                            fullWidth
                                            sx={{
                                                mb: 8, backgroundColor: 'var(--secondary-dark-color)',
                                                '&:hover': {backgroundColor: 'var(--primary-element-color)'}
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>
            </Container>
        </LocalizationProvider>
    );
};
