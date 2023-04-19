import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { WIDTH } from '../../../constants/layout'
import { colors } from '../../../constants/colors'
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../../../context/UserContext'
import { invalidateAllQueries } from '../../../core/query'

const ProfileHeader = ({
    avatarImage = false,
    backgroundImage = false,
    onPressAvatar,
    onPressBackground,
    editMode,
    userMode
}) => {

    const navigation = useNavigation()
    const { clearUser } = useContext(UserContext)

    const logOut = () => {
        clearUser()
        invalidateAllQueries()
        navigation.navigate('LogIn')
    }

    return (
        <View>
            <TouchableOpacity
                onPress={onPressBackground}
                disabled={!editMode}
                activeOpacity={0.9}
                style={styles.profileBackground}
            >
                {backgroundImage &&
                    <Image
                        style={styles.profileBackground}
                        source={{ uri: backgroundImage }}
                    />
                }
                {editMode &&
                    <View style={[styles.profileBackground, styles.overlay]} />
                }
            </TouchableOpacity>
            {avatarImage &&
                <TouchableOpacity
                    onPress={onPressAvatar}
                    activeOpacity={0.9}
                    style={styles.profileAvatarContainer}
                    disabled={!editMode}
                >
                    <Image
                        source={{ uri: avatarImage }}
                        style={styles.avatar}
                    />
                    {editMode &&
                        <View style={[styles.avatar, styles.overlay]} />
                    }
                </TouchableOpacity>
            }
            {editMode || !userMode &&
                <View style={styles.buttonPosition}>
                    <SubmitButton
                        text={'Log Out'}
                        onPress={logOut}
                        logout
                    />
                </View>
            }
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    profileBackground: {
        width: WIDTH,
        height: WIDTH * 0.6,
        backgroundColor: colors.lightgrey,
        borderBottomWidth: 1
    },
    profileAvatarContainer: {
        position: 'absolute',
        top: WIDTH * 0.6 - WIDTH * 0.15,
        left: WIDTH * 0.1,
        width: WIDTH * 0.3,
        height: WIDTH * 0.3,
        borderRadius: WIDTH * 0.15,
        borderWidth: 1,
        backgroundColor: colors.lightgrey
    },
    avatar: {
        width: WIDTH * 0.3 - 2,
        height: WIDTH * 0.3 - 2,
        borderRadius: WIDTH * 0.15,
    },
    buttonPosition: {
        position: 'absolute',
        right: 30,
        top: 50
    },
    overlay: {
        position: 'absolute',
        backgroundColor: colors.red,
        opacity: 0.2
    }
})