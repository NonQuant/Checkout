import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import { CTAButton } from "../../Components/Buttons/CTAButton";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { FormInput } from "../../Components/Inputs/FormInput";

const passwordSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    console.log("Current user: ", user);
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Заполнение данных</Text>
          </View>
          <View style={styles.mainContent}>
            <FormInput
              placeholder="Email"
              variant="email"
              value={email}
              onChangeText={() => {}}
            />
            <FormInput
              placeholder="Пароль"
              variant="password"
              value={password}
              onChangeText={setPassword}
            />
            <FormInput
              placeholder="Повторите пароль"
              variant="password"
              value={passwordRepeat}
              onChangeText={setPasswordRepeat}
            />
          </View>
          <CTAButton
            title="Продолжить"
            onPress={() => {
              console.log("Pressed");
            }}
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
    minHeight: 800,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: "center",
    maxHeight: 200,
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "400",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
    gap: 10,
    maxHeight: "40%",
    justifyContent: "center",
  },
});

export default passwordSetup;
