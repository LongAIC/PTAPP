import { Text, View, TouchableOpacity, Image } from "react-native";

const StoreCard = (props) => {
  const { data } = props;
  console.log(data)

  return (
    <View className="flex-row items-center p-2 rounded-lg bg-white py-5">
      {/* Store Image */}
      <Image
        source={{
          uri: data.feature_image,
        }}
        className="h-[20vw] w-[20vw] rounded-full"
      />

      {/* Store Information */}
      <View className="ml-4 flex-1">
        <Text className="text-base font-medium">{data.name}</Text>
        <Text className="text-slate-500 ">{data.product_number} sản phẩm</Text>
      </View>

      {/* View Store Button */}
      <TouchableOpacity className="ml-4 px-4 py-2 border border-orange-500 rounded-lg">
        <Text className="text-orange-500 text-xs">Xem gian hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoreCard;
