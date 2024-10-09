import {EditProfileForm} from "../../../../components/forms/edit-profile-forms";

export const EditProfilePage = ({user}) => {
    return (
        <div>
            <EditProfileForm user={user}/>
        </div>
    );
};
