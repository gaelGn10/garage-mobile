import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getNotifications, markAsRead, Notification } from "../services/notificationService";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  const handleRead = async (id: number) => {
    await markAsRead(id);
    setNotifications(await getNotifications());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {notifications.map((n) => (
            <IonItem key={n.id}>
              <IonLabel>
                {n.message} {n.read ? "(Lu)" : "(Non lu)"}
              </IonLabel>
              {!n.read && (
                <IonButton onClick={() => handleRead(n.id)}>Marquer lu</IonButton>
              )}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotificationsPage;
