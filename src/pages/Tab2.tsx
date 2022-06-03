import { isPlatform, SearchbarChangeEventDetail } from "@ionic/core";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { setQueryCity } from "../app/cityQuerySlice";
import { RootState } from "../app/store";
import WeatherCard from "../components/WeatherCard";
import { useGetWeatherByCityQuery } from "../services/weather";
import styles from "./Tab1.module.css";
import { useState } from "react";

const Tab2: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch();
  const cityQueryState = useSelector((state: RootState) => state.cityQuery);
  const {
    refetch,
    data: weatherData,
    isFetching,
    isError,
    requestId,
  } = useGetWeatherByCityQuery(
    {
      q: cityQueryState.city,
      appid: "cd555b96865912ac5781d36d6d7de140",
      units: "metric",
    },
    { skip: cityQueryState.skip, refetchOnMountOrArgChange: true }
  );

  //TODO: The weather data does not refetch each time, I dont know if it is due to the fact that the data is indeed not changing,
  // however I think that it is just that is not working properly. refetchOnMountOrArgChange: 5 has been introduced but the query is
  // noit being executed after 5sec, taking into account that the data has changed in these 5 sec, the query should refecth...

  const weatherIconUrl = weatherData
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : undefined;
  const weatherVars = weatherData ? Object.keys(weatherData.main) : undefined;

  const searchChangeHandler = (
    event: CustomEvent<SearchbarChangeEventDetail>
  ) => {
    setSearchValue(event.detail.value!);
    console.log(searchValue);
  };

  const changeCityHandler = () => {
    if (cityQueryState.city === searchValue) {
      refetch();
    } else {
      dispatch(setQueryCity({ city: searchValue, skip: false }));
    }
  };

  console.log(searchValue);

  console.log(isFetching);
  console.log(requestId);
  console.log(weatherData);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles["ion-toolbar-dashboard"]}>
          <IonTitle className="ion-margin-bottom" size="large">
            Search
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="8">
              <IonSearchbar onIonChange={searchChangeHandler} />
            </IonCol>
            <IonCol size="4">
              <IonButton
                onClick={changeCityHandler}
                expand="block"
                style={
                  isPlatform("android")
                    ? { height: "42px" }
                    : { height: "36px" }
                }
              >
                Search
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {!weatherData && isFetching && <IonLoading isOpen={isFetching} />}
        {weatherData && (
          <WeatherCard
            weatherData={weatherData}
            weatherIconUrl={weatherIconUrl as string}
            weatherVars={weatherVars as string[]}
          />
        )}
        {!weatherData && !isFetching && (
          <h1 style={{ margin: "20px" }}>
            Please search for a certain city to obtain data
          </h1>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
