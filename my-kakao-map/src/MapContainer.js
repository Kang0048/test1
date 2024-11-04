import React, { useEffect } from 'react';

const MapContainer = () => {
  useEffect(() => {
    const initializeKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 초기 좌표 (서울시청)
          level: 3, // 확대 레벨
        };
        new window.kakao.maps.Map(container, options);
      }
    };

    // 카카오맵 스크립트 로드
    const loadKakaoMapScript = () => {
      if (!document.getElementById('kakao-map-script')) {
        const script = document.createElement('script');
        script.id = 'kakao-map-script';
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&libraries=services`;
        script.async = true;
        script.onload = initializeKakaoMap;
        document.head.appendChild(script);
      } else {
        initializeKakaoMap();
      }
    };

    loadKakaoMapScript();
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default MapContainer;
