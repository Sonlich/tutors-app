import { faker } from '@faker-js/faker';

export const subjectNames = [
    'Mathematics',
    'Physics',
    'English',
    'German',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'Computer Science',
    'Literature',
    'Art',
    'Music',
    'Philosophy',
    'Sociology',
    'Psychology',
    'Economics',
    'Political Science',
    'Environmental Science',
    'Statistics',
    'French',
    'Spanish',
    'Italian',
    'Latin',
    'Astronomy',
    'Engineering',
    'Law',
    'Medicine',
    'Architecture',
    'Business Studies',
    'Physical Education'
];

const users = Array.from({ length: 30 }, (_, id) => {
    const isTutor = faker.helpers.arrayElement(['tutor', 'student']) === 'tutor';
    const birthDate = isTutor
        ? faker.date.past({ years: 50, refDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)) }).toISOString().split('T')[0]
        : faker.date.past({ years: 30 }).toISOString().split('T')[0];

    return {
        id: id + 1,
        role: isTutor ? 'tutor' : 'student',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        photo: faker.image.avatar(),
        description: faker.lorem.sentence(),
        password: faker.internet.password({ length: 20, memorable: true }),
        birthDate,
        email: faker.internet.email(),
        contact: faker.phone.number(),
    };
});

const tutors = users.filter(user => user.role === 'tutor').map(user => user.id);
const students = users.filter(user => user.role === 'student').map(user => user.id);

const assignedSubjects = {};

const subjects = [];
tutors.forEach(tutorId => {
    const availableSubjects = subjectNames.filter(name =>
        !assignedSubjects[tutorId]?.includes(name)
    );
    const subjectName = faker.helpers.arrayElement(availableSubjects);

    if (!assignedSubjects[tutorId]) {
        assignedSubjects[tutorId] = [];
    }
    assignedSubjects[tutorId].push(subjectName);

    subjects.push({
        id: subjects.length + 1,
        tutorId,
        name: subjectName,
        pricePerLesson: faker.datatype.number({ min: 300, max: 900, precision: 10 }),
        experienceSince: faker.date.past({ years: 10 }).toISOString().split('T')[0],
    });
});

while (subjects.length < 40) {
    const tutorId = faker.helpers.arrayElement(tutors);
    const availableSubjects = subjectNames.filter(name =>
        !assignedSubjects[tutorId]?.includes(name)
    );
    if (availableSubjects.length === 0) continue;

    const subjectName = faker.helpers.arrayElement(availableSubjects);
    assignedSubjects[tutorId].push(subjectName);

    subjects.push({
        id: subjects.length + 1,
        tutorId,
        name: subjectName,
        pricePerLesson: faker.datatype.number({ min: 300, max: 900, precision: 10 }),
        experienceSince: faker.date.past({ years: 10 }).toISOString().split('T')[0],
    });
}

const lessons = Array.from({ length: 200 }, (_, id) => {
    const date = faker.date.future({ years: 0.1 });
    date.setMinutes(0, 0, 0);

    return {
        id: id + 1,
        date: date.toISOString(),
        studentId: faker.helpers.arrayElement([null, ...students]),
        tutorId: faker.helpers.arrayElement(tutors),
        accepted: faker.datatype.boolean(),
        subjectId: faker.helpers.arrayElement(subjects.map(subject => subject.id)),
    };
});

export { users, lessons, subjects };
