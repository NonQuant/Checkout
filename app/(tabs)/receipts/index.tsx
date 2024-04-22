import React, { useState, useEffect, Dispatch } from "react";
import { View, Text, FlatList, StyleSheet, SectionList } from "react-native";
import Transfer from "../../Interfaces/Transfer";
import Section from "../../Interfaces/Section";

const TransferHistory = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    // Simulate fetching transfer data from an API or local storage
    const fetchData = async () => {
      const data: Transfer[] = require("./data.json");
      setTransfers(data);
    };
    fetchData();
  }, []);

  // Function to format date in desired format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // Get month name
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const formattedTransfers: Section[] = React.useMemo(() => {
    const groupedTransfers = transfers.reduce((acc, transfer) => {
      const date = transfer.date.split("T")[0]; // Extract date only (YYYY-MM-DD)
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transfer);
      return acc;
    }, {});

    const sections = Object.entries(groupedTransfers).map(
      ([date, transfers]: [string, Transfer[]]) => ({
        title: date, // Call formatDate function to format the date
        data: transfers,
      })
    );

    sections.sort((a, b) => +new Date(a.title) - +new Date(b.title));

    // return sections;

    const formattedSections = sections.map((item) => ({
      title: formatDate(item.title),
      data: item.data,
    }));

    return formattedSections;
  }, [transfers]);

  const renderItem = ({ item }: { item: Transfer }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>Transfer: {item.transferAmount}₸</Text>
      <Text style={styles.listItemText}>From: {item.senderName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={formattedTransfers}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.id} // Use transfer ID for key
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
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  listItemText: {
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    padding: 5,
    color: "rgb(180, 180, 180)",
  },
});

export default TransferHistory;
