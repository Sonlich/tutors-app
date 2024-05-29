import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import LessonCard from '../../components/cards/lesson-card';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { users } from '../../mockData';

dayjs.extend(advancedFormat);

export const LessonsPage = () => {
    const userId = 13;
    const lessonsFromMockData = users.reduce((acc, user) => {
        if (user.id === userId) {
            user.lessons.forEach(lesson => {
                const subject = user.tutorSubject?.find(subject => subject.id === lesson.subjectId);
                const student = users.find(u => u.id === lesson.studentId);
                if (subject && student) {
                    const lessonWithAdditionalData = {
                        ...lesson,
                        subject: subject.name,
                        studentName: `${student.firstName} ${student.lastName}`,
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
            });
        }
        return acc;
    }, { requests: [], scheduled: [] });

    const [lessons, setLessons] = useState(lessonsFromMockData);

    const groupedAndSortedLessons = (lessonList) => {
        const grouped = lessonList.reduce((acc, lesson) => {
            const dateKey = dayjs(lesson.date).format('dddd, D MMMM');
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(lesson);
            return acc;
        }, {});
        // Convert to entries and sort by date
        return Object.entries(grouped).sort((a, b) => dayjs(a[0], 'dddd, D MMMM').diff(dayjs(b[0], 'dddd, D MMMM')));
    };

    const filteredRequests = lessons.requests.filter(lesson => dayjs(lesson.date).isAfter(dayjs()));
    const filteredScheduled = lessons.scheduled.filter(lesson => dayjs(lesson.date).isAfter(dayjs()));
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
                                onAccept={() => setLessons(prev => ({
                                    ...prev,
                                    requests: prev.requests.filter(l => l.id !== lesson.id),
                                    scheduled: [...prev.scheduled, lesson]
                                }))}
                                onCancel={() => setLessons(prev => ({
                                    ...prev,
                                    requests: prev.requests.filter(l => l.id !== lesson.id)
                                }))}
                                showAcceptButton
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
                                onCancel={() => setLessons(prev => ({
                                    ...prev,
                                    scheduled: prev.scheduled.filter(l => l.id !== lesson.id)
                                }))}
                                showAcceptButton={false}
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

