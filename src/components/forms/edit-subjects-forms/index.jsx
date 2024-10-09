import React from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { subjectNames } from '../../../mockData';
import * as yup from 'yup';
import { Autocomplete, Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { enUS } from 'date-fns/locale';
import dayjs from 'dayjs';

export const EditSubjectsForm = ({ user, subjects }) => {
    if (!user || !user.id || user.role !== 'tutor') {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h2" align="center">
                    Error: User data is missing or missing
                </Typography>
            </div>
        );
    }

    const registrationValidationSchema = yup.object({
        subjects: yup.array().of(
            yup.object({
                name: yup.string().required('Subject is required'),
                experienceSince: yup.date().max(new Date(), "Date must be in the past").required('Experience date is required'),
                pricePerLesson: yup.number().min(0, "Price must be non-negative").required('Price per lesson is required')
            })
        )
    });

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
                    initialValues={{ subjects }}
                    validationSchema={registrationValidationSchema}
                    enableReinitialize={true}
                    onSubmit={(values, { setSubmitting }) => {
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
                      }) => (
                        <Form onSubmit={handleSubmit} noValidate>
                            <h1>Edit/Add Subjects</h1>
                            <Grid container spacing={2}>
                                <FieldArray name="subjects">
                                    {({ push, remove }) => (
                                        <>
                                            {values.subjects.map((subject, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl fullWidth>
                                                            <Autocomplete
                                                                disablePortal
                                                                id={`subject-autocomplete-${index}`}
                                                                options={subjectNames.filter(name => !isSubjectAdded(values.subjects.map(sub => sub.name), name))}
                                                                value={subject.name || ''}
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
                                                            value={subject.experienceSince ? dayjs(subject.experienceSince).toDate() : null}
                                                            onChange={date => {
                                                                setFieldValue(`subjects[${index}].experienceSince`, date ? dayjs(date).format("YYYY-MM-DD") : null);
                                                                setFieldTouched(`subjects[${index}].experienceSince`, true, false);
                                                            }}
                                                            maxDate={new Date()}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={touched.subjects?.[index]?.experienceSince && Boolean(errors.subjects?.[index]?.experienceSince)}
                                                                    helperText={touched.subjects?.[index]?.experienceSince && errors.subjects?.[index]?.experienceSince}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            name={`subjects[${index}].pricePerLesson`}
                                                            value={subject.pricePerLesson}
                                                            label="Price per lesson"
                                                            type="number"
                                                            fullWidth
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={touched.subjects?.[index]?.pricePerLesson && Boolean(errors.subjects?.[index]?.pricePerLesson)}
                                                            helperText={touched.subjects?.[index]?.pricePerLesson && errors.subjects?.[index]?.pricePerLesson}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            onClick={() => remove(index)}
                                                            fullWidth
                                                            variant="contained"
                                                            disabled={values.subjects.length <= 1}
                                                            sx={{
                                                                backgroundColor: 'var(--cancel-element-color)',
                                                                '&:hover': { backgroundColor: 'var(--cancel-secondary-color)' }
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
                                                        pricePerLesson: ''
                                                    })}
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: 'var(--reset-element-color)',
                                                        '&:hover': { backgroundColor: 'var(--primary-element-color)' }
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
                                            '&:hover': { backgroundColor: 'var(--primary-element-color)' }
                                        }}
                                    >
                                        Confirm Changes
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>
        </LocalizationProvider>
    );
};
