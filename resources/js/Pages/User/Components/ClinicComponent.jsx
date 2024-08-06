import React from 'react';
import { router } from '@inertiajs/react'; // Make sure you are using the correct router import for Inertia

const ClinicComponent = ({ clinic }) => {
    const handleSingleClinicClick = (e, clinic) => {
        e.preventDefault();
        const { target } = e;

        if (target.tagName === 'A' && target.dataset.action) {
            // Handle the "Disable" or "Enable" button clicks
            if (target.dataset.action === 'disable') {
                router.visit(route('clinic.disable', clinic.id), { method: 'post' });
            } else if (target.dataset.action === 'enable') {
                router.visit(route('clinic.enable', clinic.id), { method: 'post' });
            }
        } else {
            router.visit(route('clinics.show', clinic.id), { method: 'get' });
        }
    };

    return (
        <div className="single-news-post d-flex align-items-center bg-gray" onClick={(e) => handleSingleClinicClick(e, clinic)}>
            <div className="post-thumbnail">
                <img
                    src={clinic.image_url || 'default-image.jpg'}
                    alt={clinic.name}
                />
            </div>
            <div className="post-content">
                <a className="post-title text-dark" href="#">
                    {clinic.name}
                </a>
                <p>
                    {clinic.description.length > 50
                        ? clinic.description.substring(0, 50) + '...'
                        : clinic.description}
                </p>
                <div className="post-meta d-flex align-items-center justify-content-between">
                    <span>
                        <a href="profile-for-viewer.html#">
                            {clinic.category.name}
                        </a>
                        <a href="profile-for-viewer.html#">
                            {clinic.city.name}
                        </a>
                    </span>
                    {clinic.status === 'active' ? (
                        <a href="#" data-action="disable">
                            Disable?
                        </a>
                    ) : (
                        <a href="#" data-action="enable">
                            Enable?
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClinicComponent;
