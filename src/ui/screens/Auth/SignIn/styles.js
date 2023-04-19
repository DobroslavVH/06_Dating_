import { StyleSheet } from 'react-native'
import { spacing } from '../../../constants/layout'

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
    }
})

export default styles