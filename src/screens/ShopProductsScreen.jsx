import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getImage } from '../global/utils'
import { colors } from '../styles/colors'
import { screenStyles } from '../styles/screensStyles'

const ShopProductsScreen = () => {
    const productsFilteredByCategory = useSelector(state => state.shopReducer.value.productsFilteredByCategory)
    const renderProductItem = ({ item }) => {
        return (
            <View style={styles.shopProductItemCard}>
                <Image style={styles.shopProductItemImage} source={getImage("shopProducts", item.name)} />
                <View style={styles.shopProductItemTextContainer}>
                    <View style={styles.shopProductItemTitleContainer}>
                        <Text style={styles.shopProductItemTitleText}>{item.name}</Text>
                        <Text style={styles.shopProductItemTitleText}>${item.price}</Text>
                    </View>
                    <Text style={styles.shopProductItemDescriptionText}>{item.description}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Products</Text>
            <FlatList
                data={productsFilteredByCategory}
                keyExtractor={item => item.id}
                renderItem={renderProductItem}
            />
        </View>
    )
}

export default ShopProductsScreen

const styles = StyleSheet.create({
    screenContainer: {
        ...screenStyles.screenContainer
    },
    screenTitle: {
        ...screenStyles.screenTitle,
        marginBottom: 10
    },
    shopProductItemTitleContainer: {
        flexDirection: 'row',
    },
    shopProductItemCard: {
        flexDirection: 'row',
        width: '92%',
        height: 150,
        marginVertical: '1%',
        marginHorizontal: '4%',
        backgroundColor: colors.cardsBackground,
        paddingTop: 15,
        border: 'solid',
        borderWidth: 2,
        borderColor: colors.cardsBorder,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    shopProductItemTextContainer: {
        flex: 1
    },
    shopProductItemTitleText: {
        fontSize: 20,
        color: colors.text,
        marginHorizontal: 10,
        marginVertical: 5
    },
    shopProductItemDescriptionText: {
        fontSize: 13,
        color: colors.text,
        marginHorizontal: 10
    },
    shopProductItemImage: {
        width: 75,
        height: 75,
        resizeMode: 'contain'
    }

})