import { useInfiniteQuery } from "react-query"
import { reactQueryTypes } from "../../core/query"

const useMyFriendsAndFriendRequests = ({
    myId,
    getMyFriendsAndRequests
}) => {
    const query = useInfiniteQuery(
        reactQueryTypes.myFriendsAndRequestsIds,
        () => getMyFriendsAndRequests({ myId: myId })
    )

    const userFriends = query?.data?.pages[0]?.friends?.filter(item => item !== '')
    const userFriendsRequests = query?.data?.pages[0]?.friendRequests?.filter(item => item !== '')

    return {
        userFriends: userFriends || [],
        userFriendsRequests: userFriendsRequests || [],
        myFriendsAndRequestLoading: query?.isLoading,
        myFriendsandRequestsRefetch: query?.refetch,
        myFriendsAndRequestStatus: query?.status
    }
}

export default useMyFriendsAndFriendRequests