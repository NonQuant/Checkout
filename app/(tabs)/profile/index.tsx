import {
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ProfileScreen = () => {
  const [userDocument, setUserDocument] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      console.log(user);
      if (user) {
        const userDoc = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        setUserDocument(userDoc);
      } else {
        router.replace("/");
      }
    };

    fetchUserData().catch((error) => {
      console.error(error);
      auth().signOut();
      router.replace("/");
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.profileElement]}>
        <Image />
        <Text style={styles.profileName}>
          {userDocument && userDocument.get("firstName")}{" "}
          {userDocument && userDocument.get("lastName")[0] + "."}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.profileElement, styles.profileButton]}
        onPress={() => {
          router.push("/receipts/");
        }}
      >
        <Text style={styles.profileButtonText}>Платежи</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.profileElement, styles.profileButton]}
        onPress={() => {
          console.log("You tapped the button!");
        }}
      >
        <Text style={styles.profileButtonText}>Гид</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.profileElement, styles.profileButton]}
        onPress={() => {
          router.push("/profile/about");
        }}
      >
        <Text style={styles.profileButtonText}>О нас</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.profileElement, styles.profileButton]}
        onPress={() => {
          auth()
            .signOut()
            .then(() => router.replace("/"));
        }}
      >
        <Text style={styles.profileButtonText}>Выход</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "space-between",
  },
  profileElement: {
    margin: 20,
  },
  profileName: {
    textAlign: "center",
    fontSize: 26,
  },
  profileButton: {
    borderWidth: 1,
    paddingVertical: 7,
  },
  profileButtonText: {
    textAlign: "center",
    fontSize: 22,
  },
});

export default ProfileScreen;
