import { ENDPOINTS, QUERIES } from "../../../../ui/core/api";
import getUser from '../../../../domain/usecases/user/getUser'

const getUserFactory = () =>
    getUser({
        ENDPOINTS,
        QUERIES
    })

export default getUserFactory