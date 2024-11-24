import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens"


const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Categorías" 
                    component={CategoriesScreen} 
                />
                <Stack.Screen name="Productos" component={ProductsScreen} />
                <Stack.Screen name="Producto" component={ProductScreen} />
            </Stack.Navigator>
    )
}

export default ShopNavigator

