import { useNavigation } from "@react-navigation/native"
import { useMutation } from "react-query"
import { reactQuery, reactQueryTypes } from "../../core/query"

const useRejectFriendRequest = ({
    myId,
    userIndex,
    putRejectFriendRequest
}) => {

    const navigation = useNavigation()

    const reject = {
        "mutations": [
            {
                "patch": {
                    "id": myId,
                    "unset": [`friend_requests[${userIndex}]`]
                }
            }
        ]
    }

    const rejectMutation = useMutation({
        mutationFn: (req) => putRejectFriendRequest({ data: req }),
        onSuccess: () => {
            reactQuery.invalidateQueries(reactQueryTypes.usersRequestetFriendship)
            //navigation.goBack()
        }
    })

    const rejectUser = () => {
        rejectMutation.mutate(reject)
    }

    return {
        rejectUser,
        rejectStatus: rejectMutation?.status
    }
}

export default useRejectFriendRequest