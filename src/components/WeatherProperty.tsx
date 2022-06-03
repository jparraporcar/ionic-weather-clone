import { IonItem, IonLabel, IonText, IonThumbnail } from "@ionic/react";
import "./WeatherProperty.module.css";

interface WeatherProps {
  main: string;
  mainValue: number;
}

const WeatherProperty: React.FC<WeatherProps> = (props: WeatherProps) => {
  let propMod;
  let unit;
  let fileName;
  if (props.main === "feels_like") {
    propMod = "It feels like:";
    unit = "deg";
    fileName = "accessibility-sharp.svg";
  }
  if (props.main === "temp_min") {
    propMod = "Minimum temperature:";
    unit = "deg";
    fileName = "snow-sharp.svg";
  }
  if (props.main === "temp_max") {
    propMod = "Maximum temperature:";
    unit = "deg";
    fileName = "thermometer-sharp.svg";
  }
  if (props.main === "humidity") {
    propMod = "Humidity:";
    unit = "%";
    fileName = "water-sharp.svg";
  }

  return (
    <IonItem lines="none">
      <IonThumbnail slot="start">
        <img
          src={`${window.location.origin}/assets/${fileName}`}
          style={{ width: "75%", height: "75%" }}
        />
      </IonThumbnail>

      <IonLabel slot="">
        <IonText color="primary">
          <h1 style={{ fontSize: "15px" }}>{propMod}</h1>
        </IonText>
        <h2>{`${Math.trunc(props.mainValue)} ${unit}`}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default WeatherProperty;
