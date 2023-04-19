import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { spacing } from '../../constants/layout'

const Devider = () => {
    return (
        <View style={styles.devider} />
    )
}

export default Devider

const styles = StyleSheet.create({
    devider: {
        opacity: 0.5,
        borderWidth: 1,
        borderColor: colors.gray,
        marginBottom: spacing.s2
    }
})