import api from "./api";

// Get all users / search / filter
export const getUsers = async (search = "", role = "") => {
  const params = {};

  if (search.trim()) {
    params.search = search.trim();
  }

  if (role) {
    params.role = role;
  }

  const response = await api.get("/admin/users", {
    params,
  });

  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

// Block user
export const blockUser = async (id) => {
  const response = await api.patch(
    `/admin/users/${id}/block`
  );

  return response.data;
};

// Unblock user
export const unblockUser = async (id) => {
  const response = await api.patch(
    `/admin/users/${id}/unblock`
  );

  return response.data;
};