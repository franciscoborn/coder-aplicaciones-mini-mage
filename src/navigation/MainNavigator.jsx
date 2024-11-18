import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from "react-native";
import React from "react";
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
    const user = true
    return (
        <NavigationContainer>
            {
                user ? <TabNavigator/>: <Text>Chao</Text>
            }
        </NavigationContainer>
    );
};

export default MainNavigator;
