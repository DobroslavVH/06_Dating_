import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { spacing } from '../../../constants/layout'
import { colors } from '../../../constants/colors'

const BackButton = ({
    color = colors.gray,
    onPressFunction
}) => {
    const navigation = useNavigation()

    const handleOnPress = () => {
        onPressFunction && onPressFunction()
        navigation.goBack()
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleOnPress}
        >
            <View style={styles.arrow(color)} />
            <View style={styles.arrow_1(color)} />
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: spacing.s2,
        height: 45,
        width: 45,
        borderRadius: 22.5
    },
    arrow: (color) => ({
        position: "absolute",
        left: 18,
        top: 6,
        width: 3,
        height: 18,
        transform: [{ rotate: '45deg' }],
        backgroundColor: color
    }),
    arrow_1: (color) => ({
        position: "absolute",
        left: 18,
        top: 18,
        width: 3,
        height: 18,
        transform: [{ rotate: '-45deg' }],
        backgroundColor: color
    })
})