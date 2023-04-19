import { ChatMessageEntity } from '../../entities/Chat/ChatMessageEntity'

const getChatMessages = ({
    ENDPOINTS,
    QUERIES
}) => async ({
    myId,
    userId
}) => {
        const chatIdGenerator = () => {
            if (myId?.charAt(0) > userId?.charAt(0)) {
                return myId + userId
            } else {
                return userId + myId
            }
        }
        const params = QUERIES.getChatMessages(chatIdGenerator())

        const response = await fetch(ENDPOINTS.common(params))
            .then(res => res.json())
            .then(res => res.result[0])

        const NormalizeUserData = () => ChatMessageEntity({
            chatId: response?.chat_Id,
            messages: response?.messages || []
        })

        if (response === undefined) {
            return undefined
        } else {
            return NormalizeUserData()
        }

    }

export default getChatMessages