import { useNavigation } from "@react-navigation/native"
import { useMutation } from "react-query"
import { reactQuery, reactQueryTypes } from "../../core/query"

const useRemoveFriend = ({
    myId,
    indexInMyList,
    userId,
    indexInUserList,
    putRejectFriendRequest
}) => {

    const navigation = useNavigation()

    const removeObject = [{
        "mutations": [
            {
                "patch": {
                    "id": myId,
                    "unset": [`friends[${indexInMyList}]`]
                }
            }
        ]
    },
    {
        "mutations": [
            {
                "patch": {
                    "id": userId,
                    "unset": [`friends[${indexInUserList}]`]
                }
            }
        ]
    }
    ]

    const mutationRemoveFriend = useMutation({
        mutationFn: (req) => putRejectFriendRequest({ data: req }),
        onSuccess: () => {
            reactQuery.invalidateQueries(reactQueryTypes.myFriendsList)
            navigation.goBack()
        }
    })

    const removeFriend = () => {
        removeObject.map(item => mutationRemoveFriend.mutate(item))
    }

    return {
        removeFriend,
        removeFriendStatus: mutationRemoveFriend?.status,
        removeFriendLoading: mutationRemoveFriend?.isLoading
    }
}

export default useRemoveFriend