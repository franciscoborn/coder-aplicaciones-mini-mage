import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View, Text } from 'react-native'
import React from 'react'
import EquipmentScreen from "../screens/EquipmentScreen"
import ProductsScreen from "../screens/ProductsScreen"
import ResumeScreen from "../screens/ResumeScreen"

const Tab = createBottomTabNavigator()


const TabNavigator = () => {
    return (
        <Tab.Navigator 
            initialRouteName="Resume"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                // tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen 
                name="Resume"
                component={ResumeScreen} 

            />
            <Tab.Screen 
                name="Equipment" 
                component={EquipmentScreen} 

            />
            <Tab.Screen 
                name="Products" 
                component={ProductsScreen} 
            />
        </Tab.Navigator>
    )
}

export default TabNavigator