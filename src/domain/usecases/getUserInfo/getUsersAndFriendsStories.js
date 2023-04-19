import { UserStories } from "../../entities/UserInfo/UserStoriesEntity"

export default getUsersAndFriendsStories = ({
    ENDPOINTS,
    QUERIES
}) => async ({
    usersIds
}) => {

        const usersToString = usersIds.map(item => `\"${item}\"`).flat()
        const query = QUERIES.usersStories(usersToString.toString())

        const usersStoriesResponse = await fetch(ENDPOINTS.common(query))
            .then(response => response.json())
            .then(response => response.result)

        const NormalizeUserData = () => {
            return usersStoriesResponse.map((response) => UserStories({
                content: response?.content || '',
                location: response?.location || '',
                postImage: response?.postImage?.asset?._ref,
                title: response?.title || '',
                createAt: response?._createdAt,
                userId: response?.userId
            }))
        }

        if (usersStoriesResponse === undefined) {
            return undefined
        } else {
            return NormalizeUserData()
        }
    }