import { Link, Stack } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AuthWrapper, BoxLink, Icons, Logout, Person } from "@/components";
import { useUserInfo } from "@/hooks";

export default function ProfileScreen() {
  //? Assets
  const insets = useSafeAreaInsets();
  const { userInfo, isLoading } = useUserInfo();

  console.log(userInfo);
  const profilePaths = [
    // {
    //   name: "Đơn hàng của tôi",
    //   Icon: Icons.SimpleLineIcons,
    //   IconName: "handbag",
    //   path: "/profile/orders",
    // },
    // {
    //   name: "Bộ sưu tập của tôi",
    //   Icon: Icons.Feather,
    //   IconName: "heart",
    //   path: "/profile/lists",
    // },
    {
      name: "Đánh giá của tôi",
      Icon: Icons.FontAwesome5,
      IconName: "comment",
      path: "/profile/reviews",
    },
    // {
    //   name: "Quản lý địa chỉ",
    //   Icon: Icons.MaterialIcons,
    //   IconName: "location-city",
    //   path: "/profile/addresses",
    // },
    // {
    //   name: "Lượt truy cập gần đây",
    //   Icon: Icons.AntDesign,
    //   IconName: "clockcircleo",
    //   path: "/profile/user-history",
    // },
    {
      name: "Thông tin tài khoản",
      Icon: Icons.AntDesign,
      IconName: "user",
      path: "/profile/personal-info",
    },
    {
      name: "Hỗ trợ",
      Icon: Icons.AntDesign,
      IconName: "caretcircleoup",
      path: "/profile/personal-info",
    },
  ];

  //？Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <AuthWrapper tips="Tận hưởng mua sắm">
        <ScrollView className="bg-white">
          <View
            style={{ paddingTop: insets.top + 60 }}
            className="flex bg-white"
          >
            <View className="flex flex-row items-center px-4">
              <Person className="w-12 h-12 mr-5" />
              <View className="flex flex-col flex-1 gap-y-1">
                {isLoading ? (
                  <>
                    <View className="h-5 bg-red-200 rounded-md animate-pulse" />
                    <View className="w-32 h-5 bg-red-200 rounded-md animate-pulse" />
                  </>
                ) : (
                  <>
                    <Text className=" text-xl font-bold">
                      {userInfo?.displayName
                        ? userInfo?.displayName
                        : "Cập nhật thông tin"}
                    </Text>
                    <Text className="text-sm">
                      {userInfo?.email
                        ? userInfo?.email
                        : "Cập nhật số điện thoại"}
                    </Text>
                  </>
                )}
              </View>
              <Link href="/profile/personal-info">
                <Icons.Feather
                  name="edit"
                  size={30}
                  color="black"
                  className="icon text-gray-700  lg:mr-3"
                />
              </Link>
            </View>

            <View className="mt-7 px-4">
              {profilePaths.map((item, index) => (
                <BoxLink key={index} path={item.path} name={item.name}>
                  <item.Icon
                    name={item.IconName}
                    size={24}
                    className="text-gray-700"
                  />
                </BoxLink>
              ))}
              <Logout />
            </View>
          </View>
        </ScrollView>
      </AuthWrapper>
    </>
  );
}
