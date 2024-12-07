import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import inventory from '../data/inventory.json'
import { getImage } from '../global/utils'
import { colors } from '../styles/colors'
import { screenStyles } from '../styles/screensStyles'


const InventoryScreen = () => {

    const renderInventoryItem = ({ item }) => {
        return (
            <View style={styles.inventoryItemCard}>
                <Image style={styles.inventoryItemCardImage} source={getImage("shopProducts", item.name)} />
                <Text style={styles.inventoryItemText}>{item.name}</Text>
            </View>
        )
    }
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>Inventory</Text>
            <FlatList
                style={styles.inventoryItemCardContainer}
                data={inventory}
                keyExtractor={item => item.id}
                renderItem={renderInventoryItem}
                numColumns={4}
            />
        </View>
    )
}

export default InventoryScreen
const styles = StyleSheet.create({
    screenContainer: {
        ...screenStyles.screenContainer
    },
    screenTitle: {
        ...screenStyles.screenTitle,
        marginBottom: 10
    },
    inventoryItemCardContainer: {
        width: '100%',
        paddingHorizontal: '4%'
    },
    inventoryItemCardImage: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
        marginBottom: 2
    },
    inventoryItemCard: {
        width: '22%',
        aspectRatio: 1,
        margin: '1.5%',
        backgroundColor: colors.cardsBackground,
        paddingTop: 10,
        border: 'solid',
        borderWidth: 2,
        borderColor: colors.cardsBorder,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    inventoryItemText: {
        fontSize: 10,
        color: colors.text,
    }
})