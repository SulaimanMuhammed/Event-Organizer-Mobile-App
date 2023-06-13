import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../Firebase"; // Replace with your Firebase configuration import

export default function SearchPage({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = getFirestore(app);

    // Fetch data from the "birthday" collection
    const birthdaySnapshot = await getDocs(collection(db, "birthday"));
    const birthdayData = birthdaySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch data from the "party" collection
    const partySnapshot = await getDocs(collection(db, "party"));
    const partyData = partySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Combine both datasets
    const combinedData = [...birthdayData, ...partyData];
    setData(combinedData);
    setIsLoading(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate("BirthdayPage", {
          restaurantId: item.id,
          item: item,
        })
      }
    >
      <Text style={styles.listItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for birthdays and parties"
          onChangeText={handleSearch}
          value={searchText}
          placeholderTextColor="#A9A9A9"
        />
      </View>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#000000" />
      ) : searchText.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    height: 48,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333333",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 16,
    color: "#333333",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#333333",
  },
});
