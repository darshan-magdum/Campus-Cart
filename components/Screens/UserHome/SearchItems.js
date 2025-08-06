import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  FlatList, Image, ScrollView, Modal
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Card = ({ image, name, category, isVeg, price, shopName, date, searchQuery, description }) => {
  const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
  };

  return matchesSearch ? (
    <View style={styles.foodCard}>
      <Image source={{ uri: image }} style={styles.foodImage} resizeMode="cover" />
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>₹{price}</Text>
      </View>
      <View style={styles.foodBottom}>
        <View style={styles.foodLeft}>
          <Text style={styles.foodName}>{name}</Text>
          <Text style={styles.vendorName}>{description}</Text>
          <Text style={styles.shopName}>{shopName}</Text>
        </View>
        <View style={styles.vendorInfo}>
          <Text style={styles.vendorDate}>{formatDate(date)}</Text>
        </View>
      </View>
    </View>
  ) : null;
};

export default function SearchItems() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [userData, setUserData] = useState(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const dummyFoodItems = [
    {
      id: '1',
      name: 'Parle-G Biscuits',
      category: 'snacks',
      isVeg: true,
      price: '10',
      image: 'https://example.com/biscuit.jpg',
      date: '2025-08-05',
      shopName: 'Ravi General Store',
      description: 'Classic glucose biscuits',
    },
    {
      id: '2',
      name: 'Sanitary Pads',
      category: 'essentials',
      isVeg: true,
      price: '35',
      image: 'https://example.com/pads.jpg',
      date: '2025-08-06',
      shopName: 'Health & Care Mart',
      description: 'Pack of 6, extra soft',
    },
    {
      id: '3',
      name: 'Paracetamol 500mg',
      category: 'medicines',
      isVeg: true,
      price: '15',
      image: 'https://example.com/paracetamol.jpg',
      date: '2025-08-06',
      shopName: 'Campus Medical',
      description: 'Fever and pain relief',
    },
  ];

  useEffect(() => {
    setUserData({ name: 'Darshan' });
    setFoodItems(dummyFoodItems);
    setFilteredFoodItems(dummyFoodItems);
    setSelectedShop(dummyFoodItems[0].shopName || '');
  }, []);

  useEffect(() => {
    const filteredItems = foodItems.filter(item =>
      (selectedFilter === 'all' || item.category.includes(selectedFilter)) &&
      (selectedShop === '' || item.shopName === selectedShop) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFoodItems(filteredItems);
  }, [foodItems, selectedFilter, selectedShop, searchQuery]);

  const renderFoodItem = ({ item }) => (
    <Card {...item} searchQuery={searchQuery} />
  );

  const uniqueShops = useMemo(() => {
    const shopSet = new Set();
    foodItems.forEach(item => shopSet.add(item.shopName));
    return Array.from(shopSet);
  }, [foodItems]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openModal}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{selectedShop || 'Select Shop'}</Text>
            <FeatherIcon name="chevron-down" size={20} color="#007bff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserSiderMenu')}>
          <View style={styles.userCircle}>
            {userData && <Text style={styles.userInitials}>{userData.name.charAt(0).toUpperCase()}</Text>}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBoxContainer}>
        <FeatherIcon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBox}
          placeholder="Search items"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <View style={styles.filters}>
          {['all', 'snacks', 'essentials', 'medicines'].map(filter => (
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

      {filteredFoodItems.length > 0 ? (
        <FlatList
          data={filteredFoodItems}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          style={styles.foodList}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Shop</Text>
            <Picker
              selectedValue={selectedShop}
              onValueChange={(itemValue) => setSelectedShop(itemValue)}
              style={styles.modalPicker}
            >
              {uniqueShops.map((shop, index) => (
                <Picker.Item key={index} label={shop} value={shop} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 16, color: '#007bff', marginRight: 5 },
  userCircle: { width: 35, height: 35, borderRadius: 20, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center' },
  userInitials: { color: '#fff', fontSize: 18 },
  searchBoxContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 8, padding: 8, marginBottom: 10 },
  searchBox: { flex: 1, marginLeft: 10, fontSize: 16 },
  searchIcon: {},
  filterScroll: { marginBottom: 10 },
  filters: { flexDirection: 'row' },
  filterButton: { paddingVertical: 6, paddingHorizontal: 15, backgroundColor: '#eee', borderRadius: 20, marginHorizontal: 5 },
  selectedFilter: { backgroundColor: '#007bff' },
  filterText: { fontSize: 14, color: '#333' },
  selectedFilterText: { color: '#fff' },
  foodList: { marginBottom: 20 },
  foodCard: { borderRadius: 10, marginBottom: 15, backgroundColor: '#f9f9f9', overflow: 'hidden' },
  foodImage: { width: '100%', height: 200 },
  priceBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  priceText: { color: '#fff', fontWeight: 'bold' },
  foodBottom: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  foodLeft: { flex: 1 },
  foodName: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  vendorName: { fontSize: 14, color: '#555' },
  shopName: { fontSize: 14, color: '#007bff', marginTop: 4 },
  vendorInfo: { justifyContent: 'center', alignItems: 'flex-end' },
  vendorDate: { fontSize: 13, color: '#777' },
  noItemsContainer: { alignItems: 'center', marginTop: 30 },
  noItemsText: { fontSize: 16, color: '#888' },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center', width: '80%' },
  modalText: { fontSize: 18, marginBottom: 10 },
  modalPicker: { width: '100%' },
  modalButton: { marginTop: 15, padding: 10, backgroundColor: '#007bff', borderRadius: 5 },
  textStyle: { color: 'white', fontWeight: 'bold' }
});
