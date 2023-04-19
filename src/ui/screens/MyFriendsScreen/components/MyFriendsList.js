import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { borderRadius, fontSize, spacing, WIDTH } from '../../../constants/layout'
import { appShadow, colors } from '../../../constants/colors'
import { imageUrl } from '../../../core/sanityClient'
import SectionHeader from '../../../components/SectionHeader/Index'
import { useNavigation } from '@react-navigation/native'

const MyFriendsList = ({
    userFriends
}) => {

    const navigation = useNavigation()

    const renderItem = (item, index) => {
        const ImageSource = item?.backgroundImage !== undefined
            ? { uri: `${imageUrl(item?.backgroundImage)}` }
            : item?.avatarImage !== undefined
                ? { uri: `${imageUrl(item?.avatarImage)}` }
                : require('../../../assets/splash.png')

        return (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => navigation.navigate('UserProfile', { userInfo: item })}
            >
                <Image
                    source={ImageSource}
                    style={styles.image}
                />
                <View style={styles.namesContainer}>
                    <Text style={styles.names}>{item?.firstName}</Text>
                    <Text style={[styles.names, { fontWeight: '600' }]}>{item?.lastName}</Text>
                </View>

            </TouchableOpacity>
        )
    }

    const showMore = () => {
        return (
            <Text style={styles.showMore}>Scroll to all my friends ...</Text>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <SectionHeader title={'My friends'} />
                {userFriends.length > 6 && showMore()}
            </View>

            <View style={styles.listContainer}>
                {userFriends?.slice(0, 6)?.map((item, index) => renderItem(item, index))}
            </View>
        </View>
    )
}

export default MyFriendsList

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'flex-start',
        paddingHorizontal: spacing.s3
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    showMore: {
        fontSize: fontSize.p2,
        color: colors.gray
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: WIDTH * 0.9,
        maxHeight: WIDTH * 0.6,
        backgroundColor: colors.white,
        borderRadius: borderRadius,
        borderColor: colors.gray,
        ...appShadow
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: WIDTH * 0.3 - 1,
        height: WIDTH * 0.3 - 1
    },
    image: {
        overflow: 'hidden',
        borderRadius: borderRadius,
        width: WIDTH * 0.3 - 5,
        height: WIDTH * 0.3 - 5
    },
    namesContainer: {
        position: 'absolute',
        bottom: 5,
        left: 10
    },
    names: {
        color: colors.white,
        fontSize: fontSize.p3
    }
})