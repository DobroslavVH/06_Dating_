import { ENDPOINTS, TOKEN } from "../../../../ui/core/api";
import postChatMessage from "../../../../domain/usecases/chat/postChatMessage";

const postChatMessageFactory = () =>
    postChatMessage({
        ENDPOINTS,
        TOKEN
    })

export default postChatMessageFactory