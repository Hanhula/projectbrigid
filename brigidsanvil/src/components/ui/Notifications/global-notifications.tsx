import {
  removeNotification,
  selectNotifications,
} from "@/components/store/notificationsSlice";
import { useAppDispatch, useAppSelector } from "@/components/store/store";
import { Toast, ToastContainer } from "react-bootstrap";

const GlobalNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          bg={notification.variant}
          onClose={() => dispatch(removeNotification(notification.id))}
          delay={5000}
          autohide
        >
          <Toast.Body className="text-white">{notification.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default GlobalNotifications;
