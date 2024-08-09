import { useState } from 'react';
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import ClinicComponent from '@/Components/ClinicComponent';

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

    const [alert, setAlert] = useState({ show: false, message: '' });


    const handleAlertClose = () => {
        setAlert({ ...alert, show: false });
    };

    const handleAddNewClinicClick = (e) => {
        e.preventDefault();
        const { target } = e;
        router.visit(route("clinics.create"), {
            method: "get",
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
                            clinics.map((clinic) => (
                                <div
                                    className="col-6 col-md-4"
                                    key={clinic.id}
                                >
                                    {/* <ClinicComponent clinic={clinic} /> */}
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
