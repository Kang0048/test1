import React, { useEffect, useState } from "react";

const MapContainer = () => {
  const [places, setPlaces] = useState([]); // 음식점 리스트를 저장할 상태

  useEffect(() => {
    // 스크립트가 이미 로드되었는지 확인
    if (!document.getElementById("kakao-map-script")) {
      // 카카오맵 API 스크립트 동적 생성
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      // 스크립트 로드 후 지도 초기화
      script.onload = () => initializeMap();
    } else {
      // 스크립트가 이미 로드된 경우 지도 바로 초기화
      initializeMap();
    }
  }, []);

  // 지도 초기화 함수
  const initializeMap = () => {
    const { kakao } = window;
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 좌표 (서울시청)
      level: 3, // 확대 레벨
    };
    const map = new kakao.maps.Map(container, options);

    // 장소 검색 서비스 객체 생성
    const ps = new kakao.maps.services.Places();

    // 키워드로 장소 검색
    ps.keywordSearch("음식점", (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data); // 음식점 리스트를 상태로 저장

        data.forEach((place) => {
          // 마커를 생성하고 지도에 표시
          const markerPosition = new kakao.maps.LatLng(place.y, place.x);
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        });
      }
    });
  };

  return (
    <div>
      <h2>음식점 리스트</h2>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      
      {/* 음식점 리스트 표시 */}
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            <strong>{place.place_name}</strong> - {place.address_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapContainer;
