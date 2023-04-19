import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'

const Body = ({ children, header }) => {
    return (
        <View style={styles.container(header)}>
            {children}
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    container: (header) => ({
        flex: 1,
        paddingTop: header && 50,
        backgroundColor: colors.white,
    })
})