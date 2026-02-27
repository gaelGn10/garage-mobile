import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useAuth } from "../auth/AuthContext";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-xl font-bold">Profil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-gradient-subtle ion-padding">
        <div className="flex flex-col h-full justify-center">
          <div className="glass-card p-6 mb-6 text-center animate-fade-in">
            <div className="w-24 h-24 bg-gradient-brand rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <IonText>
              <h2 className="text-xl font-bold mb-1">{user?.email}</h2>
              <p className="text-sm opacity-70">Utilisateur</p>
            </IonText>
          </div>

          <IonButton expand="block" color="danger" className="rounded-btn" onClick={handleLogout}>
            Déconnexion
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
