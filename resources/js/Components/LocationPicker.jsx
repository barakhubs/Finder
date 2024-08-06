import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing marker icons in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
const LocationPicker = ({ onLocationSelected, initialPosition = { lat: 0.3219, lng: 32.5582 }, initialZoom = 13 }) => {
    const [position, setPosition] = useState(initialPosition);
    const [isLoading, setIsLoading] = useState(true);

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                const newPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
                setPosition(newPosition);
                onLocationSelected(newPosition);
            },
            load() {
                setIsLoading(false);
            },
        });

        return position ? <Marker position={[position.lat, position.lng]} /> : null;
    };

    return (
        <div>
            {isLoading && <p>Loading map...</p>}
            <MapContainer
                center={[position.lat, position.lng]}
                zoom={initialZoom}
                style={{ height: '300px', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControl position="topright" />
                <LocationMarker />
            </MapContainer>
            <p>Selected Location: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</p>
        </div>
    );
};

export default LocationPicker;
