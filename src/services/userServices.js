import axios from "axios";
import { BASE_URL, APP_ID, APP_SECRET } from "@env";

const ROUTE = "organization";
const TIME_ZONE_ID = "Europe/Paris";
const TIME_ZONE_OFFSET = "+01:00";
const SEX = "1";
const ROLE_ID = "10";
const DEPT_ID = "568";

axios.defaults.timeout = 10000;

const sendVerificationCode = async (email) => {
  try {
    let response = await axios.post(
      `${BASE_URL}/${ROUTE}/sendCaptchaForRegister`,
      { email },
      {
        timeout: 5000,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};
const sendDeleteAccountVerificationCode = async (token, email) => {
  try {
    let response = await axios.post(
      `${BASE_URL}/${ROUTE}/sendCaptchaForUnregister`,
      { email },
      {
        headers: {
          token,
        },
        timeout: 5000,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const registerUser = async (
  nickName,
  phonenumber,
  email,
  username,
  captchaCode,
  captchaGuid,
  password
) => {
  try {
    let response = await axios.post(
      `${BASE_URL}/${ROUTE}/registerTerminalUser`,
      {
        timezoneId: TIME_ZONE_ID,
        timezoneOffset: TIME_ZONE_OFFSET,
        nickName,
        phonenumber,
        sex: SEX,
        email,
        userName: username,
        roleId: ROLE_ID,
        deptId: DEPT_ID,
        captchaCode,
        password,
        captchaGuid,
      }
    );
    return response;
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const getUser = async (token) => {
  try {
    let response = await axios.get(`${BASE_URL}/getInfo`, {
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const getUserToken = async (username, password) => {
  try {
    let response = await axios.post(`${BASE_URL}/oapi/getToken`, {
      appId: APP_ID,
      appSecret: APP_SECRET,
      username,
      password,
    });
    return response;
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};
const updateUser = async (
  token,
  email,
  nickName,
  phonenumber,
  username,
  password
) => {
  try {
    let response = await axios.get(
      `${BASE_URL}/${ROUTE}/updateCurrentUserInfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          timezoneId: TIME_ZONE_ID,
          timezoneOffset: TIME_ZONE_OFFSET,
          nickName,
          phonenumber,
          sex: SEX,
          email,
          username,
          password,
        },
      }
    );
    return response;
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const resetUserPassword = async (token, oldPassword, newPassword) => {
  try {
    let response = await axios.put(
      `${BASE_URL}/system/user/profile/updatePwd`,
      {},
      {
        params: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const deleteUserAccount = async (token, captcha, guid, password, email) => {
  try {
    let response = await axios.post(
      `${BASE_URL}/organization/unregisterCurrentUser`,
      { guid, email, password, captcha },
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export {
  sendVerificationCode,
  resetUserPassword,
  updateUser,
  registerUser,
  getUser,
  getUserToken,
  sendDeleteAccountVerificationCode,
  deleteUserAccount,
};
