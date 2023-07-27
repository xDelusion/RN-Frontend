import instance from ".";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

const register = async (userInfo) => {
  const formData = new FormData();

  for (const key in userInfo) {
    if (key != "image") {
      formData.append(key, userInfo[key]);
    }
  }

  formData.append("image", {
    name: userInfo.image,
    type: "image/jpeg",
    uri: userInfo.image,
  });

  const res = await instance.post("/api/auth/register", formData);
  return res.data;
};

const login = async (userInfo) => {
  const res = await instance.post("/api/auth/login", userInfo);
  return res.data;
};

const storeToken = async (access) => {
  //   localStorage.setItem("token", access);
  await SecureStore.setItemAsync("token", access);
};

const checkToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    const decode = jwt_decode(token);

    const currentTime = Date.now() / 10000;
    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.log("Error while trying to get the token", error);
  }
};

const logOut = async () => {
  await SecureStore.deleteItemAsync("token");
};

const getAllTrips = async () => {
  const res = await instance.get("/api/trip");
  return res.data;
};

const addTrip = async (data) => {
  console.log("CALLING API ADD TRIP");
  const formData = new FormData();
  for (const key in data) {
    if (key !== "image") {
      formData.append(key, data[key]);
    } else {
      formData.append(key, {
        uri: data.image,
        name: data.image,
        type: "image/jpeg",
      });
    }
  }
  console.log("FORMDATA", formData);
  const res = await instance.post("/api/trip", formData);
  return res.data;
};

const getMe = async () => {
  console.log("first");
  const res = await instance.get("/api/auth/me");
  return res.data;
};

export {
  register,
  login,
  logOut,
  storeToken,
  checkToken,
  getToken,
  getAllTrips,
  getMe,
  addTrip,
};
