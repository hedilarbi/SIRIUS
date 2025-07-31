

<center><h3>
    Open API
 </h3><center>
<center><h4>
    Interface Documentation
  </h4><h5>v1.0.10</h5>
 <center>











Revision History


| Version | Update Date | Update Description                                           |
| ------- | ----------- | ------------------------------------------------------------ |
| 1.0.10  | 2023-11-28  | 1.OTA，Parameter settings, change the return parameter name queueId to id for command transparency<br />2.OTA，Parameter settings, the API for querying the interaction results of command transparency is marked as outdated. Please use the interface in Chapter 4.13 for future access<br />3.Add a device remote interaction result query API, which can directly query OTA, parameter settings, and return results of command transparency |
| 1.0.9   | 2023-09-13  | Device list interface optimisation                           |
| 1.0.8   | 2023-09-12  | Downstream instruction Return result Interface added         |
| 1.0.7   | 2023-09-08  | Adding a firmware management interface                       |
| 1.0.6   | 2023-08-28  | Add interface call control, platform custom interface management |
| 1.0.5   | 2023-08-21  | All interfaces request URL modifications, while some interfaces return parameter modifications |
| 1.0.4   | 2023-08-10  | Add platform related POST write operation interface          |
| 1.0.3   | 2023-08-04  | Add multilingual support to the interface, and add lang parameters to the header，Currently supports Chinese and English |
| 1.0.2   | 2023-08-01  | 1.Add version number information to the interface request path. Version 1.0.x is v1.0,and so on<br/>2.Optimize the format of returned content in pagination queries |
| 1.0.1   | 2023-07-31  | Update plant list interface description.                     |
| 1.0.0   | 2023-07-16  | The documentation is first published.                        |

Copyright：Shanghai RaymonIoT Technology Co., Ltd.

 

Table of Contents

[TOC]

## 1 Description

1. The Open API platform provides free data access services for service providers with data access needs and development capabilities. Please make sure to manage the corresponding data security, and relevant risks and losses are borne by the accessing party.

2. The interface supports HTTP/HTTPS protocols, and all interface paths are case-sensitive. Please strictly call according to the paths given in the document.

3. Support GET/POST request methods, use UTF-8 encoding format for data, and return json format.

4. The returned data structure.

   ```json
   {
     "msg":“success to operate”, 			 
     "code":200, 					 
     "data":{
       json-object
     }											
   }
   ```

5. The interface opening follows the relevant requirements of GDPR and has blocked privacy information related to power station owners.

6. The description content of this document may be inconsistent with the actual call due to interface version updates. We will update the document irregularly. If you encounter any problems in the docking process, please contact our after-sales customer service personnel.



### 1.1 Terminology

| Term        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| Application | The open platform provides users with the ability to create applications. Applications must be reviewed and approved by the open platform administrator in order to be used normally. |
| appId       | The unique identifier of the application.                    |
| appSecret   | The authentication key of the application. It needs to be properly kept and cannot be leaked. |
| token       | The authorization token obtained after successful authentication, which is used to request server data. |



### 1.2 Access Process

1. The monitoring platform already has account information for your service provider.
2. Access the developer platform of the monitoring platform and register as a developer account of the open platform.
3. Create an application, bind the platform account, use the email associated with the platform account for verification, generate appId and appSecret, and wait for approval.
4. Developers debug the interface according to this document, and it is recommended to use Postman as the client debugging tool.
5. Developers complete interface debugging and deploy applications to complete interface access.

![image-20230829185840891](/Users/Kevin/Library/Application Support/typora-user-images/image-20230829185840891.png)

### 1.3 Access Address

| Environment        | Request Address                                              |
| ------------------ | ------------------------------------------------------------ |
| Developer Platform | https://open.example.com/ (Please contact business for actual address) |
| Interface Entrance | https://api.example.com/v1.0 (Please contact business for actual address) |



### 1.4 Common Interface Parameters

All API requests must carry a valid Token.

| Parameter Name | Data Type | Parameter Type | Required | Description                                                |
| -------------- | --------- | -------------- | -------- | ---------------------------------------------------------- |
| token          | string    | header         | Y        | Token, example value: 7389a0eb-4444-455e-b626-4b60224bf60f |
| lang           | string    | header         | N        | Language，example value：en_US，zh_CN                      |

### 1.5 Interface restriction

- The platform defaults to all conventional interface call restrictions

​	    The maximum limit for a single OpenApi account to call an interface every 10 seconds: 300

- Other restrictions You can add interface restrictions through the Platform interface management function

  Note: The dictionary is dynamically obtained through a single interface. For example, all power station types and grid-connected types are obtained  "/system/dict/data/type/{Dynamic field} "Acquire,Therefore, the URL added when interface restriction is added is  "/system/dict/data/type"



## 2 Account Interface

### 2.1 Obtaining Token  

Interface Information:

| Interface Information | Information Description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Token is the credential for calling resources. A Token can be applied for using the appId and appSecret, and applying for a new Token will not cause the old Token to be invalidated. The validity period of Token is two months. |
| Request Path          | {interface address}/{interface version}/oapi/getToken        |
| Request Method        | POST                                                         |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                   |
| -------------- | --------- | -------------- | -------- | --------------------------------------------- |
| appId          | string    | body           | Y        | For example: 17860bcb8cfe4353b5db7038d58f3c44 |
| appSecret      | string    | body           | Y        | For example: 93cc0b128ede4862995854150a2adc66 |
| username       | string    | body           | Y        | C-end platform username, for example:user     |
| password       | string    | body           | Y        | C-end platform password, for example:123      |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                        |
| -------------- | --------- | -------------- | ---------------------------------- |
| code           | string    | body           | Information code, for example: 200 |
| msg            | string    | body           | Message, for example: success      |
| data           | string    | body           | Returned data json object          |

Content of data:

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| token          | string    | body           | The returned token, for example: "token": "58a968b1-0a06-4146-823e-b644443ab6a5" |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| /oapi/getToken <br/>{    "appId":"testApp",  <br /> "appSecret":"988888"<br/>"username":"user",<br/>"password":"12345",<br/>} | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "token": "58a968b1-0a06-4146-823e-b644443ab6a5"<br/>    }<br/>} |









### **2.2 Get Account Information**

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Get the user information linked to the developer account on the C-end platform |
| Request Path          | {interface address}/{interface version}/getInfo              |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters: Only carry public parameters

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                                    |
| -------------- | --------- | -------------- | ---------------------------------------------- |
| code           | string    | body           | Information code, example value: 200           |
| msg            | string    | body           | Message, example value: success                |
| permissions    | string    | body           | User rights, example values: ["tools:rom:add"] |
| roles          | string    | body           | Role, example: ["org-admin"]                   |
| user           | string    | body           | Return the user json object                    |

Content of user:

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| searchValue    | string    | body           | Search criteria, such as null                                |
| createBy       | string    | body           | Creator, example value: admin                                |
| createTime     | string    | body           | Creation time, example: 2022-03-2900:11:49                   |
| updateBy       | string    | body           | Updater, example value: null                                 |
| updateTime     | string    | body           | Update time, example value: null                             |
| remark         | string    | body           | Description, example value: null                             |
| params         | string    | body           | Parameter, Example value: {}                                 |
| userId         | string    | body           | User ID. Example value: 1                                    |
| deptId         | string    | body           | Organization ID, example value: 11                           |
| userName       | string    | body           | User name, example value: testU                              |
| nickName       | string    | body           | Alias, Example value: Instance alias                         |
| email          | string    | body           | User mailbox, for example, demo@gmail.com                    |
| phonenumber    | string    | body           | Mobile phone number, example value: 13800138000              |
| sex            | string    | body           | User gender, (0 male 1 female 2 unknown), example value: '0' |
| avatar         | string    | body           | Nickname, example value: ""                                  |
| salt           | string    | body           | Add salt, example value: null                                |
| status         | string    | body           | Status, example value: 0                                     |
| delFlag        | string    | body           | Whether to delete, example value: 0                          |
| loginIp        | string    | body           | Login IP address, example value: 49.75.173.57                |
| loginDate      | string    | body           | Login time, for example, 2023-08-21:49:03.973                |
| dept           | string    | body           | Dept example value: {"searchValue": null,<br/>    "createBy": "admin",<br/>    "createTime": "2023-06-28 04:29:44",<br/>    "updateBy": null,<br/>    "updateTime": null,<br/>    "remark": null,<br/>    "params": {},<br/>    "deptId": 100,<br/>    "parentId": 0,<br/>    "ancestors": null,<br/>    "deptName": "管理平台",<br/>    "orderNum": "0",<br/>    "leader": "",<br/>    "phone": null,<br/>    "email": "zhangwenjun@raymoniot.com",<br/>    "status": "0",<br/>    "delFlag": "0",<br/>    "parentName": null,<br/>    "children": []} |
| roles          | string    | body           | Role，example value: [{<br/>      "searchValue": null,<br/>      "createBy": "admin",<br/>      "createTime": "2023-06-28 04:29:44",<br/>      "updateBy": null,<br/>      "updateTime": null,<br/>      "remark": null,<br/>      "params": {},<br/>      "roleId": 3,<br/>      "roleName": "role.org-admin",<br/>      "roleKey": "org-admin",<br/>      "roleSort": "3",<br/>      "isSysDefault": false,<br/>      "dataScope": "superior",<br/>      "menuCheckStrictly": false,<br/>      "deptCheckStrictly": false,<br/>      "status": "0",<br/>      "delFlag": "0",<br/>      "flag": false,<br/>      "menuIds": null,<br/>      "deptIds": null,<br/>      "admin": false<br/>    }] |
| roleIds        | string    | body           | Role ID group, example: null                                 |
| postIds        | string    | body           | Example value: null                                          |
| roleId         | string    | body           | Role ID, example value: 3                                    |
| timezoneId     | string    | body           | Time zone value, for example, +08:00                         |
| timezoneOffset | string    | body           | Time zone ID. Example value: Asia/Shanghai                   |
| dataScope      | string    | body           | Data range, example value: superior                          |
| subs           | string    | body           | Suborganization, example values: 14,27,36,37                 |
| subList        | string    | body           | Self-organizing list, example values: [14,27,36]             |
| admin          | string    | body           | Administrator or not, example value: FALSE                   |

Example:

| Request Parameters | Return Values                                                |
| ------------------ | ------------------------------------------------------------ |
| /getInfo           | {<br/>  "searchValue": null,<br/>  "createBy": "admin",<br/>  "createTime": "2023-06-28 04:29:44",<br/>  "updateBy": null,<br/>  "updateTime": null,<br/>  "remark": null,<br/>  "params": {},<br/>  "userId": 344,<br/>  "deptId": 100,<br/>  "userName": "testU",<br/>  "nickName": "小ss",<br/>  "email": "zhangwenjun@raymoniot.com",<br/>  "phonenumber": "1733434",<br/>  "sex": "1",<br/>  "avatar": "",<br/>  "salt": null,<br/>  "status": "0",<br/>  "delFlag": "0",<br/>  "loginIp": "49.75.173.57",<br/>  "loginDate": "2023-08-21T01:49:03.973",<br/>  "dept": {<br/>    "searchValue": null,<br/>    "createBy": "admin",<br/>    "createTime": "2023-06-28 04:29:44",<br/>    "updateBy": null,<br/>    "updateTime": null,<br/>    "remark": null,<br/>    "params": {},<br/>    "deptId": 100,<br/>    "parentId": 0,<br/>    "ancestors": null,<br/>    "deptName": "管理平台",<br/>    "orderNum": "0",<br/>    "leader": "",<br/>    "phone": null,<br/>    "email": "zhangwenjun@raymoniot.com",<br/>    "status": "0",<br/>    "delFlag": "0",<br/>    "parentName": null,<br/>    "children": []<br/>  },<br/>  "roles": [<br/>    {<br/>      "searchValue": null,<br/>      "createBy": "admin",<br/>      "createTime": "2023-06-28 04:29:44",<br/>      "updateBy": null,<br/>      "updateTime": null,<br/>      "remark": null,<br/>      "params": {},<br/>      "roleId": 3,<br/>      "roleName": "role.org-admin",<br/>      "roleKey": "org-admin",<br/>      "roleSort": "3",<br/>      "isSysDefault": false,<br/>      "dataScope": "superior",<br/>      "menuCheckStrictly": false,<br/>      "deptCheckStrictly": false,<br/>      "status": "0",<br/>      "delFlag": "0",<br/>      "flag": false,<br/>      "menuIds": null,<br/>      "deptIds": null,<br/>      "admin": false<br/>    }<br/>  ],<br/>  "roleIds": null,<br/>  "postIds": null,<br/>  "roleId": 3,<br/>  "timezoneId": "Asia/Shanghai",<br/>  "timezoneOffset": "+08:00",<br/>  "dataScope": "superior",<br/>  "subs": "14,27,36,37",<br/>  "subList": [14,27,36],<br/>  "admin": false<br/>} |

