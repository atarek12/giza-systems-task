import axiosPkg from "axios";

export const axios = axiosPkg.create({
  baseURL: "http://localhost:4000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
