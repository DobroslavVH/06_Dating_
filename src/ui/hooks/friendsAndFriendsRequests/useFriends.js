import { useInfiniteQuery } from "react-query"
import { reactQueryTypes } from "../../core/query"

const useFriends = ({
    users,
    getFriendsRequests
}) => {

    const query = useInfiniteQuery(
        reactQueryTypes.myFriendsList,
        () => getFriendsRequests({ users: users })
    )

    return {
        friendsData: query?.data?.pages[0]?.data || [],
        friendsLoading: query?.isLoading,
        friendsRefetch: query?.refetch
    }
}

export default useFriends