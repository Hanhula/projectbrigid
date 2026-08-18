import {
  addNotification,
  notificationSlice,
  removeNotification,
  selectNotifications,
} from "@/components/store/notificationsSlice";

describe("notificationSlice", () => {
  test("queues and removes notifications", () => {
    const addedState = notificationSlice.reducer(
      undefined,
      addNotification("Article refreshed.", "success"),
    );

    expect(addedState.notifications).toHaveLength(1);
    expect(addedState.notifications[0]).toMatchObject({
      message: "Article refreshed.",
      variant: "success",
    });

    const removedState = notificationSlice.reducer(
      addedState,
      removeNotification(addedState.notifications[0].id),
    );

    expect(removedState.notifications).toEqual([]);
  });

  test("returns an empty queue for legacy state without notifications", () => {
    expect(selectNotifications({})).toEqual([]);
  });
});
