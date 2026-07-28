import api from "./api";

// ================= GET ALL FARMERS =================

export const getAllFarmers = async () => {
  const response = await api.get("/admin/farmers");
  return response.data;
};

// ================= GET PENDING FARMERS =================

export const getPendingFarmers = async () => {
  const response = await api.get("/admin/farmers/pending");
  return response.data;
};

// ================= APPROVE FARMER =================

export const approveFarmer = async (id) => {
  const response = await api.patch(`/admin/farmers/${id}/approve`);
  return response.data;
};

// ================= REJECT FARMER =================

export const rejectFarmer = async (id) => {
  const response = await api.patch(`/admin/farmers/${id}/reject`);
  return response.data;
};