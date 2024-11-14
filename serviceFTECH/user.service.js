import { changePasswordSchema } from "@/utils";
import apiFtechSlice from "./api";

export const userApiSlice = apiFtechSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `login?email=${email}&password=${password}`,
        method: "GET",
      }),
    }),
    checkEmail: builder.query({
      query: ({ email }) => ({
        url: `checkmail?email=${email}`,
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: ({ fullname, email, password, phone = "" }) => ({
        url: "register",
        method: "POST",
        params: { email, password, fullname, phone },
      }),
    }),
    sendOtpApi: builder.mutation({
      query: ({ email, otp }) => ({
        url: "otp",
        method: "GET",
        params: { email, otp },
      }),
    }),
    restorePassword: builder.mutation({
      query: ({ email, otp }) => ({
        url: "otpreset",
        method: "GET",
        params: {
          email,
          otp,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ email, password }) => ({
        url: "changepassword",
        method: "get",
        params: { email, password },
      }),
    }),

    editUser: builder.mutation({
      query: ({ username, id }) => ({
        url: "editUsername",
        method: "POST",
        params: { username, id },
      }),
    }),
    editPhoneUser: builder.mutation({
      query: ({ phone, id }) => ({
        url: "editPhoneUser",
        method: "POST",
        params: { phone, id },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckEmailQuery,
  useSendOtpApiMutation,
  useEditPhoneUserMutation,
  useRegisterMutation,
  useEditUserMutation,
  useRestorePasswordMutation,
  useChangePasswordMutation,
} = userApiSlice;
