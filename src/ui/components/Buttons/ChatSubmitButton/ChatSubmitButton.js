import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'

const ChatSubmitButton = ({
    color = colors.gray
}) => {
    return (
        <View style={styles.container(color)}>
            <View style={styles.stripe(color)} />
            <View style={[styles.arrowLeft(color), { transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.arrowRight(color), { transform: [{ rotate: '-45deg' }] }]} />
        </View>
    )
}

export default ChatSubmitButton

const styles = StyleSheet.create({
    container: (color) => ({
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderColor: color,
        borderWidth: 2
    }),
    stripe: (color) => ({
        position: 'absolute',
        top: 10,
        left: 18.5,
        width: 4,
        height: 25,
        borderRadius: 1.5,
        backgroundColor: color
    }),
    arrowLeft: (color) => ({
        position: 'absolute',
        top: 8,
        left: 14.5,
        width: 4,
        height: 15,
        borderRadius: 1.5,
        backgroundColor: color,

    }),
    arrowRight: (color) => ({
        position: 'absolute',
        top: 8,
        left: 22.5,
        width: 4,
        height: 15,
        borderRadius: 1.5,
        backgroundColor: color,

    })
})