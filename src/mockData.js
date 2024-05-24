export const users = [
    {
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
            {date: '2024-05-29T10:00', studentId: null, tutorId: 1, accepted: false, subjectId: null},
            {date: '2024-05-30T12:00', studentId: null, tutorId: 1, accepted: false, subjectId: null},
            {date: '2024-05-29T10:00', studentId: 8, tutorId: 1, accepted: true, subjectId: 1},
            {date: '2024-05-30T12:00', studentId: 8, tutorId: 1, accepted: false, subjectId: 2},
        ],
    },
    {
        id: 2,
        role: 'tutor',
        firstName: 'Sarah',
        lastName: 'Miller',
        photo: 'https://picsum.photos/400/300?random=2',
        description: 'User description',
        birthDate: '1996-04-07',
        email: 'sarah11@example.com',
        contact: '+38096573839',
        tutorSubject: [
            {
                id: 3,
                name: 'English',
                pricePerLesson: 400,
                experienceSince: '2018-11-21',
            },
            {
                id: 4,
                name: 'German',
                pricePerLesson: 500,
                experienceSince: '2022-03-11',
            }
        ],
        lessons: [
            {date: '2024-05-27T12:00', studentId: null, tutorId: 2, accepted: false, subjectId: null},
            {date: '2024-05-28T13:00', studentId: null, tutorId: 2, accepted: false, subjectId: null},
            {date: '2024-05-28T:12:00', studentId: null, tutorId: 2, accepted: false, subjectId: null}
        ],
    },
    {
        id: 3,
        role: 'tutor',
        firstName: 'Donald',
        lastName: 'Markus',
        photo: 'https://picsum.photos/400/300?random=3',
        description: 'User description',
        birthDate: '1995-12-15',
        email: 'don22kk@example.com',
        contact: '+38096573839',
        tutorSubject: [
            {
                id: 5,
                name: 'Biology',
                pricePerLesson: 350,
                experienceSince: '2019-08-12',
            },
            {
                id: 6,
                name: 'Chemistry',
                pricePerLesson: 400,
                experienceSince: '2020-02-15',
            }
        ],
        lessons: [
            {date: '2024-05-28T13:00', studentId: null, tutorId: 3, accepted: false, subjectId: null},
            {date: '2024-05-29T15:00', studentId: null, tutorId: 3, accepted: false, subjectId: null}
        ],
    },
    {
        id: 4,
        role: 'tutor',
        firstName: 'Linda',
        lastName: 'Johnson',
        photo: 'https://picsum.photos/400/300?random=4',
        description: 'User description',
        birthDate: '1993-09-23',
        email: 'linjon3@example.com',
        contact: '+38096573839',
        tutorSubject: [
            {
                id: 7,
                name: 'History',
                pricePerLesson: 300,
                experienceSince: '2018-10-22',
            },
            {
                id: 8,
                name: 'Geography',
                pricePerLesson: 350,
                experienceSince: '2019-11-23',
            }
        ],
        lessons: [
            {date: '2024-05-29T15:00', studentId: null, tutorId: 4, accepted: false, subjectId: null},
            {date: '2024-05-30T16:00', studentId: null, tutorId: 4, accepted: false, subjectId: null}
        ],
    },
    {
        id: 5,
        role: 'tutor',
        firstName: 'Lilian',
        lastName: 'Garcia',
        photo: 'https://picsum.photos/400/300?random=5',
        description: 'User description',
        birthDate: '1992-06-18',
        email: 'liliagar@example.com',
        contact: '+38096573839',
        tutorSubject: [
            {
                id: 9,
                name: 'Music',
                pricePerLesson: 250,
                experienceSince: '2017-09-22',
            }
        ],
        lessons: [
            {date: '2024-05-29T09:00', studentId: null, tutorId: 5, accepted: false, subjectId: null},
            {date: '2024-05-30T14:00', studentId: null, tutorId: 5, accepted: false, subjectId: null},
            {date: '2024-05-30T11:00', studentId: null, tutorId: 5, accepted: false, subjectId: null}
        ],
    },
    {
        id: 6,
        role: 'tutor',
        firstName: 'Killian',
        lastName: 'Brown',
        photo: 'https://picsum.photos/400/300?random=6',
        description: 'User description',
        birthDate: '2002-03-12',
        email: 'kilmai@example.com',
        contact: '+38096573839',
        tutorSubject: [
            {
                id: 11,
                name: 'Mathematics',
                pricePerLesson: 450,
                experienceSince: '2017-10-22',
            }
        ],
        lessons: [
            {date: '2024-05-08T18:00', studentId: null, tutorId: 6, accepted: false, subjectId: null},
            {date: '2024-05-09T:19:00', studentId: null, tutorId: 6, accepted: false, subjectId: null}
        ],
    },
    {
        id: 7,
        role: 'tutor',
        firstName: 'Sara',
        lastName: 'Morgan',
        photo: 'https://picsum.photos/400/300?random=7',
        description: 'User description',
        birthDate: '1990-04-07',
        email: 'sagaj@example.com',
        contact: '+38096573839',
        tutorSubject: [
            {
                id: 12,
                name: 'English',
                pricePerLesson: 400,
                experienceSince: '2018-11-21',
            }
        ],
        lessons: [
            {date: '2024-06-02T20:00', studentId: null, tutorId: 7, accepted: false, subjectId: null},
            {date: '2024-06-03T:21:00', studentId: null, tutorId: 7, accepted: false, subjectId: null},
            {date: '2024-06-03T:21:00', studentId: null, tutorId: 7, accepted: false, subjectId: null}
        ],
    },
    {
        id: 8,
        role: 'student',
        firstName: 'Mila',
        lastName: 'Smith',
        photo: 'https://picsum.photos/400/300?random=8',
        description: 'User description',
        birthDate: '1995-12-15',
        email: 'mila@mail.com',
        contact: '+38096573839',
        lessons: [
            {date: '2024-05-29T10:00', studentId: 8, tutorId: 1, accepted: true, subjectId: 1},
            {date: '2024-05-30T12:00', studentId: 8, tutorId: 1, accepted: false, subjectId: 2},
        ],
    }
];