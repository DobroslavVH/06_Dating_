import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import FriendsRequests from './components/FriendsRequestsList'
import Body from '../../components/Body/Body'
import MyFriendsList from './components/MyFriendsList'
import useFriendsRequests from '../../hooks/friendsAndFriendsRequests/useFriendsRequests'
import { Animated, FlatList, Image, RefreshControl, View } from 'react-native'
import useMyFriendsAndFriendRequests from '../../hooks/friendsAndFriendsRequests/useMyFriendsAndFriendRequests'
import useFriends from '../../hooks/friendsAndFriendsRequests/useFriends'
import { useNavigation } from '@react-navigation/native'
import useUsersAndFriendsStories from '../../hooks/useUsersAndFriendsStories'
import SingleStory from '../../components/UserStories/SingleStory'
import SectionHeader from '../../components/SectionHeader/Index'
import { spacing } from '../../constants/layout'
import { imageUrl } from '../../core/sanityClient'
import styles from './styles'


const MyFriendsScreen = ({
    getFriendsRequests,
    putRejectFriendRequest,
    postFriendRequest,
    getMyFriendsAndRequests,
    getUsersAndFriendsStories
}) => {

    const navigation = useNavigation()

    const { user, setNumberOfRequests } = useContext(UserContext)

    const { userFriends, userFriendsRequests, myFriendsAndRequestLoading, myFriendsandRequestsRefetch, myFriendsAndRequestStatus } = useMyFriendsAndFriendRequests({
        myId: user?.userId,
        getMyFriendsAndRequests: getMyFriendsAndRequests
    })

    const { friendsStories,
        friendsStoriesLoading,
        friendsStoriesRefetch } = useUsersAndFriendsStories({
            friendsIds: userFriends,
            getUsersAndFriendsStories: getUsersAndFriendsStories
        })

    const { friendsData, friendsLoading, friendsRefetch } = useFriends({
        users: userFriends,
        getFriendsRequests: getFriendsRequests
    })

    const { requestsData, loading, friendsRequestsRefetch } = useFriendsRequests({
        users: userFriendsRequests,
        getFriendsRequests: getFriendsRequests
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            friendsRequestsRefetch()
            myFriendsandRequestsRefetch()
            friendsRefetch()
            friendsStoriesRefetch()
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        if (myFriendsAndRequestStatus === 'success') {
            friendsRefetch()
            friendsRequestsRefetch()
        }
    }, [myFriendsAndRequestStatus])


    const onRefresh = () => {
        friendsRequestsRefetch()
        myFriendsandRequestsRefetch()
        friendsRefetch()
        friendsStoriesRefetch()
    }

    const scrollX = new Animated.Value(0)

    const onScrollX = () => {
        navigation.navigate('AllMyFriends', {
            friendsData: friendsData,
            putRejectFriendRequest: putRejectFriendRequest,
            userFriends: userFriends
        })
    }

    const myFriendsList = () => {
        return (
            <View>
                {
                    userFriendsRequests.length > 0
                    && <FriendsRequests
                        loading={loading}
                        refresh={onRefresh}
                        friendsRequests={requestsData}
                        friendsRequestsIds={userFriendsRequests}
                        getFriendsRequests={getFriendsRequests}
                        putRejectFriendRequest={putRejectFriendRequest}
                        postFriendRequest={postFriendRequest}
                    />
                }
                {
                    friendsData.length > 0
                    &&
                    <Animated.ScrollView
                        scrollEnabled={friendsData.length > 6 ? true : false}
                        contentContainerStyle={{ marginBottom: 20 }}
                        horizontal
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        x:
                                            scrollX
                                    }
                                }
                            }],
                            {
                                useNativeDriver: true,
                                listener: event => {
                                    const { contentOffset: { x } } = event.nativeEvent
                                    x > 30 ? onScrollX() : -30 > x && onScrollX()
                                }

                            })}
                        pagingEnabled={true}
                        scrollEventThrottle={50}
                    >
                        <MyFriendsList
                            userFriends={friendsData}
                            refresh={onRefresh}
                            getFriendsRequests={getFriendsRequests}
                        />
                    </Animated.ScrollView>
                }
            </View>
        )
    }

    const renderStory = ({ item, index }) => {

        const friendAvatarImage = friendsData?.find(friend => friend?.userId === item?.userId)?.avatarImage

        return (
            <View style={{ marginHorizontal: spacing.s3 }}>
                {index === 0 && <SectionHeader title={'My Friends Stories'} />}
                <View style={{ paddingTop: spacing.s5 }}>
                    <SingleStory item={item} index={index} />
                </View>
                {friendAvatarImage && <View style={styles.avatarcontainer(index)}>
                    <Image
                        source={{ uri: `${imageUrl(friendAvatarImage)}` }}
                        style={styles.avatarImage}
                    />
                </View>}
            </View>
        )
    }

    return (
        <Body header>
            <FlatList
                data={friendsStories}
                keyExtractor={(item, index) => index}
                renderItem={(item, index) => renderStory(item, index)}
                showsVerticalScrollIndicator={false}
                bounces={true}
                refreshControl={<RefreshControl
                    refreshing={friendsStoriesLoading}
                    onRefresh={onRefresh}
                />}
                ListHeaderComponent={myFriendsList()}
            />


        </Body>
    )
}

export default MyFriendsScreen