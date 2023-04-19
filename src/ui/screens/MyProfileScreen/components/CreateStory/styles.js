import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";
import { borderRadius, spacing, WIDTH } from "../../../../constants/layout";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '90%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius
    },
    contentContainer: {
        padding: spacing.s3
    },
    image: {
        width: WIDTH - (spacing.s3 * 2),
        height: (WIDTH - (spacing.s3 * 2)) * 0.75,
        borderRadius: borderRadius,
        backgroundColor: colors.lightgrey,
    }
})

export default styles