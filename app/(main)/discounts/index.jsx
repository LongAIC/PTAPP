import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Stack } from 'expo-router';


const PackageItem = ({ item }) => {
  return (
    <TouchableOpacity className="flex-row justify-between items-center bg-white p-4 rounded-lg mb-3">
      <View className="flex-1">
        <Text className="text-base font-bold mb-1">{item.amount} Đồng Tốt</Text>
        <Text className="text-sm text-gray-500">{item.fee}</Text>
      </View>
      <View className="bg-green-50 px-3 py-1.5 rounded-2xl">
        <Text className="text-green-700">{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DiscountPage = () => {
    const packages = [
      {
        id: '1',
        amount: '25.000',
        fee: 'Phụ thu 5.000đ phí GD qua Google',
        price: 'Giá 30.000 đ',
      },
      {
        id: '2',
        amount: '63.000',
        fee: 'Phụ thu 12.000đ phí GD qua Google',
        price: 'Giá 75.000 đ',
      },
      {
        id: '3',
        amount: '127.000',
        fee: 'Phụ thu 23.000đ phí GD qua Google',
        price: 'Giá 150.000 đ',
      },
      {
        id: '4',
        amount: '637.000',
        fee: 'Phụ thu 113.000đ phí GD qua Google',
        price: 'Giá 750.000 đ',
      },
    ];
  
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <Stack.Screen
        options={{
          title: "Khuyến mãi",
          headerBackTitleVisible: false,
        }}
      />
        <View className="flex-1 p-4">
          <Text className="text-lg font-bold mb-4">Gói cơ bản</Text>
          <FlatList
            data={packages}
            renderItem={({ item }) => <PackageItem item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default DiscountPage;