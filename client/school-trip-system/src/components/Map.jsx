import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


export const Map = ({ studentsLocations }) => {
    console.log(studentsLocations)
    //הגדרת אייקון
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;


    // הגדרה שגורמת לראות במסך את כל המיקומים, לא משנה היכן הם
    const MapBoundsUpdater = ({ locations }) => {
        const map = useMap();
        useEffect(() => {
            if (locations && locations.length > 0) {
                const bounds = locations.map(loc => [loc.latitude, loc.longitude]);
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }, [locations, map]);
        return null;
    };

    return (
        <>
            <div>Map</div>
            <div style={{ height: "500px", width: "100%" }}>
                <MapContainer
                    center={[32.08, 34.78]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "500px", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapBoundsUpdater locations={studentsLocations} />
                    {studentsLocations?.map((loc) => (
                        <Marker key={`${loc.firstName}-${loc.id}-${loc.time}`} position={[loc.latitude, loc.longitude]}>
                            <Popup>
                                שם:{loc.firstName} <br />
                                תז: {loc.id} <br />
                                {new Date(loc.time).toLocaleString()}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer >
            </div>
        </>
    )
}
export default Map;
