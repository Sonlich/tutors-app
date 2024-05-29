import React, {useState} from 'react';
import {Field, FieldArray, Form, Formik} from 'formik';
import * as yup from 'yup';
import {
    Autocomplete,
    Avatar,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {PasswordField} from "../login-forms";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {enUS} from 'date-fns/locale';
import dayjs from "dayjs";

const descriptionSchema = yup.string()
    .max(200, 'Description must be at most 200 characters')

export const RegistrationForm = () => {
    const [role, setRole] = useState('student')
    const initialValues = {
        firstName: '',
        lastName: '',
        profilePhoto: null,
        birthDate: null,
        description: '',
        contact: '',
        email: '',
        password: '',
        role: 'student',
        subjects: []
    };

    const registrationValidationSchema = yup.object({
        role: yup.string().required('Role is required'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        profilePhoto: role === 'student' ? yup.mixed().nullable() : yup.mixed().required('Profile photo is required for tutors'),
        description: role === 'student' ? descriptionSchema : descriptionSchema.required('Description is required'),
        birthDate: yup.date().max(new Date(), "Birth date must be in the past").required('Birth date is required'),
        contact: yup.string()
            .required('Contact is required')
            .matches(
                /^(\+\d{1,3}[- ]?)?\d{10}$/,
                'Contact number must be valid'
            ),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string()
            .min(6, 'Password should be minimum 6 characters')
            .matches(/\d/, 'Password should contain at least one number')
            .required('Password is required'),
        subjects: yup.array().of(
            yup.object({
                name: yup.string().required('Subject is required'),
                experienceSince: yup.date().max(new Date(), "Date must be in the past").required('Experience date is required'),
                price: yup.number().min(0, "Price must be non-negative").required('Price per lesson is required')
            })
        ).when('role', (role, schema) => role === 'tutor' ? schema.required() : schema.notRequired())
    });

    const availableSubjects =  [
        "Mathematics", "Physics", "English", "German", "Chemistry", "Biology", "History",
        "Geography", "Computer Science", "Economics", "Business Studies", "Accounting",
    ];

    const isSubjectAdded = (selectedSubjects, currentSubject) => {
        return selectedSubjects.includes(currentSubject);
    };

    const [photoPreview, setPhotoPreview] = useState(null);

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
                    initialValues={initialValues}
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
                                setFieldValue("profilePhoto", event.target.files[0]);
                                setPhotoPreview(URL.createObjectURL(event.target.files[0]));
                            }
                        };

                        const handleRemovePhoto = () => {
                            setFieldValue("profilePhoto", null);
                            setPhotoPreview(null);
                        };

                        return (
                            <Form onSubmit={handleSubmit} noValidate>
                                <h1>Register</h1>
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
                                                            id="profilePhoto"
                                                            name="profilePhoto"
                                                            type="file"
                                                            hidden
                                                            onChange={handlePhotoChange}
                                                        />
                                                        <label htmlFor="profilePhoto">
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
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="role-select-label">Register as</InputLabel>
                                                <Select
                                                    labelId="role-select-label"
                                                    id="role"
                                                    name="role"
                                                    value={values.role}
                                                    label="Register as"
                                                    onChange={e => {
                                                        handleChange(e);
                                                        setRole(e.target.value)
                                                        setFieldValue("subjects", e.target.value === "tutor" ? [{
                                                            name: '',
                                                            experienceSince: null,
                                                            price: ''
                                                        }] : []);
                                                    }}
                                                    onBlur={handleBlur}
                                                    error={touched.role && Boolean(errors.role)}
                                                >
                                                    <MenuItem value="student">Student</MenuItem>
                                                    <MenuItem value="tutor">Tutor</MenuItem>
                                                </Select>
                                                {touched.role && errors.role && (
                                                    <Typography variant="caption" display="block" color="error"
                                                                sx={{mt: 1, ml: 1.5}}>
                                                        {errors.role}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
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
                                        <PasswordField name="password" label="Password"/>
                                    </Grid>
                                    {values.role === 'tutor' && (
                                        <FieldArray name="subjects">
                                            {({push, remove}) => (
                                                <>
                                                    {values.subjects.map((subject, index) => (
                                                        <React.Fragment key={index}>
                                                            <Grid item xs={12} sm={6}>
                                                                <FormControl fullWidth>
                                                                    <Autocomplete
                                                                        disablePortal
                                                                        id={`subject-autocomplete-${index}`}
                                                                        options={availableSubjects.filter(subject => !isSubjectAdded(values.subjects.map(sub => sub.subject), subject))}
                                                                        value={subject.name}
                                                                        onChange={(event, newValue) => {
                                                                            setFieldValue(`subjects[${index}].name`, newValue);
                                                                        }}
                                                                        onBlur={() => setFieldTouched(`subjects[${index}].name`, true)}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Select Subject"
                                                                                error={touched.subjects?.[index]?.name && Boolean(errors.subjects?.[index]?.name)}
                                                                                helperText={touched.subjects?.[index]?.name && errors.subjects?.[index]?.name}
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <DesktopDatePicker
                                                                    label="Experience since"
                                                                    inputFormat="DD/MM/YYYY"
                                                                    value={subject.experienceSince ? dayjs(subject.experienceSince, "YYYY-MM-DD").toDate() : null}
                                                                    onChange={date => {
                                                                        setFieldValue(`subjects[${index}].experienceSince`, date ? dayjs(date).format("YYYY-MM-DD") : null);
                                                                        setFieldTouched(`subjects[${index}].experienceSince`, true, false);
                                                                    }}
                                                                    sx={(theme) => ({
                                                                        width: '100%',
                                                                        ...(touched.subjects?.[index]?.experienceSince && errors.subjects?.[index]?.experienceSince && {
                                                                            label: {
                                                                                color: theme.palette.error.main,
                                                                            },
                                                                            fieldset: {
                                                                                borderColor: theme.palette.error.main,
                                                                            },
                                                                        }),
                                                                    })}
                                                                    maxDate={new Date()}
                                                                    error={touched.subjects?.[index]?.experienceSince && Boolean(errors.subjects?.[index]?.experienceSince)}
                                                                />
                                                                {touched.subjects?.[index]?.experienceSince && errors.subjects?.[index]?.experienceSince && (
                                                                    <Typography variant="caption" display="block"
                                                                                color="error" sx={{mt: 1, ml: 1.5}}>
                                                                        {errors.subjects?.[index]?.experienceSince}
                                                                    </Typography>
                                                                )}
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    name={`subjects[${index}].price`}
                                                                    label="Price per lesson"
                                                                    type="number"
                                                                    fullWidth
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    error={touched.subjects?.[index]?.price && Boolean(errors.subjects?.[index]?.price)}
                                                                    helperText={touched.subjects?.[index]?.price && errors.subjects?.[index]?.price}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    onClick={() => remove(index)}
                                                                    fullWidth
                                                                    variant="contained"
                                                                    disabled={values.subjects.length <= 1}
                                                                    sx={{
                                                                        backgroundColor: 'var( --cancel-element-color)',
                                                                        '&:hover': {backgroundColor: 'var(--cancel-secondary-color)'}
                                                                    }}
                                                                >
                                                                    Delete Subject
                                                                </Button>
                                                            </Grid>
                                                        </React.Fragment>
                                                    ))}
                                                    <Grid item xs={12}>
                                                        <Button
                                                            onClick={() => push({
                                                                name: '',
                                                                experienceSince: null,
                                                                price: ''
                                                            })}
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{
                                                                backgroundColor: 'var(--reset-element-color)',
                                                                '&:hover': {backgroundColor: 'var(--primary-element-color)'}
                                                            }}
                                                        >
                                                            Add Subject
                                                        </Button>
                                                    </Grid>
                                                </>
                                            )}
                                        </FieldArray>
                                    )}
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}
                                            fullWidth
                                            sx={{
                                                mb: 8,
                                                backgroundColor: 'var(--secondary-dark-color)',
                                                '&:hover': {backgroundColor: 'var(--primary-element-color)'}
                                            }}
                                        >
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }
                    }
                </Formik>
            </Container>
        </LocalizationProvider>
    );
};
