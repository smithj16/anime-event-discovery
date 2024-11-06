import axios from "axios";

const baseUrl = "https://99b5-67-165-141-227.ngrok-free.app";

export const signin = async ({ email, password }) => {
  const response = await axios.post(`${baseUrl}/api/login`, {
    email,
    password,
  });
  return response;
};

export const register = async ({
  firstName,
  lastName,
  userName,
  password,
  email,
  avatar,
  dob,
  createTime,
  zipcode,
  state,
}) => {
  const response = await axios.post(`${baseUrl}/api/register`, {
    firstName,
    lastName,
    userName,
    password,
    email,
    avatar,
    dob,
    createTime,
    zipcode,
    state,
  });
  return response;
};

// export const register = ({
//   firstName,
//   lastName,
//   userName,
//   password,
//   email,
//   avatar,
//   dob,
//   createTime,
//   zipcode,
//   state
// }) => {
//   return fetch(`${baseUrl}/createUserAccount`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       firstName,
//       lastName,
//       userName,
//       password,
//       email,
//       avatar,
//       dob,
//       createTime,
//       zipcode,
//       state
//     }),
//   }).then((res) => {
//     return checkResponse(res);
//   });
// };
