import { View, ScrollView, RefreshControl } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader'
import BackButton from '../../components/Buttons/BackButton/BackButton'
import styles from './styles'
import FriendInfo from './components/UserInfo'
import UserContext from '../../context/UserContext'
import { reactQuery, reactQueryTypes } from '../../core/query'
import UserStories from '../../components/UserStories/UserStories'
import { imageUrl } from '../../core/sanityClient'
import useUserStories from '../../hooks/useUserStories'
import SecondatyButton from '../../components/Buttons/SecontaryButton/SecondatyButton'
import useAcceptFriendRequest from '../../hooks/friendsConnections/useAcceptFriendRequest'
import useRejectFriendRequest from '../../hooks/friendsConnections/useRejectFriendRequest'
import useSendFriendRequest from '../../hooks/friendsConnections/useSendFriendRequest'
import useRemoveFriend from '../../hooks/friendsConnections/useRemoveFriend'
import { colors } from '../../constants/colors'
import CustomIndicator from '../../components/CustomIndicator'
import useMyFriendsAndFriendRequests from '../../hooks/friendsAndFriendsRequests/useMyFriendsAndFriendRequests'
import { useNavigation } from '@react-navigation/native'
import ChatButton from '../../components/Buttons/ChatButton/ChatButton'

const UserProfile = ({
    putRejectFriendRequest,
    getUserStories,
    postFriendRequest,
    getMyFriendsAndRequests,
    route
}) => {
    const navigation = useNavigation()
    // logged user 
    const { user, setNumberOfRequests } = useContext(UserContext)
    // current user, which one is on screen now
    const { userInfo, friendsRequestsIds } = route?.params

    const { userFriends, userFriendsRequests, myFriendsAndRequestLoading, myFriendsandRequestsRefetch, myFriendsAndRequestStatus } = useMyFriendsAndFriendRequests({
        myId: user?.userId,
        getMyFriendsAndRequests: getMyFriendsAndRequests
    })

    const userIndex = userFriends?.indexOf(userInfo?.userId)
    const indexInMyList = userFriends?.indexOf(userInfo?.userId) + 1
    const indexInUserList = userInfo?.friends?.indexOf(user?.userId)
    const isSendRequest = userInfo?.friendRequest?.some(item => item === user?.userId)
    const isFriend = userFriends?.some(item => item === userInfo?.userId)
    const isRequestReceived = userFriendsRequests?.some(item => item === userInfo?.userId)


    // get current user stories/posts
    const {
        userStories,
        loading,
        refetch,
        error
    } = useUserStories({ userId: userInfo?.userId, getUserStories })



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            myFriendsandRequestsRefetch()
        })
        return unsubscribe

    }, [navigation])

    const { rejectUser, rejectStatus } = useRejectFriendRequest({
        myId: user?.userId,
        userIndex: userIndex,
        putRejectFriendRequest: putRejectFriendRequest
    })

    const { acceptFriend, acceptStatus, acceptFriendLoading } = useAcceptFriendRequest({
        myId: user?.userId,
        userId: userInfo?.userId,
        postFriendRequest: postFriendRequest
    })

    const { postRequest, postRequestLoading, postRequestStatus } = useSendFriendRequest({
        myId: user?.userId,
        userId: userInfo?.userId,
        postFriendRequest: postFriendRequest
    })

    const { removeFriend, removeFriendStatus, removeFriendLoading } = useRemoveFriend({
        myId: user?.userId,
        indexInMyList: indexInMyList,
        userId: userInfo?.userId,
        indexInUserList: indexInUserList,
        putRejectFriendRequest: putRejectFriendRequest
    })

    // reject user request
    const handleOnReject = () => {
        rejectUser()
        if (rejectStatus === 'success' || rejectStatus === 'idle') {
            setNumberOfRequests(user?.friendRequests?.filter(item => item !== '').filter(item => item !== userInfo?.userId)?.length)
        }
    }

    // accept user request
    const handleOnAccept = () => {
        acceptFriend()
        if (!acceptFriendLoading === true) {
            handleOnReject()
            myFriendsandRequestsRefetch()
        }
    }

    // post friend request / remove friend
    const handleAddRemove = () => {
        if (!isFriend) {
            postRequest()
        } else {
            removeFriend()
            myFriendsandRequestsRefetch()
        }
    }


    const addFriendButton = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                <SecondatyButton
                    titleText={isFriend
                        ? 'Remove' : isSendRequest !== true ? '+ Friend' : 'Pending'}
                    buttonStyle={'edit'}
                    titleStyle={'regular'}
                    onPress={handleAddRemove}
                    disabled={isSendRequest}
                />
                {(removeFriendLoading || acceptFriendLoading) &&
                    <View style={{ position: 'absolute' }}>
                        <CustomIndicator color={'white'} size={'small'} />
                    </View>
                }
            </View >
        )
    }

    const acceptRemoveButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <View style={{ width: 90 }}>
                    <SecondatyButton
                        titleText={'Accept'}
                        buttonStyle={'edit'}
                        titleStyle={'regular'}
                        onPress={() => handleOnAccept()}
                    />
                </View>
                <View style={{ width: 90 }}>
                    <SecondatyButton
                        titleText={'Reject'}
                        buttonStyle={'edit'}
                        titleStyle={'regular'}
                        onPress={() => handleOnReject()}
                        color={colors.red}
                    />
                </View>
            </View>
        )
    }

    const chatButton = () => {
        return (
            <ChatButton user={userInfo} />
        )
    }

    const onBackPress = () => {
        reactQuery.invalidateQueries(reactQueryTypes.userPosts)
    }

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={loading}
                    onRefresh={refetch}
                />}
            >
                <ProfileHeader
                    avatarImage={userInfo?.avatarImage && `${imageUrl(userInfo?.avatarImage)}`}
                    backgroundImage={userInfo?.backgroundImage && `${imageUrl(userInfo?.backgroundImage)}`}
                    userMode
                />
                <BackButton
                    onPressFunction={() => onBackPress()}
                />
                <View style={styles.contentContainer}>
                    <View style={styles.buttonPosition}>
                        {isFriend && chatButton()}
                        {isRequestReceived ? acceptRemoveButtons() : addFriendButton()}
                    </View>
                    <FriendInfo
                        userInfo={userInfo}
                    />
                </View>
                {userStories?.length > 0 &&
                    <UserStories
                        key={'userStories'}
                        sectionTitle={userInfo?.firstName ? `${userInfo?.firstName}'s Stories` : 'User Stories'}
                        data={userStories}
                        isLoading={loading}
                        error={error}
                    />
                }
            </ScrollView>
        </View>
    )
}

export default UserProfile