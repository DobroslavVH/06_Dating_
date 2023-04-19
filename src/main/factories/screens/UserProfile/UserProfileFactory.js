import React from "react";
import UserProfile from "../../../../ui/screens/UserProfile";
import putRejectFriendRequestFactory from "../../usecases/friendsRequests/putRejectFriendRequestFactory";
import getUserStoriesFactory from '../../usecases/getUserInfo/getUserStoriesFactory'
import postFriendRequestFactory from "../../usecases/friendsRequests/postFriendRequestFactory";
import getMyFriendsAndRequestsFactory from '../../usecases/user/getMyFriendsAndRequestsFactory'

const UserProfileFactory = ({ route }) => <UserProfile
    putRejectFriendRequest={putRejectFriendRequestFactory()}
    getUserStories={getUserStoriesFactory()}
    postFriendRequest={postFriendRequestFactory()}
    getMyFriendsAndRequests={getMyFriendsAndRequestsFactory()}
    route={route}
/>

export default UserProfileFactory