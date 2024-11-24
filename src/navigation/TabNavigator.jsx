import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from 'react'
import ResumeScreen from "../screens/ResumeScreen"
import InventoryScreen from "../screens/InventoryScreen"
import ShopNavigator from "./ShopNavigator"
import CartNavigator from "./CartNavigator";

const Tab = createBottomTabNavigator()


const TabNavigator = () => {
    return (
        <Tab.Navigator 
            initialRouteName="Resume"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen 
                name="Resume"
                component={ResumeScreen} 
            />
            <Tab.Screen 
                name="Inventory" 
                component={InventoryScreen} 
            />
            <Tab.Screen 
                name="Shop" 
                component={ShopNavigator} 
            />
            <Tab.Screen 
                name="Cart" 
                component={CartNavigator} 
            />
        </Tab.Navigator>
    )
}

export default TabNavigator