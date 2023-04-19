import React from "react";
import ProfileScreen from "../../../../ui/screens/MyProfileScreen";
import updateUserFactory from '../../usecases/user/updateUserFactory'
import getUserStoriesFactory from "../../usecases/getUserInfo/getUserStoriesFactory";

const MyProfileScreenFactory = () => <ProfileScreen
    updateUser={updateUserFactory()}
    getUserStories={getUserStoriesFactory()}
/>

export default MyProfileScreenFactory