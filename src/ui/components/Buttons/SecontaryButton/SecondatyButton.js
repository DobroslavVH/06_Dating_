import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { fontSize, spacing, WIDTH } from "../../../constants/layout"
import { colors } from "../../../constants/colors"

const SecondatyButton = ({
    titleText,
    onPress,
    buttonStyle,
    titleStyle,
    disabled = false,
    color = colors.blue
}) => {

    let style = {}

    switch (buttonStyle) {
        case 'edit':
            style = StyleSheet.flatten([styles.edit(color), styles.container])
            break
    }

    let title = {}

    switch (titleStyle) {
        case 'regular':
            title = StyleSheet.flatten([styles.textStyle, styles.commonText])
            break
    }


    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={title}>{titleText}</Text>
        </TouchableOpacity>
    )
}

export default SecondatyButton

const styles = StyleSheet.create({
    container: {
        marginRight: spacing.s1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    edit: (color) => ({
        borderRadius: WIDTH * 0.05,
        backgroundColor: color
    }),
    commonText: {
        padding: spacing.s1
    },
    textStyle: {
        fontSize: fontSize.p2,
        color: colors.white,
        fontWeight: '600'
    }
})