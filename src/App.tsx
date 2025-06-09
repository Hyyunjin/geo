import {  useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });


  const [permission, setPermission] = useState<string | null>(null);

  const handleMapOpen = (): void => {
    const { lat, lng } = location;

    if (lat == null || lng == null) return;

    const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    window.open(googleMapUrl, "_blank");
  };



  const getLocation = () => { 
  if ("geolocation" in navigator) {
    setPermission("O"); 

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(5));
        const lng = parseFloat(position.coords.longitude.toFixed(5));
        setLocation({ lat, lng });
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            alert("위치 접근 권한이 거부되었습니다.");
            break;
          case err.POSITION_UNAVAILABLE:
            alert("위치를 가져올 수 없습니다.");
            break;
          case err.TIMEOUT:
            alert("위치 요청이 시간 초과되었습니다.");
            break;
          default:
            alert("알 수 없는 오류입니다.");
        }
      },{
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 2000,
      }
    );
  } else {
    setPermission("X"); }
  };


  return (
    <section className="root">
      {permission}
      {permission ==="X" &&(<>
      <button className="button" onClick={getLocation}>
        현재 위치 : {permission} {location.lat}, {location.lng}
      </button>
      </>
    )}
      <button className="geoButton" onClick={handleMapOpen}>
        지도 연결
      </button>
    </section>
  );
}

export default App;
