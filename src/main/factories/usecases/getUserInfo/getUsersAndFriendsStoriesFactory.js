import { ENDPOINTS, QUERIES } from "../../../../ui/core/api";
import getUsersAndFriendsStories from "../../../../domain/usecases/getUserInfo/getUsersAndFriendsStories";

const getUsersAndFriendsStoriesFactory = () =>
    getUsersAndFriendsStories({
        ENDPOINTS,
        QUERIES
    })

export default getUsersAndFriendsStoriesFactory
