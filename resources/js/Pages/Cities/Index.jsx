import { useState } from 'react';
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";

export default function Index({ auth, cities }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);

        post(route('cities.store'), {
            data: formData,
            onSuccess: () => {
                setModalOpen(false);
                setAlert({
                    show: true,
                    message: 'City added successfully!',
                });
                setData({ name: '' });
            },
            onError: () => {
                setAlert({
                    show: true,
                    message: 'Failed to add city. Please try again.',
                });
            },
        });
    };

    const handleAlertClose = () => {
        setAlert({ ...alert, show: false });
    };

    const handleCityDelete = (id) => {
        router.visit(route('cities.destroy', id), {
            method: 'DELETE',
            onSuccess: () => {
                setAlert({
                    show: true,
                    message: 'City deleted successfully!',
                });
            },
            onError: () => {
                setAlert({
                    show: true,
                    message: 'Failed to delete city. Please try again.',
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Header title="Cities"/>
            <div className="page-content-wrapper">
                <div className="user-all-article-wrapper">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-3 newsten-title">Cities List</h6>
                            <h6
                                className="mb-3 line-height-1"
                                type="button"
                                onClick={() => setModalOpen(true)}
                            >
                                Add new
                            </h6>
                        </div>
                    </div>

                    {isModalOpen && (
                        <>
                            <div
                                className="modal-overlay"
                                onClick={() => setModalOpen(false)}
                            ></div>
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h6 className="modal-title" id="exampleModalCenterTitle">
                                                Add New City
                                            </h6>
                                            <button
                                                className="close"
                                                type="button"
                                                onClick={() => setModalOpen(false)}
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <div className="modal-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="name">City Name</label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        required
                                                    />
                                                    {errors.name && (
                                                        <div className="invalid-feedback">
                                                            {errors.name}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="modal-footer">
                                                    <button
                                                        className="btn btn-secondary"
                                                        type="button"
                                                        onClick={() => setModalOpen(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="btn btn-primary"
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        Save changes
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

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
                        {cities.length > 0 ? (
                            cities.map((city, index) => (
                                <div
                                    key={index}
                                    className="single-news-post d-flex align-items-center bg-gray"
                                >
                                    <div className="post-content">
                                        <a className="post-title" href="">
                                            {city.name}
                                        </a>
                                        <div className="post-meta d-flex align-items-center justify-content-between">
                                            <a href="">{city.clinics.length} clinics</a>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCityDelete(city.id);
                                                }}
                                            >
                                                Delete
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No cities available</p>
                        )}
                    </div>
                </div>
            </div>
            <BottomNav />
        </AuthenticatedLayout>
    );
}
