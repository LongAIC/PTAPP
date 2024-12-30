import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Bell,
  Search,
  MessageSquare,
  Home,
  User,
  Menu,
  PenSquare,
  ShoppingBag,
} from "lucide-react-native";
import { useUserInfo } from "@/hooks";
import { Person, AuthWrapper } from "@/components";

const QuanLyTinDangScreen = () => {
  const { userInfo, isLoading } = useUserInfo();
  const [activeTab, setActiveTab] = useState("showing");

  const renderContent = () => {
    switch (activeTab) {
      case "showing":
        return (
          <View className="flex-1 items-center justify-center p-4">
            <Image
              source={{ uri: "/api/placeholder/120/120" }}
              className="w-32 h-32 mb-4"
            />
            <Text className="text-xl font-bold mb-2">
              Không tìm thấy tin đăng
            </Text>
            <Text className="text-gray-500 text-center">
              Bạn hiện tại không có tin đăng nào đang hiển thị
            </Text>
          </View>
        );
      case "expired":
        return (
          <View className="flex-1 items-center justify-center p-4">
            <Image
              source={{ uri: "/api/placeholder/120/120" }}
              className="w-32 h-32 mb-4"
            />
            <Text className="text-xl font-bold mb-2">Tin đã hết hạn</Text>
            <Text className="text-gray-500 text-center">
              Không có tin đăng nào đã hết hạn
            </Text>
          </View>
        );
      case "rejected":
        return (
          <View className="flex-1 items-center justify-center p-4">
            <Image
              source={{ uri: "/api/placeholder/120/120" }}
              className="w-32 h-32 mb-4"
            />
            <Text className="text-xl font-bold mb-2">Tin bị từ chối</Text>
            <Text className="text-gray-500 text-center">
              Không có tin đăng nào bị từ chối
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AuthWrapper>
        <View className="bg-yellow-400 px-4 py-2 flex-row justify-between items-center">
          <Text className="text-xl font-bold">Quản lý tin đăng</Text>
          <View className="flex-row space-x-4">
            <Search className="w-6 h-6" />
            <Bell className="w-6 h-6" />
            <MessageSquare className="w-6 h-6" />
          </View>
        </View>

        {/* Thông tin người dùng */}
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center">
            <Person className="w-12 h-12 mr-5" />
            <View className="ml-2">
              <Text className="font-medium">{userInfo?.displayName}</Text>
              <Text className="text-blue-500">+ Tạo cửa hàng</Text>
            </View>
          </View>
        </View>

        <View className="flex-row border-b border-gray-200">
          <TouchableOpacity
            className={`flex-1 py-2 border-b-2 ${activeTab === "showing" ? "border-yellow-400" : "border-transparent"}`}
            onPress={() => setActiveTab("showing")}
          >
            <Text
              className={`text-center ${activeTab === "showing" ? "text-black" : "text-gray-500"}`}
            >
              ĐANG HIỂN THỊ (0)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 border-b-2 ${activeTab === "expired" ? "border-yellow-400" : "border-transparent"}`}
            onPress={() => setActiveTab("expired")}
          >
            <Text
              className={`text-center ${activeTab === "expired" ? "text-black" : "text-gray-500"}`}
            >
              HẾT HẠN (0)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 border-b-2 ${activeTab === "rejected" ? "border-yellow-400" : "border-transparent"}`}
            onPress={() => setActiveTab("rejected")}
          >
            <Text
              className={`text-center ${activeTab === "rejected" ? "text-black" : "text-gray-500"}`}
            >
              BỊ TỪ CHỐI (0)
            </Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </AuthWrapper>
    </SafeAreaView>
  );
};

export default QuanLyTinDangScreen;
