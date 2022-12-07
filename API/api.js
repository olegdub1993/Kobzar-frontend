import axios from "axios";

axios.defaults.withCredentials = true
export const API_URL = process.env.NEXT_PUBLIC_BASIC_URL;
const $api = axios.create({
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

$api.interceptors.response.use((config) => {
  return config;
},async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
          const response = await axios.get(`${API_URL}auth/refresh`,)
          localStorage.setItem('token', response.data.accessToken);
          return $api.request(originalRequest);
      } catch (e) {
          console.log('НЕ АВТОРИЗОВАНИЙ')
      }
  }
  throw error;
})

export const authAPI = {
  signup(data) {
    return $api.post("auth/registration", data);
  },
  signin(data) {
    return $api.post("auth/login", data);
  },
   checkAuth() {
  return $api.get(`${API_URL}auth/refresh`,);
  },
  logout() {
    return $api.delete("auth/logout");
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
  // refresh() {
  //   return instance.post("refresh");
  // },
  // forgotPassword(data) {
  //   return instance.post("password/forgot", data);
  // },
};

export const userAPI = {
  getUserData() {
    return $api.get("users/me");
  },
  updateProfile (data){
    return $api.post("users/updateProfile", data);
  },
  addToLiked (id){
    return $api.post("users/liked", {id});
  },
  removeFromLiked (id){
    return $api.delete(`users/liked/${id}`);
  },
  getLiked (){
    return $api.get("users/liked");
  },
  getAlboms (){
    return $api.get("users/alboms");
  },

};
export const tracksAPI = {
  getTracks() {
    return $api.get("tracks");
  },
  getSearchedTracks(query) {
    return $api.get("tracks/search?query=" + query);
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
export const albomAPI = {
  createAlbom (data){
    return $api.post("alboms", data);
  },
  addTrackToAlbom(data){
    return $api.post(`alboms/${data.albomId}`, {id:data.trackId});
  }
}
