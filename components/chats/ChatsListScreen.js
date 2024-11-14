import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { firestore } from "../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../features/chatSlice";

const ChatsListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("chats")
      .where("participants", "array-contains", userId)
      .onSnapshot((snapshot) => {
        const chatList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatList);
      });

    return () => unsubscribe();
  }, [userId]);

  const openChat = (chatId) => {
    dispatch(setChat({ chatId }));
    navigation.navigate("Chat");
  };

  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openChat(item.id)}>
            <Text>{item.latestMessage}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ChatsListScreen;
