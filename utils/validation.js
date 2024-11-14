import * as Yup from "yup";
import axios from "axios";

export const logInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Tài khoản email là bắt buộc")
    .email("Vui lòng nhập email hợp lệ"),
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
    .email("Vui lòng nhập email hợp lệ")
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
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không đúng"),
});

export const forgetPasswordSchema = (setIsLoading) =>
  Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email của bạn")
      .email("Vui lòng nhập email hợp lệ")
      .test(
        "checkEmailExistence",
        "Email không tồn tại trên hệ thống",
        async function (value) {
          const { createError } = this;
          if (!value) return true;
          if (!Yup.string().email().isValidSync(value)) {
            return createError({ message: "Vui lòng nhập email hợp lệ" });
          }
          const isEmailExists = await checkEmailExistence(value, setIsLoading);
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
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không đúng"),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string().required("Tên loại không được để trống"),
  slug: Yup.string().required("Đường dẫn không được để trống"),
  image: Yup.string()
    .required("Vui lòng nhập URL hình ảnh")
    .url("URL hình ảnh không hợp lệ")
    .matches(
      /\.(gif|jpe?g|png|webp)$/i,
      "URL hình ảnh phải là một địa chỉ hình ảnh hợp lệ"
    ),
});

export const bannerSchema = Yup.object().shape({
  title: Yup.string().required("Tên không được để trống"),
  image: Yup.object().shape({
    url: Yup.string()
      .required("Vui lòng nhập URL hình ảnh")
      .url("URL không hợp lệ")
      .matches(
        /\.(gif|jpe?g|png|webp)$/i,
        "URL hình ảnh phải là một địa chỉ hình ảnh hợp lệ"
      ),
  }),
});

export const sliderSchema = Yup.object().shape({
  title: Yup.string().required("Tên không được để trống"),
  image: Yup.object().shape({
    url: Yup.string()
      .required("Vui lòng nhập URL hình ảnh")
      .url("URL không hợp lệ")
      .matches(
        /\.(gif|jpe?g|png|webp)$/i,
        "URL hình ảnh phải là một địa chỉ hình ảnh hợp lệ"
      ),
  }),
});

export const reviewSchema = Yup.object().shape({
  title: Yup.string()
    .required("Tiêu đề đánh giá không được để trống")
    .min(4, "Tiêu đề đánh giá không được ít hơn 4 ký tự"),
  comment: Yup.string()
    .required("Nội dung đánh giá không được để trống")
    .min(4, "Nội dung đánh giá không được ít hơn 4 ký tự"),
});

export const addressSchema = Yup.object().shape({
  province: Yup.object().shape({
    name: Yup.string().required("Vui lòng chọn tỉnh thành của bạn"),
  }),
  city: Yup.object().shape({
    name: Yup.string().required("Vui lòng chọn thành phố của bạn"),
  }),
  area: Yup.object().shape({
    name: Yup.string().required("Vui lòng chọn quận/huyện của bạn"),
  }),
  street: Yup.string().required("Tên đường không được để trống"),
  postalCode: Yup.string().required("Vui lòng nhập mã bưu điện của bạn"),
});

export const nameSchema = Yup.object().shape({
  name: Yup.string()
    .required("Vui lòng nhập tên")
    .min(3, "Tên phải có ít nhất 3 ký tự"),
});

export const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .min(11, "Số điện thoại phải có 11 số")
    .max(11, "Số điện thoại phải có 11 số"),
});

const checkEmailExistence = async (email, setIsLoading) => {
  try {
    if (setIsLoading) setIsLoading(true);

    const response = await axios({
      method: "get",
      url: `https://ftechwebsite.com/PTCOCO/wp-json/ftech/v1/checkmail`,
      headers: { key: "trunggane" },
      params: {
        email: email,
      },
    });

    const data = response.data;
    if (setIsLoading) setIsLoading(false);

    if (data.code === "-1") return true;
    if (data.code === "0") return false;
  } catch (error) {
    setIsLoading(false); // Nếu có lỗi, cũng tắt loading
    return "Lỗi khi kiểm tra email";
  }
};
