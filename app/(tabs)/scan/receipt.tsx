import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const receipt = () => {
  const { barcodeData } = useLocalSearchParams();
  return (
    <View>
      <Text>{barcodeData}</Text>
    </View>
  );
};

export default receipt;

const styles = StyleSheet.create({});
