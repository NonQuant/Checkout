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
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const RegisterSeller = () => {
  const GLOBAL = require("./../../global");
  const phoneNumber = GLOBAL.phoneNumber;
  const [code, setCode] = useState(""); // verification code (OTP - One-Time-Passcode)
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [confirm, setConfirm] = useState(null); // If null, no SMS has been sent

  async function redirectUser(user) {
    try {
      router.navigate("/registration/client/userInfoSetup");
      // const userDocument = await firestore()
      //   .collection("users")
      //   .doc(user.uid)
      //   .get();
      // if (userDocument.exists && userDocument.get("firstName")) {
      //   router.navigate("/home");
      // } else {
      //   router.navigate("/registration/client/userInfoSetup");
      // }
    } catch (error) {
      console.error(error);
    }
  }

  async function onAuthStateChanged(user) {
    if (user && user.phoneNumber === phoneNumber) {
      redirectUser(user);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error("Error sending code", error);
    }
  }

  async function confirmCode() {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      redirectUser(user);
    } catch (error) {
      console.error("Invalid code", error);
      Alert.alert("Invalid code");
    }
  }

  const handleCodeChange = (code: string) => {
    setCode(code);
    if (code.length === 6) {
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
              maxLength={6}
              keyboardType="number-pad"
            />
          </View>
          {confirm ? (
            <CTAButton
              title="Продолжить"
              onPress={() => {
                confirmCode();
              }}
              variant="primary"
              disabled={buttonDisabled}
            />
          ) : (
            <CTAButton
              title="Отправить код"
              onPress={() => {
                signInWithPhoneNumber(phoneNumber);
              }}
              variant="primary"
              disabled={false}
            />
          )}
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
    marginBottom: 50,
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
    width: 160,
    fontSize: 40,
    padding: 5,
  },
});

export default RegisterSeller;
