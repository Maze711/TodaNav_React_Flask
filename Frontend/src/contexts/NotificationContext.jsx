import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(false);

  const addNotification = (notif) => {
    setNotifications((prev) => [notif, ...prev]);
    setUnread(true);
  };

  const clearUnread = () => setUnread(false);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, unread, clearUnread }}>
      {children}
    </NotificationContext.Provider>
  );
};