### 2.3 Register Account

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Register C-end platform user information                     |
| Request Path          | {interface address}/{interface version}/organization/registerTerminalUser |
| Request Method        | POST                                                         |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| timezoneId     | string    | body           | Y        | Time zone ID, example value: Etc/GMT-1                       |
| timezoneOffset | string    | body           | Y        | Time zone offset value, for example: -05:00                  |
| nickName       | string    | body           | Y        | nickName, for example:tom                                    |
| phonenumber    | string    | body           | Y        | Phonenumber, for example:11111111                            |
| sex            | string    | body           | Y        | User gender, (0 male 1 female 2 unknown), example value: '0' |
| email          | string    | body           | Y        | Email, for example:aaa@qq.com                                |
| username       | string    | body           | Y        | userName, for example:testU                                  |
| roleId         | string    | body           | Y        | RoleId, for example:11                                       |
| deptId         | string    | body           | Y        | DeptId, for example:11                                       |
| captchaGuid    | string    | body           | Y        | CaptchaCodeGUID, for example:58a968b1-0a06-4146-823e-b644443ab6a5 |
| captchaCode    | string    | body           | Y        | CaptchaCode, for example:1234                                |
| password       | string    | body           | Y        | Password, for example:110223                                 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |

Example:

| Request Parameters                                           | Return Values                             |
| ------------------------------------------------------------ | ----------------------------------------- |
| {<br/>    "timezoneId":"Asia/Shanghai",<br/>    "timezoneOffset":"+08:00",<br/>    "nickName":"cccc",<br/>    "phonenumber":"11111111",<br/>    "sex":"1"<br/>} | Returning empty content indicates success |

### 2.4 Modify account information

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Modify the C-end platform user information bound to the developer account |
| Request Path          | {interface address}/{interface version}/organization/updateCurrentUserInfo |
| Request Method        | POST                                                         |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| timezoneId     | string    | body           | Y        | Time zone ID, example value: Etc/GMT-1                       |
| timezoneOffset | string    | body           | Y        | Time zone Chinese name, example value: (UTC+01:00) West Central Africa |
| nickName       | string    | body           | Y        | User nickname, example value: system administrator           |
| phonenumber    | string    | body           | Y        | Phone number, example value: 13800138000                     |
| sex            | string    | body           | Y        | User gender, (0 male 1 female 2 unknown), example value: '0' |
| email          | string    | body           | Y        | User email, example value: mailto:demo@gmail.com             |
| username       | string    | body           | Y        | User account, example value: admin                           |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |

Example:

| 请求参数                                                     | 返回值                                    |
| ------------------------------------------------------------ | ----------------------------------------- |
| {<br/>    "timezoneId":"Asia/Shanghai",<br/>    "timezoneOffset":"+08:00",<br/>    "nickName":"cccc",<br/>    "phonenumber":"11111111",<br/>    "sex":"1"<br/>} | Returning empty content indicates success |



### 2.5 Change password

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Reset the account password of the C-end platform user bound to the developer account |
| Request Path          | {interface address}/{interface version}/system/user/profile/updatePwd |
| Request Method        | PUT                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                      |
| -------------- | --------- | -------------- | -------- | -------------------------------- |
| oldPassword    | string    | query          | Y        | Old password，example：123456    |
| newPassword    | string    | query          | Y        | New password，example：new123456 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| /system/user/profile/updatePwd?oldPassword=123456&newPassword=new123456 | {<br/>    "msg": "success to operate",<br/>    "code": 200<br/>} |



## 3 Plant Interface

### 3.1 Plant List

Interface Information:

| Interface Information | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| Interface Description | Get all power station information under the account         |
| Request Path          | {interface address}/{interface version}/system/station/list |
| Request Method        | GET                                                         |
| Request Type          | application/json                                            |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| pageNum        | int       | query          | N        | Starting page number for pagination, example: 1              |
| pageSize       | int       | query          | N        | The number of items displayed per page, example: 10          |
| businessType   | int       | query          | N        | Business type, example value: 1 (1: Photovoltaic power plant, 2: Battery system, 3: Household energy storage, 4: Commercial energy storage) |
| status         | string    | query          | N        | Status,example: ready（ready，offline，breakdown）           |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Response code, example: 200    |
| msg            | string    | body           | Message, example: success      |
| rows           | string    | body           | Returned data in JSON format   |
| total          | int       | body           | Data count, example value: 100 |

Contents of "rows":

| Parameter Name                | Data Type | Parameter Type | Description                                                  |
| ----------------------------- | --------- | -------------- | ------------------------------------------------------------ |
| totalDcPowerNamed             | string    | body           | Total DC power,  example: 0.00W                              |
| totalActivePowerNamed         | string    | body           | Total  active power of inverter, example: 5.01kW             |
| dayGridsellEnergy             | string    | body           | Electricity  sold by the grid on the same day, example value: 0 |
| enableFitInApp                | string    | body           | Enable  fixed display in app. Example value: FALSE           |
| gridConnectedType             | string    | body           | Grid-connected  type, example value: 1                       |
| dayBattDischargeEnergyNamed   | string    | body           | Discharge  capacity, example value: 0.00Wh                   |
| peakHour                      | string    | body           | Hourly  peak value, example value: 1.0                       |
| stationType                   | string    | body           | Power  station type, example values: 1 (1-home, 2-business-roof, 3-ground,  4-poverty-relief, 5-energy-store) |
| totalActivePower              | string    | body           | Total  active power of the inverter, example: 5.01           |
| dayLoadEnergy                 | string    | body           | Daily  electricity consumption, example value: 0             |
| loadActivePowerNamed          | string    | body           | Total  real-time power of a meter, example value: 0.00W      |
| gridSidePower                 | string    | body           | Total  real-time power on the grid-connected side, example: 0 |
| battSoc                       | string    | body           | Remaining  battery capacity, example: 0                      |
| lastDataUpdateTime            | string    | body           | Last  update time. Example: 2023-08-15T20:03:46              |
| dayBattDischargeEnergy        | string    | body           | Battery  discharge of the same day, for example, 0           |
| statusNamed                   | string    | body           | Online  status. Example value: Offline                       |
| installedCapacity             | string    | body           | Pv  - Installed capacity, example value: 12000               |
| timezoneOffset                | string    | body           | Time  zone offset, for example, +08:00                       |
| gridSidePowerNamed            | string    | body           | Total  real-time power of the grid-connected side, example: 0.00W |
| powerStationId                | string    | body           | Power  station ID, example value: 101026                     |
| locationLongitude             | string    | body           | Geographical  location: Longitude, example value: 120.581072 |
| stationName                   | string    | body           | Power  station name, Example value: MS2000 R&D test          |
| currency                      | string    | body           | Currency  symbol, example value: CNY                         |
| powerStationGuid              | string    | body           | Unique  identification of a power station. Example value:  e51e9c92-3835-11ee-9c95-fa163e8ac479 |
| owner                         | string    | body           | Power  station owner, example value: Lin Mingyan             |
| dayGridbuyEnergy              | string    | body           | Electricity  purchased on the same day of the grid, example value: 0 |
| dayGridbuyEnergyNamed         | string    | body           | Electricity  purchased on the same day of the grid, example value: 0.00Wh |
| images                        | string    | body           | Power  station image url, example value: []                  |
| dayBattChargeEnergyNamed      | string    | body           | Battery  charge per day, for example, 0.00Wh                 |
| locationLatitude              | string    | body           | Geographical  location: Latitude, example value: 31.301694   |
| timeZone                      | string    | body           | Time  zone, example value: Asia/Shanghai                     |
| battSidePowerNamed            | string    | body           | Total  battery power, example: 0.00W                         |
| totalDcPower                  | string    | body           | Total  DC power, example: 0                                  |
| dayBattChargeEnergy           | string    | body           | Battery  charge per day, example: 0                          |
| loadActivePower               | string    | body           | Total  real-time power of the load. Example value: 0         |
| lastDataUpdateTimeOffseted    | string    | body           | The  last update time is offset by the time zone. Example: 2023-08-15T20:03:46 |
| ownerUserId                   | string    | body           | Power  station owner User ID, example value: 167             |
| installedCapacityNamed        | string    | body           | Photovoltaic  - Installed capacity, example value: 12.00kWp  |
| guests                        | string    | body           | Visitor,  example values: []                                 |
| location                      | string    | body           | Geographical  location, example value: Jiangsu, example value: People'sRepublicofChina |
| dayGridsellEnergyNamed        | string    | body           | Electricity  sold by the grid on the same day, example value: 0.00Wh |
| installedCapacityBatteryNamed | string    | body           | Energy  storage - Installed capacity, example value: 0.00Wh  |
| businessType                  | string    | body           | Service  type, for example, 1                                |
| electricityGain               | string    | body           | KWH  income, example value: 0                                |
| dayLoadEnergyNamed            | string    | body           | Daily  electricity consumption, example: 0.00Wh              |
| installedCapacityBattery      | string    | body           | Energy  storage - Installed capacity, example value: 0       |
| battSidePower                 | string    | body           | Total  battery power, example: 0                             |
| status                        | string    | body           | Status,  example value: offline                              |

Example:

| Request Parameters   | Return Values                                                |
| -------------------- | ------------------------------------------------------------ |
| /system/station/list | {<br/>    "total": 52,<br/>    "rows": [<br/>        {<br/>            "enableFitInApp": false,<br/>            "gridConnectedType": "1",<br/>            "peakHour": 0.0,<br/>            "stationType": "1",<br/>            "lastDataUpdateTime": "2023-06-19T21:24:28",<br/>            "buildDate": "2023-06-20",<br/>            "statusNamed": "offline",<br/>            "installedCapacity": 0.0,<br/>            "timezoneOffset": "+08:00",<br/>            "powerStationId": 966,<br/>            "locationLongitude": 91.961987,<br/>            "stationName": "demo",<br/>            "currency": "CNY",<br/>            "powerStationGuid": "7f55d570-0f2a-11ee-802e-fa163e8ac479",<br/>            "owner": "testu",<br/>            "images": [],<br/>            "locationLatitude": 37.501533,<br/>            "timeZone": "Asia/Shanghai",<br/>            "lastDataUpdateTimeOffseted": "2023-06-20T05:24:28",<br/>            "ownerUserId": 224,<br/>            "installedCapacityNamed": "0.00 Wp",<br/>            "guests": [<br/>                {<br/>                    "nickName": "testU",<br/>                    "sex": "0",<br/>                    "deptId": 100,<br/>                    "phonenumber": "null",<br/>                    "loginDate": "2023-08-17T05:34:31",<br/>                    "updateTime": "2023-08-17T05:34:31",<br/>                    "avatar": "/profile/avatar/avatar/2022/10/10/ad2dcd11-67aa-49db-9817-0524f226c220.jpeg",<br/>                    "userName": "matao",<br/>                    "delFlag": "0",<br/>                    "dataScope": "superior",<br/>                    "userId": 142,<br/>                    "password": "$2a$10$sk49XhV02wJtu.6e4NRDWOko1tb2OIKeFhbCTbUBsovYmHqDpPbLC",<br/>                    "createBy": "demo@test.com",<br/>                    "createTime": "2022-09-24T12:50:31",<br/>                    "updateBy": "",<br/>                    "timezoneOffset": "+08:00",<br/>                    "loginIp": "49.75.173.57",<br/>                    "timezoneId": "Asia/Shanghai",<br/>                    "userType": "00",<br/>                    "email": "demo@test.com",<br/>                    "status": "0"<br/>                }<br/>            ],<br/>            "location": "816400, Haixi Mengguzu Zangzu Zizhizhou, Qinghai, China",<br/>            "installedCapacityBatteryNamed": "0.00 Wh",<br/>            "businessType": "1",<br/>            "electricityGain": 0.0,<br/>            "installedCapacityBattery": 0.00,<br/>            "status": "offline"<br/>        }<br />],<br/>    "code": 200,<br/>    "msg": "success to operate"<br/>} |



### **3.2 Plant Details**

Interface Information:

