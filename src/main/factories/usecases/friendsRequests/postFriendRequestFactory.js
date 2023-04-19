import { ENDPOINTS, TOKEN } from "../../../../ui/core/api";
import postFriendRequest from "../../../../domain/usecases/friendsRequests/postFriendRequest";

const postFriendRequestFactory = () =>
    postFriendRequest({
        ENDPOINTS,
        TOKEN
    })

export default postFriendRequestFactory