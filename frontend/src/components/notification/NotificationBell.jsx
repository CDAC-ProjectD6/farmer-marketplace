import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import {
  getUnreadCount,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
} from "../../services/notificationService";

function NotificationBell() {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const unread = await getUnreadCount();
      const list = await getMyNotifications();

      setCount(unread);
      setNotifications(list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    await markAsRead(id);
    loadNotifications();
  };

  const handleReadAll = async () => {
    await markAllAsRead();
    loadNotifications();
  };

  return (
    <div className="dropdown">

      <button
        className="btn btn-light position-relative"
        data-bs-toggle="dropdown"
      >
        <FaBell />

        {count > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {count}
          </span>
        )}
      </button>

      <div
        className="dropdown-menu dropdown-menu-end p-0"
        style={{
          width: "350px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">

          <strong>Notifications</strong>

          <button
            className="btn btn-sm btn-success"
            onClick={handleReadAll}
          >
            Mark All
          </button>

        </div>

        {notifications.length === 0 ? (
          <div className="p-3 text-center text-muted">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-bottom ${
                notification.read ? "" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleRead(notification.id)}
            >
              <div className="fw-bold">
                {notification.title}
              </div>

              <div className="small text-muted">
                {notification.message}
              </div>

              <div className="small text-secondary mt-1">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationBell;