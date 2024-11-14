import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import { Stack, useLocalSearchParams, useRouter, router } from "expo-router";
import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";

const goToChat = (name) => {
  router.push({
    params: {
      url: "https://tawk.to/chat/645384864247f20fefef4ad5/1gvj3rc63",
      brandName: name,
    },
    pathname: "/chats/chatBrand",
  });
};

const stores = [
  {
    id: 1,
    name: "Organic Fresh Market",
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3",
    lastMessage: "Thank you for shopping with us!",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Tech Haven Electronics",
    image:
      "https://images.unsplash.com/photo-1518997554305-5eea2f04e384?ixlib=rb-4.0.3",
    lastMessage: "Your order has been shipped",
    time: "09:15 AM",
    unread: 0,
  },
  {
    id: 3,
    name: "Fashion Forward",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3",
    lastMessage: "New collection arrival!",
    time: "Yesterday",
    unread: 1,
  },
  {
    id: 4,
    name: "Bookworm's Paradise",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3",
    lastMessage: "Book signing event this weekend",
    time: "Yesterday",
    unread: 3,
  },
  {
    id: 5,
    name: "Fitness First",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3",
    lastMessage: "Your trainer updated the schedule",
    time: "2 days ago",
    unread: 0,
  },
];

const ChatScreen = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredStores = (stores || []).filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const params = useLocalSearchParams();
  const url = params?.url;

  // Hàm render component loading
  const LoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View className="bg-white rounded-xl shadow-lg max-w-lg mx-auto w-[100%] h-[100%]">
          <View className="p-4 bg-gradient-to-r from-blue-500 to-purple-500">
            <View className="relative">
              <FontAwesome
                name="search"
                size={18}
                color="gray"
                className="absolute left-3 top-6"
              />
              <TextInput
                placeholder="Search stores..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/90 backdrop-blur focus:ring-2 focus:ring-purple-300"
              />
            </View>
          </View>
          <FlatList
            data={filteredStores}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="h-px bg-gray-100" />}
            renderItem={({ item: store }) => (
              <TouchableOpacity
                onPress={() => goToChat(store.name)}
                className="flex-row items-center p-4 hover:bg-gray-50"
              >
                <View className="relative">
                  <Image
                    source={{ uri: store.image }}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                    onError={({ nativeEvent: { currentTarget } }) => {
                      currentTarget.source = {
                        uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3",
                      };
                    }}
                  />
                  {store.unread > 0 && (
                    <View className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      <Text className="text-white text-xs font-bold">
                        {store.unread}
                      </Text>
                    </View>
                  )}
                </View>
                <View className="ml-4 flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-semibold text-gray-900">
                      {store.name}
                    </Text>
                    <Text className="text-sm text-gray-500">{store.time}</Text>
                  </View>
                  <Text className="text-gray-600 text-sm truncate">
                    {store.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default ChatScreen;
