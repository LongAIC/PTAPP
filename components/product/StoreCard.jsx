import { Text, View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import Icons from "../common/Icons";
const StoreCard = (props) => {
  const { data, btn = false } = props;

  return (
    <View className="flex-row items-center p-2 rounded-lg bg-white py-5">
      <Image
        source={{
          uri: data.feature_image
            ? data.feature_image
            : "https://ftechwebsite.com/PTCOCO/wp-content/uploads/2024/09/BTAT.jpg",
        }}
        className="h-[20vw] w-[20vw] rounded-full"
      />

      {/* Store Information */}
      <View className="ml-4 flex-1">
        <Text className="text-base font-medium">
          {data.name ? data.name : "Gian hàng"}
        </Text>
        <Text className="text-slate-500 ">{data.product_number} sản phẩm</Text>
      </View>

      {/* View Store Button */}
      {btn ? (
        <Link
          href={`/units/${data.id}`}
          className="ml-4 px-4 py-2 border border-orange-500 rounded-lg active:opacity-5"
        >
          <Text className="text-orange-500 font-bold text-[13px]">
            Xem gian hàng
          </Text>
        </Link>
      ) : (
        <>
          <Icons.Feather
            name="heart"
            size={20}
            color="#1F2937"
            className="px-2 py-1"
          />
          <Icons.FontAwesome5
            name="share"
            size={20}
            color="#1F2937"
            className="px-2 py-1"
          />
        </>
      )}
    </View>
  );
};

export default StoreCard;
