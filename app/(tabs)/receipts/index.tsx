import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SectionList } from "react-native";
import Transfer from "../../Interfaces/Transfer";
import Section from "../../Interfaces/Section";

const TransferHistory = () => {
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

  const formattedTransfers = React.useMemo(() => {
    const groupedTransfers = transfers.reduce((acc, transfer) => {
      const date = transfer.date.split("T")[0]; // Extract date only (YYYY-MM-DD)
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transfer);
      return acc;
    }, {});

    // Convert object to array of sections with title and data
    return Object.entries(groupedTransfers).map(([date, transfers]) => ({
      title: date,
      data: transfers,
    }));
  }, [transfers]);

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>From: {item.from}</Text>
      <Text style={styles.listItemText}>To: {item.to}</Text>
      <Text style={styles.listItemText}>Amount: {item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transfer History</Text>
      <SectionList
        sections={formattedTransfers}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.id || item.title} // Use transfer ID or section title for key
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default TransferHistory;
