import { Link } from "expo-router";
import { Pressable, Text, View, Dimensions, Image } from "react-native";

import Depot from "./Depot";
import DiscountProduct from "./DiscountProduct";
import ProductPrice from "./ProductPrice";
import SpecialSell from "./SpecialSell";
import Icons from "../common/Icons";
import ResponsiveImage from "../common/ResponsiveImage";

import { truncate } from "@/utils";

const ProductCard = (props) => {
  //? Props
  const { product } = props;

  const { width } = Dimensions.get("window"); // Lấy chiều rộng của màn hình
  const numColumns2 = 2; // Số lượng sản phẩm muốn hiển thị
  const itemWidth2 = width / numColumns2; // Chiều rộng của mỗi item

  //? Render(s)
  return (
    // <Link href={`/products/${product._id}`} asChild>
    //   <Pressable className="py-2 border-b border-gray-100 relative">
    //     <View className="absolute top-0 left-0 z-10">
    //       <SpecialSell discount={product.discount} inStock={product.inStock} />
    //     </View>

    //     <View className="flex flex-row items-center gap-3 space-x-3">
    //       <View className="flex p-1">
    //         <ResponsiveImage
    //           dimensions="h-[28vw] w-[26vw] mb-8"
    //           imageStyles="h-[28vw] w-[26vw]"
    //           source={""}
    //           alt={product.title}
    //         />
    //         {/* product.images[0].url */}
    //         <View className="p-2 flex flex-row gap-1.5 items-end">
    //           {product.colors &&
    //             product.inStock !== 0 &&
    //             product.colors
    //               .slice(0, 3)
    //               .map((color) => (
    //                 <View
    //                   key={color.id}
    //                   className="inline-block w-2.5 h-2.5 rounded-xl border-gray-300 shadow border "
    //                   style={{ backgroundColor: color.hashCode }}
    //                 />
    //               ))}
    //           {product.colors.length > 3 && product.inStock !== 0 && (
    //             <Icons.AntDesign name="plus" className="w-2.5 h-2.5" />
    //           )}
    //         </View>
    //       </View>
    //       <View className="flex-1 space-y-3 w-full">
    //         <Text className="text-sm leading-6 text-gray-800 break-all h-14">
    //           {truncate(product.title, 70)}
    //         </Text>
    //         <View className="flex flex-row justify-between">
    //           <View>
    //             <Depot inStock={product.inStock} />
    //           </View>
    //           <View className="flex flex-row items-center gap-x-1">
    //             <Text className=" text-neutral-500">
    //               {product.rating.toFixed(1)}
    //             </Text>
    //             <Icons.AntDesign
    //               name="star"
    //               size={16}
    //               className="text-amber-400"
    //             />
    //           </View>
    //         </View>
    //         <View className="flex flex-row justify-between">
    //           <View>
    //             {product.discount > 0 && product.inStock !== 0 && (
    //               <DiscountProduct discount={product.discount} />
    //             )}
    //           </View>
    //           {product.inStock !== 0 ? (
    //             <ProductPrice
    //               inStock={product.inStock}
    //               discount={product.discount}
    //               price={product.price}
    //             />
    //           ) : (
    //             <Text className="h-12 my-0.5">不可用</Text>
    //           )}
    //         </View>
    //       </View>
    //     </View>
    //   </Pressable>
    // </Link>
    <Link href={`/products/${product.ID}`} asChild key={product.ID}>
      <View className="overflow-hidden p-[5px]">
        <Image
          source={{
            uri: product?.product_image,
          }}
          className="w-[100%] h-[212px] object-cover  z-50 rounded-lg"
        />
        <View className="h-[50px]">
          <Text
            numberOfLines={1}
            className="text-[14px] font-[400] leading-5 pt-1"
          >
            {product?.product_name}
          </Text>
          <Text className="text-[10px] text-[#FF4405]">Tư vấn trực tiếp</Text>
          <View className="flex flex-row my-1">
            <Text className="text-[#808080] mr-1 line-through">
              1.690.000 đ
            </Text>
            <Text className="text-[#FF4405] mr-1 text-[15px] font-bold">
              1.490.000 đ
            </Text>
          </View>
        </View>
        <View className="mt-3 pt-1 border-t-[1px] border-[#F0F1F1] ">
          <Text className="text-[14px] font-[400] leading-5 text-[#FF4405] font-bold">
            {product?.donvicungcap ? product?.donvicungcap : "FTECH"}
          </Text>
          <Text className="text-[#808080]">38 sản phẩm </Text>
        </View>
      </View>
    </Link>
  );
};

export default ProductCard;
