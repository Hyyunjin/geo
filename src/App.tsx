import { useState } from "react";

import "./App.css";

function App() {
  const [location, setLocation] = useState<{
    lat: string | null;
    lng: string | null;
  }>({ lat: null, lng: null });
  const [permission, setPermission] = useState<string | null>(null);

  navigator.permissions?.query({ name: "geolocation" }).then((result) => {
    setPermission(result.state); //NOTE: 설정: granted, denied, prompt
  });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5) ?? 0;
        const lng = position.coords.longitude.toFixed(5) ?? 0;
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
      }
    );
  };

  return (
    <section className="root">
      <button className="button" onClick={getLocation}>
        {permission} {location.lat}, {location.lng}
      </button>
    </section>
  );
}

export default App;
