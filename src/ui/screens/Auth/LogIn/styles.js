import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/layout";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.s4,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttonsContainer: {
        marginTop: spacing.s5,
        width: '90%'
    },
    linkContainer: {
        width: '100%',
        marginTop: spacing.s5 * 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactiveText: {
        color: colors.gray,
    },
    activeText: {
        color: 'skyblue'
    }
})

export default styles