| Interface Information | Information Description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Get detailed information of the specified power station      |
| Request Path          | {interface address}/{interface version}/system/station/getPowerStationByGuid |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name   | Data Type | Parameter Type | Required | Description                                                  |
| ---------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| powerStationGuid | string    | query          | Y        | Unique identifier of the power station, for example: f863f343-1bde-11ee-9b29-11163e012d96 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                        |
| -------------- | --------- | -------------- | ---------------------------------- |
| code           | string    | body           | Information code, for example: 200 |
| msg            | string    | body           | Message, for example: success      |
| data           | string    | body           | Returned data json object          |

Data Content:

| Parameter Name                | Data Type | Parameter Type | Description                                                  |
| ----------------------------- | --------- | -------------- | ------------------------------------------------------------ |
| deptName                      | string    | body           | Organization  name, Example value: Management platform       |
| enableFitInApp                | string    | body           | Enable  fixed display in app. Example value: FALSE           |
| gridConnectedType             | string    | body           | Grid-connected  type, example value: 1                       |
| peakHour                      | string    | body           | Hourly  peak value, example value: 1.0                       |
| stationType                   | string    | body           | Power  station type, example values: 1 (1-home, 2-business-roof, 3-ground,  4-poverty-relief, 5-energy-store) |
| lastDataUpdateTime            | string    | body           | Last  updated time. Example: 2023-08-15T20:03:46             |
| buildDate                     | string    | body           | Date  of site establishment. Example value: 2023-08-15       |
| statusNamed                   | string    | body           | Online  status. Example value: Offline                       |
| installedCapacity             | string    | body           | Photovoltaic  - Installed capacity, example value: 12.00kWp  |
| stationTypeNamed              | string    | body           | Power  station type name, Example value: Household           |
| gridConnectedTypeNamed        | string    | body           | Grid-connected  type name, Example value: Full access        |
| timezoneOffset                | string    | body           | Offset  time zone, for example, -05:00                       |
| contact                       | string    | body           | Contacts,  example values: ""                                |
| powerStationId                | string    | body           | Power  station ID, example value: 101026                     |
| locationLongitude             | string    | body           | Geographical  location: Longitude, example value: 120.581072 |
| stationName                   | string    | body           | Power  station name, Example value: MS2000 R&D test          |
| currency                      | string    | body           | Currency  symbol, example value: CNY                         |
| powerStationGuid              | string    | body           | Unique  identification of a power station. Example value:  e51e9c92-3835-11ee-9c95-fa163e8ac479 |
| owner                         | string    | body           | Power  station owner, example value: tom                     |
| images                        | string    | body           | Power  station image url, example value: []                  |
| locationLatitude              | string    | body           | Geographical  location: Latitude, example value: 31.301694   |
| deptId                        | string    | body           | Organization  ID, example value: 100                         |
| timeZone                      | string    | body           | Time  zone, example value: America/Chicago                   |
| userId                        | string    | body           | User  ID. Example value: 1                                   |
| ownerEmail                    | string    | body           | Email  address of power station owner, example value: demo@gmail.com |
| phone                         | string    | body           | Contact  phone number, example value: 110                    |
| lastDataUpdateTimeOffseted    | string    | body           | The  last update time is offset by the time zone. Example: 2023-08-15T20:03:46 |
| ownerUserId                   | string    | body           | Power  station owner User ID, example value: 167             |
| installedCapacityNamed        | string    | body           | Photovoltaic  - Installed capacity, example value: 12.00kWp  |
| guests                        | string    | body           | Visitor,  example values: []                                 |
| location                      | string    | body           | Geographical  location, example value: Jiangsu, example value: People'sRepublicofChina |
| installedCapacityBatteryNamed | string    | body           | Energy  storage - Installed capacity, example value: 0.00Wh  |
| businessType                  | string    | body           | Service  type, for example, 1                                |
| electricityGain               | string    | body           | KWH  income, example value: 0                                |
| totalCost                     | string    | body           | Total  cost, example value: 0.0                              |
| installedCapacityBattery      | string    | body           | Energy  storage - Installed capacity (kWh), example value: 0.00 |
| deptCode                      | string    | body           | Organization  code, example value: 4CF238                    |
| status                        | string    | body           | Status,  example value: offline (ready- normal, offline- Offline,) |
| isFavorite                    | string    | body           | Concern  power station. Example value: 0                     |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| /system/station/getPowerStationByGuid?powerStationGuid=7f55d570-0f2a-11ee-802e-fa163e8ac479 | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "deptName": "演示专用",<br/>        "enableFitInApp": false,<br/>        "gridConnectedType": "1",<br/>        "peakHour": 0.0,<br/>        "stationType": "1",<br/>        "lastDataUpdateTime": "2023-06-19T21:24:28",<br/>        "buildDate": "2023-06-20",<br/>        "statusNamed": "离线",<br/>        "installedCapacity": 0.0,<br/>        "stationTypeNamed": "家庭户用",<br/>        "gridConnectedTypeNamed": "全额上网",<br/>        "timezoneOffset": "+08:00",<br/>        "contact": "",<br/>        "powerStationId": 966,<br/>        "locationLongitude": 91.961987,<br/>        "stationName": "演示电站",<br/>        "currency": "CNY",<br/>        "powerStationGuid": "7f55d570-0f2a-11ee-802e-fa163e8ac479",<br/>        "owner": "testU",<br/>        "images": [],<br/>        "locationLatitude": 37.501533,<br/>        "deptId": 174,<br/>        "timeZone": "Asia/Shanghai",<br/>        "userId": "305",<br/>        "ownerEmail": "demo@gmail.com",<br/>        "phone": "",<br/>        "lastDataUpdateTimeOffseted": "2023-06-20T05:24:28",<br/>        "ownerUserId": 224,<br/>        "installedCapacityNamed": "0.00 Wp",<br/>        "guests": [<br/>            {<br/>                "nickName": "SSS",<br/>                "sex": "0",<br/>                "deptId": 100,<br/>                "phonenumber": "null",<br/>                "loginDate": "2023-08-17T05:51:37",<br/>                "updateTime": "2023-08-17T05:51:37",<br/>                "avatar": "/profile/avatar/avatar/2022/10/10/ad2dcd11-67aa-49db-9817-0524f226c220.jpeg",<br/>                "userName": "matao",<br/>                "delFlag": "0",<br/>                "dataScope": "superior",<br/>                "userId": 142,<br/>                "password": sxcsad",<br/>                "createBy": "demo@gmail.com",<br/>                "createTime": "2022-09-24T12:50:31",<br/>                "updateBy": "",<br/>                "timezoneOffset": "+08:00",<br/>                "loginIp": "49.75.173.57",<br/>                "timezoneId": "Asia/Shanghai",<br/>                "userType": "00",<br/>                "email": "demo@gmail.com",<br/>                "status": "0"<br/>            }<br/>        ],<br/>        "location": "816400, Haixi Mengguzu Zangzu Zizhizhou, Qinghai, China",<br/>        "installedCapacityBatteryNamed": "0.00 Wh",<br/>        "businessType": "1",<br/>        "electricityGain": 0.0,<br/>        "totalCost": 0.0,<br/>        "installedCapacityBattery": 0.00,<br/>        "deptCode": "6D672B",<br/>        "status": "offline",<br/>        "isFavorite": 0<br/>    }<br/>} |



### **3.3 Plant Historical Data**

Interface Information:

| Interface Information | Information Description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface description | Get historical data of the specified power station           |
| Request path          | {interface address}/{interface version}/system/station/getStationAggregationChartData |
| Request method        | GET                                                          |
| Request type          | application/json                                             |

Request parameters:

| Parameter name   | Data type | Parameter type | Required | Description                                                  |
| ---------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| powerStationGuid | string    | query          | Y        | Unique identifier of the power station, for example: 6b3bcd27-5595-11ed-80e8-fa163e8ac479 |
| timezone         | string    | query          | Y        | Time zone, for example: +08:00                               |
| date             | string    | query          | Y        | Data of a certain day, for example: @July 14, 2023           |
| series           | string    | query          | Y        | Name of the data, for example: total_peak_power, day_energy, incoming (all data series: "irradiation", "total_dc_power", "total_peak_power", "batt_soc", "grid_side_power", "batt_side_power", "load_active_power", "day_batt_charge_energy", "day_batt_discharge_energy", "load_incoming", "incoming", "day_energy", "day_gridsell_energy", "day_gridbuy_energy", "day_load_energy") |
| group            | string    | query          | Y        | Display time unit, for example: hour (hour, day, month)      |

Response parameters:

| Parameter name | Data type | Parameter type | Description                        |
| -------------- | --------- | -------------- | ---------------------------------- |
| code           | string    | body           | Information code, for example: 200 |
| msg            | string    | body           | Message, for example: success      |
| data           | string    | body           | Returned data json object          |

Content of data:

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| dimensions     | string    | body           | example value.：<br/>[<br/>            "date",<br/>            "loadActivePower",<br/>            "dayBattChargeEnergy",<br/>            "dayBattDischargeEnergy"<br/>] |
| chart          | string    | body           | example value.：<br/>[<br/>            "date",<br/>            "loadActivePower",<br/>            "dayBattChargeEnergy",<br/>            "dayBattDischargeEnergy"<br/>        ],<br/>        "chart": [<br/>            {<br/>                "date": "2023-07-17T00:04:13",<br/>                "loadActivePower": 0.0,<br/>                "dayBattDischargeEnergy": 0.0,<br/>                "dayBattChargeEnergy": 0.0<br/>            },<br/>            {<br/>                "date": "2023-07-17T00:09:13",<br/>                "loadActivePower": 0.0,<br/>                "dayBattDischargeEnergy": 0.0,<br/>                "dayBattChargeEnergy": 0.0<br/>            },<br/>            {<br/>                "date": "2023-07-17T00:14:13",<br/>                "loadActivePower": 0.0,<br/>                "dayBattDischargeEnergy": 0.0,<br/>                "dayBattChargeEnergy": 0.0<br/>            }<br/>] |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| /system/station/getStationAggregationChartData?powerStationGuid=7f55d570-0f2a-11ee-802e-fa163e8ac479&group=hour&date=2023-08-17&series=total_peak_power | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "dimensions": [<br/>            "date",<br/>            "totalPeakPower"<br/>        ],<br/>        "chart": [<br/>            {<br/>                "date": "2023-08-17T00:04:13",<br/>                "totalPeakPower": 192.60000610351562<br/>            },<br/>            {<br/>                "date": "2023-08-17T00:09:13",<br/>                "totalPeakPower": 192.60000610351562<br/>            }<br />]<br/>    }<br/>} |

### **3.4 Plant Alarm List**

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Get alarm information for a specified power station          |
| Request Path          | {interface address}/{interface version}/device/event/selectEventList |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name   | Data Type | Parameter Type | Required | Description                                                  |
| ---------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| pageNum          | int       | query          | N        | Starting page number of the pagination parameter, example: 1 |
| pageSize         | int       | query          | N        | Number of items per page of the pagination parameter, example: 10 |
| powerStationGuid | string    | query          | Y        | Unique identifier of the power station, example: 6b3bcd27-5595-11ed-80e8-fa163e8ac412 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code, example: 200 |
| msg            | string    | body           | Message, example: success      |
| rows           | string    | body           | Returned data in JSON format   |
| total          | int       | body           | Data count, example value: 100 |

Content of data:

