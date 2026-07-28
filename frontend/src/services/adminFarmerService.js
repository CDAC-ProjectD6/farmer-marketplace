import api from "./api";

// ==================== GET ALL FARMERS ====================
// Supports:
// /admin/farmers
// /admin/farmers?search=Final
// /admin/farmers?status=APPROVED
// /admin/farmers?search=Final&status=APPROVED

export const getFarmers = async (search = "", status = "") => {
  const params = {};

  if (search.trim()) {
    params.search = search.trim();
  }

  if (status) {
    params.status = status;
  }

  const response = await api.get("/admin/farmers", {
    params,
  });

  return response.data;
};

// ==================== GET PENDING FARMERS ====================

export const getPendingFarmers = async () => {
  const response = await api.get("/admin/farmers/pending");

  return response.data;
};

// ==================== GET FARMER BY ID ====================

export const getFarmerById = async (id) => {
  const response = await api.get(`/admin/farmers/${id}`);

  return response.data;
};

// ==================== APPROVE FARMER ====================

export const approveFarmer = async (id) => {
  const response = await api.patch(
    `/admin/farmers/${id}/approve`
  );

  return response.data;
};

// ==================== REJECT FARMER ====================

export const rejectFarmer = async (id) => {
  const response = await api.patch(
    `/admin/farmers/${id}/reject`
  );

  return response.data;
};