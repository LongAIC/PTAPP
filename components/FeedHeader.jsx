import { router } from "expo-router";
import { Pressable, Text, TouchableOpacity, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Search from "./Search";
import Icons from "./common/Icons";
import Logo from "./svgs/logo.svg";

import { useAppSelector } from "@/hooks";
import { formatNumber } from "@/utils";

export default function FeedHeader(prop) {
  //? Assets
  const insets = useSafeAreaInsets();

  const { category } = prop;

  const { back = false } = prop || {};

  //? Store
  const { totalItems } = useAppSelector((state) => state.cart);

  //? Handlers
  const handleIconClick = (path) => {
    router.push(path);
  };

  //? Render(s)
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="p-3 bg-yellow-500 shadow-sm "
    >
      <View className="flex flex-row items-center justify-between gap-2 pt-2">
        {/* <Logo width={120} height={40} /> */}
        {back != false ? (
          <TouchableOpacity onPress={() => router.back()} className="pr-1 mb-1">
            <Icons.Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        ) : null}
        <Search category={category} />
        <View className="flex flex-row space-x-1 items-center">
          <TouchableOpacity
            onPress={() => {
              handleIconClick("/notice");
            }}
          >
            <Icons.Ionicons
              name="notifications-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleIconClick("/chats");
            }}
          >
            {/* Icon Chat */}
            <Icons.Ionicons
              name="chatbubble-ellipses-sharp"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