| Parameter Name         | Data Type | Parameter Type | Description                                                  |
| ---------------------- | --------- | -------------- | ------------------------------------------------------------ |
| standDataTableRealtime | string    | body           | Data table. Example value:  device_data_inverter             |
| eventGrade             | string    | body           | Event level, example value: 1                                |
| eventContent           | string    | body           | Event content, example value:  PVLVFault                     |
| eventType              | string    | body           | Event type, example value: alert  (alarm -alert, breakdown -breakdown) |
| deviceId               | string    | body           | Device ID, example value: 37150                              |
| statusNamed            | string    | body           | Status, Example Value: Pending                               |
| deviceSerialNumber     | string    | body           | Device SN, example value:  T17E7307021111DC                  |
| eventCode              | string    | body           | Event code, example value: 502                               |
| deviceTypeEn           | string    | body           | Device type, example value:  inverter                        |
| eventTypeNamed         | string    | body           | Alarm type, example value: Alarm                             |
| deviceGuid             | string    | body           | Unique device ID. Example value:  f0dcd9bc-e332-4765-8c8d-e9c7ed704141 |
| timezoneOffset         | string    | body           | Time zone offset, for example,  +08:00                       |
| stationName            | string    | body           | Power station name, example  value: One drag four MS2000 test |
| beginTime              | string    | body           | Start time, for example,  2023-08-15T17:30:09                |
| endTime                | string    | body           | End time, for example,  2023-08-16T17:16:53                  |
| businessType           | string    | body           | Service type, for example, 1                                 |
| powerStationGuid       | string    | body           | Unique identification of a power  station. Example value: 52ebbfe6-3757-11ee-9c95-fa163e8ac479 |
| status                 | string    | body           | Status, example value: ready                                 |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| /device/event/selectEventList?pageNum=1&pageSize=10<br/>&powerStationGuid=6b3bcd27-5595-11ed-80e8-fa163e8ac479 | {<br/>    "total": 1,<br/>    "rows": [<br/>        {<br/>            "standDataTableRealtime": "device_data_inverter",<br/>            "eventGrade": 1,<br/>            "eventContent": "NoUtility",<br/>            "eventType": "alert",<br/>            "deviceId": 100437112,<br/>            "statusNamed": "待处理",<br/>            "deviceSerialNumber": "T17E700400033366",<br/>            "eventCode": "409",<br/>            "deviceTypeEn": "inverter",<br/>            "eventTypeNamed": "alert",<br/>            "deviceGuid": "f0dcd9bc-e332-4765-8c8d-e9c7ed704141",<br/>            "timezoneOffset": "+08:00",<br/>            "stationName": "test",<br/>            "beginTime": "2023-08-15T17:30:09",<br/>            "endTime": "2023-08-16T17:16:53",<br/>            "businessType": "1",<br/>            "powerStationGuid": "52ebbfe6-3757-11ee-9c95-fa163e8ac479",<br/>            "status": "ready"<br/>        }<br />],<br/>    "code": 200,<br/>    "msg": "success to operate"<br/>} |

### 3.5 Adding Plant

Interface Information:

| Interface Information | Description                                            |
| --------------------- | ------------------------------------------------------ |
| Interface Description | Adding Plants                                          |
| Request Path          | {interface address}/{interface version}/system/station |
| Request Method        | POST                                                   |
| Request Type          | application/json                                       |

Response Parameters:

| Parameter Name           | Data Type | Parameter Type | Required | Description                                                  |
| ------------------------ | --------- | -------------- | -------- | ------------------------------------------------------------ |
| gridConnectedType        | string    | body           | Y        | Grid connection type，example：1                             |
| stationName              | string    | body           | Y        | Plant name，example：test                                    |
| businessType             | string    | body           | Y        | Business type，example：1                                    |
| stationType              | string    | body           | Y        | Plant type，example：1                                       |
| buildDate                | string    | body           | N        | Date of station establishment，example：2023-08-15           |
| installedCapacity        | string    | body           | Y        | Photovoltaics - Installed Capacity，example：0               |
| installedCapacityBattery | string    | body           | Y        | Energy storage - installed capacity，example：0              |
| electricityGain          | string    | body           | N        | Kilowatt hour revenue，example：0                            |
| totalCost                | string    | body           | N        | Total cost，example：0                                       |
| currency                 | string    | body           | N        | Currency symbol，example：CNY                                |
| locationLongitude        | string    | body           | Y        | Geographic location：Longitude，example：-74.52697928937188  |
| locationLatitude         | string    | body           | Y        | Geographic location：Latitude，example：39.972335668344186   |
| location                 | string    | body           | Y        | Geographic location，example：100 Huberta Street, Browns Mills, New Jersey 08015, United States |
| contact                  | string    | body           | N        | Contact，example：mark                                       |
| phone                    | string    | body           | N        | Phone，example：110                                          |
| timeZone                 | string    | body           | Y        | Location in time zone，example：America/New_York             |
| images                   | string    | body           | N        | Picture of plant url，example：[]                            |
| guests                   | string    | body           | N        | guest，example：[]                                           |
| deptId                   | string    | body           | Y        | Organization ID, example value:  100                         |
| deptCode                 | string    | body           | Y        | Organization code, example  value: 4CF238                    |
| ownerUserId              | string    | body           | Y        | Power station owner User ID,  example value: 167             |
| ownerEmail               | string    | body           | Y        | Email address of power station  owner, example value: demo@gmail.com |
| owner                    | string    | body           | Y        | Power station owner, example  value: tom                     |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| {<br/>    "gridConnectedType": "1",<br/>    "stationName": "test",<br/>    "businessType": "1",<br/>    "stationType": "1",<br/>    "buildDate": "2023-08-15",<br/>    "installedCapacity": 0,<br/>    "installedCapacityBattery": 0,<br/>    "electricityGain": 0,<br/>    "totalCost": 0,<br/>    "currency": "CNY",<br/>    "locationLongitude": -74.52697928937188,<br/>    "locationLatitude": 39.972335668344186,<br/>    "location": "100 Huberta Street, Browns Mills, New Jersey 08015, United States",<br/>    "contact": "",<br/>    "phone": "",<br/>    "timeZone": "America/New_York",<br/>    "images": [],<br/>    "guests": [],<br/>    "deptId":100,<br/>    "deptCode":"4CF238",<br/>    "ownerUserId":167,<br/>    "ownerEmail":"demo@gmail.com",<br/>    "owner":"tom"<br />} | {<br/>    "msg": "success to operation",<br/>    "code": 200<br/>} |

### 3.6 Update Plant

Interface Information:

| Interface Information | Description                                            |
| --------------------- | ------------------------------------------------------ |
| Interface Description | Update Plant  Information                              |
| Request Path          | {interface address}/{interface version}/system/station |
| Request Method        | PUT                                                    |
| Request Type          | application/json                                       |

Response Parameters:

| Parameter Name           | Data Type | Parameter Type | Required | Description                                                  |
| ------------------------ | --------- | -------------- | -------- | ------------------------------------------------------------ |
| powerStationGuid         | string    | body           | Y        | Plant GUID，example：451c21d2-3687-11ee-9c95-fa163e8ac479    |
| gridConnectedType        | string    | body           | N        | Grid connection type，example：1                             |
| stationName              | string    | body           | N        | Plant name，example：test                                    |
| stationType              | string    | body           | N        | Plant type，example：1                                       |
| buildDate                | string    | body           | N        | Date of station establishment，example：2023-08-15           |
| installedCapacity        | string    | body           | N        | Photovoltaics - Installed Capacity，example：0               |
| installedCapacityBattery | string    | body           | N        | Energy storage - installed capacity，example：0              |
| electricityGain          | string    | body           | N        | Kilowatt hour revenue，example：0                            |
| totalCost                | string    | body           | N        | Total cost，example：0                                       |
| currency                 | string    | body           | N        | Currency symbol，example：CNY                                |
| locationLongitude        | string    | body           | N        | Geographic location：Longitude，example：-74.52697928937188  |
| locationLatitude         | string    | body           | N        | Geographic location：Latitude，example：39.972335668344186   |
| location                 | string    | body           | N        | Geographic location，example：100 Huberta Street, Browns Mills, New Jersey 08015, United States |
| contact                  | string    | body           | N        | Contact，example：mark                                       |
| phone                    | string    | body           | N        | Phone，example：110                                          |
| timeZone                 | string    | body           | N        | Location in time zone，example：America/New_York             |
| images                   | string    | body           | N        | Picture of plant url，example：[]                            |
| guests                   | string    | body           | N        | guest，example：[]                                           |
| deptId                   | string    | body           | Y        | Organization ID, example value:  100                         |
| deptCode                 | string    | body           | Y        | Organization code, example  value: 4CF238                    |
| ownerUserId              | string    | body           | Y        | Power station owner User ID,  example value: 167             |
| ownerEmail               | string    | body           | Y        | Email address of power station  owner, example value: demo@gmail.com |
| owner                    | string    | body           | Y        | Power station owner, example  value: tom                     |
| powerStationId           | string    | body           | N        | Power station ID, example value:  101026                     |
| powerStationGuid         | string    | body           | N        | Unique identification of a power station. Example value:  e51e9c92-3835-11ee-9c95-fa163e8ac479 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| {<br/>    "powerStationGuid": "451c21d2-3687-11ee-9c95-fa163e8ac479"<br />    "gridConnectedType": "1",<br/>    "stationName": "test22",<br/>    "stationType": "1",<br/>    "buildDate": "2023-08-15",<br/>    "installedCapacity": 0,<br/>    "installedCapacityBattery": 0,<br/>    "electricityGain": 0,<br/>    "totalCost": 0,<br/>    "currency": "CNY",<br/>    "locationLongitude": -74.52697928937188,<br/>    "locationLatitude": 39.972335668344186,<br/>    "location": "100 Huberta Street, Browns Mills, New Jersey 08015, United States",<br/>    "contact": "",<br/>    "phone": "",<br/>    "timeZone": "America/New_York",<br/>    "images": [],<br/>    "guests": []<br/>} | {<br/>    "msg": "success to operation",<br/>    "code": 200<br/>} |

### 3.7 Delete Plant

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Delete Plant                                                 |
| Request Path          | {interface address}/{interface version}/system/station/{powerStationId} |
| Request Method        | DELETE                                                       |
| Request Type          | application/json                                             |

Response Parameters:

| Parameter Name   | Data Type | Parameter Type | Required | Description                                              |
| ---------------- | --------- | -------------- | -------- | -------------------------------------------------------- |
| powerStationGuid | string    | url            | Y        | PlantGUID，example：451c21d2-3687-11ee-9c95-fa163e8ac479 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |

Example:

| Request Parameters    | Return Values                                                |
| --------------------- | ------------------------------------------------------------ |
| /system/station/12342 | {<br/>    "msg": "success to operate",<br/>    "code": 200<br/>} |

### 3.8 Add Collector

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Add Collector                                                |
| Request Path          | {interface address}/{interface version}/system/station/addDevices |
| Request Method        | POST                                                         |
| Request Type          | application/json                                             |

Response Parameters:

| Parameter Name   | Data Type | Parameter Type | Required | Description                                              |
| ---------------- | --------- | -------------- | -------- | -------------------------------------------------------- |
| powerStationGuid | string    | body           | Y        | PlantGUID，example：451c21d2-3687-11ee-9c95-fa163e8ac479 |
| serialNumber     | string    | body           | Y        | DeviceSN，example：R07E630000220003                      |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [<br/>    {<br/>        "serialNumber": "R07E630000220003",<br/>        "powerStationGuid": "1b604b70-cf69-11ed-88a0-fa163e8ac479"<br/>    }<br/>] | {<br/>    "msg": "success to operation",<br/>    "code": 200<br/>} |

### 3.9 Unbind Device

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Unbind Device                                                |
| Request Path          | {interface address}/{interface version}/tools/device/{deviceIds} |
| Request Method        | DELETE                                                       |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                               |
| -------------- | --------- | -------------- | -------- | --------------------------------------------------------- |
| deviceGuid     | string    | query          | Y        | DeviceGUID，example：3e7398cf-2cf4-11ee-9bdd-fa163e8ac479 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |

Example:

| Request Parameters | Return Values                                                |
| ------------------ | ------------------------------------------------------------ |
| /tools/device/1234 | {<br/>    "msg": "success to operate",<br/>    "code": 200<br/>} |

### 3.10 Import Product

