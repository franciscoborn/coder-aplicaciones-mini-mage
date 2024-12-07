import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ShopNavigator from "../navigation/ShopNavigator"
import InventoryScreen from "../screens/InventoryScreen"
import { StyleSheet, SafeAreaView, Image } from "react-native"
import { colors } from "../styles/colors"
import { assetsImages } from "../global/importImages"
import ProfileScreen from "../screens/ProfileScreen"
import GameScreen from "../screens/GameScreen"

const Tab = createBottomTabNavigator()


const TabNavigator = () => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Tab.Navigator
                initialRouteName="Profile"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: styles.navigator,
                    tabBarLabelStyle: {
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ focused }) => {
                        let imageSource;

                        if (route.name === 'Profile') {
                            imageSource = focused
                                ? assetsImages.interface.iconProfile
                                : assetsImages.interface.iconProfile;
                        } else if (route.name === 'Game') {
                            imageSource = focused
                                ? assetsImages.interface.iconBattle
                                : assetsImages.interface.iconBattle;
                        } else if (route.name === 'Inventory') {
                            imageSource = focused
                                ? assetsImages.interface.iconInventory
                                : assetsImages.interface.iconInventory;
                        } else if (route.name === 'Shop') {
                            imageSource = focused
                                ? assetsImages.interface.iconShop
                                : assetsImages.interface.iconShop;
                        }

                        return (
                            <Image
                                source={imageSource}
                                style={{
                                    width: 48,
                                    height: 48,
                                    resizeMode: 'contain'
                                }}
                            />
                        );
                    },
                    tabBarActiveTintColor: colors.text,
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Game" component={GameScreen} />
                <Tab.Screen name="Inventory" component={InventoryScreen} />
                <Tab.Screen name="Shop" component={ShopNavigator} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    navigator: {
        backgroundColor: colors.cardsBackground,
        marginVertical: '2%',
        marginHorizontal: '3%',
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: colors.cardsBorder,
        height: 80,
        borderRadius: 5,
        elevation: 5,
        fontSize: 30
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.screenBackgroundColor
    }
})