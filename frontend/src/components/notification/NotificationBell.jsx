
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import {
  getUnreadCount,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead,
} from "../../services/notificationService";

import { useAuth } from "../../context/AuthContext";

function NotificationBell() {

  const { user } = useAuth();

  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // ================= LOAD NOTIFICATIONS =================

  const loadNotifications = async () => {

    if (!user?.userId) {
      setCount(0);
      setNotifications([]);
      return;
    }

    try {

      const userId = user.userId;

      const unread = await getUnreadCount(userId);

      const list = await getUnreadNotifications(userId);

      setCount(unread);

      setNotifications(list || []);

    } catch (error) {

      console.error(
        "Notification loading error:",
        error
      );

      setCount(0);
      setNotifications([]);
    }
  };


  // ================= LOAD AFTER LOGIN =================

  useEffect(() => {

    loadNotifications();

  }, [user?.userId]);


  // ================= MARK ONE AS READ =================

  const handleRead = async (id) => {

    try {

      await markAsRead(id);

      loadNotifications();

    } catch (error) {

      console.error(
        "Unable to mark notification as read:",
        error
      );

    }
  };


  // ================= MARK ALL AS READ =================

  const handleReadAll = async () => {

    if (!user?.userId) {
      return;
    }

    try {

      await markAllAsRead(user.userId);

      loadNotifications();

    } catch (error) {

      console.error(
        "Unable to mark all notifications as read:",
        error
      );

    }
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

          {notifications.length > 0 && (

            <button
              className="btn btn-sm btn-success"
              onClick={handleReadAll}
            >
              Mark All
            </button>

          )}

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
              onClick={() =>
                handleRead(notification.id)
              }
            >

              <div className="fw-bold">

                {notification.title}

              </div>


              <div className="small text-muted">

                {notification.message}

              </div>


              <div className="small text-secondary mt-1">

                {new Date(
                  notification.createdAt
                ).toLocaleString()}

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default NotificationBell;
