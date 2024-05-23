import React, {useState} from 'react';
import styles from './styles.module.scss';
import {users} from "../../mockData";
import {TutorCard} from "../../components/cards/tutor-card";
import {DefaultFilter} from "../../components/filter";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const HomePage = () => {
    const [criteria, setCriteria] = useState({
        subject: '',
        minPrice: '',
        maxPrice: '',
        timeSlots: []
    });

    const [page, setPage] = useState(1);
    const tutorsPerPage = 6;

    const tutors = users.filter(user => user.role === 'tutor' && applyCriteria(user, criteria));
    const count = Math.ceil(tutors.length / tutorsPerPage);
    const displayedTutors = tutors.slice((page - 1) * tutorsPerPage, page * tutorsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <div className={styles.catalog}>
                <div className={styles.container}>
                    <DefaultFilter setCriteria={setCriteria}/>
                </div>
                <div className={styles.cards}>
                    {displayedTutors.map(tutor => (
                        <TutorCard key={tutor.id} tutor={tutor}/>
                    ))}
                </div>
            </div>
            <Stack spacing={2} alignItems="center" sx={{marginY: 3}}>
                <Pagination count={count} page={page} onChange={handleChange}/>
            </Stack>
        </>
    );
};


function applyCriteria(tutor, criteria) {
    let subjectMatch = criteria.subject ? tutor.tutorSubject.some(subject => subject.name === criteria.subject) : true;
    let priceMatch = true;
    if (criteria.minPrice || criteria.maxPrice) {
        priceMatch = tutor.tutorSubject.every(subject => {
            return (!criteria.minPrice || subject.pricePerLesson >= parseFloat(criteria.minPrice)) &&
                (!criteria.maxPrice || subject.pricePerLesson <= parseFloat(criteria.maxPrice));
        });
    }

    let timeSlotMatch = criteria.timeSlots && criteria.timeSlots.length ? tutor.lessons.some(lesson => {
        return criteria.timeSlots.some(slot => {
            const [start, end] = slot.split('-');
            const lessonStart = lesson.startTime;
            const lessonEnd = lesson.endTime;
            return (lessonStart >= start && lessonEnd <= end);
        });
    }) : true;

    return subjectMatch && priceMatch && timeSlotMatch;
}
