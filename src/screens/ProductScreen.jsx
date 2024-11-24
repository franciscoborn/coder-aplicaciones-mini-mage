import { StyleSheet, Text, View, Pressable, useWindowDimensions, Image, FlatList, ScrollView,ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductQuery } from '../services/shopService';


const ProductScreen = ({ route, navigation }) => {

    const productId = useSelector(state=>state.shopReducer.value.productId)


    const { width, height } = useWindowDimensions()


    const { data: productFound, error, isLoading } = useGetProductQuery(productId)

    const dispatch = useDispatch()

    return (
        <>
            {
                
                        <Text>Error al cargar el producto</Text>
            }
        </>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
})