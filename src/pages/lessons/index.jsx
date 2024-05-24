import React, {useState} from 'react';
import {Box, Container, Typography} from '@mui/material';
import LessonCard from '../../components/cards/lesson-card';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { users } from '../../mockData';

dayjs.extend(advancedFormat);

// const initialLessons = {
//     requests: [
//         {
//             id: 1,
//             subject: "Mathematics",
//             date: "2024-05-29 14:00",
//             studentName: "Sarah Nok",
//             age: 19,
//             contact: "+380929239340"
//         },
//         {
//             id: 2,
//             subject: "Physics",
//             date: "2024-05-30 12:00",
//             studentName: "John Dou",
//             age: 22,
//             contact: "+38096573839"
//         }
//     ],
//     scheduled: [
//         {
//             id: 3,
//             subject: "Physics",
//             date: "2024-05-16 12:00",
//             studentName: "Bill Wollins",
//             age: 26,
//             contact: "+38096575639"
//         },
//         {
//             id: 4,
//             subject: "Mathematics",
//             date: "2024-05-18 13:00",
//             studentName: "Kriss Stivens",
//             age: 21,
//             contact: "+38096573839"
//         },
//         {
//             id: 5,
//             subject: "Physics",
//             date: "2024-05-18 11:00",
//             studentName: "Don Manuel",
//             age: 16,
//             contact: "+38096573839"
//         },
//         {
//             id: 6,
//             subject: "Mathematics",
//             date: "2024-05-29 14:00",
//             studentName: "Sarah Nok",
//             age: 19,
//             contact: "+380929239340"
//         },
//         {
//             id: 7,
//             subject: "Physics",
//             date: "2024-05-30 12:00",
//             studentName: "John Dou",
//             age: 22,
//             contact: "+38096573839"
//         }
//     ]
// };

const groupLessonsByDate = (lessons) => {
    const grouped = lessons.reduce((acc, lesson) => {
        const dateKey = dayjs(lesson.date).format('dddd, D MMMM');
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(lesson);
        return acc;
    }, {});
    return grouped;
};

export const LessonsPage = () => {
    const lessonsFromMockData = users.reduce((acc, user) => {
        user.lessons.forEach(lesson => {
            const subject = user.tutorSubject && user.tutorSubject.find(subject => subject.id === lesson.subjectId);
            const student = users.find(u => u.id === lesson.studentId);
            if (subject && student) {
                const lessonWithAdditionalData = {
                    ...lesson,
                    subject: subject.name,
                    studentName: `${student.firstName} ${student.lastName}`,
                    contact: student.contact,
                    age: dayjs().year() - dayjs(student.birthDate).year()
                };
                if (lesson.accepted) {
                    acc.scheduled.push(lessonWithAdditionalData);
                } else {
                    acc.requests.push(lessonWithAdditionalData);
                }
            }
        });
        return acc;
    }, {requests: [], scheduled: []});

    const [lessons, setLessons] = useState(lessonsFromMockData);

    const today = dayjs();
    const filteredRequests = lessons.requests.filter(lesson => dayjs(lesson.date).isAfter(today));
    const filteredScheduled = lessons.scheduled.filter(lesson => dayjs(lesson.date).isAfter(today));
    const groupedRequests = groupLessonsByDate(filteredRequests);
    const groupedScheduled = groupLessonsByDate(filteredScheduled);

    const handleAcceptLesson = (id) => {
        const lesson = filteredRequests.find(l => l.id === id);
        if (lesson) {
            setLessons(prev => ({
                requests: prev.requests.filter(l => l.id !== id),
                scheduled: [...prev.scheduled, lesson]
            }));
        }
    };

    const handleCancelLesson = (id) => {
        setLessons(prev => ({
            requests: prev.requests.filter(lesson => lesson.id !== id),
            scheduled: prev.scheduled.filter(lesson => lesson.id !== id)
        }));
    };

    return (
        <Container sx={{mt: 2}}>
            <Typography variant="h4" gutterBottom>Lessons request</Typography>
            {Object.keys(groupedRequests).length > 0 ? (
                Object.entries(groupedRequests).map(([date, lessons]) => (
                    <Box key={date}>
                        <Typography variant="h6" gutterBottom>{date}</Typography>
                        {lessons.map(lesson => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                onAccept={handleAcceptLesson}
                                onCancel={handleCancelLesson}
                                showAcceptButton={true}
                            />
                        ))}
                    </Box>
                ))
            ) : (
                <Typography>You haven't got any lessons request yet.</Typography>
            )}

            <Typography variant="h4" gutterBottom sx={{mt: 4}}>Lessons</Typography>
            {Object.keys(groupedScheduled).length > 0 ? (
                Object.entries(groupedScheduled).map(([date, lessons]) => (
                    <Box key={date}>
                        <Typography variant="h6" gutterBottom>{date}</Typography>
                        {lessons.map(lesson => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                onCancel={handleCancelLesson}
                                showAcceptButton={false}
                            />
                        ))}
                    </Box>
                ))
            ) : (
                <Typography>You haven't got any lessons yet.</Typography>
            )}
        </Container>
    );
};

export default LessonsPage;
