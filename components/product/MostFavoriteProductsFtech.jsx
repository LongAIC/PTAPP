import { FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import DiscountProduct from './DiscountProduct'
import ProductPrice from './ProductPrice'
import FeedSectionContainer from '../common/FeedSectionContainer'
import Skeleton from '../common/Skeleton'

import { useGetProductsQuery } from '@/services'

export default function MostFavoriteProductsFtech(props) {
  //? Props
  const { products } = props

  //? Get Products Query


  //? Render(s)
  return (
    <FeedSectionContainer title="Sản phẩm hot">
      <View className="w-full flex flex-row flex-wrap">
        { products?.map((product, index) => (
              <Link
                href={{
                  pathname: ``,
                }}
                key={product.ID}
                asChild
              >
                <TouchableOpacity
                  key={product.ID}
                  className={`w-[49%] mr-[2%] mb-2 p-1 transition border border-gray-50 ${index % 2 === 1 ? 'mr-0' : ''}`}
                >
                  <View className="flex flex-row gap-x-2 ">
                    {/* <Text className="text-base">{product.rating.toFixed(1)}</Text> */}
                    <FontAwesome name="star" size={24} color="rgb(251 191 36)" />
                  </View>
                  <Image
                    source={{
                      uri: product.product_image,
                    }}
                    className="h-32 w-28 my-3 mx-auto"
                  />
                  <View
                    className={`flex flex-row items-start mt-2 gap-x-2 ${
                      product.discount ? 'justify-evenly' : 'justify-end pl-8'
                    }`}
                  >
                    {product.discount ? <DiscountProduct discount={product.discount} /> : null}
                    <ProductPrice
                      inStock={15}
                      discount={15}
                      price={15}
                    />
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
      </View>
    </FeedSectionContainer>
  )
}
