import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


export const Map = ({ studentsLocations, teacherLocation }) => {
  //אייקון ירוק
  const teacherIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // אייקון אדום
  const farStudentIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  //אייקון כחול
  const defaultIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });



  const MapBoundsUpdater = ({ locations, teacherLoc }) => {
    const map = useMap();
    useEffect(() => {
      const points = [...locations];
      if (teacherLoc) points.push(teacherLoc);
      if (points.length > 0) {
        const bounds = points.map((loc) => [loc.latitude, loc.longitude]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [locations, teacherLoc, map]);
    return null;
  };

  return (
    <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
      <MapContainer
        center={[32.08, 34.78]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapBoundsUpdater
          locations={studentsLocations}
          teacherLoc={teacherLocation}
        />

        {/* הצגת המורה בצבע ירוק */}
        {teacherLocation && (
          <Marker
            position={[teacherLocation.latitude, teacherLocation.longitude]}
            icon={teacherIcon}
          >
            <Popup>
              <strong>
                המורה: {teacherLocation.firstName} {teacherLocation.lastName}
              </strong>
              <br />
              עודכן: {new Date(teacherLocation.time).toLocaleTimeString()}
            </Popup>
          </Marker>
        )}

        {/* הצגת התלמידות בכחול או אדום */}
        {studentsLocations?.map((loc) => {
          let distance = 0;
          if (teacherLocation) {
            distance = getDistance(
              teacherLocation.latitude,
              teacherLocation.longitude,
              loc.latitude,
              loc.longitude
            );
          }
          const isFar = distance > 3;

          return (
            <Marker
              key={`${loc.id}-${loc.time}`}
              position={[loc.latitude, loc.longitude]}
              icon={isFar ? farStudentIcon : defaultIcon}
            >
              <Popup>
                <strong>
                  {loc.firstName} {loc.lastName}
                </strong>{" "}
                <br />
                ת"ז: {loc.id} <br />
                מרחק מהמורה: {distance.toFixed(2)} ק"מ
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
