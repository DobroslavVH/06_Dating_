import { ENDPOINTS, TOKEN } from "../../../../ui/core/api";
import updateUser from "../../../../domain/usecases/user/updateUser";

const updateUserFactory = () =>
    updateUser({
        ENDPOINTS,
        TOKEN
    })

export default updateUserFactory
