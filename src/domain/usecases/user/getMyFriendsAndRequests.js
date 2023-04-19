import { FriendsAndRequestsEntity } from '../../entities/User/FriendsAndRequestsEntity'

const getMyFriendsAndRequests = ({
    ENDPOINTS
}) => async ({
    myId
}) => {
        const params = `*[_type == "users"][_id match "${myId}"]{friends, friend_requests}`

        const response = await fetch(ENDPOINTS.common(params))
            .then(response => response.json())
            .then(response => response.result[0])

        const NormalizeUserData = () => FriendsAndRequestsEntity({
            friendRequests: response?.friend_requests || [],
            friends: response?.friends || []
        })

        if (response === undefined) {
            return undefined
        } else {
            return NormalizeUserData()
        }
    }

export default getMyFriendsAndRequests

