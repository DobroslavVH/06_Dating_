import { StyleSheet } from "react-native";
import { spacing, WIDTH } from "../../constants/layout";

const styles = StyleSheet.create({
    editContainer: {
        marginLeft: WIDTH * 0.4,
        marginTop: spacing.s1 / 2,
        justifyContent: 'flex-end',
        alignItems: "center",
        flexDirection: 'row'
    },
    contentContainer: {
        height: 300,
        marginTop: spacing.s2,
        borderWidth: 1
    }
})

export default styles