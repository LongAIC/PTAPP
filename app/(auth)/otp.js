import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import {
  Button,
  OTPInput,
  ErrorMessage,
  Message,
  Popup,
  Icons,
} from "@/components";
import axios from "axios";
import {
  useSendOtpApiMutation,
  useRestorePasswordMutation,
  useRegisterMutation,
} from "@/serviceFTECH";

export default function OTPScreen() {
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpInput, setOTPInput] = useState();
  const [errors, setErrors] = useState("");
  const [sendOTP, setSendOTP] = useState(true);
  const [message, setMessage] = useState("");
  const [pressed, setPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [titlePopUp, setTitlePopUp] = useState("");
  const [subTitlePopUp, setSubTitlePopUp] = useState("");
  const [sendOtpApi] = useSendOtpApiMutation();
  const [restorePassword] = useRestorePasswordMutation();
  const [register] = useRegisterMutation();
  const router = useRouter();
  const { type, email, name, password } = useLocalSearchParams();

  const handleOtpChange = (otp) => {
    setErrors("");
    setMessage("");
    setOTPInput(otp);
  };
  const handlePressIn = () => {
    setPressed(true);
  };
  const goToScreen = () => {
    router.push("/login");
    setModalVisible(false);
  };

  const handlePressOut = () => {
    setPressed(false);
  };
  useEffect(() => {
    const fetchOTP = async () => {
      const otp = generateOtp();
      setMessage("");
      setOTP(otp);
      let url = "";
      let response = "";
      if (type === "signUp") {
        try {
          response = await sendOtpApi({ email, otp }).unwrap();
        
          setMessage(response.message);
        } catch (err) {
          setErrors(err);
        }
      }
      if (type === "forgetPassword") {
        try {
          response = await restorePassword({ email, otp }).unwrap();
     
          if (response.code === "1200") {
            setMessage(response.message);
          }
        } catch (err) {
          setErrors(err);
        }
      }
    };
    fetchOTP();
  }, [sendOTP]);
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleOTP = async () => {
    setIsLoading(true);
    if (otpInput == otp) {
      if (type == "signUp") {
        try {
          const response = await register({ fullname: name, email, password });
          if (response.data.code === "100") {
            setTitlePopUp("Tạo tài khoản thành công!");
            setSubTitlePopUp("Bây giờ bạn có thể đăng nhập vào hệ thống.");
            setModalVisible(true);
          }
        } catch (error) {
          if (error.response) {
            setErrors(error.response.data.message);
          } else {
            setErrors("Hệ thống đang lỗi. Vui lòng thử lại sau.");
          }
        }
      }
      if (type === "forgetPassword") {
        router.push({
          params: {
            email: email,
          },
          pathname: "changePassword",
        });
      }
    } else {
      setErrors("Mã OTP không đúng.");
    }
    setIsLoading(false);
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Nhập mã OTP",
          headerBackTitleVisible: true,
        }}
      />
      <View className="h-[100%]  bg-white px-4  space-y-4">
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
        <View className=" w-[100%] ">
          <Text className="text-slate-600 mb-10 ">
            Vui lòng nhập mã OTP được gửi về tài khoản email ({email})
          </Text>
        </View>
        <View style={{ marginVertical: 50, marginHorizontal: 0 }}>
          <OTPInput
            pinCount={6}
            onOtpChange={handleOtpChange}
            className="w[80%] "
            autoFocusOnLoad
          />
          <View style={{ marginTop: 15, marginHorizontal: 10 }}>
            {errors ? <ErrorMessage errorText={errors} /> : null}
            {message ? <Message messageText={message} /> : null}
          </View>
        </View>
        <View style={{}}>
          <Text style={{ textAlign: "center", color: "#000" }}>
            Bạn không nhận được email?{" "}
            <Text
              style={[
                {
                  color: "#000",
                  textDecorationLine: "underline",
                  fontWeight: "400",
                },
                pressed && styles.textPressed,
              ]}
              onPress={() => {
                setSendOTP(!sendOTP);
              }}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              Gửi lại
            </Text>
          </Text>
        </View>
        <View className="">
          <Button onPress={handleOTP} isLoading={isLoading}>
            Xác nhận
          </Button>
        </View>
      </View>
      <Popup visible={modalVisible} onClose={closeModal}>
        <Icons.AntDesign
          name={"checkcircleo"}
          style={{
            fontSize: 78,
            color: "#0C9409",
            textAlign: "left",
            alignSelf: "center",
          }}
        />
        <Text style={styles.modalText}>{titlePopUp}</Text>
        <Text style={{ textAlign: "center", color: "#000" }}>
          {subTitlePopUp}
        </Text>
        <View style={{ width: "100%", marginTop: 20 }}>
          <TouchableOpacity
            className="bg-red-500"
            style={{
              borderRadius: 10,
              paddingVertical: 15,
              width: "100%",
            }}
            onPress={() => goToScreen()}
          >
            <Text style={{ textAlign: "center", color: "#fff", fontSize: 17 }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </Popup>
    </>
  );
}

const styles = StyleSheet.create({
  textPressed: {
    color: "blue",
    transform: [{ scale: 0.9 }],
  },
  modalText: {
    marginTop: 15,
    fontSize: 17,
    color: "#000",
    fontWeight: "500",
    marginBottom: 15,
    textAlign: "center",
  },
  otpInput: {
    width: "80%",
    height: 50,
  },
});
