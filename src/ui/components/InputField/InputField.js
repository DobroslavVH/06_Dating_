import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { borderRadius, fontSize, spacing } from '../../constants/layout'
import { colors } from '../../constants/colors'


const InputField = ({
    fieldName,
    setText,
    isPasswordField,
    error,
    errorMessage,
    clearError,
    placeholder,
    editScreenMode = false,
    chatScreenMode = false,
    smallSize,
    value,
    onEndEditing
}) => {

    const [isHidden, setisHidden] = useState(isPasswordField ? true : false)

    const showHideEye = () => {
        return (
            <TouchableOpacity
                style={{ position: 'absolute', bottom: 15, right: 15, borderRadius: 10 }}
                onPress={() => setisHidden(!isHidden)}
            >
                <Text style={styles.showHide}>{isHidden ? "show" : 'hide'}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container(editScreenMode, smallSize, chatScreenMode)}>
            {fieldName && <Text style={styles.fieldName}>{fieldName}</Text>}
            <View>
                <TextInput
                    style={styles.inputContainer(error)}
                    onChangeText={setText}
                    placeholder={placeholder}
                    value={value}
                    autoCapitalize={editScreenMode
                        ? 'sentences'
                        : chatScreenMode
                            ? 'sentences'
                            : 'none'}
                    allowFontScaling={true}
                    secureTextEntry={isHidden}
                    onTouchStart={() => error && clearError(false)}
                    onEndEditing={onEndEditing}
                />
                {isPasswordField && showHideEye()}
            </View>
            {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        </View>
    )
}

export default InputField

const styles = StyleSheet.create({
    container: (editScreenMode, smallSize, chatScreenMode) => ({
        width: smallSize ? '45%' : '100%',
        height: chatScreenMode ? 50 : spacing.s5 * 3.5,
        marginBottom: editScreenMode
            ? spacing.s1
            : chatScreenMode
                ? 0
                : spacing.s5
    }),
    fieldName: {
        fontSize: fontSize.p2,
        color: colors.gray,
        marginBottom: spacing.s1 / 2
    },
    inputContainer: (error) => ({
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: error ? colors.red : colors.lightgrey,
        borderRadius: borderRadius,
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 50
    }),
    showHide: {
        fontSize: fontSize.p2,
        color: colors.gray,
    },
    errorMessage: {
        fontSize: fontSize.p1,
        color: colors.red,
        marginTop: spacing.s1 / 2
    }
})