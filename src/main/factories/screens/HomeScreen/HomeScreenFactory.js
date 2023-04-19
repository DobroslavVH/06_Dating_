import React from "react";
import HomeScreen from "../../../../ui/screens/HomeScreen";
import getAllUsersFactory from '../../usecases/getUserInfo/getAllUsersFactory'
import getUsersAndFriendsStoriesFactory from '../../usecases/getUserInfo/getUsersAndFriendsStoriesFactory'

const HomeScreenFactory = () => <HomeScreen
    getAllUsers={getAllUsersFactory()}
    getUsersAndFriendsStories={getUsersAndFriendsStoriesFactory()}
/>

export default HomeScreenFactory