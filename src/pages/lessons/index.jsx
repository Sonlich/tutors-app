import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import LessonCard from '../../components/cards/lesson-card';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { users, lessons as mockLessons, subjects } from '../../mockData';

dayjs.extend(advancedFormat);

export const LessonsPage = () => {
    const userId = 8;
    const user = users.find(u => u.id === userId); // Find the user by userId

    const lessonsFromMockData = users.reduce((acc, u) => {
        if (u.id === userId) {
            u.role === 'tutor' ? (
                mockLessons.filter(lesson => lesson.tutorId === u.id).forEach(lesson => {
                    const subject = subjects.filter(subject => subject.tutorId === u.id)?.find(subject => subject.id === lesson.subjectId);
                    const student = users.find(student => student.id === lesson.studentId);
                    if (subject && student) {
                        const lessonWithAdditionalData = {
                            ...lesson,
                            subject: subject.name,
                            userNameSurname: `${student.firstName} ${student.lastName}`,
                            contact: student.contact,
                            age: dayjs().year() - dayjs(student.birthDate).year(),
                            role: student.role,
                        };
                        if (lesson.accepted) {
                            acc.scheduled.push(lessonWithAdditionalData);
                        } else {
                            acc.requests.push(lessonWithAdditionalData);
                        }
                    }
                })
            ) : (
                mockLessons.filter(lesson => lesson.studentId === u.id).forEach(lesson => {
                    const subject = subjects.filter(subject => subject.tutorId === lesson.tutorId)?.find(subject => subject.id === lesson.subjectId);
                    const tutor = users.find(t => t.id === lesson.tutorId);
                    if (subject && tutor) {
                        const lessonWithAdditionalData = {
                            ...lesson,
                            subject: subject.name,
                            userNameSurname: `${tutor.firstName} ${tutor.lastName}`,
                            contact: tutor.contact,
                            age: dayjs().year() - dayjs(tutor.birthDate).year(),
                            role: tutor.role,
                        };
                        if (lesson.accepted) {
                            acc.scheduled.push(lessonWithAdditionalData);
                        } else {
                            acc.requests.push(lessonWithAdditionalData);
                        }
                    }
                })
            );
        }
        return acc;
    }, { requests: [], scheduled: [] });

    const [lessonState, setLessonState] = useState(lessonsFromMockData);

    const groupedAndSortedLessons = (lessonList) => {
        const grouped = lessonList.reduce((acc, lesson) => {
            const dateKey = dayjs(lesson.date).format('dddd, D MMMM');
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(lesson);
            return acc;
        }, {});
        return Object.entries(grouped).sort((a, b) => dayjs(a[0], 'dddd, D MMMM').diff(dayjs(b[0], 'dddd, D MMMM')));
    };

    const filteredRequests = lessonState.requests.filter(lesson => dayjs(lesson.date).isAfter(dayjs()));
    const filteredScheduled = lessonState.scheduled.filter(lesson => dayjs(lesson.date).isAfter(dayjs()));
    const groupedRequests = groupedAndSortedLessons(filteredRequests);
    const groupedScheduled = groupedAndSortedLessons(filteredScheduled);

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom>Lessons Request</Typography>
            {groupedRequests.length > 0 ? (
                groupedRequests.map(([date, lessons]) => (
                    <Box key={date}>
                        <Typography variant="h6" gutterBottom>{date}</Typography>
                        {lessons.map(lesson => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                onAccept={() => setLessonState(prev => ({
                                    ...prev,
                                    requests: prev.requests.filter(l => l.id !== lesson.id),
                                    scheduled: [...prev.scheduled, lesson]
                                }))}
                                onCancel={() => setLessonState(prev => ({
                                    ...prev,
                                    requests: prev.requests.filter(l => l.id !== lesson.id)
                                }))}
                                showAcceptButton={user.role !== 'student'}
                            />
                        ))}
                    </Box>
                ))
            ) : (
                <Typography sx={{ mb: 5 }}>You haven't got any lesson requests yet.</Typography>
            )}

            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Scheduled Lessons</Typography>
            {groupedScheduled.length > 0 ? (
                groupedScheduled.map(([date, lessons]) => (
                    <Box key={date}>
                        <Typography variant="h6" gutterBottom>{date}</Typography>
                        {lessons.map(lesson => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                onCancel={() => setLessonState(prev => ({
                                    ...prev,
                                    scheduled: prev.scheduled.filter(l => l.id !== lesson.id)
                                }))}
                            />
                        ))}
                    </Box>
                ))
            ) : (
                <Typography sx={{ mb: 5 }}>You haven't got any lessons yet.</Typography>
            )}
        </Container>
    );
};
