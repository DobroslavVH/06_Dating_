import { StyleSheet } from "react-native";
import { spacing } from "../../constants/layout";

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: spacing.s2,
        marginBottom: spacing.s5,
        marginTop: spacing.s2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default styles