import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { useEffect } from "react";
import WeatherProperty from "./WeatherProperty";

interface WeatherCardProps {
  weatherIconUrl: string;
  weatherVars: string[];
  weatherData: any;
}

const WeatherCard: React.FC<WeatherCardProps> = (props) => {
  const { weatherVars, weatherData, weatherIconUrl } = props;

  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
              <IonText color="primary">
                <h1 style={{ marginBottom: "0px", display: "inline" }}>
                  {weatherData.name},
                  <span style={{ color: "grey" }}>
                    {" "}
                    {weatherData.sys.country}
                  </span>
                </h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="auto">
              <img
                style={{
                  width: "70px",
                  height: "70px",
                  display: "inline",
                }}
                src={weatherIconUrl}
              />
            </IonCol>
            <IonCol size="auto" className="ion-justify-content-center">
              <h1
                style={{
                  display: "inline",
                  fontSize: "18px",
                }}
              >
                {weatherData.weather[0].description}
              </h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <WeatherProperty
                main={weatherVars[1]}
                mainValue={weatherData.main[weatherVars[1]]}
              />
            </IonCol>
            <IonCol>
              <WeatherProperty
                main={weatherVars[2]}
                mainValue={weatherData.main[weatherVars[2]]}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <WeatherProperty
                main={weatherVars[3]}
                mainValue={weatherData.main[weatherVars[3]]}
              />
            </IonCol>
            <IonCol>
              <WeatherProperty
                main={weatherVars[5]}
                mainValue={weatherData.main[weatherVars[5]]}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default WeatherCard;
