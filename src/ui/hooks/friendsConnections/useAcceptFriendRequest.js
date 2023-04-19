import { useNavigation } from "@react-navigation/native"
import { useMutation } from "react-query"

const useAcceptFriendRequest = ({
    myId,
    userId,
    postFriendRequest
}) => {
    const navigation = useNavigation()

    const acceptFriendRequest = [{
        "mutations": [{
            "patch": {
                "id": myId,
                "insert": {
                    "after": "friends[0]",
                    "items": [userId]
                }
            }
        }]
    },
    {
        "mutations": [{
            "patch": {
                "id": userId,
                "insert": {
                    "after": "friends[0]",
                    "items": [myId]
                }
            }
        }]
    }
    ]

    const mutationAccept = useMutation({
        mutationFn: (req) => postFriendRequest({ data: req }),
        onSuccess: () => {
            // cause going to login screen
            //navigation.goBack()
        }
    })

    const acceptFriend = () => {
        if (userId) {
            acceptFriendRequest.map(item => mutationAccept.mutate(item))
        }
    }

    return {
        acceptFriend,
        acceptStatus: mutationAccept?.isSuccess,
        acceptFriendLoading: mutationAccept?.isLoading
    }
}

export default useAcceptFriendRequest