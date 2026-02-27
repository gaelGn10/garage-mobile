import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Repairs.css';

const Repairs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-xl font-bold">Réparations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="bg-gradient-subtle ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="text-xl font-bold">Réparations</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="glass-card p-4">
          <ExploreContainer name="Reparations page" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Repairs;
