import instance from ".";
import jwt_decode from "jwt-decode";

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

  const res = await instance.post("/auth/register", formData);
  return res.data;
};

const login = async (userInfo) => {
  const res = await instance.post("/auth/login", userInfo);
  return res.data;
};

const storeToken = (access) => {
  localStorage.setItem("token", access);
};

const checkToken = () => {
  const token = localStorage.getItem("token");
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

const logOut = () => {
  localStorage.removeItem("token");
};

export { register, login, logOut, storeToken, checkToken };
