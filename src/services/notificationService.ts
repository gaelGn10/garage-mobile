export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

let fakeNotifications: Notification[] = [
  { id: 1, message: "Votre voiture Toyota est prête !", read: false },
];

export const getNotifications = (): Promise<Notification[]> => {
  return Promise.resolve(fakeNotifications);
};

export const markAsRead = (id: number) => {
  fakeNotifications = fakeNotifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  return Promise.resolve();
};
