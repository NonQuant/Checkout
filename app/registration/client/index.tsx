import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import { CTAButton } from "../../Components/Buttons/CTAButton";
import { router } from "expo-router";
import { FormInput } from "../../Components/Inputs/FormInput";

const RegisterSeller = () => {
  const [phone, setPhone] = useState<string | undefined>();
  const GLOBAL = require("../../global");

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Регистрация ИП</Text>
          </View>
          <View style={styles.mainContent}>
            <Text style={styles.labelText}>Мобильный телефон:</Text>
            <FormInput
              placeholder=""
              value={phone}
              onChangeText={setPhone}
              variant="phone"
            />
          </View>
          <CTAButton
            title="Продолжить"
            onPress={() => {
              GLOBAL.phoneNumber = phone;
              router.navigate("/registration/client/verification");
            }}
            variant="primary"
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
    // maxHeight: "90%",
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
  },
  labelText: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default RegisterSeller;
