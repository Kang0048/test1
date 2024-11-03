import React, { useEffect, useState } from "react";

const MapContainer = () => {
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    const { kakao } = window;

    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch("음식점", (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data); // 음식점 리스트 저장
        data.forEach((place) => {
          const markerPosition = new kakao.maps.LatLng(place.y, place.x);
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        });
      }
    });
  }, []);

  return (
    <div>
      <h2>음식점 리스트</h2>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <ul>
        {places.map((place, index) => (
          <li key={index}>{place.place_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapContainer;