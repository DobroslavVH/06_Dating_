import { ENDPOINTS, QUERIES } from "../../../../ui/core/api";
import getFriendsRequests from "../../../../domain/usecases/friendsRequests/getFriendsRequests";

const getFriendsRequestsFactory = () =>
    getFriendsRequests({
        ENDPOINTS,
        QUERIES
    })

export default getFriendsRequestsFactory