接口信息：

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Import product                                               |
| Request Path          | {interface address}/{interface version}/tools/device/importProduct |
| Request Method        | POST                                                         |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| serialNumber   | string    | body           | Y        | Device ID, example value: 1234                               |
| ownerEmail     | string    | body           | N        | Email address, example value: txrt@gamil.com                 |
| keywords       | string    | body           | N        | Label, Example Value: Note                                   |
| deviceTypeGuid | string    | body           | Y        | Device type GUID, example value: 1b604b70-cf69-11ed-88a0-fa163e8ac479 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| code           | string    | body           | Information code，example：200                               |
| msg            | string    | body           | Message，example：success                                    |
| data           | string    | body           | Returned data in JSON format，example value：<br />{<br/>  "updates": 0,<br/>  "inserts": 1<br/>} |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [<br/>  {<br/>    "serialNumber": "R111111111111111",<br/>    "ownerEmail": "",<br/>    "keywords": "",<br/>    "deviceTypeGuid": "9d4fccbc-56f4-11ec-b8f8-fa163e8ac479"<br/>  }<br/>] | {<br/>  "msg": "success to operate",<br/>  "code": 200,<br/>  "data": {<br/>    "updates": 0,<br/>    "inserts": 1<br/>  }<br/> |

## 4 Device Interface

### 4.1 Device List-Collector

Interface Information:

| Interface information | Information description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface description | Get the list of collector devices                            |
| Request path          | {interface address}/{interface version}/tools/device/selectDeviceCollector |
| Request method        | GET                                                          |
| Request type          | application/json                                             |

Request parameters:

| Parameter name | Data type | Parameter type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| pageNum        | int       | query          | N        | Starting page of pagination parameter, example: 1            |
| pageSize       | int       | query          | N        | Number of items displayed per page for pagination, example: 10 |
| searchOr       | string    | query          | N        | List of search terms, example: R17E7506040804DA              |
| status         | string    | query          | N        | Device status, example: ready (ready, offline, breakdown)    |
| isEntity       | int       | query          | Y        | Whether it is a physical device, instance: 1 (this interface is fixed to 1) |
| deviceTypeEn   | string    | query          | Y        | Device type, instance: collector (this interface is fixed to collector) |
| businessType   | int       | query          | Y        | Business type, instance: 0 (this interface is fixed to 0)    |

Response parameters:

| Parameter name | Data type | Parameter type | Description                          |
| -------------- | --------- | -------------- | ------------------------------------ |
| code           | string    | body           | Information code, example value: 200 |
| msg            | string    | body           | Message, example value: success      |
| rows           | string    | body           | Returned data in JSON format         |
| total          | int       | body           | Data count, example value: 100       |

Content of rows:

| Parameter name             | Data type | Parameter type | Description                                                  |
| -------------------------- | --------- | -------------- | ------------------------------------------------------------ |
| gridConnectedType          | string    | body           | Grid connection  type, example value: 1                      |
| creationTime               | string    | body           | Creation  time, example value: 2023-09-12T10:02:17           |
| keywords                   | string    | body           | Label,  example value: MicroInverseTest-One-To-One           |
| productManagerId           | string    | body           | Product  Manager ID, example value: 142                      |
| lastDataUpdateTime         | string    | body           | Data  Last Update Time, example value: 2023-09-13T14:22:52   |
| deviceId                   | string    | body           | Device  ID, example value: 100457443                         |
| statusNamed                | string    | body           | Online  status, example value: online                        |
| deviceTypeEn               | string    | body           | Device  type, example value: collector                       |
| deviceTypeCn               | string    | body           | Device  type in Chinese, example value: collector            |
| maxConnectedNumber         | string    | body           | Maximum  number of connections, example value: 1             |
| timezoneOffset             | string    | body           | Time  zone ID, example value: +08:00                         |
| powerStationId             | string    | body           | Station  ID, example value: 920                              |
| productOwnerId             | string    | body           | Product  owner ID, example value: 142                        |
| stationName                | string    | body           | Station  name, example value: Matto's test station           |
| model                      | string    | body           | Connection  mode, example value: Wi-FiStick                  |
| firmwareVersion            | string    | body           | Firmware  version, example value: RSW_400_1_V1.00.20         |
| powerStationGuid           | string    | body           | Station  GUID, example value: 1b604b70-cf69-11ed-88a0-fa163e8ac479 |
| aliasName                  | string    | body           | Alias,  example value:                                       |
| serialNumber               | string    | body           | Device  Serial Number, example value: r17e750802050001       |
| signalStrength             | string    | body           | Signal  strength, example value: 76                          |
| isEntity                   | string    | body           | Whether  it is a physical device, example value: TRUE        |
| brandCn                    | string    | body           | Brand,  example value: Wi-FiStick                            |
| updateTime                 | string    | body           | Update  time, example value: 2023-09-12T10:02:17             |
| deviceGuid                 | string    | body           | Device  GUID, example value: 596ef737-5110-11ee-870f-fa163e8ac479 |
| deviceTypeGuid             | string    | body           | Device  type GUID, example value: 9d4fccbc-56f4-11ec-b8f8-fa163e8ac479 |
| commType                   | string    | body           | Communication  type, example value: 1                        |
| lastDataUpdateTimeOffseted | string    | body           | Last  update time with time zone offset, example value: 2023-09-13T14:22:52 |
| status                     | string    | body           | Status,  example value: ready                                |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| tools/device/selectDeviceCollector?isEntity=1&deviceTypeEn=collector&businessType=0 | {<br/>    "total": 1,<br/>    "rows": [<br/>        {<br/>            "gridConnectedType": 1,<br/>            "creationTime": "2023-09-12T10:02:17",<br/>            "keywords": "微逆Test-一拖一",<br/>            "productManagerId": 142,<br/>            "lastDataUpdateTime": "2023-09-13T14:22:52",<br/>            "deviceId": 100457443,<br/>            "statusNamed": "在线",<br/>            "deviceTypeEn": "collector",<br/>            "deviceTypeCn": "采集器",<br/>            "maxConnectedNumber": 1,<br/>            "timezoneOffset": "+08:00",<br/>            "powerStationId": 920,<br/>            "productOwnerId": 142,<br/>            "stationName": "马涛的测试电站",<br/>            "model": "Wi-Fi Stick",<br/>            "firmwareVersion": "RSW_400_1_V1.00.20",<br/>            "powerStationGuid": "1b604b70-cf69-11ed-88a0-fa163e8ac479",<br/>            "aliasName": "",<br/>            "serialNumber": "R17E750802050001",<br/>            "signalStrength": 76,<br/>            "isEntity": true,<br/>            "brandCn": "Wi-Fi Stick",<br/>            "updateTime": "2023-09-12T10:02:17",<br/>            "deviceGuid": "596ef737-5110-11ee-870f-fa163e8ac479",<br/>            "deviceTypeGuid": "9d4fccbc-56f4-11ec-b8f8-fa163e8ac479",<br/>            "commType": "1",<br/>            "lastDataUpdateTimeOffseted": "2023-09-13T14:22:52",<br/>            "status": "ready"<br/>        }<br />],<br/>    "code": 200,<br/>    "msg": "success to operate"<br/>} |

### 4.2 Device List-Inverter

Interface Information:

| Interface information | Information description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface description | Get the list of inverter devices                             |
| Request path          | {interface address}/{interface version}/tools/device/selectDeviceInverter |
| Request method        | GET                                                          |
| Request type          | application/json                                             |

Request parameters:

| Parameter name | Data type | Parameter type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| pageNum        | int       | query          | N        | Starting page of pagination parameter, example: 1            |
| pageSize       | int       | query          | N        | Number of items displayed per page for pagination, example: 10 |
| searchOr       | string    | query          | N        | List of search terms, example: R17E7506040804DA              |
| status         | string    | query          | N        | Device status, example: ready (ready, offline, breakdown)    |
| isEntity       | int       | query          | Y        | Whether it is a physical device, instance: 1 (this interface is fixed to 1) |
| deviceTypeEn   | string    | query          | Y        | Device type, instance: Inverter(this interface is fixed to Inverter) |
| businessType   | int       | query          | Y        | Business type, instance: 0 (this interface is fixed to 0)    |

Response parameters:

| Parameter name | Data type | Parameter type | Description                          |
| -------------- | --------- | -------------- | ------------------------------------ |
| code           | string    | body           | Information code, example value: 200 |
| msg            | string    | body           | Message, example value: success      |
| rows           | string    | body           | Returned data in JSON format         |
| total          | int       | body           | Data count, example value: 100       |

Content of rows:

| Parameter name             | Data type | Parameter type | Description                                                  |
| -------------------------- | --------- | -------------- | ------------------------------------------------------------ |
| aliasName                  | string    | body           | Alias, example value: test                                   |
| totalActivePowerNamed      | string    | body           | Total active power of the inverter, example value 5.01kW     |
| serialNumber               | string    | body           | Device SN, example value: T17E7307021111DC                   |
| creationTime               | string    | body           | Creation time, example value: 2022-01-22T14:14:45            |
| energyToday                | string    | body           | Today's generation, example value: 20                        |
| lastDataUpdateTime         | string    | body           | Data last updated, example value: 2023-09-13T14:22:52        |
| energyTodayNamed           | string    | body           | Today's power generation, example value: 2020.00Wh           |
| parentSerialNumber         | string    | body           | Parent device SN, example value: R17E7307021100DC            |
| deviceId                   | string    | body           | Device ID, example value: 100457443                          |
| statusNamed                | string    | body           | Online status, example value: online                         |
| phaseAActivePowerNamed     | string    | body           | AA phase active power, example value: 61.30W                 |
| deviceTypeEn               | string    | body           | Device type, example value: collector                        |
| parentDeviceGuid           | string    | body           | Parent device Guid, example value:  c695c89c-c487-11ed-88a0-fa163e8ac479 |
| deviceTypeCn               | string    | body           | Device Type Chinese, example value: collector                |
| deviceGuid                 | string    | body           | Device GUID, example value:  596ef737-5110-11ee-870f-fa163e8ac479 |
| timezoneOffset             | string    | body           | Time zone offset value, example value: +08:00                |
| deviceTypeGuid             | string    | body           | Device type GUID, example value:  8876442b-f681-11eb-8bb6-fa163e25f123 |
| powerStationId             | string    | body           | Station ID, example value: 101026                            |
| lastDataUpdateTimeOffseted | string    | body           | Last update time with time zone offset, example value:  2023-08-15T20:03:46 |
| phaseAActivePower          | string    | body           | AA phase active power, example value: 61.30                  |
| stationName                | string    | body           | Name of the power station, example value: MS2000 R&D test    |
| powerStationGuid           | string    | body           | Station unique identifier, example value:  e51e9c92-3835-11ee-9c95-fa163e8ac479 |
| status                     | string    | body           | Status, example value: offline                               |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| tools/device/selectDeviceInverter?deviceTypeEn=inverter&businessType=0 | {<br/>    "total": 1,<br/>    "rows": [<br/>        {<br/>            "aliasName": "R07E636236090003-INVT",<br/>            "totalActivePowerNamed": "0.00 W",<br/>            "serialNumber": "R07E636236090003-INVT",<br/>            "creationTime": "2023-03-18T13:46:57",<br/>            "energyToday": 0.0,<br/>            "lastDataUpdateTime": "2023-09-13T15:23:34",<br/>            "energyTodayNamed": "0.00 Wh",<br/>            "parentSerialNumber": "R07E636236090003",<br/>            "deviceId": 36103,<br/>            "statusNamed": "在线",<br/>            "phaseAActivePowerNamed": "0.00 W",<br/>            "deviceTypeEn": "inverter",<br/>            "parentDeviceGuid": "69311a76-c52f-11ed-88a0-fa163e8ac479",<br/>            "deviceTypeCn": "逆变器",<br/>            "deviceGuid": "4b524f62-c550-11ed-88a0-fa163e8ac479",<br/>            "timezoneOffset": "+08:00",<br/>            "deviceTypeGuid": "762546c6-7454-432b-9085-13a4cd1a3722",<br/>            "powerStationId": 55,<br/>            "lastDataUpdateTimeOffseted": "2023-09-13T15:23:34",<br/>            "phaseAActivePower": 0.0,<br/>            "stationName": "山东精工测试电站",<br/>            "powerStationGuid": "30135915-0b2d-11ed-a931-fa163e8ac479",<br/>            "status": "ready"<br/>        }<br /> ],<br/>    "code": 200,<br/>    "msg": "查询成功"<br/>} |

### 4.3 Device List-BMS

Interface Information:

| Interface information | Information description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface description | Get BMS device list                                          |
| Request path          | {interface address}/{interface version}/tools/device/selectDeviceCollector |
| Request method        | GET                                                          |
| Request type          | application/json                                             |

Request parameters:

| Parameter name | Data type | Parameter type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| pageNum        | int       | query          | N        | Starting page of pagination parameter, example: 1            |
| pageSize       | int       | query          | N        | Number of items displayed per page for pagination, example: 10 |
| searchOr       | string    | query          | N        | List of search terms, example: R17E7506040804DA              |
| status         | string    | query          | N        | Device status, example: ready (ready, offline, breakdown)    |
| isEntity       | int       | query          | Y        | Whether it is a physical device, instance: 1 (this interface is fixed to 1) |
| deviceTypeEn   | string    | query          | Y        | Device type, instance: battery_system(this interface is fixed to battery_system) |
| businessType   | int       | query          | Y        | Business type, instance: 0 (this interface is fixed to 0)    |

Response parameters:

| Parameter name | Data type | Parameter type | Description                          |
| -------------- | --------- | -------------- | ------------------------------------ |
| code           | string    | body           | Information code, example value: 200 |
| msg            | string    | body           | Message, example value: success      |
| rows           | string    | body           | Returned data in JSON format         |
| total          | int       | body           | Data count, example value: 100       |

Content of rows:

| Parameter name               | Data type | Parameter type | Description                                                  |
| ---------------------------- | --------- | -------------- | ------------------------------------------------------------ |
| boxOfMaxTemp                 | string    | body           | Maximum temperature box number,  example value: 2            |
| creationTime                 | string    | body           | Creation time, example value: 2023-09-05T17:56:33            |
| soc                          | string    | body           | SOC, example value: 30                                       |
| singleCoreMinimumVoltage     | string    | body           | Minimum voltage per single core, example value: 3312         |
| lastDataUpdateTime           | string    | body           | Data last update time, example value: 2023-09-13T15:38:55    |
| deviceDetailPage             | string    | body           | Device details page, example value: std-battery              |
| parentSerialNumber           | string    | body           | Parent device SN, example value: R07E6A4668270031            |
| deviceId                     | string    | body           | Device ID, example value: 100453195                          |
| soh                          | string    | body           | SOH, example value: 100                                      |
| statusNamed                  | string    | body           | Online status, example value: online                         |
| snOfMaxTemp                  | string    | body           | Maximum unit temperature unit number, example value: 1       |
| deviceTypeEn                 | string    | body           | Device type, example value: battery_system                   |
| deviceTypeCn                 | string    | body           | Device type in Chinese, example value: BMS                   |
| totalCurrent                 | string    | body           | Total current, example value: 6.02                           |
| timezoneOffset               | string    | body           | Time zone offset value, example value: +08:00                |
| powerStationId               | string    | body           | Station ID, example value: 956                               |
| snOfMinTemp                  | string    | body           | Minimum temperature unit number, example value: 1            |
| boxOfMinSingleVoltage        | string    | body           | Individual minimum voltage box number, example value: 2      |
| boxOfMaxSingleVoltage        | string    | body           | Single highest voltage box number, example value: 1          |
| stationName                  | string    | body           | Name of the power station, example value: dyness-test        |
| powerStationGuid             | string    | body           | Station unique identifier, example value:  7a32c66d-003f-11ee-9d3d-fa163e8ac479 |
| serialNumber                 | string    | body           | SN, example value: 3                                         |
| snOfMinSingleVoltage         | string    | body           | Minimum unit voltage unit number, example value: 1           |
| maximumTemperatureNtc        | string    | body           | Maximum temperature NTC, example value: 2.1                  |
| updateTime                   | string    | body           | Update time, example value: 2023-09-05T17:56:33              |
| singleCoreMaximumVoltage     | string    | body           | Maximum voltage per single core, example value: 3317         |
| singleCoreMaximumTemperature | string    | body           | Maximum temperature of single core, example value: 30.2      |
| parentDeviceGuid             | string    | body           | Parent device SN, example value:  b1f59ab0-4c93-11ee-96ce-fa163e8ac479 |
| boxOfMinTemp                 | string    | body           | Minimum temperature box number, example value: 1             |
| deviceGuid                   | string    | body           | Device GUID, example value:  16306641-e703-4e5a-b8ba-0fdc16d8c857 |
| parentDeviceName             | string    | body           | Parent device name, example value: null                      |
| deviceTypeGuid               | string    | body           | Device type GUID, example value:  8213442b-8681-11eb-8bb6-89163e25fb19 |
| lastDataUpdateTimeOffseted   | string    | body           | Last update time with time zone offset, example value:  2023-09-13T15:38:55 |
| monomerDifferentialPressure  | string    | body           | Differential voltage single unit, example value: 5           |
| snOfMaxSingleVoltage         | string    | body           | Single unit maximum voltage single unit number, example value:  1 |
| singleCoreMinimumTemperature | string    | body           | Minimum temperature of single core, example value: 28.1      |
| status                       | string    | body           | Online status, example value: ready                          |
| isFavorite                   | string    | body           | Collection, example value: 0                                 |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| tools/device/selectBatterySystem?deviceTypeEn=battery_system&businessType=0 | {<br/>    "total": 1,<br/>    "rows": [<br/>        {<br/>            "boxOfMaxTemp": 2.0,<br/>            "creationTime": "2023-09-13T15:56:58",<br/>            "soc": 100.0,<br/>            "singleCoreMinimumVoltage": 3350.0,<br/>            "lastDataUpdateTime": "2023-09-13T16:57:49",<br/>            "deviceDetailPage": "std-battery",<br/>            "parentSerialNumber": "R07E6A4668090014",<br/>            "deviceId": 100458967,<br/>            "soh": 100.0,<br/>            "statusNamed": "在线",<br/>            "snOfMaxTemp": 1.0,<br/>            "deviceTypeEn": "battery_system",<br/>            "deviceTypeCn": "BMS",<br/>            "totalCurrent": 0.0,<br/>            "timezoneOffset": "+08:00",<br/>            "powerStationId": 956,<br/>            "snOfMinTemp": 1.0,<br/>            "boxOfMinSingleVoltage": 1,<br/>            "boxOfMaxSingleVoltage": 1,<br/>            "stationName": "dyness-test",<br/>            "powerStationGuid": "7a32c66d-003f-11ee-9d3d-fa163e8ac479",<br/>            "serialNumber": "4668090014",<br/>            "snOfMinSingleVoltage": 11.0,<br/>            "maximumTemperatureNtc": 2.6,<br/>            "updateTime": "2023-09-13T15:56:58",<br/>            "singleCoreMaximumVoltage": 3368.0,<br/>            "singleCoreMaximumTemperature": 30.4,<br/>            "parentDeviceGuid": "58c1298d-4c96-11ee-96ce-fa163e8ac479",<br/>            "boxOfMinTemp": 1.0,<br/>            "deviceGuid": "c23d2e7d-5274-4f81-8604-b0707a650d73",<br/>            "parentDeviceName": "",<br/>            "deviceTypeGuid": "8213442b-8681-11eb-8bb6-89163e25fb19",<br/>            "lastDataUpdateTimeOffseted": "2023-09-13T16:57:49",<br/>            "monomerDifferentialPressure": 18.0,<br/>            "snOfMaxSingleVoltage": 3.0,<br/>            "singleCoreMinimumTemperature": 27.8,<br/>            "status": "ready",<br/>            "isFavorite": 0<br/>        },<br />],<br/>    "code": 200,<br/>    "msg": "查询成功"<br/>} |



### 4.4 Device Point Data

Interface Information:

| Interface Information | Information Description                                   |
| --------------------- | --------------------------------------------------------- |
| Interface Description | Get real-time data of designated device                   |
| Request Path          | {interface address}/{interface version}/device/point/list |
| Request Method        | GET                                                       |
| Request Type          | application/json                                          |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                          |
| -------------- | --------- | -------------- | -------- | ------------------------------------ |
| deviceSn       | string    | query          | Y        | Device SN, example: R17E7307021111DC |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code, example: 200 |
| msg            | string    | body           | Message, example: success      |
| rows           | string    | body           | Returned data JSON object      |
| total          | int       | body           | Data count, example value: 100 |

Content of "rows":

| Parameter Name | Data Type | Parameter Type | Description                                  |
| -------------- | --------- | -------------- | -------------------------------------------- |
| pointId        | string    | body           | Data ID, example: 1                          |
| pointName      | string    | body           | Data name, example: sub-device serial number |
| pointValue     | string    | body           | Data value, example: T17E7307021111DC        |

Example:

| Request Parameters                           | Return Values                                                |
| -------------------------------------------- | ------------------------------------------------------------ |
| /device/point/list?deviceSn=R17E7307021100DC | {<br/>    "total": 1,<br/>    "rows": [<br/>        {<br/>            "0": 0,<br/>            "pointValue": "T17E7307021100DC",<br/>            "pointId": 1,<br/>            "pointNameCn": "Subdevice serial number"<br/>        }<br/>    ],<br/>    "code": 200,<br/>    "msg": "success to operate"<br/>} |



### 4.5 Device Historical Data

Interface Information:

| Interface Information | Information Description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Get historical data for a specified device                   |
| Request Path          | {interface address}/{interface version}/device/point/getDevicePointHistory |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                          |
| -------------- | --------- | -------------- | -------- | ------------------------------------ |
| deviceSn       | string    | query          | Y        | Device SN, example: R17E7307021100DC |
| dateBegin      | string    | query          | Y        | Start time, example: @July 4, 2023   |
| dateEnd        | string    | query          | Y        | End time, example: @July 13, 2023    |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                |
| -------------- | --------- | -------------- | -------------------------- |
| code           | string    | body           | Message code, example: 200 |
| msg            | string    | body           | Message, example: success  |
| data           | string    | body           | Returned data JSON object  |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| /device/point/getDevicePointHistory?deviceSn=R07E654668220101&dateBegin=2023-07-04&dateEnd=2023-07-13 | {<br/>    "msg": "",<br/>    "code": 200,<br/>    "data": "/profile/upload/point/2023/08/18/point-R17E7307021100DC-2023081805130180.xlsx"<br/>} |



### **4.6 Device Alarm List**

Interface Information:

| Interface Information | Information Description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Get all alarms of specified device                           |
| Request Path          | {interface address}/{interface version}/device/event/selectEventList |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                     |
| -------------- | --------- | -------------- | -------- | ----------------------------------------------- |
| pageNum        | int       | query          | N        | Starting page of pagination, example: 1         |
| pageSize       | int       | query          | N        | Number of items displayed per page, example: 10 |
| deviceSn       | string    | query          | Y        | Device SN, example: R17E7307021100DC            |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code, example: 200 |
| msg            | string    | body           | Message, example: success      |
| rows           | string    | body           | Returned rows in JSON object   |
| total          | int       | body           | Data count, example value: 100 |

Content of rows:

| Parameter Name         | Data Type | Parameter Type | Description                                                  |
| ---------------------- | --------- | -------------- | ------------------------------------------------------------ |
| standDataTableRealtime | string    | body           | Data table. Example value:  device_data_inverter             |
| eventGrade             | string    | body           | Event level, example value: 1                                |
| eventContent           | string    | body           | Event content, example value:  PVLVFault                     |
| eventType              | string    | body           | Event type, example value: alert  (alarm -alert, breakdown -breakdown) |
| deviceId               | string    | body           | Device ID, example value: 37150                              |
| statusNamed            | string    | body           | Status, Example Value: Pending                               |
| deviceSerialNumber     | string    | body           | Device SN, example value:  T17E7307021111DC                  |
| eventCode              | string    | body           | Event code, example value: 502                               |
| deviceTypeEn           | string    | body           | Device type, example value:  inverter                        |
| eventTypeNamed         | string    | body           | Alarm type, example value: Alarm                             |
| deviceGuid             | string    | body           | Unique device ID. Example value:  f0dcd9bc-e332-4765-8c8d-e9c7ed704141 |
| timezoneOffset         | string    | body           | Time zone offset, for example,  +08:00                       |
| stationName            | string    | body           | Power station name, example  value: One drag four MS2000 test |
| beginTime              | string    | body           | Start time, for example,  2023-08-15T17:30:09                |
| endTime                | string    | body           | End time, for example,  2023-08-16T17:16:53                  |
| businessType           | string    | body           | Service type, for example, 1                                 |
| powerStationGuid       | string    | body           | Unique identification of a power  station. Example value: 52ebbfe6-3757-11ee-9c95-fa163e8ac479 |
| status                 | string    | body           | Status, example value: ready                                 |

Example:

| Request Parameters                                      | Return Values                                                |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| /device/event/selectEventList?deviceSn=R17E7307021100DC | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": [<br/>               {<br/>            "eventCode": "502",<br/>            "eventGrade": 1,<br/>            "eventContent": "PVLVFault",<br/>            "eventType": "alert",<br/>            "deviceId": 100057122,<br/>            "deviceSn": "T17E710506070019"<br/>        },<br/>        {<br/>            "eventCode": "5509",<br/>            "eventGrade": 1,<br/>            "eventContent": "PV1VoltLow_Fault",<br/>            "eventType": "alert",<br/>            "deviceId": 100057091,<br/>            "deviceSn": "T07E5C0000120239"<br/>        }<br/>    ]<br/>]<br/>} |

### 4.7 Device OTA

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Modify the C-end platform user information bound to the developer account |
| Request Path          | {interface address}/{interface version}/tools/device/sendRemoteUpdate |
| Request Method        | POST                                                         |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                |
| -------------- | --------- | -------------- | -------- | ---------------------------------------------------------- |
| timeoutMinutes | string    | body           | Y        | Upgrade timeout，example：15                               |
| deviceGuid     | string    | body           | Y        | Device GUID，example：a6d2bd14-1a53-11ee-802e-fa163e8ac479 |
| romId          | string    | body           | Y        | firmware ID，example：729                                  |
| deviceType     | string    | body           | Y        | Device type，example：collector                            |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |
| data           | string    | body           | Returned data JSON object      |

Content of "data":

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| id             | int       | body           | Primary key of remote interaction result table, example: 56139 |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| {<br/>    "timeoutMinutes":15,<br/>    "deviceGuid":"a6d2bd14-1a53-11ee-802e-fa163e8ac479",<br/>    "romId":729,<br/>    "deviceType":"collector"<br/>} | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "id": "7616"<br/>    }<br/>} |

