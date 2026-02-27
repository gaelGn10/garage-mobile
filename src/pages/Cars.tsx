import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { add, carSport } from "ionicons/icons";
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import "./Cars.css";

const Cars: React.FC = () => {
  const { data: repairs, loading, error } = useFirestoreCollection<any>("reparation");

  const getColor = (status: string) => {
    if (status === "DONE") return "success";
    if (status === "IN_REPAIR") return "warning";
    return "medium";
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="bg-transparent">
          <IonTitle className="text-3xl font-extrabold tracking-tight p-4 pb-0">
            <span className="text-gradient">Mes voitures</span>
          </IonTitle>
          <IonButtons slot="end" className="pr-4 pt-2">
            <IonButton routerLink="/add-car" className="header-add-button">
              <IonIcon icon={add} slot="start" size="small" />
              <IonLabel className="font-bold">Ajouter voiture</IonLabel>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-gradient-subtle">
        <div className="px-4 py-2 pb-20 space-y-4">
          {repairs.map((car: any, index) => (
            <IonCard
              routerLink={`/car/${car.id}`}
              key={car.id}
              className="car-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="car-card-content">
                <div className="car-icon-wrapper">
                  <IonIcon icon={carSport} className="text-3xl text-white" />
                </div>
                <div className="car-info">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">
                        {car.brand} {car.model}
                      </h2>
                      <p className="text-gray-400 text-sm font-medium tracking-wide">
                        {car.plate}
                      </p>
                    </div>
                    <IonBadge className={`status-badge ${getColor(car.status)}`}>
                      {car.status}
                    </IonBadge>
                  </div>
                </div>
              </div>
            </IonCard>
          ))}

          {repairs.length === 0 && !loading && (
            <div className="text-center mt-20 p-8 glass-card animate-fade-in mx-4">
              <IonIcon icon={carSport} style={{ fontSize: '64px', opacity: 0.3, marginBottom: '20px' }} />
              <h2 className="text-xl font-bold mb-2">Aucune voiture</h2>
              <p className="text-gray-400 mb-6">Commencez par ajouter votre première voiture pour suivre ses réparations.</p>
              <IonButton routerLink="/add-car" className="rounded-btn bg-gradient-primary px-6" expand="block">
                Ajouter une voiture
              </IonButton>
            </div>
          )}
        </div>

        <div className="fixed-add-button-container mb-12">
          <IonButton routerLink="/add-car" className="pill-add-button animate-slide-up bg-gradient-secondary">
            <IonIcon icon={add} slot="start" />
            Ajouter une voiture
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cars;
