import React, { useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";

export default function Explore({ clinics }) {
    const { url } = usePage();

    useEffect(() => {
        // Initialize the map
        const map = L.map("map").setView([0, 0], 13);

        // Set the map tile source
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        // Set user's location
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            map.setView([userLat, userLng], 13);

            // Add markers for each clinic
            clinics.forEach((clinic) => {
                const marker = L.marker([
                    clinic.latitude,
                    clinic.longitude,
                ]).addTo(map);

                marker.bindPopup(`
                    <strong>${clinic.name}</strong><br>
                    ${clinic.address}<br>
                    ${clinic.phone_number}<br>
                    <button className="clinic-details-button btn btn-primary" data-id="${clinic.id}">Check Details</button><br>
                `);

                // Listen for popup open event to attach event listeners to buttons
                marker.on("popupopen", function () {
                    const button = document.querySelector(
                        ".clinic-details-button"
                    );
                    button.addEventListener("click", function () {
                        const clinicId = this.getAttribute("data-id");
                        router.visit(route("clinics.show", clinicId), {
                            method: "get",
                        });
                    });
                });
            });
        });

        // Move the zoom controls to the bottom right
        const zoomControl = document.querySelector(".leaflet-control-zoom");
        const zoomContainer = zoomControl.parentNode;

        // Remove existing position classes
        zoomContainer.classList.remove("leaflet-top", "leaflet-left");

        // Add new position classes
        zoomContainer.classList.add("leaflet-bottom", "leaflet-right");
    }, [clinics]);

    return (
        <>
            <Header title="Clinics" />
            <div id="map" style={{ height: "600px", width: "100%" }}></div>
            <BottomNav />
        </>
    );
}
