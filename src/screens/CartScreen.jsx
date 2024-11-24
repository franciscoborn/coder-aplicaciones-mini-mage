import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { colors } from '../global/colors';
import FlatCard from '../components/FlatCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService';
import { clearCart } from '../features/cart/cartSlice';
import { useUpdateUserInventoryMutation } from '../services/userService';

const CartScreen = ({ navigation }) => {
    const cart = useSelector(state => state.cartReducer.value.cartItems);
    const total = useSelector(state => state.cartReducer.value.total);
    const cartLength = useSelector(state => state.cartReducer.value.cartLenght);
    const userEmail = useSelector(state => state.authReducer.value.email);
    const [updateUserInventory] = useUpdateUserInventoryMutation();
    const dispatch = useDispatch();

    const [postReceipt, { data, error: postError, isLoading: isPosting }] = usePostReceiptMutation();

    const handleConfirmPurchase = async () => {
        try {
            const receipt = {
                items: cart,
                total: total,
                user: userEmail,
                date: new Date().toISOString(),
            };
            // Enviar el recibo a la base de datos
            await postReceipt(receipt).unwrap();

            // Actualizar el inventario del usuario
            await updateUserInventory({
                userId: userEmail,
                items: cart,
            });

            // Limpiar el carrito
            dispatch(clearCart());
            alert('¡Compra realizada con éxito!');
        } catch (err) {
            console.error('Error al realizar la compra:', err);
            alert('Hubo un error al procesar tu compra. Por favor, intenta de nuevo.');
        }
    };

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer}>
            <View>
                <Image
                    source={{ uri: item.mainImage }}
                    style={styles.cartImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.shortDescription}</Text>
                <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
                <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
                <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon} />
            </View>
        </FlatCard>
    );

    return (
        <>
            {cartLength > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={item => item.id}
                        renderItem={renderCartItem}
                        ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
                    />
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerTotal}>Total: ${total}</Text>
                        <Pressable
                            style={styles.confirmButton}
                            onPress={handleConfirmPurchase}
                            disabled={isPosting}
                        >
                            {isPosting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
                            )}
                        </Pressable>
                    </View>
                </>
            ) : (
                <View style={styles.cartEmpty}>
                    <Text style={styles.cartEmptyText}>Aún no hay productos en el carrito</Text>
                </View>
            )}
        </>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'flex-start',
        margin: 16,
        alignItems: 'center',
        gap: 10,
    },
    cartImage: {
        width: 80,
        height: 80,
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    description: {
        marginBottom: 16,
    },
    price: {
        fontSize: 14,
    },
    quantity: {
        fontSize: 14,
    },
    total: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700',
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerContainer: {
        padding: 32,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerTotal: {
        fontSize: 16,
        fontWeight: '700',
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginBottom: 24,
    },
    confirmButtonText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700',
    },
    cartScreenTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        paddingVertical: 8,
    },
    cartEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartEmptyText: {
        fontSize: 16,
    },
});
