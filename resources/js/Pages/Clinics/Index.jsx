import { useState } from 'react';
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";

export default function Index({ auth, clinics, cities = [], categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        phone_number: '',
        email: '',
        status: '',
        latitude: '',
        longitude: '',
        description: '',
        website: '',
        image: null,
        views: 0,
        is_featured: false,
        category_id: '',
        city_id: '',
    });

    console.log(clinics);

    const [alert, setAlert] = useState({ show: false, message: '' });


    const handleAlertClose = () => {
        setAlert({ ...alert, show: false });
    };

    const handleAddNewClinicClick = () => {
        router.visit(route("clinics.create"), {
            method: "GET",
        });
    };

    return (
        <AuthenticatedLayout>
            <Header title="Clinics" />
            <div className="page-content-wrapper">
                <div className="user-all-article-wrapper">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-3 newsten-title">Clinics List</h6>
                            <h6
                                className="mb-3 line-height-1"
                                type="button"
                                onClick={handleAddNewClinicClick}
                            >
                                Add new
                            </h6>
                        </div>
                    </div>
                    {/* Alert */}
                    {alert.show && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {alert.message}
                            <button className="close" type="button" onClick={handleAlertClose} aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    )}

                    <div className="container">
                        <div className='row'>
                        {clinics.length > 0 ? (
                            clinics.map((clinic, index) => (
                                <div className="col-6 col-md-4" key={index}>
                                    <div className="single-recommended-post mt-3">
                                        <a className="bookmark-post" href="home.html#">
                                            <i className="lni lni-bookmark"></i>
                                        </a>
                                        <div className="post-thumbnail">
                                            <img src={clinic.image_url || 'default-image.jpg'} alt={clinic.name} />
                                        </div>
                                        <div className="post-content">
                                            <a className="post-catagory" href="catagory.html">
                                                {clinic.category.name}
                                            </a>
                                            <a className="post-title" href="single.html">
                                                {clinic.name}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No clinics available</p>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </AuthenticatedLayout>
    );
}
