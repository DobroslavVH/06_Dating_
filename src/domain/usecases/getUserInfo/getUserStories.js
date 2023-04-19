import { UserStories } from "../../entities/UserInfo/UserStoriesEntity"

export default getUserStories = ({
    ENDPOINTS,
    QUERIES
}) => async ({
    relatedUser
}) => {
        const params = QUERIES.userStories(relatedUser)

        const userPostsResponse = await fetch(ENDPOINTS.getUserStories(params))
            .then(response => response.json())
            .then(response => response.result)


        const NormalizeUserData = () => {
            return userPostsResponse.map((response) => UserStories({
                content: response?.content || '',
                location: response?.location || '',
                postImage: response?.postImage?.asset?._ref,
                title: response?.title || '',
                createAt: response?._createdAt,
            }))

        }

        if (userPostsResponse === undefined) {
            return undefined
        } else {
            return NormalizeUserData()
        }
    }