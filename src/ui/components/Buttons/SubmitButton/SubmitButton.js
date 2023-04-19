import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'
import { fontSize, spacing } from '../../../constants/layout'
import { borderRadius } from '../../../constants/layout'

const SubmitButton = ({
    text,
    onPress,
    logout = false,
    addFriend = false,
    disabled,
    loading
}) => {
    return (
        <TouchableOpacity
            style={styles.container(logout, addFriend)}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText(logout, addFriend, loading)}>{text}</Text>
            <View style={{ position: 'absolute' }}>
                {loading && <ActivityIndicator size={'large'} color={colors.red} />}
            </View>
        </TouchableOpacity>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    container: (logout, addFriend) => ({
        width: logout
            ? 80
            : addFriend
                ? 100
                : '100%',
        backgroundColor: logout
            ? colors.white
            : addFriend
                ? colors.lightgrey
                : null,
        height: logout
            ? 40
            : addFriend
                ? 35
                : 50,
        borderWidth: 1,
        borderColor: addFriend
            ? colors.gray
            : colors.lightgrey,
        borderRadius: addFriend
            ? spacing.s1
            : borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: logout && 0.4
    }),
    buttonText: (logout, addFriend, loading) => ({
        fontSize: logout
            ? fontSize.p2
            : addFriend
                ? fontSize.p2
                : fontSize.p5,
        fontStyle: addFriend
            ? 'italic'
            : null,
        color: !loading
            ? colors.gray
            : colors.black
    })
})