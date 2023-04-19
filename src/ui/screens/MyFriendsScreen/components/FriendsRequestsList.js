import { View, StyleSheet } from 'react-native'
import React from 'react'
import { spacing } from '../../../constants/layout'
import SectionHeader from '../../../components/SectionHeader/Index'
import CustomIndicator from '../../../components/CustomIndicator'
import FriendRequestItem from './FriendRequestItem'

const FriendsRequestsList = ({
    loading,
    refresh,
    friendsRequests,
    friendsRequestsIds,
    putRejectFriendRequest,
    postFriendRequest
}) => {

    const renderItem = (item) => {
        return (
            <View key={item?.userId}>
                <FriendRequestItem
                    item={item}
                    friendsRequestsIds={friendsRequestsIds}
                    putRejectFriendRequest={putRejectFriendRequest}
                    postFriendRequest={postFriendRequest}
                    refresh={refresh}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SectionHeader title={'Friends Requests'} />
            {loading && <CustomIndicator color={'black'} />}
            {friendsRequests?.map((item, index) => renderItem(item, index))}
        </View>
    )
}

export default FriendsRequestsList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.s3
    }
})