import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import UserContext from '../../../../context/UserContext'
import { colors } from '../../../../constants/colors'
import { fontSize, spacing } from '../../../../constants/layout'

const FilterUsers = ({
    filterBy,
    setFilterBy
}) => {

    const { user } = useContext(UserContext)

    const Filter = ({ title, category }) => {

        const isSelected = () => filterBy?.title === title ? true : false

        const handleOnPress = () => {
            if (isSelected()) {
                setFilterBy({ title: '', category: '' })
            } else {
                setFilterBy({ title, category })
            }
        }

        return (
            <TouchableOpacity
                style={[styles.filterContainer, isSelected() && { backgroundColor: colors.lightgrey }]}
                onPress={handleOnPress}
            >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {user?.city !== undefined && <Filter title={user?.city} category='city' />}
            {user?.country !== undefined && <Filter title={user?.country} category={'country'} />}
            {user?.gender !== undefined && <Filter title={user?.gender} category={'gender'} />}
            {user?.gender !== undefined && <Filter title={user?.gender !== 'Male' ? 'Male' : 'Female'} category={'gender'} />}
        </View>
    )
}

export default FilterUsers

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: spacing.s2
    },
    filterContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.s1 / 2,
        backgroundColor: colors.white,
        shadowColor: colors.gray,
        shadowRadius: 1,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        borderRadius: 20,
        marginRight: spacing.s2
    },
    text: {
        fontSize: fontSize.p3
    }
})