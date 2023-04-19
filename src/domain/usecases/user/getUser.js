import { UserEntity } from '../../../domain/entities/User/UserEntity'

export default getUser = ({
    ENDPOINTS,
    QUERIES
}) => async ({
    username,
    password
}) => {
        const params = QUERIES.logInWithUser(username, password)

        const response = await fetch(ENDPOINTS.getCurrentUser(params))
            .then(response => response.json())
            .then(response => response.result[0])

        const NormalizeUserData = () => UserEntity({
            email: response?.email,
            avatarImage: response?.image_avatar?.asset?._ref,
            backgroundImage: response?.image_background?.asset?._ref,
            city: response?.city,
            country: response?.country,
            firstName: response?.first_name,
            lastName: response?.last_name,
            userId: response?._id,
            createAt: response?._createdAt,
            age: response?.age,
            gender: response?.gender,
            friendRequests: response?.friend_requests || [],
            friends: response?.friends || []
        })


        if (response === undefined) {
            return undefined
        } else {
            return NormalizeUserData()
        }
    }