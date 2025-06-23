import API from "./api";

export const fetchUsers = () => API.get("/users");
export const createUser = (userData) => API.post("/users", userData);
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const fetchUserById = (id) => API.get(`/users/${id}`);