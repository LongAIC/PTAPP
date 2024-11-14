import { router } from "expo-router";
import { Pressable, Text, TouchableOpacity, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Search from "./Search";
import Icons from "./common/Icons";
import Logo from "./svgs/logo.svg";

import { useAppSelector } from "@/hooks";
import { formatNumber } from "@/utils";

export default function FeedHeader() {
  //? Assets
  const insets = useSafeAreaInsets();

  //? Store
  const { totalItems } = useAppSelector((state) => state.cart);

  //? Handlers
  const handleIconClick = (path) => {
    router.push(path);
  };

  //? Render(s)
  return (
    <View style={{ paddingTop: insets.top }} className="p-3 bg-white shadow-sm">
      <View className="flex flex-row items-center justify-between">
        {/* <Logo width={120} height={40} /> */}
        <Image
          source={require("@/assets/app_images/logo.png")}
          className="mr-4  w-[150px] h-[50px] object-contain"
        />
        <View className="flex flex-row space-x-3 pr-1">
          <TouchableOpacity
            onPress={() => {
              handleIconClick("/notice");
            }}
          >
            <Icons.Ionicons
              name="notifications-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Search />
    </View>
  );
}
