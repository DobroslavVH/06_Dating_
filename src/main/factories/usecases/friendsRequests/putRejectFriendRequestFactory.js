import { ENDPOINTS, TOKEN } from "../../../../ui/core/api";
import putRejectFriendRequest from "../../../../domain/usecases/friendsRequests/putRejectFriendRequest";

const putRejectFriendRequestFactory = () =>
    putRejectFriendRequest({
        ENDPOINTS,
        TOKEN
    })

export default putRejectFriendRequestFactory