import api from "./api";

const USER_ID = 1; // Replace this with logged-in user's id later

export const getMyNotifications = async () => {
  const response = await api.get(`/notifications/user/${USER_ID}`);
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await api.get(`/notifications/user/${USER_ID}/count`);
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await api.put(`/notifications/user/${USER_ID}/read-all`);
  return response.data;
};