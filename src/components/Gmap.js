import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "font-awesome/css/font-awesome.min.css"; 
import L from "leaflet";

const redMarkerIcon = L.divIcon({
    html: '<i class="fa fa-map-marker" style="color:red; font-size: 2rem;"></i>',
    className: "custom-marker", 
    iconSize: [60, 90],
});

function UpdateMapView({ lat, lng }) {
    const map = useMap();

    useEffect(() => {
        if (lat && lng) {
            map.setView([lat, lng], map.getZoom());
        }
    }, [lat, lng, map]);

    return null;
}

export default function Gmap() {
    const { lat, lng } = useSelector((state) => state.location);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer
                center={[lat, lng]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='&copy; <a href="https://www.esri.com">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
                />
                <UpdateMapView lat={lat} lng={lng} />
                <Marker position={[lat, lng]} icon={redMarkerIcon}>
                    <Popup>
                        Location: {lat}, {lng}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