### 4.8 Device OTA Result(Deprecated)

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Querying OTA results                                         |
| Request Path          | {interface address}/{interface version}/tools/device/selectSendRemoteUpdate |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description            |
| -------------- | --------- | -------------- | -------- | ---------------------- |
| queueId        | query     | body           | Y        | QueueId，example：7615 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |
| data           | string    | body           | Returned data JSON object      |

Example:

| Request Parameters                                | Return Values                                                |
| ------------------------------------------------- | ------------------------------------------------------------ |
| /tools/device/selectSendRemoteUpdate?queueId=7615 | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "updateTime": 2022-01-04 19:55:58.000,<br/>        "updateResult": Success<br/>    }<br/>} |

### 4.9 Device Send  Message

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Device send  message                                         |
| Request Path          | {interface address}/{interface version}/tools/device/sendRemoteCmd |
| Request Method        | POST                                                         |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| hex            | string    | body           | Y        | Instruction format，example：hex    string/hex               |
| deviceGuid     | string    | body           | Y        | Device GUID，example：a6d2bd14-1a53-11ee-802e-fa163e8ac479   |
| romCompat      | string    | body           | N        | Distinguish between old and new versions of command transparency，example：no_response   When empty, the new version of the command is transmitted transparently, carrying a reply message |
| sendMessage    | string    | body           | Y        | Instruction content，example：hello                          |
| remoteEndPoint | string    | body           | Y        | To remove the field in the future, pass "" empty field       |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |
| data           | string    | body           | Returned data JSON object      |

