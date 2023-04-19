import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import CustomIndicator from '../CustomIndicator'
import { colors } from '../../constants/colors'
import { borderRadius, HEIGHT, spacing, WIDTH } from '../../constants/layout'
import SubmitButton from '../Buttons/SubmitButton/SubmitButton'
import SectionHeader from '../SectionHeader/Index'
import SingleStory from './SingleStory'

const UserStories = ({
    sectionTitle,
    data,
    isLoading,
    error
}) => {

    const [errorVisible, setErrorVisible] = useState(error)

    const errorMessage = () => {
        return (
            <View style={styles.container}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={errorVisible}
                >
                    <TouchableOpacity
                        style={styles.modalContainer}
                        onPress={() => setErrorVisible(!errorVisible)}
                    >
                        <Text style={[styles.errorText, { fontWeight: '800' }]}>Ups!</Text>
                        <Text style={styles.errorText}>Something wents wrong with</Text>
                        <Text style={styles.errorText}>stories, try again later!</Text>
                        <View style={{ marginTop: spacing.s2 }}>
                            <SubmitButton
                                text={'OK'}
                                addFriend
                                onPress={() => setErrorVisible(!errorVisible)}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ marginHorizontal: spacing.s3 }}>
                <SingleStory item={item} index={index} />
            </View>
        )
    }

    return (
        <View>
            <View style={{ marginHorizontal: spacing.s3, marginTop: spacing.s2 }}>
                <SectionHeader title={sectionTitle} />
            </View>
            <FlatList
                scrollEnabled={false}
                data={data?.data || data}
                keyExtractor={(item, index) => index}
                renderItem={(item, index) => renderItem(item, index)}
            />
            {isLoading && <CustomIndicator scolor={colors.lightgrey} />}
            {errorMessage()}
        </View>
    )
}

export default UserStories

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: HEIGHT * 0.5 - 60,
        left: WIDTH * 0.2,
        width: WIDTH * 0.6,
        height: 160,
        backgroundColor: colors.white,
        borderRadius: borderRadius,
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 5
        }
    },
    errorText: {
        marginTop: 2,
        fontSize: 18,
        fontWeight: "300"
    }
})