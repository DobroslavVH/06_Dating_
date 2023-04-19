import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { borderRadius, fontSize, spacing, WIDTH } from '../../../constants/layout'
import { imageUrl } from '../../../core/sanityClient'
import { colors } from '../../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import useRemoveFriend from '../../../hooks/friendsConnections/useRemoveFriend'
import UserContext from '../../../context/UserContext'

const AllMyFriendsItem = ({
    item,
    putRejectFriendRequest,
    userFriends
}) => {

    const { user } = useContext(UserContext)
    const navigation = useNavigation()
    const scrollX = new Animated.Value(0)
    const ImageSource = item?.backgroundImage !== undefined
        ? { uri: `${imageUrl(item?.backgroundImage)}` }
        : item?.avatarImage !== undefined
            ? { uri: `${imageUrl(item?.avatarImage)}` }
            : require('../../../assets/splash.png')

    const indexInMyList = userFriends?.indexOf(item?.userId) + 1
    const indexInUserList = item?.friends?.indexOf(user?.userId)

    const { removeFriend, removeFriendStatus, removeFriendLoading } = useRemoveFriend({
        myId: user?.userId,
        indexInMyList: indexInMyList,
        userId: item?.userId,
        indexInUserList: indexInUserList,
        putRejectFriendRequest: putRejectFriendRequest
    })

    const ImageAndInfo = () => {
        return (
            <View style={styles.itemContainer}>
                <Image
                    source={ImageSource}
                    style={styles.image}
                />
                <View style={styles.contentContainder}>
                    <Text style={styles.names}>{item?.firstName} {item?.lastName}</Text>
                    <Text>{item?.city} / {item?.country}</Text>
                </View>
            </View>
        )
    }

    const handleRemoveFriend = () => {
        removeFriend()
    }

    const deleteView = scrollX.interpolate({
        inputRange: [0, WIDTH * 0.6],
        outputRange: [WIDTH * 0.2, 0],
        extrapolate: 'clamp'
    })

    const toProfile = scrollX.interpolate({
        inputRange: [0, WIDTH * 0.6],
        outputRange: [WIDTH * 0.2, -WIDTH * 0.2],
        extrapolate: 'clamp'
    })

    const chatView = scrollX.interpolate({
        inputRange: [0, WIDTH * 0.6],
        outputRange: [WIDTH * 0.2, -WIDTH * 0.4],
        extrapolate: 'clamp'
    })

    return (
        <View key={item?.userId}>
            <View style={{ flexDirection: 'row' }}>
                <Animated.FlatList
                    bounces={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={ImageAndInfo}
                    contentContainerStyle={{ width: WIDTH * 1.6 }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                />

                <Animated.View style={{ transform: [{ translateX: deleteView }] }}>
                    <TouchableOpacity
                        style={[styles.iconContainer, { backgroundColor: colors.red }]}
                        onPress={handleRemoveFriend}
                    >
                        <View style={styles.triangleCorner} />
                        <Image
                            source={require('../../../assets/delete.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={{ transform: [{ translateX: toProfile }] }}>
                    <TouchableOpacity
                        style={[styles.iconContainer, { backgroundColor: colors.blue }]}
                        onPress={() => navigation.navigate('UserProfile', { userInfo: item })}
                    >
                        <View style={styles.triangleCorner} />
                        <Image
                            source={require('../../../assets/profile.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[{ transform: [{ translateX: chatView }] }]}>
                    <TouchableOpacity
                        style={[styles.iconContainer, { backgroundColor: colors.lightBlue }]}
                        onPress={() => navigation.navigate('Chat', { friend: item })}
                    >
                        <View style={styles.triangleCorner} />
                        <Image
                            source={require('../../../assets/chat.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    )
}

export default AllMyFriendsItem

const styles = StyleSheet.create({

    itemContainer: {
        width: WIDTH,
        marginLeft: spacing.s2,
        marginBottom: spacing.s2,
        flexDirection: 'row',
        zIndex: 1
    },
    image: {
        overflow: 'hidden',
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        width: WIDTH * 0.25,
        height: WIDTH * 0.25
    },
    contentContainder: {
        justifyContent: 'space-between',
        width: WIDTH - (WIDTH * 0.25) - spacing.s2,
        borderColor: colors.lightgrey,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.2,
        padding: spacing.s2
    },
    names: {
        color: colors.gray,
        fontSize: fontSize.p5
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        width: WIDTH * 0.2,
        height: WIDTH * 0.25,
        backgroundColor: colors.blue,
    },
    icon: {
        width: 50,
        height: 50
    },
    triangleCorner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: "transparent",
        borderTopColor: colors.white,
    },
})