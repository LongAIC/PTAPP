import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { firestore } from "../firebaseConfig";
import { useSelector } from "react-redux";
import { addMessage } from "../features/chatSlice";

const ChatScreen = () => {
  const { currentChat, messages } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = firestore
      .collection("chats")
      .doc(currentChat)
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const chatMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(chatMessages);
      });

    return () => unsubscribe();
  }, [currentChat]);

  const sendMessage = () => {
    if (message.trim()) {
      firestore
        .collection("chats")
        .doc(currentChat)
        .collection("messages")
        .add({
          senderId: "user_123", // Dùng userId hiện tại
          text: message,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

      setMessage("");
    }
  };

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
