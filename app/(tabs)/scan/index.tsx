import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import ScannerView from "../../Components/scan/ScannerView";
import { router } from "expo-router";

const ScanScreen = () => {
  const [barcodeData, setBarcodeData] = useState(null);

  useEffect(() => {
    if (barcodeData) {
      console.log(barcodeData);
      router.push({
        pathname: "/scan/receipt",
        params: { barcodeData: barcodeData },
      });
      setBarcodeData(null);
    }
  }, [barcodeData]);

  return (
    <View style={styles.container}>
      <ScannerView setBarcodeData={setBarcodeData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default ScanScreen;
