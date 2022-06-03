//TODO: isError === true must be included in the rendering

import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import styles from "./Tab1.module.css";
import { RefreshOutline } from "react-ionicons";
import { Geolocation } from "@capacitor/geolocation";
import React, { useEffect } from "react";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentPositionWeatherQuery } from "../services/weather";
import { setQueryCoord } from "../app/coordQuerySlice";
import WeatherCard from "../components/WeatherCard";

const Tab1: React.FC = () => {
  const dispatch = useDispatch();
  const coordQueryState = useSelector((state: RootState) => state.coordQuery);
  const {
    refetch,
    data: weatherData,
    isFetching,
    isError,
  } = useGetCurrentPositionWeatherQuery(
    {
      lat: coordQueryState.lat,
      lon: coordQueryState.lon,
      appid: "cd555b96865912ac5781d36d6d7de140",
      units: "metric",
    },
    { skip: coordQueryState.skip }
  );

  const setCurrentPosition = async () => {
    const data = await Geolocation.getCurrentPosition();
    const {
      coords: { latitude: latFetched },
      coords: { longitude: lonFetched },
    } = data;
    dispatch(setQueryCoord({ lat: latFetched, lon: lonFetched, skip: false }));
  };

  useEffect(() => {
    setCurrentPosition();
  }, []);

  function refreshCurrentPositionHandler() {
    refetch();
  }

  if (weatherData) {
    console.log(weatherData);
  }

  const weatherIconUrl = weatherData
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : undefined;
  const weatherVars = weatherData ? Object.keys(weatherData.main) : undefined;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles["ion-toolbar-dashboard"]}>
          <IonTitle className="ion-margin-bottom" size="large">
            Dashboard
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <RefreshOutline
                onClick={refreshCurrentPositionHandler}
                color={"black"}
                height="35px"
                width="35px"
                cssClasses={styles.refreshOutline}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-no-margin">
          <IonRow style={{ margin: "10px" }}>
            <IonCol className="ion-text-center">
              <h1 style={{ fontSize: "20px" }}>
                Here's your location based weather
              </h1>
            </IonCol>
          </IonRow>
        </IonGrid>
        {!weatherData && <IonLoading isOpen={!weatherData} />}
        {isFetching && <IonLoading isOpen={isFetching} />}
        {isFetching && !weatherData && <IonLoading isOpen={isFetching} />}
        {isError && <IonAlert isOpen={isError} />}
        {!isFetching && weatherData && (
          <WeatherCard
            weatherIconUrl={weatherIconUrl!}
            weatherData={weatherData}
            weatherVars={weatherVars!}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
