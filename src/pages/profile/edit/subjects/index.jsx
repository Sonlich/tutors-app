import {EditSubjectsForm} from "../../../../components/forms/edit-subjects-forms";

export const EditSubjectsPage = ({user, subjects}) => {

    return (
        <div>
            <EditSubjectsForm user={user} subjects={subjects}/>
        </div>
    );
};