Content of "data":

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| id             | int       | body           | Primary key of remote interaction result table, example: 56139 |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| {<br/>    "hex": "hex",<br/>    "sendMessage": "hello",<br/>    "romCompat": null,<br/>    "deviceGuid": "a6d2bd14-1a53-11ee-802e-fa163e8ac479"<br/>     "remoteEndPoint":""<br />} | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "id": "7616"<br/>    }<br/>} |

### 4.10 Device Send  Message Result(Deprecated)

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Query device instruction transparency results                |
| Request Path          | {interface address}/{interface version}/tools/device/selectSendRemoteCmd |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description            |
| -------------- | --------- | -------------- | -------- | ---------------------- |
| queueId        | query     | body           | Y        | QueueId，example：7615 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |
| data           | string    | body           | Returned data JSON object      |

Example:

| Request Parameters                             | Return Values                                                |
| ---------------------------------------------- | ------------------------------------------------------------ |
| /tools/device/selectSendRemoteCmd?queueId=7615 | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "responseTime": 2022-01-04 19:55:58.000,<br/>        "responseMessage": error command.<br/>    }<br/>} |

### 4.11 Device Parameter Settings

Interface Information:

| Interface Information | Description                                             |
| --------------------- | ------------------------------------------------------- |
| Interface Description | Device Parameter Settings                               |
| Request Path          | {interface address}/{interface version}/device/setParam |
| Request Method        | POST                                                    |
| Request Type          | application/json                                        |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| deviceId       | string    | body           | Y        | Device deviceId，example：a6d2bd14-1a53-11ee-802e-fa163e8ac479 |
| pointJson      | string    | body           | Y        | PointData，Example：<br />       [{<br/>            "pointId": 614100,<br/>            "value": "5005",<br/>            "valueType": "2"<br/>        }] |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |
| data           | string    | body           | Returned data json object      |

data

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| id             | int       | body           | Primary key of remote interaction result table, example: 56139 |

Example:

| Request Parameters                                           | Return Values                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| {<br/>    "deviceGuid": "a6d2bd14-1a53-11ee-802e-fa163e8ac479",<br/>    "pointJson": [<br/>        {<br/>            "pointId": 614100,<br/>            "value": "5005",<br/>            "valueType": "2"<br/>        }<br/>    ]<br/>} | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "id": 56139<br/>    }<br/>} |

### 4.12 Device Parameter Setting Results(Deprecated)

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Query device parameter settings results                      |
| Request Path          | {interface address}/{interface version}/tools/device/selectSendRemoteCmd |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description            |
| -------------- | --------- | -------------- | -------- | ---------------------- |
| queueId        | query     | body           | Y        | QueueId，example：7615 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |
| data           | string    | body           | Returned data JSON object      |

Example:

| Request Parameters                        | Return Values                                                |
| ----------------------------------------- | ------------------------------------------------------------ |
| /tools/device/selectSetParam?queueId=7615 | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "responseTime": 2022-01-04 19:55:58.000,<br/>        "responseMessage": Modify success to operatefully<br/>    }<br/>} |

### 4.13 Remote device interaction result query

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Remote device interaction result query                       |
| Request Path          | {interface address}/{interface version}/tools/device/selectRemoteResult |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                  |
| -------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| id             | int       | body           | Y        | Primary key of remote interaction result table, example: 56139 |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |
| data           | string    | body           | Returned data json object      |

Example:

| Request Parameters                       | Return Values                                                |
| ---------------------------------------- | ------------------------------------------------------------ |
| /tools/device/selectRemoteResult?id=7615 | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "responseTime": 2022-01-04 19:55:58.000,<br/>        "responseResult": Success<br/>    }<br/>} |

## 5 Firmware interface

### 5.1Firmware Query

Interface Information:

| Interface Information | Description                                               |
| --------------------- | --------------------------------------------------------- |
| Interface Description | Firmware Query                                            |
| Request Path          | {interface address}/{interface version}/solarhub/rom/list |
| Request Method        | POST                                                      |
| Request Type          | application/json                                          |

Request Parameters:

| Parameter Name | Data Type | Parameter Type | Required | Description                                                |
| -------------- | --------- | -------------- | -------- | ---------------------------------------------------------- |
| deviceTypeGuid | string    | query          | N        | 设备类型GUID，示例值：8876442b-f681-11eb-8bb6-fa163e25f123 |
| romName        | string    | query          | N        | 固件名称，示例值：测试固件                                 |
| pageNum        | int       | query          | N        | 分页参数起始页，实例：1                                    |
| pageSize       | int       | query          | N        | 分页参数每页显示条数，实例：10                             |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Response code, example: 200    |
| msg            | string    | body           | Message, example: success      |
| rows           | string    | body           | Returned data in JSON format   |
| total          | int       | body           | Data count, example value: 100 |

Contents of "rows":

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| searchValue    | string    | body           | Search criteria, example value:  null                        |
| createBy       | string    | body           | Creator, example value: null                                 |
| createTime     | string    | body           | Creation time, example: 2023-06-2915:59:23                   |
| updateBy       | string    | body           | Updater, example value: null                                 |
| updateTime     | string    | body           | Update time, example value: null                             |
| remark         | string    | body           | Flag, example value: null                                    |
| params         | string    | body           | Parameter, Example value: {}                                 |
| comments       | string    | body           | Note, example value: null                                    |
| romId          | string    | body           | Firmware ID, example value: 658                              |
| deviceType     | string    | body           | Device type, Example value: Battery                          |
| deviceTypeGuid | string    | body           | Device type GUID, example value:  a5632540-fca3-11eb-9555-fa163e25f123 |
| deviceGuid     | string    | body           | Device GUID, example value: null                             |
| romName        | string    | body           | Firmware name, Example Value: Test firmware                  |
| version        | string    | body           | Version, example value: 11                                   |
| uploadPath     | string    | body           | Upload path, sample value: / profile/upload/ROM /  2023/06/29/9369 e9af FBB fb8a - 4-8 ff0-9 fa412733f11. Bin |
| fileMd5        | string    | body           | A11b13f5e95a7376899ce7d2e04108 file MD5, sample value: 81    |
| fileBytes      | string    | body           | File size, example value: 470754                             |
| extInfo        | string    | body           | Firmware extension information, example: 0                   |
| brandCn        | string    | body           | Brand Chinese, example value: Daqin                          |
| brandEn        | string    | body           | Brand English, example value: Dyness                         |
| model          | string    | body           | Mode, example value: Low voltage                             |
| userId         | string    | body           | User ID. Example value: null                                 |
| createUser     | string    | body           | Create a user. Example: admin                                |
| extInfoNamed   | string    | body           | Extended information, example values: None: serial  chips/devices are not distinguished |
| users          | string    | body           | User, example value: []                                      |
| depts          | string    | body           | Department, Example values: [{}]                             |
| isLatest       | string    | body           | Whether it is the latest version, for example, 0             |
| currentUserOwn | string    | body           | Whether it is the firmware of the current user, for example,  FALSE |

Example:

| Request Parameters | Return Values                                                |
| ------------------ | ------------------------------------------------------------ |
| /solarhub/rom/list | {<br/>    "total": 3,<br/>    "rows": [<br/>        {<br/>            "searchValue": null,<br/>            "createBy": null,<br/>            "createTime": "2023-07-26 13:25:01",<br/>            "updateBy": null,<br/>            "updateTime": "2023-08-02 16:16:11",<br/>            "remark": null,<br/>            "params": {},<br/>            "comments": "xx ",<br/>            "romId": 703,<br/>            "deviceType": "采集器",<br/>            "deviceTypeGuid": "7760ccb1-32f4-11ec-b8f8-fa163e8ac42a",<br/>            "deviceGuid": null,<br/>            "romName": "MG3_M_OTA_V3.10.06",<br/>            "version": "MG3_M_OTA_V3.10.06",<br/>            "uploadPath": "/profile/upload/rom/2023/07/26/0a1ec53a-bd29-4a82-b963-d21ac0668997.bin",<br/>            "fileMd5": "136111ddd9d02c12bb7889088ced259d",<br/>            "fileBytes": 470141,<br/>            "extInfo": "0",<br/>            "brandCn": "Wi-Fi Module with Anti-reflux",<br/>            "brandEn": "Raymon",<br/>            "model": "Wi-Fi Module with Anti-reflux",<br/>            "userId": null,<br/>            "createUser": "zwj",<br/>            "extInfoNamed": "无：不区分序列芯片/设备",<br/>            "users": [],<br/>            "depts": [<br/>                {<br/>                    "deptName": "智慧能源数字化管理平台",<br/>                    "deptId": 100,<br/>                    "deptCode": "4CF238"<br/>                }<br/>            ],<br/>            "isLatest": 0,<br/>            "currentUserOwn": true<br/>        },<br/>                  ],<br/>    "code": 200,<br/>    "msg": "success to operate"<br/>} |

## **6 Public Interfaces**

### **6.1 Obtain Currency Dictionary**

Interface Information:

| Interface Information | Information Description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Obtain Currency Dictionary                                   |
| Request Path          | {interface address}/{interface version}/common/getCurrencyList |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters: Only the public parameters need to be carried.

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                        |
| -------------- | --------- | -------------- | ---------------------------------- |
| code           | string    | body           | Information code, for example: 200 |
| msg            | string    | body           | Message, for example: success      |
| data           | string    | body           | Returned data in JSON format       |

Content of data:

| Parameter Name | Data Type | Parameter Type | Description                                    |
| -------------- | --------- | -------------- | ---------------------------------------------- |
| currencyId     | string    | body           | Currency ID, for example: CNY                  |
| currencyNameZh | string    | body           | Currency in Chinese, for example: 人民币       |
| currencyNameEn | string    | body           | Currency in English, for example: Chinese yuan |
| symbol         | string    | body           | Symbol, for example: ¥                         |

Example:

| Request Parameters      | Return Values                                                |
| ----------------------- | ------------------------------------------------------------ |
| /common/getCurrencyList | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": [<br/>        {<br/>            "currencyId": "AED",<br/>            "currencyNameZh": "阿联酋迪拉姆",<br/>            "currencyNameEn": "United Arab Emirates dirham",<br/>            "symbol": "د.إ"<br/>        },<br/>        {<br/>            "currencyId": "AFN",<br/>            "currencyNameZh": "阿富汗尼",<br/>            "currencyNameEn": "Afghan afghani",<br/>            "symbol": "؋"<br/>        },<br/>        {<br/>            "currencyId": "ALL",<br/>            "currencyNameZh": "阿尔巴尼列克",<br/>            "currencyNameEn": "Albanian lek",<br/>            "symbol": "L"<br/>        }<br/>      ]<br/>} |



### **6.2 Get Time Zone Dictionary**

Interface Information:

