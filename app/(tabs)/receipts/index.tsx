import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type Transfer = {
  id: string;
  senderName: string;
  transferAmount: number;
  date: string;
};

const ReceiptsScreen = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    // Simulate fetching transfer data from an API or local storage
    const fetchData = async () => {
      const data: Transfer[] = require("./data.json");
      setTransfers(data);
    };
    console.log(transfers);
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>From: {item.senderName}</Text>
      <Text style={styles.listItemText}>Amount: {item.transferAmount} T</Text>
      <Text style={styles.listItemText}>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transfer History</Text>
      <FlatList
        data={transfers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginBottom: 5,
  },
  listItemText: {
    fontSize: 16,
  },
});

export default ReceiptsScreen;

// const receiptsData: object | null = require("./data.json");
