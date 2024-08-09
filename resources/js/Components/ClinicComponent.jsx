import React from "react";
import { router } from "@inertiajs/react"; // Make sure you are using the correct router import for Inertia

const ClinicComponent = ({ clinic }) => {
    const handleSingleClinicClick = (e, clinic) => {
        e.preventDefault();
        const { target } = e;

        router.visit(route("clinics.show", clinic.id), { method: "get" });
    };

    return (
        <div
            className="single-recommended-post mt-3"
            onClick={(e) => handleSingleClinicClick(e, clinic)}
        >
            <div className="post-thumbnail">
                <img src={clinic.image_url || "default-image.jpg"} alt="" />
            </div>
            <div className="post-content">
                <a className="post-catagory" alt={clinic.name}>
                    {clinic.category.name}
                </a>
                <a className="post-title" href="#">
                    {clinic.name}
                </a>
            </div>
        </div>
    );
}

export default ClinicComponent;
