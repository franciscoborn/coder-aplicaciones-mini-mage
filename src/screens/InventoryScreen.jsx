import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetUserInventoryQuery } from '../services/userService';

const InventoryScreen = () => {
  const userId = useSelector(state => state.authReducer.value.localId);

  const { data: inventory, error, isLoading } = useGetUserInventoryQuery(userId);

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

  const renderInventoryItem = ({ item }) => (
    <View style={styles.inventoryItem}>
      <Image
        source={imageMap[item.image] || imageMap['placeholder.png']}
        style={styles.inventoryItemImage}
        resizeMode="contain"
      />
      <Text style={styles.inventoryItemName}>{item.name}</Text>
      <Text style={styles.inventoryItemQuantity}>
        Cantidad: {item.quantity}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Tu Inventario</Text>
        <Text>Cargando inventario...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Tu Inventario</Text>
        <Text>Error al cargar el inventario.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tu Inventario</Text>
      {inventory && inventory.length > 0 ? (
        <FlatList
          data={inventory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderInventoryItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>¡Tu inventario está vacío!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
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
    inventoryItem: {
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
    inventoryItemImage: {
        width: '60%',
        height: 80,
        marginBottom: 10,
    },
    inventoryItemName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inventoryItemQuantity: {
        fontSize: 12,
        color: '#555',
    },
    inventoryItemPrice: {
        fontSize: 12,
        color: '#555',
        marginTop: 5,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#777',
        marginTop: 20,
    },
});

export default InventoryScreen;
