export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export async function setAuthtoken(tokenKey: string) {
  await localStorage.setItem("token", tokenKey);
}

export async function removeAuthToken() {
  await localStorage.removeItem("token");
}
