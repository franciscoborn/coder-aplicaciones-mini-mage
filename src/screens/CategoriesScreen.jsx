import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../services/shopService'

const CategoriesScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions()
    const { data: categories, error, isLoading } = useGetCategoriesQuery()
    const dispatch = useDispatch()
    const renderCategoryItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setCategory(item.category))
                navigation.navigate('Productos')
            }}>
                <FlatCard style={
                    index % 2 == 0
                        ?
                        { ...styles.categoryItemContainer, ...styles.row }
                        :
                        { ...styles.categoryItemContainer, ...styles.rowReverse }
                }>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={width > 400 ? styles.categoryTitle : stylesSmall.categoryTitle}>{item.category}</Text>
                </FlatCard>
            </Pressable>
        )
    }

    return (
        <>
            {
                isLoading
                    ?
                    <ActivityIndicator size="large" color={colors.verdeNeon} />
                    :
                    error
                        ?
                        <Text>Error al cargar las categorías</Text>
                        :
                        <FlatList
                            data={categories}
                            keyExtractor={item => item.id}
                            renderItem={renderCategoryItem}
                        />
            }
        </>
    )
}

export default CategoriesScreen


const styles = StyleSheet.create({
    categoryItemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    categoryTitleSmall: {
        fontSize: 12,
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 80
    },
    row: {
        flexDirection: 'row'
    },
    rowReverse: {
        flexDirection: 'row-reverse'
    }
})




