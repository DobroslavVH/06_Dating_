import { View, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ModalHeader from '../../components/ModalHeader/ModalHeader'
import Devider from '../../components/Devider/Devider'
import { spacing } from '../../constants/layout'
import UserContext from '../../context/UserContext'
import useChatMessages from '../../hooks/chatMessages/useChatMessages'
import Message from './components/Message'
import InputField from '../../components/InputField/InputField'
import ChatSubmitButton from '../../components/Buttons/ChatSubmitButton/ChatSubmitButton'
import styles from './styles'
import { colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const ChatScreen = ({
    route,
    getChatMessages,
    postChatMessage
}) => {

    const navigation = useNavigation()
    const flatlistRef = React.useRef(null)
    const { user } = useContext(UserContext)
    const { friend } = route.params
    const [content, setContent] = useState()
    const [newMessage, setNewMessage] = useState()

    const { messages, messagesLoading, messageIsFetching, messageRefresh, postNewMessage, postNewMessageLoading, createNewChat } = useChatMessages({
        myId: user?.userId,
        userId: friend?.userId,
        getChatMessages: getChatMessages,
        postChatMessage: postChatMessage,
        newMessage: newMessage
    })

    useEffect(() => {
        createNewChat()
    }, [])

    useEffect(() => {
        messageRefresh()
    }, [postNewMessageLoading])



    const headerComponent = () => {
        return (
            <View style={{ marginHorizontal: spacing.s2 }}>
                <ModalHeader title={`Chat with ${friend?.firstName}`} />
                <Devider />
            </View>
        )
    }


    const onSendMessagePress = () => {
        postNewMessage()
        if (!messageIsFetching) {
            setNewMessage()
        }
    }

    const onEndEditing = () => {
        setNewMessage({
            message: content,
            user_id: user?.userId,
            _key: content
        })
        setContent()
    }

    const renderItem = ({ item, index }) => {

        const messageIsMine = user?.userId === item?.user_id ? true : false
        const isFirstMessage = messages[index - 1]?.user_id !== item?.user_id
        const isLastMessage = messages[index + 1]?.user_id !== item?.user_id
        const isBiggerIndex = messages.length === index

        return (
            <Message
                messageIsMine={messageIsMine}
                isFirstMessage={isFirstMessage}
                isLastMessage={isLastMessage}
                avatarImage={messageIsMine ? user?.avatarImage : friend?.avatarImage}
                item={item}
                isBiggerIndex={isBiggerIndex}
                postNewMessageLoading={postNewMessageLoading}
            />
        )
    }

    const footerComponent = () => {
        return (
            <View style={styles.inputContainer}>
                <View style={{ width: '85%' }}>
                    <InputField
                        value={content}
                        setText={setContent}
                        chatScreenMode
                        onEndEditing={onEndEditing}
                    />
                </View>
                <TouchableOpacity
                    onPress={onSendMessagePress}
                >
                    <ChatSubmitButton color={newMessage ? colors.blue : colors.gray} />
                </TouchableOpacity>
            </View>
        )
    }

    const showMessages = newMessage ? messages?.concat([newMessage]) : messages

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (showMessages.length > 0) {
                flatlistRef.current.scrollToEnd()
            }
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        // if (!messageIsFetching) {

        //flatlistRef.current.scrollToEnd()

        // }
    }, [messages])


    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={30}
            style={{ flex: 1 }}
        >
            {headerComponent()}
            {showMessages.length > 0 && <FlatList
                ref={flatlistRef}
                // getItemLayout={(data, index) => (
                //     { length: 49, offset: 49 * index, index }
                // )}
                // initialScrollIndex={showMessages.length - 1}
                data={showMessages}
                keyExtractor={(item, index) => index}
                renderItem={(item, index) => renderItem(item, index)}
                extraData={messageIsFetching}
            />}
            {footerComponent()}
        </KeyboardAvoidingView>
    )
}

export default ChatScreen