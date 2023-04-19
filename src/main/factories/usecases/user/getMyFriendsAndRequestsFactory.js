import { ENDPOINTS } from "../../../../ui/core/api";
import getMyFriendsAndRequests from "../../../../domain/usecases/user/getMyFriendsAndRequests";

const getMyFriendsAndRequestsFactory = () =>
    getMyFriendsAndRequests({
        ENDPOINTS
    })

export default getMyFriendsAndRequestsFactory