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
  const originalRequest = error?.config;
  if (error?.response?.status == 401 && error.config && !error.config._isRetry) {
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
  addToLiked ({id,type}){
    return $api.post(`users/liked?type=${type}`, {id});
  },
   removeFromLiked ({id,type}){
    return $api.delete(`users/liked/${id}?type=${type}`);
  },
  // removeFromLiked (id){
  //   return $api.delete(`users/liked/${id}`);
  // },
  getLiked (type){
    return $api.get(`users/liked?type=${type}`);
  },
  getUserPlaylists (){
    return $api.get("users/playlists");
  },

};
export const tracksAPI = {
  getTracks() {
    return $api.get("tracks");
  },
  getSearchedTracks({query,type}) {
    return $api.get(`tracks/search?query=${query}&type=${type}`);
  },
  getTrack(id) {
    return instance.get("tracks/"+id);
  },
  // createAnswerToReview({ moduleId, ...data }) {
  //   return instance.post(`/maker/reviews/${moduleId}/answer`, data);
  // },
  // editAnswerToReview({ answerId, ...data }) {
  //   return instance.put(`/maker/answers/${answerId}`, data);
  // },
};
export const playlistAPI = {
  getPlaylists() {
    return $api.get("playlists");
  },
  createPlaylist(data){
    return $api.post("playlists", data);
  },
  updatePlaylist(data){
    return $api.put("playlists", data);
  },
  addTrackToPlaylist(data){
    return $api.post(`playlists/${data.albomId}`, {id:data.trackId});
  },
  removePlaylist (id){
    return $api.delete(`playlists/${id}`);
  },
  removeTrackFromPlaylist(data){
    return $api.put(`playlists/${data.playlistId}`, {id:data.trackId});
  }
}
// export const albomAPI = {
//   createAlbom (data){
//     return $api.post("alboms", data);
//   },
//   addTrackToAlbom(data){
//     return $api.post(`alboms/${data.albomId}`, {id:data.trackId});
//   },
//   removePlaylist (id){
//     return $api.delete(`alboms/${id}`);
//   },
//   removeTrackFromPlaylist(data){
//     return $api.put(`alboms/${data.playlistId}`, {id:data.trackId});
//   }
// }
