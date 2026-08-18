import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationVariant = "success" | "danger" | "warning" | "info";

export type Notification = {
  id: string;
  message: string;
  variant: NotificationVariant;
};

type NotificationState = {
  notifications: Notification[];
};

const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notificationState",
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action: PayloadAction<Notification>) {
        state.notifications.push(action.payload);
      },
      prepare(message: string, variant: NotificationVariant) {
        return {
          payload: {
            id: crypto.randomUUID(),
            message,
            variant,
          },
        };
      },
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const selectNotifications = (state: {
  notificationState?: NotificationState;
}) => state.notificationState?.notifications ?? initialState.notifications;
