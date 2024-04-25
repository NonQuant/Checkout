import MessageViewProps from "../../Interfaces/MessageViewProps";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

export const MessageView: FC<MessageViewProps> = ({ type, text }) => {
  const backgroundColor = type === "error" ? "#f55442" : "#1aad44";
  return (
    <View
      style={[styles.messageContainer, { backgroundColor: backgroundColor }]}
    >
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 15,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 15,
    color: "white",
  },
});
