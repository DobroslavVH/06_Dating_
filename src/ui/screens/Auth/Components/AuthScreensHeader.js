import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { WIDTH } from '../../../constants/layout'
import { colors } from '../../../constants/colors'
import BackButton from '../../../components/Buttons/BackButton/BackButton'

const AuthScreensHeader = ({ title, goBack = true }) => {
    return (
        <View style={styles.container}>
            {goBack && <BackButton />}
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default AuthScreensHeader

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: WIDTH / 1.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 50,
        color: colors.lightgrey
    }
})