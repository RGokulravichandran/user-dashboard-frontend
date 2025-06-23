import API from "./api";

export const signIn = ({ email, password }) => API.post("/auth/login", { email, password });
export const signUp = (formData) => API.post("/auth/signup", formData);
