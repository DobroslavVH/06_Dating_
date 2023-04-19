import { StyleSheet } from 'react-native'
import React from 'react'
import Toast from 'react-native-root-toast'
import { RootSiblingParent } from 'react-native-root-siblings'
import { HEIGHT, spacing } from '../../constants/layout'
import { colors } from '../../constants/colors'

const ToastMessage = ({ text, visible }) => {
    return (
        <RootSiblingParent>
            <Toast
                containerStyle={styles.noUserFound}
                shadowColor={colors.gray}
                visible={visible}
                position={HEIGHT / 2}
                shadow={true}
                duration={2}
                animation={true}
                backgroundColor={colors.white}
                textColor={colors.gray}
                textStyle={styles.noUserFoundText}
                opacity={1}
            >{text}</Toast>
        </RootSiblingParent>
    )
}

export default ToastMessage

const styles = StyleSheet.create({
    noUserFound: {
        height: 60,
        width: 200,
        borderRadius: spacing.s4,
        justifyContent: 'center'
    },
    noUserFoundText: {
        fontSize: 20
    }
})