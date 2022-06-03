import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonSkeletonText,
  IonThumbnail,
  IonItem,
} from "@ionic/react";
import React from "react";
import "./TestSkeleton.module.css";

const TestSkeleton: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <IonGrid>
        <IonRow style={{ margin: "10px" }}>
          <IonCol className="ion-text-center">
            <h1 style={{ fontSize: "20px" }}>
              Here's your location based weather
            </h1>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonGrid>
        <IonCard>
          <IonRow>
            <IonCol>
              <IonSkeletonText
                animated
                style={{ width: "30%", margin: "auto" }}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSkeletonText
                animated
                style={{ width: "30%", margin: "auto" }}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonSkeletonText
                animated
                style={{ width: "30%", margin: "auto" }}
              />
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol>
              <IonThumbnail>
                <IonSkeletonText animated />
              </IonThumbnail>
            </IonCol>
          </IonRow>
        </IonCard>
      </IonGrid>
    </React.Fragment>
  );
};

export default TestSkeleton;
