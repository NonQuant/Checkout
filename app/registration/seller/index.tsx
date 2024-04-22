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
  const [sellerName, setSellerName] = useState<string | undefined>();
  const [sellerCity, setSellerCity] = useState<string | undefined>();
  const [sellerTaxAuthority, setSellerTaxAuthority] = useState<
    string | undefined
  >();
  const [sellerAddress, setSellerAddress] = useState<string | undefined>();

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Регистрация ИП</Text>
          </View>
          <View style={styles.mainContent}>
            <FormInput
              placeholder="Название ИП"
              value={sellerName}
              onChangeText={setSellerName}
              variant="text"
            />
            <FormInput
              placeholder="Город или область"
              value={sellerCity}
              onChangeText={setSellerCity}
              variant="text"
            />
            <FormInput
              placeholder="Налоговый орган"
              value={sellerTaxAuthority}
              onChangeText={setSellerTaxAuthority}
              variant="text"
            />
            <FormInput
              placeholder="Дом/Квартира/Офис"
              value={sellerAddress}
              onChangeText={setSellerAddress}
              variant="text"
            />
          </View>
          <CTAButton
            title="Продолжить"
            onPress={() => {
              router.navigate({
                pathname: "/registration/seller/verification",
                params: {
                  sellerName,
                  sellerCity,
                  sellerTaxAuthority,
                  sellerAddress,
                },
              });
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
  },
  titleContainer: {
    flex: 1.2,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "300",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 45,
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
  },
});

export default RegisterSeller;
