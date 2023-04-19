import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { spacing } from '../../../constants/layout'
import ModalHeader from '../../../components/ModalHeader/ModalHeader'
import Devider from '../../../components/Devider/Devider'
import AllMyFriendsItem from './AllMyFriendsItem'

const AllMyFriends = ({ route }) => {

    const { friendsData, putRejectFriendRequest, userFriends } = route.params

    const headerComponent = () => {
        return (
            <View style={{ marginHorizontal: spacing.s2 }}>
                <ModalHeader title={'All My Friends'} />
                <Devider />
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <AllMyFriendsItem
                item={item}
                putRejectFriendRequest={putRejectFriendRequest}
                userFriends={userFriends}
            />
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={headerComponent}
                data={friendsData}
                keyExtractor={(item) => item?.useId}
                renderItem={(item) => renderItem(item)}
            />
        </View>
    )
}

export default AllMyFriends

const styles = StyleSheet.create({
    container: {
        paddingBottom: spacing.s3
    }
})