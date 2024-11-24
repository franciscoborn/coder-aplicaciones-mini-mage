import { View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../services/shopService';
import { addItem } from '../features/cart/cartSlice';

const ProductsScreen = () => {
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const category = useSelector(state => state.shopReducer.value.categorySelected);
  const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category);

  const imageMap = {
    "equipments/arco_del_viento.png": require("../../assets/images/equipments/arco_del_viento.png"),
    "equipments/armadura_de_acero.png": require("../../assets/images/equipments/armadura_de_acero.png"),
    "equipments/casco_de_dragon.png": require("../../assets/images/equipments/casco_de_dragon.png"),
    "equipments/daga_de_sombras.png": require("../../assets/images/equipments/daga_de_sombras.png"),
    "equipments/espada_de_fuego.png": require("../../assets/images/equipments/espada_de_fuego.png"),
    "equipments/escudo_de_cristal.png": require("../../assets/images/equipments/escudo_de_cristal.png"),
    "equipments/hacha_del_trueno.png": require("../../assets/images/equipments/hacha_del_trueno.png"),
    "equipments/lanza_del_sol.png": require("../../assets/images/equipments/lanza_del_sol.png"),
    "equipments/baculo_del_sabio.png": require("../../assets/images/equipments/baculo_del_sabio.png"),
    "equipments/varita_de_hielo.png": require("../../assets/images/equipments/varita_de_hielo.png"),
    "placeholder.png": require("../../assets/images/placeholder.png"),
  };

  const incrementQuantity = (id, stock) => {
    setQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[id] || 0;
      if (currentQuantity < stock) {
        return { ...prevQuantities, [id]: currentQuantity + 1 };
      }
      return prevQuantities;
    });
  };

  const decrementQuantity = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 0;
    if (quantity === 0) return;
    dispatch(addItem({ ...item, quantity }));
  };

  const renderProduct = ({ item }) => {
    const quantity = quantities[item.id] || 0;

    return (
      <View style={styles.productContainer}>
        <Image
          source={imageMap[item.image] || imageMap['placeholder.png']}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productStock}>{item.stock} In Stock</Text>
        <View style={styles.quantityToBuyContainer}>
          <Pressable onPress={() => decrementQuantity(item.id)} style={styles.quantityButtonToBuy}>
            <Text style={styles.quantityToBuyButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityToBuyText}>{quantity}</Text>
          <Pressable onPress={() => incrementQuantity(item.id, item.stock)} style={styles.quantityButtonToBuy}>
            <Text style={styles.quantityToBuyButtonText}>+</Text>
          </Pressable>
        </View>
        {quantity > 0 && (
          <Pressable
            style={styles.buyButton}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.buyButtonText}>
              Add to Cart - ${item.price * quantity || 0}
            </Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <FlatList
        data={productsFilteredByCategory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productContainer: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: '60%',
    height: 80,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 12,
    color: '#555',
  },
  productStock: {
    fontSize: 12,
    color: '#777',
  },
  quantityToBuyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButtonToBuy: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  quantityToBuyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityToBuyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ProductsScreen;
