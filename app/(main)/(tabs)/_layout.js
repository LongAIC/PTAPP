import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Image } from "react-native";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffba00",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Tin tưc",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="fiber-new" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="update"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/live.png")}
              style={{
                width: 60,
                height: 60,
                objectFit: "contain",
                borderRadius: 100,
                backgroundColor: "#fff",
                padding: 10,
                borderWidth: 1,
                borderColor: "#ffba00",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Nhà cung cấp",
          tabBarIcon: ({ color }) => (
            <Entypo name="shopping-bag" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
          name="chats"
          options={{
            headerShown: true,
            title: "Đoạn chat",
            tabBarIcon: ({ color }) => (
              <AntDesign name="wechat" size={24} color={color} />
            ),
          }}
        /> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Cài đặt",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
