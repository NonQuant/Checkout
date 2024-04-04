import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import ScannerView from "../../Components/scan/ScannerView";

const ScanScreen = () => {
  const [barcodeData, setBarcodeData] = useState(null);

  useEffect(() => {
    if (barcodeData) console.log(barcodeData);
  }, [barcodeData]);

  return (
    <View style={styles.container}>
      <ScannerView setBarcodeData={setBarcodeData}/>
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
