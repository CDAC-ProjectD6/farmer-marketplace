
import api from "./api";

// ================= GET MY NOTIFICATIONS =================

export const getMyNotifications = async (userId) => {
  const response = await api.get(
    `/notifications/user/${userId}`
  );

  return response.data;
};

// ================= GET MY UNREAD COUNT =================

export const getUnreadCount = async (userId) => {
  const response = await api.get(
    `/notifications/user/${userId}/count`
  );

  return response.data;
};

// ================= MARK AS READ =================

export const markAsRead = async (id) => {
  const response = await api.put(
    `/notifications/${id}/read`
  );

  return response.data;
};

// ================= MARK ALL AS READ =================

export const markAllAsRead = async (userId) => {
  const response = await api.put(
    `/notifications/user/${userId}/read-all`
  );

  return response.data;
};
export const getUnreadNotifications = async (userId) => {
  const response = await api.get(
    `/notifications/user/${userId}/unread`
  );

  return response.data;
};