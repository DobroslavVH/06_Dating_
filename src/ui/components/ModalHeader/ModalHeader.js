import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import BackButton from '../Buttons/BackButton/BackButton'
import { fontSize } from '../../constants/layout'

const ModalHeader = ({ title }) => {
    return (
        <View style={styles.header}>
            <View style={styles.backButtonPosition}>
                <BackButton />
            </View>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

export default ModalHeader

const styles = StyleSheet.create({
    header: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    backButtonPosition: {
        position: 'absolute',
        top: -40,
        left: -10,
    },
    headerText: {
        fontSize: fontSize.p5,
        fontWeight: '800'
    },
})