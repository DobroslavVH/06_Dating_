import { useInfiniteQuery } from "react-query";
import { reactQueryTypes } from '../core/query'

const useUserStories = ({ userId, getUserStories }) => {

    const query = useInfiniteQuery(reactQueryTypes.userPosts, () => getUserStories({ relatedUser: userId }))

    const userResponse = {
        userStories: query?.data?.length === 0 ? [] : query?.data?.pages[0],
        loading: query?.isLoading,
        refetch: query?.refetch,
        error: query?.error
    }

    return userResponse
}

export default useUserStories