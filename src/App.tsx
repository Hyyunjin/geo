import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  const [watchLocation, setWatchLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  const [permission, setPermission] = useState<string | null>(null);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 2000,
  };

  const handleMapOpen = (): void => {
    const { lat, lng } = location;

    if (lat == null || lng == null) return;

    const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    window.open(googleMapUrl, "_blank");
  };

  const getLocation = () => {
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
      },options
    );
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(5));
        const lng = parseFloat(position.coords.longitude.toFixed(5));
        setWatchLocation({ lat, lng });
      },
      (err) => {
        console.error("위치 에러:", err);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // 컴포넌트 언마운트 시 해제
    };
  }, []);

  useEffect(() => {
    navigator.permissions?.query({ name: "geolocation" }).then((result) => {
      setPermission(result.state); // granted, denied, prompt
    });
  }, []);

  return (
    <section className="root">
      <button className="button" onClick={getLocation}>
        현재 위치 : {permission} {location.lat}, {location.lng}
      </button>
      <div className="watchLocation">
        실시간 위치 : {watchLocation.lat}, {watchLocation.lng}
      </div>
      <button className="geoButton" onClick={handleMapOpen}>
        지도 연결
      </button>
    </section>
  );
}

export default App;
