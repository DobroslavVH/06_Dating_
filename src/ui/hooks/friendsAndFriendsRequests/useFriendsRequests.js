import { useInfiniteQuery } from "react-query"
import { reactQueryTypes } from "../../core/query"

const useFriendsRequests = ({
    users,
    getFriendsRequests
}) => {
    const query = useInfiniteQuery(reactQueryTypes.usersRequestetFriendship, () => getFriendsRequests({ users: users }))

    return {
        requestsData: query?.data?.pages[0]?.data || [],
        loading: query?.isLoading,
        friendsRequestsRefetch: query?.refetch
    }
}

export default useFriendsRequests