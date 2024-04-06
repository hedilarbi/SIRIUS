import axios from "axios";
import { BASE_URL, APP_ID, APP_SECRET } from "@env";

const PAGE_NUM = 1;
const PAGE_SIZE = 10;
const BUSINESS_TYPE = 1;
const TIME_ZONE_ID = "Europe/Paris";
const TIME_ZONE_OFFSET = "+01:00";
const ROLE_ID = "10";
const DEPT_ID = "568";
const CURRENCY = "EUR";
const DEPT_CODE = "000";
const STATION_TYPE = "1";
const ROUTE = "tools/device";
const IS_ENTITY = 1;
const DEVICE_TYPE_EN = "collector";

axios.defaults.timeout = 10000;

const getDevices = async (token) => {
  try {
    let response = await axios.get(
      `${BASE_URL}/${ROUTE}/selectDeviceCollector`,
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
        params: {
          isEntity: IS_ENTITY,
          deviceTypeEn: DEVICE_TYPE_EN,
          businessType: BUSINESS_TYPE,
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
const getDevice = async (token, deviceSn) => {
  try {
    let response = await axios.get(`${BASE_URL}/device/point/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        deviceSn,
      },
    });
    return response;
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

const unbindDevice = async (token, deviceGuid, deviceId) => {
  try {
    let response = await axios.delete(
      `${BASE_URL}/tools/device/${deviceId}`,

      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
        data: deviceGuid,
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

export { getDevices, getDevice, unbindDevice };
