import { View, ScrollView, RefreshControl } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../../context/UserContext'
import Body from '../../components/Body/Body'
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader'
import styles from './styles'
import useUserStories from '../../hooks/useUserStories'
import UserStories from '../../components/UserStories/UserStories'
import SecondatyButton from '../../components/Buttons/SecontaryButton/SecondatyButton'
import { imageUrl } from '../../core/sanityClient'

const ProfileScreen = ({
    updateUser,
    getUserStories
}) => {

    const navigation = useNavigation()
    const { user } = useContext(UserContext)

    const {
        userStories,
        loading,
        refetch,
        error
    } = useUserStories({ userId: user?.userId, getUserStories })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refetch()
        })
        return unsubscribe

    }, [navigation])

    const buttons = () => {
        return (
            <View style={styles.editContainer}>
                <SecondatyButton
                    buttonStyle={'edit'}
                    titleText={'Create Story'}
                    titleStyle={'regular'}
                    onPress={() => navigation.navigate('CreateStory', { userId: user?.userId })}
                />
                <SecondatyButton
                    buttonStyle={'edit'}
                    titleText={'Edit Profile'}
                    titleStyle={'regular'}
                    onPress={() => navigation.navigate('EditProfile', { updateUser })}
                />
            </View>
        )
    }


    const onRefresh = () => refetch()

    return (
        <Body>
            <ScrollView
                bounces={true}
                refreshControl={<RefreshControl
                    refreshing={loading}
                    onRefresh={onRefresh}
                />}
            >
                <ProfileHeader
                    avatarImage={user?.avatarImage && `${imageUrl(user?.avatarImage)}`}
                    backgroundImage={user?.backgroundImage && `${imageUrl(user?.backgroundImage)}`}
                />
                {buttons()}
                <View style={styles.storiesContainer}>
                    <UserStories
                        key={'myStories'}
                        sectionTitle={'My Stories'}
                        data={userStories}
                        isLoading={loading}
                        error={error}
                    />
                </View>
            </ScrollView>

        </Body>
    )
}

export default ProfileScreen