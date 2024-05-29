import React, {useState} from 'react';
import {FieldArray, Form, Formik} from 'formik';
import * as yup from 'yup';
import {Autocomplete, Button, Container, FormControl, Grid, TextField, Typography} from '@mui/material';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {enUS} from 'date-fns/locale';
import dayjs from "dayjs";

export const EditSubjectsForm = () => {
    const [role, setRole] = useState('student')
    let user = {
        id: 13,
        role: 'tutor',
        firstName: 'Igor',
        lastName: 'Lagoda',
        photo: 'https://img.freepik.com/free-photo/handsome-freelancer-man-holding-laptop-smiling-standing-happy-light-turquoise-wall_1258-23916.jpg?w=1380&t=st=1716652601~exp=1716653201~hmac=364a8852413178582a643ee7adf40dc947dc56008d8df0ac74fa6b06f3495896',
        description: 'User description',
        birthDate: '1997-05-14',
        email: 'igorlag@example.com',
        contact: '+380955458637',
        password: 'password1',
        subjects: [
            {
                id: 15,
                name: 'Physics',
                price: 250,
                experienceSince: '2023-05-23',
            },
            {
                id: 16,
                name: 'Economics',
                price: 300,
                experienceSince: '2021-01-23',
            }
        ],
        lessons: [
            {id: 34, date: '2024-06-09T20:00', studentId: null, tutorId: 13, accepted: false, subjectId: null},
            {id: 35, date: '2024-06-08T21:00', studentId: null, tutorId: 13, accepted: false, subjectId: null},
            {id: 36,date: '2024-06-02T21:00', studentId: null, tutorId: 13, accepted: false, subjectId: null},
            {id: 37, date: '2024-06-03T21:00', studentId: null, tutorId: 13, accepted: false, subjectId: null},
            {id: 38, date: '2024-06-04T21:00', studentId: null, tutorId: 13, accepted: false, subjectId: null},
        ],
    };

    const initialValues = {
        subjects: user.subjects
    };

    const registrationValidationSchema = yup.object({
        subjects: yup.array().of(
            yup.object({
                subject: yup.string().required('Subject is required'),
                experienceSince: yup.date().max(new Date(), "Date must be in the past").required('Experience date is required'),
                price: yup.number().min(0, "Price must be non-negative").required('Price per lesson is required')
            })
        )
    });

    const availableSubjects = ["Mathematics", "English", "Chemistry"];

    const isSubjectAdded = (selectedSubjects, currentSubject) => {
        return selectedSubjects.includes(currentSubject);
    };

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

                        return (
                            <Form onSubmit={handleSubmit} noValidate>
                                <h1>Edit/Add Subjects</h1>
                                <Grid container spacing={2}>
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
                                                                    options={availableSubjects.filter(subject => !isSubjectAdded(values.subjects.map(sub => sub.name), subject))}
                                                                    value={subject.name}
                                                                    onChange={(event, newValue) => {
                                                                        setFieldValue(`subjects[${index}].subject`, newValue);
                                                                    }}
                                                                    onBlur={() => setFieldTouched(`subjects[${index}].subject`, true)}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="Select Subject"
                                                                            error={touched.subjects?.[index]?.subject && Boolean(errors.subjects?.[index]?.subject)}
                                                                            helperText={touched.subjects?.[index]?.subject && errors.subjects?.[index]?.subject}
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
                                                                value={subject.price}
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
                                                            subject: '',
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
                                            Confirm Changes
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
