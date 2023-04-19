import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'
import { borderRadius, fontSize, spacing } from '../../../constants/layout'

const UserInfo = ({ userInfo }) => {

    const infoCheck = () => {
        if (userInfo?.city === undefined &&
            userInfo?.country === undefined &&
            userInfo?.gender === undefined &&
            userInfo?.age === undefined
        ) {
            return true
        } else {
            return false
        }
    }

    const renderEmptyComponent = () => {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={[styles.text, { fontSize: fontSize.p3, marginTop: spacing.s1, marginBottom: spacing.s1 }]}>No info about this user</Text>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.rowContainer}>
                <Text style={styles.firstName}>{userInfo?.firstName} </Text>
                <Text style={styles.lastName}>{userInfo?.lastName}</Text>
            </View>
            {userInfo?.createAt !== undefined &&
                <Text style={[styles.text, { fontSize: fontSize.p1 }]}>User since : {userInfo?.createAt?.split('T')[0]}</Text>
            }
            {!infoCheck() &&
                <View style={styles.container}>
                    {(userInfo?.gender !== undefined || userInfo?.age !== undefined) &&
                        <View style={styles.rowContainer}>
                            <Text style={styles.text}>{userInfo?.gender}</Text>
                            {userInfo?.gender !== undefined && userInfo?.age !== undefined &&
                                <Text style={styles.text}> / </Text>
                            }
                            {userInfo?.age !== undefined &&
                                <Text style={styles.text}>{userInfo?.age} years old</Text>
                            }
                        </View>
                    }
                    {(userInfo?.city !== undefined || userInfo?.country !== undefined) &&
                        <View style={styles.rowContainer}>
                            <Text style={styles.text}>From: </Text>
                            <Text style={styles.text}> {userInfo?.city}</Text>
                            {userInfo?.city !== undefined && userInfo?.country !== undefined &&
                                <Text style={styles.text}> / </Text>
                            }
                            <Text style={styles.text}> {userInfo?.country}</Text>
                        </View>
                    }
                </View>
            }
            {infoCheck() && renderEmptyComponent()}
        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: spacing.s2 * 2,
        backgroundColor: colors.white,
        borderRadius: borderRadius,
        padding: spacing.s1,
        marginVertical: spacing.s1,
        shadowColor: colors.gray,
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: {
            width: 2,
            height: 5
        }
    },
    rowContainer: {
        flexDirection: 'row'
    },
    firstName: {
        fontSize: fontSize.p5
    },
    lastName: {
        fontSize: fontSize.p5,
        fontWeight: '600'
    },
    text: {
        fontSize: fontSize.p3,
        color: colors.gray,
        marginVertical: spacing.s1 / 2
    }
})