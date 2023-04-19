import { useNavigation } from "@react-navigation/native"
import { useMutation } from "react-query"

const useSendFriendRequest = ({
    myId,
    userId,
    postFriendRequest
}) => {

    const navigation = useNavigation()

    const friendRequest = {
        "mutations": [
            {
                "patch": {
                    "id": userId,
                    "insert": {
                        "after": "friend_requests[-1]",
                        "items": [myId]
                    }
                }
            }
        ]
    }

    const mutationPostRequest = useMutation({
        mutationFn: (req) => postFriendRequest({ data: req }),
        onSuccess: () => {
            navigation.goBack()
        }
    })
    const postRequest = () => {
        mutationPostRequest.mutate(friendRequest)
    }

    return {
        postRequest,
        postRequestLoading: mutationPostRequest?.isLoading,
        postRequestStatus: mutationPostRequest?.status
    }
}

export default useSendFriendRequest