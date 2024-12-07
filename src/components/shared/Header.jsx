import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../styles/colors'
import React from 'react'

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Header</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        backgroundColor: colors.primary,
    },
    headerTitle: {
        color: colors.tertiary,
    }
})