import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { fontSize, spacing } from '../../constants/layout'

const SectionHeader = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.dot} />
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default SectionHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: spacing.s2
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.blue,
        marginRight: spacing.s1
    },
    text: {
        fontSize: fontSize.p3,
        color: colors.black,
        fontWeight: '500'
    }
})