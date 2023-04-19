import { useInfiniteQuery, useMutation } from "react-query";
import { reactQueryTypes } from "../../core/query";

const useChatMessages = ({
    myId,
    userId,
    getChatMessages,
    postChatMessage,
    newMessage
}) => {
    // get messages
    const { data, isLoading, refetch, isFetching } = useInfiniteQuery(reactQueryTypes.myChatMessages, () => getChatMessages({ myId, userId }))

    //console.log('query', query)
    const chatIdGenerator = () => {
        if (myId?.charAt(0) > userId?.charAt(0)) {
            return myId + userId
        } else {
            return userId + myId
        }
    }

    // create new chat message if there is no chat between these two person
    const createNewChatObject = {
        "mutations": [
            {
                "createIfNotExists": {
                    "_id": chatIdGenerator(),
                    "_type": "chat",
                    "chat_id": chatIdGenerator(),
                    "messages": [{ _type: 'message', user_id: '0', message: "Hi", _key: "0" }]
                }
            }
        ]
    }

    // add new messages to already existing chat
    const newMessageObject = {
        "mutations": [
            {
                "patch": {
                    "query": `*[_type == 'chat'][chat_id match "${chatIdGenerator()}"]`,
                    "insert": {
                        "after": "messages[-1]",
                        "items": [newMessage]
                    }

                }
            }
        ]
    }


    const mutationPostNewMessage = useMutation({
        mutationFn: (req) => postChatMessage({ data: req }),
    })

    const postNewMessage = () => {
        mutationPostNewMessage.mutate(newMessageObject)
    }

    // create new chat if no exist
    const mutationCreateNewChat = useMutation({
        mutationFn: (req) => postChatMessage({ data: req }),
    })

    const createNewChat = () => {
        mutationCreateNewChat.mutate(createNewChatObject)
    }

    return {
        messages: data?.pages[0]?.messages || [],
        messagesLoading: isLoading,
        messageRefresh: refetch,
        messageIsFetching: isFetching,
        postNewMessage: postNewMessage,
        postNewMessageLoading: mutationPostNewMessage?.isLoading,
        createNewChat: createNewChat
    }
}

export default useChatMessages 
