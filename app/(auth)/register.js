import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'

import { Button, HandleResponse, Logo, TextField } from '@/components'
import { useAppDispatch } from '@/hooks'
import { useCreateUserMutation } from '@/services'
import { userLogin } from '@/store'
import { registerSchema } from '@/utils'

export default function RegisterScreen() {
  //? Assets
  const dispatch = useAppDispatch()
  const router = useRouter()

  //? Create User
  const [createUser, { data, isSuccess, isError, isLoading, error }] = useCreateUserMutation()

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('name')
  }, [])

  //? Handlers
  const onSubmit = ({ name, email, password }) => {
    if (name && email && password) {
      createUser({
        body: { name, email, password },
      })
    }
  }

  const onSuccess = () => {
    dispatch(userLogin(data.data.token))
    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Đăng ký",
          headerBackTitleVisible: true,
        }}
      />
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message || "发生异常"}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}
      <ScrollView className="h-[100%]  bg-white">
        <View className="w-[100%] h-[100%] px-8  space-y-4 ">
          <View>
            <Image
              source={require("@/assets/app_images/Ellipse1.png")}
              className="mr-4 absolute"
            />
            <Image
              source={require("@/assets/app_images/Ellipse2.png")}
              className="mr-4 absolute"
            />
          </View>

          <View className=" w-[100%]">
          <TextField
              errors={formErrors.name}
              placeholder="Nhập họ và tên của bạn"
              name="name"
              control={control}
              label={"Họ và tên"}
              styleLabel="text-lg"
            />
            <TextField
              errors={formErrors.name}
              placeholder="Nhập số điện thoại của bạn"
              name="phone"
              control={control}
              label={"Số điện thoại"}
              styleLabel="text-lg"
            />
            <TextField
              errors={formErrors.email}
              placeholder="Nhập email của bạn"
              name="email"
              keyboardType="email-address"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-sm"
              autoCapitalize="none"
              control={control}
              label={"Email"}
              styleLabel="text-lg"
            />
            <TextField
              errors={formErrors.password}
              secureTextEntry
              placeholder="Nhập mật khẩu"
              name="password"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-sm"
              control={control}
              label={"Mật khẩu"}
              styleLabel="text-lg"
            />
            <TextField
              errors={formErrors.password}
              secureTextEntry
              placeholder="Xác nhận mật khẩu"
              name="password"
              styleInput="w-[100%] bg-white border-slate-200 border rounded p-4 text-sm"
              control={control}
              label={"Xác nhận mật khẩu"}
              styleLabel="text-lg"
            />
          </View>
          <View className="flex-row mb-4">
            <Text>Bằng việc đăng ký, bạn đã đồng ý với Điều khoản, Chính sách bảo mật và Sử dụng Cookie </Text>
          </View>
          <View className=" mt-10">
            <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
              Đăng ký tài khoản
            </Button>
          </View>
          <View className="flex-row items-center justify-center  ">
            <View className="flex-1 h-px bg-slate-300"></View>
            <Text className="mx-5 text-gray-500">Hoặc</Text>
            <View className="flex-1 h-px bg-slate-300"></View>
          </View>

          <View className="space-y-3 mb-10">
            <TouchableOpacity className="border p-3 rounded-lg justify-center items-center flex-row border-slate-300">
              <Image
                className="w-8 h-8"
                source={require("@/assets/app_images/google_icon.jpg")}
              />
              <Text>Đăng nhập bằng Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className=" p-3 rounded-lg justify-center items-center flex-row "
              style={{ backgroundColor: "#1877F2" }}
            >
              <Image
                className="w-7 h-7 mr-3"
                source={require("@/assets/app_images/facebook_icon.png")}
              />
              <Text className="text-white">Đăng nhập bằng Facebook</Text>
            </TouchableOpacity>
          </View>
          <View className="justify-center ">
            <View className=" bottom-0  mb-5 justify-center items-center flex-row  w-full  ">
              <Text>Bạn đã có tài khoản? </Text>
              <Link href="/login" className="text-blue-400 ">
                Đăng nhập ngay
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
