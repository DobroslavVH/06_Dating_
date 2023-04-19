import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { spacing, WIDTH } from "../../constants/layout";

const styles = StyleSheet.create({
    avatarImage: {
        width: WIDTH * 0.2,
        height: WIDTH * 0.2,
        borderRadius: WIDTH * 0.1
    },
    avatarcontainer: (index) => ({
        position: 'absolute',
        top: index === 0 ? spacing.s5 * 2 : spacing.s1,
        right: spacing.s2,
        width: WIDTH * 0.2 + 6,
        height: WIDTH * 0.2 + 6,
        borderRadius: WIDTH * 0.1 + 3,
        borderWidth: 3,
        borderColor: colors.blue
    })
})

export default styles