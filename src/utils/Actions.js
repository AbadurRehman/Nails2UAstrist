import AsyncStorage from "@react-native-async-storage/async-storage";
// import { navigate } from "./NavigationService";
const BASE_URL = "https://artist.nail2u.net/api";
// const BASE_URL = "https://staging-artist.nail2u.net/api";
import { CommonActions } from "@react-navigation/native";

const registerUser = (username, email, phone_no, password, cv, cb) => {
  var dataToSend = {
    username: username.trim(),
    email: email.trim(),
    phone_no: phone_no.trim(),
    password: password.trim(),
    cv_url: cv,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/register/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const registerSalon = (username, email, phone_no, password, address, photo, cb) => {
  var dataToSend = {
    salonname: username.trim(),
    email: email.trim(),
    phone_no: phone_no.trim(),
    password: password.trim(),
    address: address.trim(),
    image_url: photo,
  };

  console.log("dataToSend", dataToSend);

  const datatest = new FormData();

  for (var key in dataToSend) {
    if (key == "image_url") {
      datatest.append("image_url", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else {
      datatest.append(key, dataToSend[key]);
    }
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
    body: datatest,
  };

  fetch(`${BASE_URL}/auth/register-salon/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {email} email ;
 * @param {password} password ;
 * @param {callback} cb ;
 */

const userLogin = (email, password, cb) => {
  var dataToSend = {
    email: email.trim(),
    password: password.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/login/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {email} email ;
 * @param {callback} cb ;
 */

const verifyCode = (email, code, type, cb) => {
  var dataToSend = {};
  if (type == "register") {
    dataToSend = {
      phone_number: email.trim(),
      code: code,
      register_otp: "yes",
    };
  } else {
    dataToSend = {
      phone_number: email.trim(),
      code: code,
    };
  }

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/verify-code/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {email} email ;
 * @param {callback} cb ;
 */

const forgotPassword = (email, cb) => {
  var dataToSend = {
    phone_number: "+1" + email.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/forgot-password/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const forgotPasswordEmail = (email, cb) => {
  var dataToSend = {
    email: email.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/forgot-password/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
/**
 *
 * @param {password} password ;
 * @param {token} token ;
 * @param {password_confirmation} password_confirmation ;
 * @param {callback} cb ;
 */

const resetPassword = (email, password, password_confirmation, otp, cb) => {
  var dataToSend = {
    password: password.trim(),
    password_confirmation: password_confirmation.trim(),
    phone_number: email.trim(),
    code: otp,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/reset-password`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const settingresetPassword = async (old_password, password, password_confirmation, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    old_password: old_password.trim(),
    password: password.trim(),
    password_confirmation: password_confirmation.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/settings/reset-password`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {token} token ;
 * @param {callback} cb ;
 */

const userLogout = (navigation, Token, cb) => {
  const token = JSON.parse(Token);
  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/auth/logout/`, requestOptions)
    .then((response) => response.text())
    .then(async (result) => {
      const response = JSON.parse(result);
      if (response?.errors?.length <= 0) {
        cb(response);
      } else {
        if (response?._metadata?.outcomeCode == "401") {
          cb(response);

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: "Login",
                },
              ],
            })
          );
        }
      }
    })
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getRatings = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/rating/get-details/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {FullName} FullName ;
 * @param {Email} Email ;
 * @param {Mobile} Mobile ;
 * @param {Message} Message ;
 * @param {callback} cb ;
 */

const postContactData = async (full_name, email, mobile, message, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    full_name: full_name.trim(),
    email: email.trim(),
    mobile: mobile.trim(),
    message: message.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/contact/contact-us/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getSettings = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: [],
  };

  fetch(`${BASE_URL}/settings/update/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const checkNotificationSettings = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/settings/get`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {data} data ;
 * @param {callback} cb ;
 */

const updateSettings = async (data, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = data;

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/settings/update/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getPayments = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/payments/get-total-earning/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getJobHistory = async (status, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    status: status,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/booking/get-job-history/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getPortfolioDetails = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/portfolio/get-details/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getImages = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/portfolio/get-images/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {id} id ;
 * @param {callback} cb ;
 */

const deleteImage = async (id, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    image_id: id,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/portfolio/delete-image/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {title} title ;
 * @param {image_url} image_url ;
 * @param {callback} cb ;
 */

const postUploadImage = async (data, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = data;
  const datatest = new FormData();

  for (var key in dataToSend) {
    if (key == "image_url") {
      datatest.append("image_url", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else {
      datatest.append(key, dataToSend[key]);
    }
  }

  // var formBody = [];
  // for (var key in dataToSend) {
  //   var encodedKey = encodeURIComponent(key);
  //   var encodedValue = encodeURIComponent(dataToSend[key]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: datatest,
  };

  // console.log("datatest---", datatest);
  // console.log("requestOptions---", requestOptions);

  fetch(`${BASE_URL}/portfolio/upload-image`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error in postUploadImage", error));
};

const editUploadImage = async (data, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = data;
  const datatest = new FormData();

  for (var key in dataToSend) {
    if (key == "image_url") {
      datatest.append("image_url", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else {
      datatest.append(key, dataToSend[key]);
    }
  }

  // var formBody = [];
  // for (var key in dataToSend) {
  //   var encodedKey = encodeURIComponent(key);
  //   var encodedValue = encodeURIComponent(dataToSend[key]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: datatest,
  };

  // console.log("datatest---", datatest);
  // console.log("requestOptions---", requestOptions);

  fetch(`${BASE_URL}/portfolio/edit`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error in postUploadImage", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getAllServices = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    // body: [],
  };

  fetch(`${BASE_URL}/service/all`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      cb(JSON.parse(result));
      // console.log(result, "datawwww");
    })
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {name} name ;
 * @param {price} price ;
 * @param {callback} cb ;
 */

const addService = async ({ name, id }, price, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    // name: name.trim(),
    service_id: id,
    price: price.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/service/add`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const editService = async (id, price, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    services_id: id,
    price: price.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/service/edit`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const deleteService = async (id, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    services_id: id,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/service/delete`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const getAllDeals = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    // body: [],
  };

  fetch(`${BASE_URL}/deals/all`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      cb(JSON.parse(result));
      // console.log(result, "datawwww");
    })
    .catch((error) => console.log("error", error));
};

const joinDeals = async (id, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    // body: [],
  };

  fetch(`${BASE_URL}/deals/join/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      cb(JSON.parse(result));
      // console.log(result, "datawwww");
    })
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getProfileDetails = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/user/get-profile-details/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {data} data ;
 * @param {callback} cb ;
 */

const editProfile = async (data, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = data;

  const datatest = new FormData();

  // datatest.append("username", "abadtest");
  // data.append('file_attachment', fileToUpload);

  // var formBody = [];
  for (var key in dataToSend) {
    // datatest.append(key, dataToSend[key]);
    // console.log("dataToSend--", dataToSend[key]);
    if (key == "image_url") {
      datatest.append("image_url", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else {
      datatest.append(key, dataToSend[key]);
    }
    // var encodedKey = key;
    // var encodedValue = dataToSend[key];
    // formBody.push(encodedKey + "=" + encodedValue);
  }

  // formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: datatest,
  };

  fetch(`${BASE_URL}/user/edit-profile`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

/**
 *
 * @param {callback} cb ;
 */

const getDashboard = async (navigation, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/dashboard/user-data/`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result);
      cb(response);
      if (response?.errors?.length <= 0) {
        cb(response);
      } else {
        if (response?._metadata?.outcomeCode == "401") {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: "Login",
                },
              ],
            })
          );
        }
      }
    })
    .catch((error) => console.log("error", error));
};
const getAllRaw = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/service/all-raw`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      cb(JSON.parse(result));
      // console.log(result, "tttt");
    })
    .catch((error) => console.log("error", error));
};

const acceptJobRequest = async (job_id, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/dashboard/accept-job/${job_id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const getCoverPhoto = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${BASE_URL}/user/get-cover-images`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const postCoverPhoto = async (data, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = data;
  // console.log("image_url---", image_url);
  const datatest = new FormData();

  for (var key in dataToSend) {
    if (key == "image_url") {
      datatest.append("image_url", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else {
      datatest.append(key, dataToSend[key]);
    }
  }

  // var formBody = [];
  // for (var key in dataToSend) {
  //   var encodedKey = encodeURIComponent(key);
  //   var encodedValue = encodeURIComponent(dataToSend[key]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: datatest,
  };

  // console.log("datatest---", datatest);
  // console.log("requestOptions---", requestOptions);

  fetch(`${BASE_URL}/user/upload-cover-image`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const convertTime = async (time) => {
  let newtime = t.split(":");
  if (newtime) {
    newtime = newtime[0];
  }
  if (newtime == "09" || newtime == "10" || newtime == "11") {
    newtime = parseInt(newtime, 10) + " am";
  } else {
    newtime = parseInt(newtime, 10) + " pm";
  }
  return newtime;
};

const deleteAccount = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    // body: [],
  };

  fetch(`${BASE_URL}/user/delete`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      cb(JSON.parse(result));
      // console.log(result, "datawwww");
    })
    .catch((error) => console.log("error", error));
};

const postUserdevicetoken = async (token, cb) => {
  const Token12 = await AsyncStorage.getItem("user");
  const token12 = JSON.parse(Token12);
  // console.log("token---", token);
  var dataToSend = {
    device_token: token,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Bearer ${token12}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/dashboard/user-device-token`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result);
      if (response?.errors?.length <= 0) {
        cb(response);
      } else {
        if (response?._metadata?.outcomeCode == "401") {
        }
      }
    })
    .catch((error) => console.log("error", error));
};

const postLocationStart = async (id, long, lat, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    booking_id: id,
    artist_longitude: long,
    artist_latitude: lat,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/user/location/start`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const locationReached = async (id, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    // body: [],
  };
  // console.log("id---", id);
  fetch(`${BASE_URL}/user/location/reached/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      cb(JSON.parse(result));
      // console.log(result, "datawwww");
    })
    .catch((error) => console.log("error", error));
};

const getAllMessages = async (id, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    // name: name.trim(),
    receiver_id: id,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/message/all`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const sendMessage = async (id, msg, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    // name: name.trim(),
    receiver_id: id,
    message: msg,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/message/send`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const documents = async (street_name, city, state, zipcode, imagefront, imageback, naillicense, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    street_name: street_name.trim(),
    city: city.trim(),
    state: state.trim(),
    zipcode: zipcode.trim(),
    license_front: imagefront,
    license_back: imageback,
    nail_license: naillicense,
  };
  const datatest = new FormData();

  for (var key in dataToSend) {
    // datatest.append(key, dataToSend[key]);
    // console.log("dataToSend--", dataToSend[key]);
    if (key == "license_front") {
      datatest.append("license_front", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else if (key == "license_back") {
      datatest.append("license_back", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else if (key == "nail_license") {
      datatest.append("nail_license", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else {
      datatest.append(key, dataToSend[key]);
    }
    // var encodedKey = key;
    // var encodedValue = dataToSend[key];
    // formBody.push(encodedKey + "=" + encodedValue);
  }

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: datatest,
  };

  fetch(`${BASE_URL}/user/additional-info/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const linkAccount = async (type, routing, account, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    // name: name.trim(),
    account_type: type,
    routing_number: routing,
    account_number: account,
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/account/link`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const withdraw = async (cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);

  var dataToSend = {
    // full_name: full_name.trim(),
    // email: email.trim(),
    // mobile: mobile.trim(),
    // message: message.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/withdraw/payment/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const verifyPhoneNumber = (phone, cb) => {
  var dataToSend = {
    phone_no: phone.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/verify-phone/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const verifyEmail = (email, cb) => {
  var dataToSend = {
    email: email.trim(),
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/verify-email`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const verifyEmailLogin = (email, cb) => {
  var dataToSend = {
    email: email.trim(),
    type: "user",
  };

  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(`${BASE_URL}/auth/verify-email`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

const addNewService = async (name, price, photo, cb) => {
  const Token = await AsyncStorage.getItem("user");
  const token = JSON.parse(Token);
  var dataToSend = {
    service_id: 1,
    name: name.trim(),
    price: price.trim(),
    service_img: photo,
  };

  console.log("dataToSend", dataToSend);

  const datatest = new FormData();

  for (var key in dataToSend) {
    if (key == "service_img") {
      datatest.append("service_img", {
        uri: dataToSend[key].uri,
        name: dataToSend[key].fileName,
        type: dataToSend[key].type,
      });
    } else {
      datatest.append(key, dataToSend[key]);
    }
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: datatest,
  };

  fetch(`${BASE_URL}/service/add/`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export {
  editProfile,
  registerUser,
  getRatings,
  userLogout,
  getProfileDetails,
  getSettings,
  updateSettings,
  postContactData,
  deleteImage,
  getAllServices,
  getPortfolioDetails,
  getJobHistory,
  getImages,
  addService,
  editService,
  deleteService,
  getDashboard,
  getPayments,
  resetPassword,
  forgotPassword,
  userLogin,
  postUploadImage,
  getAllRaw,
  getAllDeals,
  joinDeals,
  convertTime,
  acceptJobRequest,
  getCoverPhoto,
  postCoverPhoto,
  deleteAccount,
  postUserdevicetoken,
  postLocationStart,
  locationReached,
  getAllMessages,
  sendMessage,
  verifyCode,
  documents,
  forgotPasswordEmail,
  settingresetPassword,
  editUploadImage,
  checkNotificationSettings,
  linkAccount,
  withdraw,
  verifyPhoneNumber,
  verifyEmail,
  verifyEmailLogin,
  registerSalon,
  addNewService,
};
