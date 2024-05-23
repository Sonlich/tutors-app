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
        id: 1,
        role: 'tutor',
        firstName: 'Karl',
        lastName: 'Smith',
        photo: 'https://picsum.photos/400/300?random=1',
        description: 'User description',
        birthDate: '1991-07-28',
        email: 'karl11@example.com',
        contact: '+38096573839',
        tutorSubject: [
            {
                id: 1,
                name: 'Mathematics',
                pricePerLesson: 450,
                experienceSince: '2017-10-22',
            },
            {
                id: 2,
                name: 'Physics',
                pricePerLesson: 300,
                experienceSince: '2018-09-23',
            }
        ],
        lessons: [
            {date: '2024-05-29', startTime: '10:00', endTime: '11:00'},
            {date: '2024-05-30', startTime: '12:00', endTime: '13:00'}
        ],
    };
    const initialValues = {
        subjects: user.tutorSubject
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
                                                                    options={availableSubjects.filter(subject => !isSubjectAdded(values.subjects.map(sub => sub.subject), subject))}
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
                                                                value={subject.pricePerLesson}
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
