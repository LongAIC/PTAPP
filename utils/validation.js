import * as Yup from "yup";
import axios from "axios";

export const logInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Tài khoản email là bắt buộc")
    .email("Vui lòng nhập email hợp lại"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Độ dài mật khẩu 8 ký tự"),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Vui lòng nhập họ và tên")
    .min(3, "Tên không hợp lệ"),
  email: Yup.string()
    .required("Vui lòng nhập email của bạn")
    .email("Vui lòng nhập email hợp lại")
    .test(
      "checkEmailExistence",
      "Email đã tồn tại trên hệ thống",
      async function (value) {
        const { createError } = this;
        if (!value) return true;
        if (!Yup.string().email().isValidSync(value)) {
          return createError({ message: "Vui lòng nhập email hợp lệ" });
        }
        const isEmailExists = await checkEmailExistence(value);
        return !isEmailExists;
      }
    ),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Độ dài mật khẩu 8 kí tự")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 ký tự in hoa")
    .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 ký tự thường")
    .matches(/\d/, "Mật khẩu phải có ít nhất 1 chữ số")
    .matches(/[@$!%*?&#]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
  confirmPassword: Yup.string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận k đúng"),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Vui lòng nhập email của bạn")
    .email("Vui lòng nhập email hợp lại")
    .test(
      "checkEmailExistence",
      "Email không tồn tại trên hệ thống",
      async function (value) {
        const { createError } = this;
        if (!value) return true;
        if (!Yup.string().email().isValidSync(value)) {
          return createError({ message: "Vui lòng nhập email hợp lệ" });
        }
        const isEmailExists = await checkEmailExistence(value);
        return isEmailExists;
      }
    ),
});

export const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Độ dài mật khẩu 8 kí tự")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 ký tự in hoa")
    .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 ký tự thường")
    .matches(/\d/, "Mật khẩu phải có ít nhất 1 chữ số")
    .matches(/[@$!%*?&#]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
  confirmPassword: Yup.string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận k đúng"),
})

export const categorySchema = Yup.object().shape({
  name: Yup.string().required("类别名称不能为空"),
  slug: Yup.string().required("路径名不能为空"),
  image: Yup.string()
    .required("输入图片地址")
    .url("无效的图像地址")
    .matches(/\.(gif|jpe?g|png|webp)$/i, "图像地址必须是有效的图像URL"),
});

export const bannerSchema = Yup.object().shape({
  title: Yup.string().required("名称不能为空"),
  image: Yup.object().shape({
    url: Yup.string()
      .required("请输入图片地址")
      .url("地址无效")
      .matches(/\.(gif|jpe?g|png|webp)$/i, "图像地址必须是有效的图像URL"),
  }),
});

export const sliderSchema = Yup.object().shape({
  title: Yup.string().required("名称不能为空"),
  image: Yup.object().shape({
    url: Yup.string()
      .required("请输入图片地址")
      .url("地址无效")
      .matches(/\.(gif|jpe?g|png|webp)$/i, "图像地址必须是有效的图像URL"),
  }),
});

export const reviewSchema = Yup.object().shape({
  title: Yup.string()
    .required("评价标题不能为空")
    .min(4, "评价标题不得少于4个字符"),
  comment: Yup.string()
    .required("评价文字不能为空")
    .min(4, "评价文字不应少于 4 个字符"),
});

export const addressSchema = Yup.object().shape({
  province: Yup.object().shape({
    name: Yup.string().required("请选择您居住的省份"),
  }),
  city: Yup.object().shape({
    name: Yup.string().required("请选择您的居住的城市"),
  }),
  area: Yup.object().shape({
    name: Yup.string().required("请选择您的居住的区县"),
  }),
  street: Yup.string().required("街道名称不能为空"),
  postalCode: Yup.string().required("请输入您的邮政编码"),
});

export const nameSchema = Yup.object().shape({
  name: Yup.string().required("必须登记姓名").min(3, "名字必须超过 3 个字符"),
});

export const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required("手机号码必须注册")
    .min(11, "手机号码必须为 11 位数字")
    .max(11, "手机号码必须为 11 位数字"),
});

const checkEmailExistence = async (email) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://ftechwebsite.com/PTCOCO/wp-json/ftech/v1/checkmail`,
      headers: { key: "trunggane" },
      params: {
        email: email,
      },
    });

    const data = response.data;

    if (data.code === "-1") return true;
    if (data.code === "0") return false;
  } catch (error) {
    return "Lỗi khi kiểm tra email";
  }
};
