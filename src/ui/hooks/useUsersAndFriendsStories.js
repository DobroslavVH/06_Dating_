import { useInfiniteQuery } from "react-query";
import { reactQueryTypes } from '../core/query'

const useUsersAndFriendsStories = ({
    usersIds,
    friendsIds,
    getUsersAndFriendsStories
}) => {

    const { data, isLoading, refetch } = useInfiniteQuery(reactQueryTypes.usersStories, () => getUsersAndFriendsStories({ usersIds: usersIds }))

    const { data: friendsData, isLoading: friendsIsLoading, refetch: friendsRefetch } = useInfiniteQuery(reactQueryTypes.friendsStories, () => getUsersAndFriendsStories({ usersIds: friendsIds }))

    return {
        usersStories: data?.pages[0] || [],
        usersStoriesLoading: isLoading,
        usersStoriesRefetch: refetch,
        friendsStories: friendsData?.pages[0] || [],
        friendsStoriesLoading: friendsIsLoading,
        friendsStoriesRefetch: friendsRefetch
    }
}

export default useUsersAndFriendsStories