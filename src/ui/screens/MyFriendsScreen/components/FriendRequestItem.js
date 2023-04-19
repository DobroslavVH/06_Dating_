import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import { imageUrl } from '../../../core/sanityClient'
import { borderRadius, fontSize, shadowProps, spacing } from '../../../constants/layout'
import { colors } from '../../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import SecondatyButton from '../../../components/Buttons/SecontaryButton/SecondatyButton'
import useRejectFriendRequest from '../../../hooks/friendsConnections/useRejectFriendRequest'
import useAcceptFriendRequest from '../../../hooks/friendsConnections/useAcceptFriendRequest'
import UserContext from '../../../context/UserContext'

const FriendRequestItem = ({
    item,
    friendsRequestsIds,
    putRejectFriendRequest,
    postFriendRequest,
    refresh
}) => {

    const navigation = useNavigation()

    const { user, setNumberOfRequests } = useContext(UserContext)

    const userIndex = friendsRequestsIds?.indexOf(item.userId) + 1

    const { rejectUser, rejectStatus } = useRejectFriendRequest({
        myId: user?.userId,
        userIndex: userIndex,
        putRejectFriendRequest: putRejectFriendRequest
    })

    const { acceptStatus, acceptFriend, acceptFriendLoading } = useAcceptFriendRequest({
        myId: user?.userId,
        userId: item?.userId,
        postFriendRequest: postFriendRequest
    })

    const handleOnReject = () => {
        rejectUser()
        if (rejectStatus == 'success' || rejectStatus === 'idle') {
            setNumberOfRequests(friendsRequestsIds.length - 1)
            setTimeout(() => {
                refresh()
            }, 1000)

        }
    }

    const handleOnAccept = () => {
        acceptFriend()
        if (!acceptFriendLoading) {
            handleOnReject()
        }
    }

    const ImageSource = item?.avatarImage !== undefined
        ? { uri: `${imageUrl(item?.avatarImage)}` }
        : item?.backgroundImage !== undefined
            ? { uri: `${imageUrl(item?.backgroundImage)}` }
            : require('../../../assets/splash.png')

    const handleUserPress = (item) => {
        navigation.navigate('UserProfile', { userInfo: item, friendsRequestsIds: friendsRequestsIds })
    }


    return (
        <TouchableOpacity
            key={item?.userId}
            style={styles.itemContainer}
            onPress={() => handleUserPress(item)}
        >
            <Image
                style={styles.image}
                source={ImageSource}
            />
            <View style={styles.textAndButtonContainer}>
                <Text
                    style={styles.text}
                    numberOfLines={2}
                >{item?.firstName} {item?.lastName}
                    {(item?.city !== undefined || item?.country !== undefined) && ' from'} {item?.city}
                    {item?.city !== undefined && ', '}{item?.country} send you a friend request!</Text>
                <View style={styles.buttonsContainer}>
                    <SecondatyButton
                        titleText={'Accept'}
                        buttonStyle={'edit'}
                        titleStyle={'regular'}
                        onPress={handleOnAccept}
                    />
                    <SecondatyButton
                        titleText={'Reject'}
                        buttonStyle={'edit'}
                        titleStyle={'regular'}
                        color={colors.red}
                        onPress={handleOnReject}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default FriendRequestItem

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        marginBottom: spacing.s1,
        borderRadius: borderRadius,
        backgroundColor: colors.white,
        ...shadowProps
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: borderRadius,
        top: 5,
        left: 5
    },
    textAndButtonContainer: {
        justifyContent: 'space-between',
        width: '100%',
        flexShrink: 1,
        marginHorizontal: spacing.s2
    },
    text: {
        marginVertical: 5,
        flexShrink: 1,
        fontSize: fontSize.p2,
        color: colors.gray
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: spacing.s1
    },
})