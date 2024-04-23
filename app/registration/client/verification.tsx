import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  Alert,
  TextInput,
} from "react-native";
import { CTAButton } from "../../Components/Buttons/CTAButton";
import { router, useLocalSearchParams } from "expo-router";
import { FormInput } from "../../Components/Inputs/FormInput";

const RegisterSeller = () => {
  const GLOBAL = require("./global");
  const phoneNumber = GLOBAL.phoneNumber;
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {}, []);

  const handleCodeChange = (code: string) => {
    setCode(code);
    if (code.length === 4) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Регистрация ИП</Text>
          </View>
          <View style={styles.mainContent}>
            <Text style={styles.labelText}>Введенный номер: {phoneNumber}</Text>
            <Text style={styles.labelText}>Введите код:</Text>
            <TextInput
              style={styles.codeInput}
              value={code}
              onChangeText={handleCodeChange}
              maxLength={4}
              keyboardType="number-pad"
            />
          </View>
          <CTAButton
            title="Продолжить"
            onPress={() => {}}
            variant="primary"
            disabled={buttonDisabled}
          />
          <CTAButton
            title="Назад"
            onPress={() => {
              router.back();
            }}
            variant="secondary"
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: "white",
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1.2,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 150,
  },
  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
    alignItems: "center",
    gap: 40,
  },
  labelText: {
    fontSize: 24,
    marginBottom: 10,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "black",
    width: 110,
    fontSize: 40,
    padding: 5,
  },
});

export default RegisterSeller;
