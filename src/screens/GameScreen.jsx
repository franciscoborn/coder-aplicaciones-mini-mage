import React, { useState } from 'react';
import { screenStyles } from '../styles/screensStyles'
import enemies from '../data/enemies.json'
import { colors } from '../styles/colors'
import { assetsImages } from '../global/importImages'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useGetUserInformationQuery } from '../redux/apis/userApi';


const GameScreen = () => {
    let userId = 0
    const { data: userInformation, isLoading: isLoadingUserInformation, error } = useGetUserInformationQuery(userId)

    const stats = userInformation?.info?.stats || {};
    const userName = userInformation?.info?.userName || 'Mini Mage';
    const renderMonster = ({ item }) => {
        return (
            <View style={styles.monsterCard}>
                <Text style={styles.monsterName}>{item.name}</Text>
            </View>
        )
    }

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}> Battle </Text>
            <View style={styles.screenBody}>
                <FlatList
                    data={enemies}
                    renderItem={renderMonster}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
                <Image source={assetsImages.interface.logoMiniMage} style={styles.characterImage} />
                <Text style={styles.stat}> {userName}'s Health: {stats.health}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        ...screenStyles.screenContainer
    },
    screenTitle: {
        ...screenStyles.screenTitle,
        marginBottom: 10
    },
    screenBody: {
        flex: 1,
        padding: 10,
        paddingTop: 20,
        alignItems: 'center',
    },
    monsterCard: {
        width: '47%',
        height: 100,
        margin: 5,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: colors.cardsBorder,
        backgroundColor: colors.cardsBackground,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    monsterName: {
        fontSize: 20,
        color: colors.text,
        textAlign: 'center',
    },
    stat: {
        fontSize: 30,
        color: colors.text,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    characterImage: {
        width: '50%',
        height: 200,
        marginTop: 10
    }
});

export default GameScreen;
