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

const userInfoSetup = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    console.log("Current user: ", user);
  }, []);

  const saveDetails = async () => {
    try {
      const user = auth().currentUser;
      await firestore().collection("users").doc(user.uid).set({
        firstName,
        middleName,
        lastName,
      });
    } catch (error) {
      console.error("Error saving details: ", error);
    }
  };

  const enableButtonOnChange = () => {
    if (firstName && middleName && lastName) {
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
            <Text style={styles.titleText}>Заполнение данных</Text>
          </View>
          <View style={styles.mainContent}>
            <FormInput
              placeholder="Фамилия"
              variant="text"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                enableButtonOnChange();
              }}
            />
            <FormInput
              placeholder="Имя"
              variant="text"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                enableButtonOnChange();
              }}
            />
            <FormInput
              placeholder="Отчество"
              variant="text"
              value={middleName}
              onChangeText={(text) => {
                setMiddleName(text);
                enableButtonOnChange();
              }}
            />
          </View>
          <CTAButton
            title="Продолжить"
            onPress={() => {
              saveDetails();
              router.push("/registration/client/passwordSetup");
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

export default userInfoSetup;
