import { useNavigation } from "@react-navigation/native"
import { useMutation } from "react-query"
import { reactQuery, reactQueryTypes } from "../core/query"

const usePostStories = ({
    story,
    postStory
}) => {
    const navigation = useNavigation()

    const mutationObject = {
        "mutations": [
            {
                "create": {
                    "_type": "userPosts",
                    "userId": story?.userId,
                    "title": story?.title,
                    "location": story?.location,
                    "content": story?.content,
                    "postImage": story?.postImage
                }
            }
        ]
    }

    const mutationStory = useMutation({
        mutationFn: (req) => postStory({ story: req }),
        onSuccess: () => {
            reactQuery.invalidateQueries(reactQueryTypes.userPosts)
            navigation.goBack()
        }
    })

    const postNewStory = () => {
        mutationStory.mutate(mutationObject)
    }

    return {
        postNewStory,
        loading: mutationStory?.isLoading,
    }
}

export default usePostStories