| Interface information | Information description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Get Time Zone Dictionary                                     |
| Request path          | {interface address}/{interface version}/common/getTimezoneList |
| Request method        | GET                                                          |
| Request type          | application/json                                             |

Request parameters: Only carry public parameters

Response parameters:

| Parameter name | Data type | Parameter type | Description                          |
| -------------- | --------- | -------------- | ------------------------------------ |
| code           | string    | body           | Information code, example value: 200 |
| msg            | string    | body           | Message, example value: success      |
| data           | string    | body           | Returned data json object            |

Content of data:

| Parameter name | Data type | Parameter type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| timezoneId     | string    | body           | Time zone ID, example value: Etc/GMT-1                       |
| timezoneNameZh | string    | body           | Time zone Chinese name, example value: (UTC+01:00) West Central Africa |
| timezoneNameEn | string    | body           | Time zone English name, example value: (UTC+01:00) West Central Africa |
| utcOffset      | string    | body           | UTC offset, example value: +01:00                            |

Example:

| Request Parameters      | Return Values                                                |
| ----------------------- | ------------------------------------------------------------ |
| /common/getTimezoneList | { <br>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": [<br/>        {<br/>            "timezoneId": "Etc/GMT-1",<br/>            "timezoneNameZh": "(UTC+01:00) West Central Africa",<br/>            "timezoneNameEn": "(UTC+01:00) West Central Africa",<br/>            "utcOffset": "+01:00"<br/>        },<br/>        {<br/>            "timezoneId": "Africa/Lagos",<br/>            "timezoneNameZh": "(UTC+01:00) West Central Africa",<br/>            "timezoneNameEn": "(UTC+01:00) West Central Africa",<br/>            "utcOffset": "+01:00"<br/>        },<br/>        {<br/>            "timezoneId": "Africa/Tunis",<br/>            "timezoneNameZh": "(UTC+01:00) West Central Africa",<br/>            "timezoneNameEn": "(UTC+01:00) West Central Africa",<br/>            "utcOffset": "+01:00"<br/>        },<br/>        {<br/>            "timezoneId": "Africa/Bangui",<br/>            "timezoneNameZh": "(UTC+01:00) West Central Africa",<br/>            "timezoneNameEn": "(UTC+01:00) West Central Africa",<br/>            "utcOffset": "+01:00"<br/>        }<br/>   ]<br/>} |



### **6.3 Get Device Types**

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Get all device types                                         |
| Request Path          | {interface address}/{interface version}/tools/device/selectAllDeviceTypeNames |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters: Only carry public parameters

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                        |
| -------------- | --------- | -------------- | ---------------------------------- |
| code           | string    | body           | Information code, for example: 200 |
| msg            | string    | body           | Message, for example: success      |
| data           | string    | body           | Returned data JSON object          |

The content of data:

| Parameter Name | Data Type | Parameter Type | Description                                    |
| -------------- | --------- | -------------- | ---------------------------------------------- |
| deviceTypeEn   | string    | body           | Device type in English, for example: collector |
| deviceTypeCn   | string    | body           | Device type in Chinese, for example: collector |

Example:

| Request Parameters                     | Return Values                                                |
| -------------------------------------- | ------------------------------------------------------------ |
| /tools/device/selectAllDeviceTypeNames | {<br/>    "msg": "操作成功",<br/>    "code": 200,<br/>    "data": [<br/>        {<br/>            "deviceTypeEn": "collector",<br/>            "deviceTypeCn": "采集器",<br/>            "standTable": "device_data_collector"<br/>        },<br/>        {<br/>            "deviceTypeEn": "optimizer_controller",<br/>            "deviceTypeCn": "optimizer_controller",<br/>            "standTable": "device_data_optimizer_controller"<br/>        },<br/>        {<br/>            "deviceTypeEn": "inverter",<br/>            "deviceTypeCn": "逆变器",<br/>            "standTable": "device_data_inverter"<br/>        },<br/>        {<br/>            "deviceTypeEn": "battery_pack",<br/>            "deviceTypeCn": "电池",<br/>            "standTable": "device_data_battery_pack,device_data_battery_pack_highvoltage"<br/>        },<br/>        {<br/>            "deviceTypeEn": "battery_system",<br/>            "deviceTypeCn": "BMS",<br/>            "standTable": "device_data_battery_bms"<br/>        },<br/>        {<br/>            "deviceTypeEn": "epm",<br/>            "deviceTypeCn": "epm",<br/>            "standTable": "device_data_epm"<br/>        },<br/>        {<br/>            "deviceTypeEn": "meter",<br/>            "deviceTypeCn": "电表",<br/>            "standTable": "device_data_meter"<br/>        }<br/>    ]<br/>} |



### **6.4 Get Station Types**

Interface information:

| Interface information | Information description                                      |
| --------------------- | ------------------------------------------------------------ |
| Interface description | Get Station Types                                            |
| Request path          | {interface address}/{interface version}/system/dict/data/type/station_type |
| Request method        | GET                                                          |
| Request type          | application/json                                             |

Request parameters: Only carry public parameters

Response parameters:

| Parameter name | Data type | Parameter type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code, example: 200 |
| msg            | string    | body           | Message, example: success      |
| data           | string    | body           | Returned data json object      |

The content of data:

| Parameter name | Data type | Parameter type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| searchValue    | string    | body           | Search criteria, such as null                                |
| createBy       | string    | body           | Creator, example value: admin                                |
| createTime     | string    | body           | Creation time, example:  2022-03-2900:11:49                  |
| updateBy       | string    | body           | Updater, example value: null                                 |
| updateTime     | string    | body           | Update time, example value: null                             |
| remark         | string    | body           | Description, example value: null                             |
| params         | string    | body           | Parameter, Example value: {}                                 |
| dictCode       | string    | body           | Dictionary code, example value:  41                          |
| dictSort       | string    | body           | Dictionary sort, example value:  4                           |
| dictLabel      | string    | body           | Dictionary tag, example value:  Poverty alleviation power station |
| dictValue      | string    | body           | Dictionary value, example value:  4                          |
| dictType       | string    | body           | Dictionary type, example value:  station_type                |
| cssClass       | string    | body           | Style property, example value:  null                         |
| listClass      | string    | body           | Table command output style.  Example value: default          |
| isDefault      | string    | body           | Default value: N                                             |
| status         | string    | body           | Status, example value: 0                                     |
| default        | string    | body           | Default, example value: FALSE                                |

Example:

| Request Parameters                  | Return Values                                                |
| ----------------------------------- | ------------------------------------------------------------ |
| /system/dict/data/type/station_type | {<br/>    "msg": "操作成功",<br/>    "code": 200,<br/>    "data": [<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2022-03-24 03:35:41",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 34,<br/>            "dictSort": 1,<br/>            "dictLabel": "家庭户用",<br/>            "dictValue": "1",<br/>            "dictType": "station_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        },<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2022-03-24 03:35:51",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 35,<br/>            "dictSort": 2,<br/>            "dictLabel": "工商业屋顶",<br/>            "dictValue": "2",<br/>            "dictType": "station_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        },<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2022-03-24 03:36:02",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 36,<br/>            "dictSort": 3,<br/>            "dictLabel": "地面电站",<br/>            "dictValue": "3",<br/>            "dictType": "station_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        },<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2022-03-29 00:11:49",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 41,<br/>            "dictSort": 4,<br/>            "dictLabel": "扶贫电站",<br/>            "dictValue": "4",<br/>            "dictType": "station_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        },<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2022-03-29 00:12:09",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 42,<br/>            "dictSort": 5,<br/>            "dictLabel": "储能电站",<br/>            "dictValue": "5",<br/>            "dictType": "station_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        }<br/>    ]<br/>} |



### **6.5 Get Grid-Connected Types**

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Get all grid-connected types                                 |
| Request Path          | {interface address}/{interface version}/system/dict/data/type/grid_connected_type |
| Request Method        | GET                                                          |
| Request Type          | application/json                                             |

Request Parameters: Only carry public parameters

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code, example: 200 |
| msg            | string    | body           | Message, example: success      |
| data           | string    | body           | Returned data JSON object      |

Contents of data:

| Parameter name | Data type | Parameter type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| searchValue    | string    | body           | Search criteria, such as null                                |
| createBy       | string    | body           | Creator, example value: admin                                |
| createTime     | string    | body           | Creation time, example:  2022-03-2900:11:49                  |
| updateBy       | string    | body           | Updater, example value: null                                 |
| updateTime     | string    | body           | Update time, example value: null                             |
| remark         | string    | body           | Description, example value: null                             |
| params         | string    | body           | Parameter, Example value: {}                                 |
| dictCode       | string    | body           | Dictionary code, example value:  41                          |
| dictSort       | string    | body           | Dictionary sort, example value:  4                           |
| dictLabel      | string    | body           | Dictionary tag, example value:  Poverty alleviation power station |
| dictValue      | string    | body           | Dictionary value, example value:  4                          |
| dictType       | string    | body           | Dictionary type, example value:  station_type                |
| cssClass       | string    | body           | Style property, example value:  null                         |
| listClass      | string    | body           | Table command output style.  Example value: default          |
| isDefault      | string    | body           | Default value: N                                             |
| status         | string    | body           | Status, example value: 0                                     |
| default        | string    | body           | Default, example value: FALSE                                |

Example:

| Request Parameters                         | Return Values                                                |
| ------------------------------------------ | ------------------------------------------------------------ |
| /system/dict/data/type/grid_connected_type | {<br/>    "msg": "操作成功",<br/>    "code": 200,<br/>    "data": [<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2022-04-07 14:43:21",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 43,<br/>            "dictSort": 1,<br/>            "dictLabel": "全额上网",<br/>            "dictValue": "1",<br/>            "dictType": "grid_connected_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        },<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2022-04-07 14:43:41",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 44,<br/>            "dictSort": 2,<br/>            "dictLabel": "自发自用余额上网",<br/>            "dictValue": "2",<br/>            "dictType": "grid_connected_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        },<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2023-03-09 02:26:02",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 54,<br/>            "dictSort": 3,<br/>            "dictLabel": "自发自用余额不上网",<br/>            "dictValue": "4",<br/>            "dictType": "grid_connected_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        },<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2022-04-07 14:43:55",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 45,<br/>            "dictSort": 4,<br/>            "dictLabel": "离网",<br/>            "dictValue": "3",<br/>            "dictType": "grid_connected_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        },<br/>        {<br/>            "searchValue": null,<br/>            "createBy": "admin",<br/>            "createTime": "2023-03-09 02:26:02",<br/>            "updateBy": null,<br/>            "updateTime": null,<br/>            "remark": null,<br/>            "params": {},<br/>            "dictCode": 55,<br/>            "dictSort": 5,<br/>            "dictLabel": "并/离网",<br/>            "dictValue": "5",<br/>            "dictType": "grid_connected_type",<br/>            "cssClass": null,<br/>            "listClass": "default",<br/>            "isDefault": "N",<br/>            "status": "0",<br/>            "default": false<br/>        }<br/>    ]<br/>} |

### 6.6 Email Verification Code-Register

Interface Information:

| Interface Information | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Interface Description | Send email verification code                                 |
| Request Path          | {interface address}/{interface version}/organization/sendCaptchaForRegister |
| Request Method        | POST                                                         |
| Request Type          | application/json                                             |

Request Parameters: (Note: Please do not carry a Token when calling this interface)

| Parameter Name | Data Type | Parameter Type | Required | Description                 |
| -------------- | --------- | -------------- | -------- | --------------------------- |
| email          | string    | body           | Y        | Email，example：exam@qq.com |

Response Parameters:

| Parameter Name | Data Type | Parameter Type | Description                    |
| -------------- | --------- | -------------- | ------------------------------ |
| code           | string    | body           | Information code，example：200 |
| msg            | string    | body           | Message，example：success      |
| data           | string    | body           | Returned data JSON object      |

data的内容：

| Parameter Name | Data Type | Parameter Type | Description                                                  |
| -------------- | --------- | -------------- | ------------------------------------------------------------ |
| guid           | string    | body           | Email identification code, used to carry the validity verification code，example：f6449726-a8fa-4a40-8041-eb16f2235dcf |

Example:

| Request Parameters                             | Return Values                                                |
| ---------------------------------------------- | ------------------------------------------------------------ |
| {<br/>        "email": "exam@qq.com"<br/>    } | {<br/>    "msg": "success to operate",<br/>    "code": 200,<br/>    "data": {<br/>        "guid": "f6449726-a8fa-4a40-8041-eb16f2235dcf"<br/>    }<br/>} |

