import { FlatList, Image, RefreshControl, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Body from '../../components/Body/Body'
import { reactQueryTypes } from '../../core/query'
import { useQuery } from 'react-query'
import UserContext from '../../context/UserContext'
import useUsersAndFriendsStories from '../../hooks/useUsersAndFriendsStories'
import SingleStory from '../../components/UserStories/SingleStory'
import SectionHeader from '../../components/SectionHeader/Index'
import { spacing } from '../../constants/layout'
import FriendsSuggestions from './components/FriendsSuggestions'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import { imageUrl } from '../../core/sanityClient'
import useAllUsers from '../../hooks/useAllUsers'

const HomeScreen = ({
    getAllUsers,
    getUsersAndFriendsStories
}) => {

    const { user } = useContext(UserContext)

    const navigation = useNavigation()

    const { allUsers, allUsersLoading, allUsersRefresh } = useAllUsers({ getAllUsers: getAllUsers })

    // get ids of non friends users
    const usersIds = allUsers
        ?.filter(item => item?.userId !== user?.userId)
        ?.filter(item => !user?.friends?.includes(item?.userId))
        ?.map(item => item.userId)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            usersStoriesRefetch()
            allUsersRefresh()
        })
        return unsubscribe
    }, [])

    const { usersStories,
        usersStoriesLoading,
        usersStoriesRefetch } = useUsersAndFriendsStories({
            usersIds: usersIds,
            getUsersAndFriendsStories: getUsersAndFriendsStories
        })


    const onRefresh = () => {
        usersStoriesRefetch()
        allUsersRefresh()
    }


    const renderStory = ({ item, index }) => {
        const friendAvatarImage = allUsers?.find(friend => friend?.userId === item?.userId)?.avatarImage

        return (
            <View style={{ marginHorizontal: spacing.s3 }}>
                {index === 0 && <SectionHeader title={'Users Stories'} />}
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
                data={usersStories}
                keyExtractor={(item, index) => index}
                renderItem={(item, index) => renderStory(item, index)}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl
                    refreshing={usersStoriesLoading}
                    onRefresh={onRefresh} />}
                ListHeaderComponent={!allUsersLoading &&
                    <FriendsSuggestions data={allUsers} />
                }
            />
        </Body>
    )
}

export default HomeScreen