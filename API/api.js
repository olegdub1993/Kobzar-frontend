import axios from "axios";
// import { setServerError } from "../features/auth/authSlice";
// import { useDispatch } from "react-redux";

export const url = process.env.NEXT_PUBLIC_BASIC_URL;
export const instance = axios.create({
  baseURL: url,
  //  baseURL: "/api/"
  // withCredentials: true,
});
// export const getModuleInfo = (path) => {
//   return axios.get(`${url}${path}`);
// };
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await authAPI.refresh({ refreshToken });
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        return instance.request(originalRequest);
      } catch (e) {
        console.log("Користувач не авторизований");
      }
    }
    throw error;
  }
);
// const dispatch = useDispatch;
// instance.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     if (error.response.status === 500) {
//       dispatch(setServerError(true));
//     }
//     throw error;
//   }
// );
export const authAPI = {
  signup(data) {
    return instance.post("signup", data);
  },
  signin(data) {
    return instance.post("auth/login", data);
  },
  // validation(data) {
  //   return instance.post("signup/validation", data);
  // },
  // emailVerification(data) {
  //   return instance.post("email/verification", data);
  // },
  // emailVerificationResend(data) {
  //   return instance.post("email/verification/resend", data);
  // },
  // logout() {
  //   return instance.post("logout");
  // },
  // refresh() {
  //   return instance.post("refresh");
  // },
  // forgotPassword(data) {
  //   return instance.post("password/forgot", data);
  // },
};

export const userAPI = {
  getUserData() {
    return instance.get("users/me");
  },
};
export const tracksAPI = {
  getTracks() {
    return instance.get("tracks");
  },
  // getMakerReviews() {
  //   return instance.get("maker/reviews");
  // },
  // createAnswerToReview({ moduleId, ...data }) {
  //   return instance.post(`/maker/reviews/${moduleId}/answer`, data);
  // },
  // editAnswerToReview({ answerId, ...data }) {
  //   return instance.put(`/maker/answers/${answerId}`, data);
  // },
};
