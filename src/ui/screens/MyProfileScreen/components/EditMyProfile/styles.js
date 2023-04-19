import { StyleSheet } from "react-native";
import { spacing, WIDTH } from "../../../../constants/layout";

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.s5 * 2
    },
    contentContainer: {
        marginTop: WIDTH * 0.16,
        paddingHorizontal: spacing.s5
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default styles