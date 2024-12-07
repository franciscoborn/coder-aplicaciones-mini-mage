import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import shopCategories from '../data/shopCategories.json'
import { colors } from '../styles/colors'
import { screenStyles } from '../styles/screensStyles'
import { getImage } from '../global/utils'

const CategoriesScreen = ({ navigation }) => {
  const renderCategoryItem = ({ index, item }) => {
    return (
      <Pressable style={styles.categoryItemCard}
        onPress={() => {
          navigation.navigate('Shop Products')
        }} >
        <View style={
          index % 2 == 0
            ? { ...styles.categoryItemCardContentContainer, ...styles.row }
            : { ...styles.categoryItemCardContentContainer, ...styles.rowReverse }
        }>
          <Image style={styles.categoryItemImage} source={getImage("shopCategories", item.name)} />
          <Text style={styles.categoryItemText}>{item.name.toUpperCase()}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Categories</Text>
      <View style={styles.screenBody}>
        <FlatList
          style={styles.categoryItemCardContainer}
          data={shopCategories}
          keyExtractor={item => item.id}
          renderItem={renderCategoryItem}
          numColumns={1}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      </View>
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  screenContainer: screenStyles.screenContainer,
  screenTitle: screenStyles.screenTitle,
  categoryItemCardContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    paddingTop: 15,
    marginBottom: 15,
    borderTopWidth: 2,
    borderTopColor: colors.text,
    paddingHorizontal: 5
  },
  screenBody: {
    flex: 1
  },
  categoryItemCardContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  categoryItemCard: {
    height: 150,

    justifyContent: 'center',
    width: '94%',
    margin: '2%',
    backgroundColor: colors.cardsBackground,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.cardsBorder,
    borderRadius: 5,
    elevation: 5
  },
  categoryItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text
  },
  categoryItemImage: {
    width: 150,
    height: 100
  },
  row: {
    flexDirection: 'row'
  },
  rowReverse: {
    flexDirection: 'row-reverse'
  }
})

