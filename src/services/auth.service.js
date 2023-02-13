import axios from "axios";

const API_URL = "https://tiffin.ufksolutions.com/user";

export const register = async (formData) => {
  //redux-tool-kit
  debugger
  try {
    const { data } = await axios.post(API_URL + "/registeruser", formData);
    debugger
    if (!Object.keys.length) {
    }
    localStorage.setItem("user", JSON.stringify(data.accessToken));
    return data.accessToken
  } catch (error) {
    console.log(error);
    return null;
  }
  // return await axios
  //   .post(API_URL + "/register", formData)
  //   .then((response) => {
  //     if (response.data.accessToken) {
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //     }
  //     return response.data;
  //   });
};

export const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};