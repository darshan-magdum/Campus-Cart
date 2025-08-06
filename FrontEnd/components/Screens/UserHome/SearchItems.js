import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  FlatList, Image, ScrollView, Modal
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const SearchItems = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState('All');
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const foodItems = [
    {
      id: '1',
      name: 'Idli Sambar',
      category: 'breakfast',
      isVeg: true,
      price: '40',
      image: 'https://example.com/idli.jpg',
      shop: 'Annapurna Canteen',
      description: 'South Indian breakfast',
    },
    {
      id: '2',
      name: 'Chicken Biryani',
      category: 'lunch',
      isVeg: false,
      price: '120',
      image: 'https://example.com/biryani.jpg',
      shop: 'KFC Block C',
      description: 'Spicy and flavorful biryani with chicken.',
    },
    {
      id: '3',
      name: 'Veg Sandwich',
      category: 'snack',
      isVeg: true,
      price: '30',
      image: 'https://example.com/sandwich.jpg',
      shop: 'Cafe Delight',
      description: 'Fresh vegetables between soft bread.',
    },
  ];

  const uniqueShops = useMemo(() => {
    const shopSet = new Set(foodItems.map(item => item.shop));
    return ['All', ...Array.from(shopSet)];
  }, [foodItems]);

  const filteredFoodItems = useMemo(() => {
    return foodItems.filter(item =>
      (selectedFilter === 'all' || item.category === selectedFilter) &&
      (selectedShop === 'All' || item.shop === selectedShop) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [foodItems, selectedFilter, selectedShop, searchQuery]);

  const openProductModal = (item) => {
    setSelectedProduct(item);
    setProductModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with back arrow and shop filter */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.shopSelector}>
          <Text style={styles.shopSelectorText}>{selectedShop}</Text>
          <FeatherIcon name="chevron-down" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      <View style={styles.searchBoxContainer}>
        <FeatherIcon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBox}
          placeholder="Search food items"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <View style={styles.filters}>
          {['all', 'breakfast', 'lunch', 'snack', 'dinner'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, selectedFilter === filter && styles.selectedFilter]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilterText]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Product List */}
      {filteredFoodItems.length > 0 ? (
        <FlatList
          data={filteredFoodItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.foodList}
          renderItem={({ item }) => (
            <View style={styles.foodCard}>
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>₹{item.price}</Text>
              </View>

              <TouchableOpacity style={styles.infoIcon} onPress={() => openProductModal(item)}>
                <FeatherIcon name="info" size={18} color="#fff" />
              </TouchableOpacity>

              <View style={styles.foodBottom}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodDesc}>{item.description}</Text>
                <Text style={styles.shopName}>{item.shop}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      )}

      {/* Shop Selection Modal */}
      <Modal transparent animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIcon}>
              <FeatherIcon name="x" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Shop</Text>
            <Picker
              selectedValue={selectedShop}
              onValueChange={(itemValue) => setSelectedShop(itemValue)}
              style={styles.modalPicker}
            >
              {uniqueShops.map((shop, index) => (
                <Picker.Item key={index} label={shop} value={shop} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Product Info Modal */}
      <Modal transparent visible={productModalVisible} animationType="fade">
        <View style={styles.centeredView}>
          <View style={styles.productDetailModal}>
            <TouchableOpacity onPress={() => setProductModalVisible(false)} style={styles.closeIcon}>
              <FeatherIcon name="x" size={24} color="#000" />
            </TouchableOpacity>
            {selectedProduct && (
              <>
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                <Text style={styles.modalText}>{selectedProduct.description}</Text>
                <Text style={styles.modalText}>Shop: {selectedProduct.shop}</Text>
                <Text style={styles.modalText}>Price: ₹{selectedProduct.price}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SearchItems;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  shopSelector: { flexDirection: 'row', alignItems: 'center' },
  shopSelectorText: { fontSize: 16, color: '#007bff', marginRight: 4 },

  searchBoxContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, marginVertical: 10 },
  searchBox: { flex: 1, height: 40, color: '#333' },
  searchIcon: { marginRight: 8 },

  filterScroll: { marginBottom: 10 },
  filters: { flexDirection: 'row', gap: 8 },
  filterButton: { backgroundColor: '#e0e0e0', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  selectedFilter: { backgroundColor: '#007bff' },
  filterText: { fontSize: 14, color: '#333' },
  selectedFilterText: { color: '#fff' },

  foodList: { gap: 12 },
  foodCard: { backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', marginBottom: 12, elevation: 2 },
  foodImage: { width: '100%', height: 180 },
  priceBadge: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6,
  },
  priceText: { color: '#fff', fontWeight: 'bold' },

  foodBottom: { padding: 10 },
  foodName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  foodDesc: { fontSize: 14, color: '#666', marginTop: 4 },
  shopName: { fontSize: 13, color: '#007bff', marginTop: 4 },

  infoIcon: {
    position: 'absolute', bottom: 10, right: 10,
    backgroundColor: '#007bff', padding: 8, borderRadius: 50
  },

  noItemsContainer: { alignItems: 'center', padding: 20 },
  noItemsText: { fontSize: 16, color: '#666' },

  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalView: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '85%' },
  closeIcon: { position: 'absolute', top: 10, right: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  modalPicker: { width: '100%' },

  productDetailModal: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '85%', alignItems: 'center' },
  modalImage: { width: '100%', height: 150, borderRadius: 10, marginVertical: 10 },
  modalText: { fontSize: 14, color: '#333', marginBottom: 6 },
});
