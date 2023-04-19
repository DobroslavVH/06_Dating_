import { ENDPOINTS } from "../../../../ui/core/api";
import getAllUsers from "../../../../domain/usecases/getUserInfo/getAllUsers";

const getAllUsersFactory = () =>
    getAllUsers({
        ENDPOINTS
    })

export default getAllUsersFactory