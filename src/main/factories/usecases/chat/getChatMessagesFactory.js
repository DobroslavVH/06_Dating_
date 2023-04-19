import { ENDPOINTS, QUERIES } from '../../../../ui/core/api'
import getChatMessages from '../../../../domain/usecases/chat/getChatMessages'

const getChatMessagesFactory = () =>
    getChatMessages({
        ENDPOINTS,
        QUERIES
    })

export default getChatMessagesFactory