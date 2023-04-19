import React from "react";
import ChatScreen from "../../../../ui/screens/ChatScreen";
import getChatMessagesFactory from "../../usecases/chat/getChatMessagesFactory";
import postChatMessageFactory from "../../usecases/chat/postChatMessageFactory";

const ChatScreenFactory = ({ route }) => <ChatScreen
    route={route}
    getChatMessages={getChatMessagesFactory()}
    postChatMessage={postChatMessageFactory()}
/>

export default ChatScreenFactory