import { AllUsersEntity } from "../../entities/UserInfo/AllUsersEntity"

export default getAllUsers = ({
    ENDPOINTS
}) => async () => {

    const allUsersResponse = await fetch(ENDPOINTS.getAllUsersUrl)
        .then(response => response.json())
        .then(response => response.result)

    const NormalizeUserData = () => {
        return {
            data: allUsersResponse.map((response) => AllUsersEntity({
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
                friendRequest: response?.friend_requests || [],
                friends: response?.friends || []
            }))
        }

    }
    return NormalizeUserData()
}