import { FriendsRequests } from "../../entities/FriendsRequests/FriendsRequestsEntity"

const getFriendsRequests = ({
    ENDPOINTS,
    QUERIES
}) => async ({
    users
}) => {
        const usersToString = users.map(item => `\"${item}\"`).flat()
        const query = QUERIES.selectedUsers(usersToString.toString())

        const response = await fetch(ENDPOINTS.common(query))
            .then(res => res.json())
            .then(res => res.result)

        const NormalizeUserData = () => {
            return {
                data: response.map((response) => FriendsRequests({
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
                    friends: response?.friends || []
                }))
            }
        }

        return NormalizeUserData()
    }

export default getFriendsRequests