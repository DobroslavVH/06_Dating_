import React from "react";
import MyFriendsScreen from "../../../../ui/screens/MyFriendsScreen";
import getFriendsRequestsFactory from '../../usecases/friendsRequests/getFriendsRequestsFactory'
import putRejectFriendRequestFactory from '../../usecases/friendsRequests/putRejectFriendRequestFactory'
import postFriendRequestFactory from '../../usecases/friendsRequests/postFriendRequestFactory'
import getMyFriendsAndRequestsFactory from "../../usecases/user/getMyFriendsAndRequestsFactory";
import getUsersAndFriendsStoriesFactory from '../../usecases/getUserInfo/getUsersAndFriendsStoriesFactory'

const MyFriendsScreenFactory = () => <MyFriendsScreen
    getFriendsRequests={getFriendsRequestsFactory()}
    putRejectFriendRequest={putRejectFriendRequestFactory()}
    postFriendRequest={postFriendRequestFactory()}
    getMyFriendsAndRequests={getMyFriendsAndRequestsFactory()}
    getUsersAndFriendsStories={getUsersAndFriendsStoriesFactory()}
/>

export default MyFriendsScreenFactory