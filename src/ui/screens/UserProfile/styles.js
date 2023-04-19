import { StyleSheet } from "react-native";
import { spacing, WIDTH } from "../../constants/layout";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonPosition: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        top: - WIDTH * 0.13,
        right: spacing.s3,
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: spacing.s3,
        marginTop: WIDTH * 0.17
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
})

export default styles