import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { borderRadius, fontSize, shadowProps, spacing } from '../../constants/layout'
import { imageUrl } from '../../core/sanityClient'

const SingleStory = ({ item, index }) => {
    const date = new Date(item?.createAt)

    return (
        <View style={styles.itemContainer(index)}>
            <Image
                source={item?.postImage !== undefined
                    ? { uri: `${imageUrl(item?.postImage)}` }
                    : require('../../assets/splash.png')
                }
                style={styles.itemImage(index)}
            />
            <View style={styles.itemHeader}>
                <Text style={styles.itemHeaderText}>{item?.title}</Text>
            </View>
            <View style={styles.dateLocationContainer}>
                <View style={{ flexDirection: 'row', flexShrink: 1 }}>
                    <Text style={[styles.dateLocationtext, { color: colors.gray }]}>Date: </Text>
                    <View style={{ flexShrink: 1 }}>
                        <Text
                            style={[styles.dateLocationtext, { fontStyle: 'italic' }]}
                            numberOfLines={1}
                        >
                            {date?.toDateString() || ' - '}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexShrink: 1 }}>
                    <Text style={[styles.dateLocationtext, { color: colors.gray }]}>Location: </Text>
                    <View style={{ flexShrink: 1 }}>
                        <Text
                            style={[styles.dateLocationtext, { fontStyle: 'italic' }]}
                            numberOfLines={1}
                        >
                            {item?.location.length !== 0 ? item?.location : ' - '}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{item?.content}</Text>
            </View>
        </View>
    )
}

export default SingleStory

const styles = StyleSheet.create({
    itemContainer: (index) => ({
        marginBottom: spacing.s3,
        borderBottomColor: colors.lightgrey,
        borderBottomWidth: 3,
        backgroundColor: colors.white,
        borderTopLeftRadius: index === 0 ? borderRadius : 0,
        borderTopRightRadius: index === 0 ? borderRadius : 0,
        ...shadowProps
    }),
    itemImage: (index) => ({
        width: '100%',
        height: 200,
        borderTopLeftRadius: index === 0 ? borderRadius : 0,
        borderTopRightRadius: index === 0 ? borderRadius : 0
    }),
    itemHeader: {
        position: 'absolute',
        top: spacing.s1,
        left: spacing.s1,
    },
    itemHeaderText: {
        fontSize: 20
    },
    dateLocationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: spacing.s2,
        borderBottomWidth: 2,
        borderBottomColor: colors.lightgrey
    },
    dateLocationtext: {
        fontSize: fontSize.p3
    },
    contentContainer: {
        margin: spacing.s2
    },
    contentText: {
        fontSize: fontSize.p3
    },
})