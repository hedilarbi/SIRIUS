import axios from "axios";
import { BASE_URL, APP_ID, APP_SECRET } from "@env";

const PAGE_NUM = 1;
const PAGE_SIZE = 10;
const BUSINESS_TYPE = "1";
const TIME_ZONE_ID = "Europe/Paris";
const TIME_ZONE_OFFSET = "+01:00";
const ROLE_ID = "10";
const DEPT_ID = "568";
const CURRENCY = "EUR";
const DEPT_CODE = "000";
const STATION_TYPE = "1";
const ROUTE = "system/station";
const STATUS = "ready";
const GRID_CONNECTED_TYPE = "1";

axios.defaults.timeout = 10000;

const getPlantsData = async (token) => {
  try {
    let response = await axios.get(
      `${BASE_URL}/${ROUTE}/list`,

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
const getPlant = async (token, powerStationGuid) => {
  try {
    let response = await axios.get(
      `${BASE_URL}/${ROUTE}/getPowerStationByGuid`,
      {
        headers: {
          token,
          "Content-Type": "application/json",
        },
        params: {
          powerStationGuid,
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
const getPlantHistory = async (
  token,
  powerStationGuid,
  date,
  series,
  group
) => {
  try {
    let response = await axios.get(
      `${BASE_URL}/${ROUTE}/getStationAggregationChartData`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          powerStationGuid,
          timezone: TIME_ZONE_OFFSET,
          date,
          series,
          group,
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
const createPlant = async (
  token,
  stationName,
  installedCapacity,
  installedCapacityBattery,
  locationLongitude,
  locationLatitude,
  location,
  ownerUserId,
  ownerEmail,
  owner
) => {
  try {
    let response = await axios.post(
      `${BASE_URL}/${ROUTE}`,
      {
        gridConnectedType: GRID_CONNECTED_TYPE,
        stationName,
        businessType: BUSINESS_TYPE,
        stationType: STATION_TYPE,
        installedCapacity,
        installedCapacityBattery,
        locationLongitude,
        locationLatitude,
        location,
        timeZone: TIME_ZONE_ID,
        deptId: DEPT_ID,
        deptCode: DEPT_CODE,
        ownerUserId,
        ownerEmail,
        owner,
        guests: [],
        images: [],
      },
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
const updatePlant = async (
  token,
  powerStationGuid,
  powerStationId,
  gridConnectedType,
  stationName,
  buildDate,
  installedCapacity,
  installedCapacityBattery,
  electricityGain,
  totalCost,
  locationLongitude,
  locationLatitude,
  location,
  contact,
  phone,
  ownerUserId,
  ownerEmail,
  owner
) => {
  try {
    let response = await axios.put(
      `${BASE_URL}/${ROUTE}`,
      {
        powerStationGuid,
        powerStationId,
        gridConnectedType,
        stationName,
        businessType: BUSINESS_TYPE,
        stationType: STATION_TYPE,
        buildDate,
        installedCapacity,
        installedCapacityBattery,
        electricityGain,
        totalCost,
        currency: CURRENCY,
        locationLongitude,
        locationLatitude,
        location,
        contact,
        phone,
        timeZone: TIME_ZONE_ID,
        deptId: DEPT_ID,
        deptCode: DEPT_CODE,
        ownerUserId,
        ownerEmail,
        owner,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const deletePlant = async (token, powerStationGuid) => {
  try {
    let response = await axios.delete(
      `${BASE_URL}/${ROUTE}/${powerStationGuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
const addDevice = async (token, powerStationGuid, serialNumber) => {
  try {
    let response = await axios.post(
      `${BASE_URL}/${ROUTE}/addDevices`,
      {
        powerStationGuid,
        serialNumber,
      },
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
const deleteDevice = async (token, deviceGuid) => {
  try {
    let response = await axios.post(`${BASE_URL}/tools/device`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        deviceGuid,
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
export {
  getPlantsData,
  getPlantHistory,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant,
  addDevice,
  deleteDevice,
};
