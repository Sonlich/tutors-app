import React, { useState } from 'react';
import styles from './styles.module.scss';
import { users } from "../../mockData";
import { TutorCard } from "../../components/tutor-card";
import { DefaultFilter } from "../../components/filter";

export const HomePage = () => {
    const [criteria, setCriteria] = useState({
        subject: '',
        minPrice: '',
        maxPrice: '',
        timeSlots: []
    });

    return (
        <div className={styles.catalog}>
            <div className={styles.container}>
                <DefaultFilter setCriteria={setCriteria} />
            </div>
            <div className={styles.cards}>
                {users.filter(user => applyCriteria(user, criteria)).map(tutor => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                ))}
            </div>
        </div>
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



