import { useInfiniteQuery } from "react-query";
import { reactQueryTypes } from '../core/query'

const useAllUsers = ({
    getAllUsers
}) => {

    const { data, isLoading, refetch } = useInfiniteQuery(reactQueryTypes.allUsersQuery, () => getAllUsers())
    console.log('data', data)
    return {
        allUsers: data?.pages[0]?.data || [],
        allUsersLoading: isLoading,
        allUsersRefresh: refetch
    }
}

export default useAllUsers