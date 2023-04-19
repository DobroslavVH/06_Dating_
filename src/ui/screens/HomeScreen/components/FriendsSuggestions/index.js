import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useContext, useState } from 'react'
import { fontSize, shadowProps, spacing, WIDTH } from '../../../../constants/layout'
import { colors } from '../../../../constants/colors'
import { Image } from 'react-native'
import { imageUrl } from '../../../../core/sanityClient'
import UserContext from '../../../../context/UserContext'
import { useNavigation } from '@react-navigation/native'
import SectionHeader from '../../../../components/SectionHeader/Index'
import FilterUsers from '../FilterUsers'


const FriendsSuggestions = ({ data }) => {

    const { user, userId } = useContext(UserContext)
    const x = new Animated.Value(0)
    const navigation = useNavigation()

    console.log('data', data)
    // filter out my profile from array with users
    const users = data
        ?.filter(user => user?.userId !== userId)
        ?.filter(item => !user?.friends?.includes(item?.userId))

    const [filterBy, setFilterBy] = useState('')

    const isLastElement = (index) => users.length - 1 === index ? true : false

    const handleGoToFrientPage = (item) => {
        navigation.navigate('UserProfile', { userInfo: item })
    }

    const listData = () => {
        switch (filterBy.category) {
            case '':
                return users
            case 'city':
                return users.filter(item => item.city === filterBy.title)
            case 'country':
                return users.filter(item => item.country === filterBy.title)
            case 'gender':
                return users.filter(item => item.gender === filterBy.title)
            default:
                return users
        }
    }

    const renderItem = ({ item, index }) => {
        const ImageSource = item?.backgroundImage !== undefined
            ? { uri: `${imageUrl(item?.backgroundImage)}` }
            : item?.avatarImage !== undefined
                ? { uri: `${imageUrl(item?.avatarImage)}` }
                : require('../../../../assets/splash.png')

        return (
            <TouchableOpacity
                style={[styles.imageContainer, isLastElement(index) && { marginRight: spacing.s2 }]}
                onPress={() => handleGoToFrientPage(item)}
            >
                <Image
                    style={styles.image}
                    source={ImageSource}
                />
                {item?.avatarImage !== undefined && item?.backgroundImage !== undefined &&
                    <View style={styles.smallImageContainer}>
                        <Image
                            style={styles.smallImage}
                            source={{ uri: `${imageUrl(item?.avatarImage)}` }}
                        />
                    </View>
                }
                <View style={styles.textContainer}>
                    <Text style={styles.firstName} numberOfLines={1}>{item.firstName} </Text>
                    <Text style={styles.lastName} numberOfLines={1}>{item.lastName} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const emptyComponent = () => {
        return (
            <View style={styles.emptyComponent}>
                <Text style={styles.emptyComponentText}>No matches with your search</Text>
            </View>
        )
    }

    return (
        <Animated.View>
            <View style={styles.sectionHeader}>
                <Animated.View style={{
                    transform: [{
                        translateX: x.interpolate({
                            inputRange: [0, 40, 250],
                            outputRange: [0, 0, - 190],
                            extrapolate: 'clamp'
                        })
                    }]
                }}>
                    <SectionHeader title={'Friends suggestions'} />
                </Animated.View>
            </View>
            <Animated.FlatList
                bounces={false}
                contentContainerStyle={styles.flatlistContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={listData()}
                keyExtractor={(item) => item.userId}
                renderItem={(item, index) => renderItem(item, index)}
                ListEmptyComponent={emptyComponent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x } } }],
                    { useNativeDriver: true }
                )}
            />
            <View style={styles.filtersContainer}>
                <Animated.View style={{
                    transform: [{
                        translateX: x.interpolate({
                            inputRange: [0, 40, 390],
                            outputRange: [0, 0, -390],
                            extrapolate: 'clamp'
                        })
                    }]
                }}>
                    <FilterUsers
                        filterBy={filterBy}
                        setFilterBy={setFilterBy}
                    />
                </Animated.View>
            </View>
        </Animated.View>
    )
}

export default FriendsSuggestions

const styles = StyleSheet.create({
    flatlistContainer: {
        backgroundColor: colors.white,
        paddingBottom: spacing.s2,
        justifyContent: "center",
        alignItems: 'center',
    },
    sectionHeader: {
        backgroundColor: colors.white,
        paddingLeft: spacing.s2,
        paddingVertical: spacing.s1 / 2
    },
    filtersContainer: {
        paddingTop: spacing.s1,
        paddingBottom: spacing.s2,
        marginBottom: spacing.s2,
        backgroundColor: colors.white,
        borderBottomWidth: 0.2,
        borderBottomColor: colors.lightgrey
    },
    headerText: {
        fontSize: fontSize.p4,
        fontWeight: '500'
    },
    imageContainer: {
        backgroundColor: colors.white,
        marginLeft: spacing.s2,
        borderRadius: spacing.s2,
        shadowColor: colors.gray,
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 5,
            height: 5
        }
    },
    image: {
        width: WIDTH / 2.8,
        height: WIDTH / 1.8,
        borderRadius: spacing.s2,
        borderWidth: 1,
        borderColor: colors.lightgrey
    },
    smallImageContainer: {
        position: 'absolute',
        width: WIDTH / 7,
        height: WIDTH / 7,
        borderRadius: WIDTH / 14,
        top: spacing.s1,
        left: spacing.s1,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowRadius: 8,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    smallImage: {
        width: WIDTH / 7,
        height: WIDTH / 7,
        borderRadius: WIDTH / 14
    },
    textContainer: {
        position: 'absolute',
        bottom: spacing.s1 / 2,
        left: spacing.s1,
        flexShrink: 1
    },
    firstName: {
        color: colors.white,
        fontWeight: '400',
        fontSize: fontSize.p2
    },
    lastName: {
        color: colors.white,
        fontWeight: '500',
        fontSize: fontSize.p3
    },
    emptyComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: WIDTH * 0.05,
        width: WIDTH * 0.9,
        height: WIDTH / 1.8,
        borderRadius: spacing.s2,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderColor: colors.lightgrey,
        ...shadowProps
    },
    emptyComponentText: {
        fontSize: fontSize.p5,
        color: colors.lightgrey
    }
})