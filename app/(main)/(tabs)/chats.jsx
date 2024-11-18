import React, { useState, useCallback } from "react";
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
import { AuthWrapper } from "@/components";

import { useChatlistboxQuery } from "@/serviceFTECH";
import { useUserInfo } from "@/hooks";

import { useFocusEffect } from "@react-navigation/native";

const ChatScreen = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { userInfo } = useUserInfo();

  const goToChat = (tawk_to, name) => {
    console.log(tawk_to);
    router.push({
      params: {
        url: tawk_to,
        brandName: name,
      },
      pathname: "/(chats)/chatBrand",
    });
  };

  const {
    data: stores,
    isLoading,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useChatlistboxQuery(
    { user_id: userInfo?.id },
    {
      skip: !userInfo?.id, // Bỏ qua query nếu user_id không tồn tại
      selectFromResult: ({ data, ...args }) => ({
        data: data?.data || {}, // Trả về data cụ thể
        ...args, // Bao gồm các trạng thái khác
      }),
    }
  );

  const filteredStores = Array.isArray(stores)
    ? stores.filter((store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const params = useLocalSearchParams();
  const url = params?.url;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [userInfo?.id])
  );

  return (
    <AuthWrapper>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <>
            {filteredStores != "" ? (
              <View>
                <View className="bg-white  rounded-xl shadow-lg max-w-lg mx-auto w-[100%] h-[100%]">
                  <View className="p-4 bg-gradient-to-r from-blue-500 to-purple-500">
                    <View className="relative">
                      <FontAwesome
                        name="search"
                        size={18}
                        color="gray"
                        style={{ position: "absolute", top: 7, left: 10 }}
                      />
                      <TextInput
                        placeholder="Tìm kiếm nhà cung cấp"
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/90 backdrop-blur focus:ring-2 focus:ring-purple-300"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                      />
                    </View>
                  </View>
                  <FlatList
                    data={filteredStores}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => (
                      <View className="h-px bg-gray-100" />
                    )}
                    renderItem={({ item: store }) => (
                      <TouchableOpacity
                        onPress={() => goToChat(store.tawk_to, store.name)}
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
                            <Text className="text-sm text-gray-500">
                              {store.time}
                            </Text>
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
            ) : (
              <View className="mt-4">
                <Text className="text-center text-black-30">
                  Không có tin nhắn
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </AuthWrapper>
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
