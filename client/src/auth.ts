import { api } from "./api";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export async function setAuthtoken(tokenKey: string) {
  await localStorage.setItem("token", tokenKey);
  return;
}

export async function removeAuthToken() {
  await localStorage.removeItem("token");
  return;
}

export async function verifyToken(token: string | null) {
  let isAuthorized = false;
  if (token !== " ") {
    await api.get("/login").then((data) => {
      if (data.data !== null) {
        isAuthorized = true;
        return;
      } else {
        isAuthorized = false;
      }
    });
  }
  return isAuthorized;
}
