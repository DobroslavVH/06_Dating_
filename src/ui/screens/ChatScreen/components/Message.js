import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { imageUrl } from '../../../core/sanityClient'
import { fontSize, spacing } from '../../../constants/layout'
import { colors } from '../../../constants/colors'
import CustomIndicator from '../../../components/CustomIndicator'

const Message = ({
    messageIsMine,
    isFirstMessage,
    isLastMessage,
    avatarImage,
    item,
    isBiggerIndex,
    postNewMessageLoading
}) => {

    const ImageSource = avatarImage
        ? { uri: `${imageUrl(avatarImage)}` }
        : require('../../../assets/splash.png')

    return (
        <View style={styles.container(messageIsMine)}>
            {isFirstMessage ? <View style={styles.imageContainer}>
                <Image
                    source={ImageSource}
                    style={styles.image}
                />
            </View> : <View style={{ width: 70 }} />}
            <View style={styles.textContainer(messageIsMine, isFirstMessage, isLastMessage)}>
                <Text style={styles.text}>{item?.message}</Text>
                {(postNewMessageLoading && isBiggerIndex) &&
                    <View style={{ paddingRight: spacing.s1 }}>
                        <CustomIndicator size='small' color={colors.white} />
                    </View>
                }
            </View>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: (messageIsMine) => ({
        flexDirection: messageIsMine ? 'row-reverse' : 'row',
        alignItems: 'center'
    }),
    imageContainer: {
        width: 49,
        height: 49,
        borderRadius: 24.5,
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: spacing.s1,

    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
    },
    textContainer: (messageIsMine, isFirstMessage, isLastMessage) => ({
        backgroundColor: messageIsMine ? colors.lightBlue : colors.blue,
        borderBottomLeftRadius: (!messageIsMine && !isLastMessage) ? 5 : 22.5,
        borderBottomRightRadius: (messageIsMine && !isLastMessage) ? 5 : 22.5,
        borderTopLeftRadius: messageIsMine ? 22.5 : 5,
        borderTopRightRadius: !messageIsMine ? 22.5 : 5,
        minHeight: 45,
        alignItems: 'center',
        marginBottom: !isFirstMessage ? 2 : 0,
        flexDirection: 'row'
    }),
    text: {
        fontSize: fontSize.p3,
        padding: spacing.s1,
        color: colors.white
    }
})