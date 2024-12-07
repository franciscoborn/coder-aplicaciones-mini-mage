import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ShopCategoriesScreen from "../screens/ShopCategoriesScreen"
import ShopProductsScreen from "../screens/ShopProductsScreen"
import { StyleSheet, SafeAreaView } from "react-native"
import { colors } from "../styles/colors"

const Stack = createNativeStackNavigator()


const ShopNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Shop Categories"
            screenOptions={styles.navigator}
        >
            <Stack.Screen name="Shop Categories" component={ShopCategoriesScreen} />
            <Stack.Screen name="Shop Products" component={ShopProductsScreen} />
        </Stack.Navigator>
    )
}

export default ShopNavigator

const styles = StyleSheet.create({
    navigator: {
        backgroundColor: colors.cardsBackground,
        marginVertical: '2%',
        marginHorizontal: '3%',
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: colors.cardsBorder,
        borderRadius: 5,
        elevation: 5,
        headerShown: false
    },
    safeAreaView: {
        flex:1,
        backgroundColor: colors.screenBackgroundColor
    }
})