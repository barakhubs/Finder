import { useEffect, useState } from "react";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import LocationPicker from "@/Components/LocationPicker"; // import the LocationPicker component

export default function Create({
    auth,
    clinics,
    cities = [],
    categories = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        address: "",
        phone_number: "",
        email: "",
        status: "inactive",
        latitude: "",
        longitude: "",
        description: "",
        website: "",
        image: null,
        views: 0,
        is_featured: false,
        category_id: "",
        city_id: "",
    });

    const [alert, setAlert] = useState({ show: false, message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        post(route("clinics.store"), {
            data: formData,
            onSuccess: () => {
                setAlert({
                    show: true,
                    message: "Clinic added successfully!",
                });
                setData({
                    name: "",
                    address: "",
                    phone_number: "",
                    email: "",
                    status: "inactive",
                    latitude: "0.3219",
                    longitude: "32.5582",
                    description: "",
                    website: "",
                    image: null,
                    views: 0,
                    is_featured: false,
                    category_id: "",
                    city_id: "",
                });
            },
            onError: () => {
                setAlert({
                    show: true,
                    message: "Failed to add clinic. Please try again.",
                });
            },
        });
    };

    const handleAlertClose = () => {
        setAlert({ ...alert, show: false });
    };

    const handleLocationChange = (location) => {
        setData((prevData) => ({
            ...prevData,
            latitude: location.lat,
            longitude: location.lng,
        }));
    };

    return (
        <AuthenticatedLayout>
            <Header title="New Clinic" routeName="clinics.index" />
            <div className="page-content-wrapper">
                <div className="user-all-article-wrapper">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-3 newsten-title">New Clinic</h6>
                        </div>
                        <small className="text-muted text-sm">
                            Fields marked with{" "}
                            <sup className="text-danger">*</sup> are required
                        </small>
                    </div>

                    {/* Alert */}
                    {alert.show && (
                        <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                        >
                            {alert.message}
                            <button
                                className="close"
                                type="button"
                                onClick={handleAlertClose}
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    )}

                    <div className="container">
                        <form onSubmit={handleSubmit} enctype="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="name">
                                    Clinic Name{" "}
                                    <sup className="text-danger">*</sup>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={`form-control ${
                                        errors.name ? "is-invalid" : ""
                                    }`}
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">
                                    Address <sup className="text-danger">*</sup>
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    className={`form-control ${
                                        errors.address ? "is-invalid" : ""
                                    }`}
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                                {errors.address && (
                                    <div className="invalid-feedback">
                                        {errors.address}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">
                                    Phone Number
                                    <sup className="text-danger">*</sup>
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            +256
                                        </span>
                                    </div>
                                    <input
                                        id="phone_number"
                                        type="text"
                                        className={`form-control ${
                                            errors.phone_number
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        value={data.phone_number}
                                        onChange={(e) => {
                                            // Remove non-digit characters from the input value
                                            const inputValue =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                );
                                            setData("phone_number", inputValue);
                                        }}
                                    />
                                    {errors.phone_number && (
                                        <div className="invalid-feedback">
                                            {errors.phone_number}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    Email <sup className="text-danger">*</sup>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={`form-control ${
                                        errors.email ? "is-invalid" : ""
                                    }`}
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">
                                    Location (Latitude, Longitude)
                                </label>
                                <LocationPicker
                                    onLocationSelected={handleLocationChange}
                                />
                                {errors.latitude && (
                                    <div className="invalid-feedback">
                                        {errors.latitude}
                                    </div>
                                )}
                                {errors.longitude && (
                                    <div className="invalid-feedback">
                                        {errors.longitude}
                                    </div>
                                )}
                            </div>
                            <div className="form-group d-none">
                                <label htmlFor="latitude">Latitude</label>
                                <input
                                    id="latitude"
                                    type="text"
                                    className={`form-control ${
                                        errors.latitude ? "is-invalid" : ""
                                    }`}
                                    value={data.latitude || "0.3219"}
                                    readOnly
                                />
                            </div>
                            <div className="form-group d-none">
                                <label htmlFor="longitude">Longitude</label>
                                <input
                                    id="longitude"
                                    type="text"
                                    className={`form-control ${
                                        errors.longitude ? "is-invalid" : ""
                                    }`}
                                    value={data.longitude || "32.5582"}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">
                                    Description{" "}
                                    <sup className="text-danger">*</sup>
                                </label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    className={`form-control ${
                                        errors.description ? "is-invalid" : ""
                                    }`}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="website">Website</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text"
                                            id="basic-addon1"
                                        >
                                            http://
                                        </span>
                                    </div>
                                    <input
                                        id="website"
                                        type="text"
                                        className={`form-control ${
                                            errors.website ? "is-invalid" : ""
                                        }`}
                                        value={data.website}
                                        onChange={(e) =>
                                            setData("website", e.target.value)
                                        }
                                        aria-describedby="basic-addon1"
                                        placeholder="www.example.com"
                                    />
                                </div>
                                {errors.website && (
                                    <div className="invalid-feedback">
                                        {errors.website}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">
                                    Clinic Image{" "}
                                    <sup className="text-danger">*</sup>
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    className="form-control-file"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    accept="image/*"
                                />
                                {errors.image && (
                                    <div className="invalid-feedback">
                                        {errors.image}
                                    </div>
                                )}
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                                <input
                                    id="is_featured"
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={data.is_featured}
                                    onChange={(e) =>
                                        setData("is_featured", e.target.checked)
                                    }
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="is_featured"
                                >
                                    Featured?
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category_id">
                                    Category{" "}
                                    <sup className="text-danger">*</sup>
                                </label>
                                <select
                                    id="category_id"
                                    className={`form-control ${
                                        errors.category_id ? "is-invalid" : ""
                                    }`}
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                >
                                    <option value="">Select Category </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <div className="invalid-feedback">
                                        {errors.category_id}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="city_id">
                                    City <sup className="text-danger">*</sup>
                                </label>
                                <select
                                    id="city_id"
                                    className={`form-control ${
                                        errors.city_id ? "is-invalid" : ""
                                    }`}
                                    value={data.city_id}
                                    onChange={(e) =>
                                        setData("city_id", e.target.value)
                                    }
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.city_id && (
                                    <div className="invalid-feedback">
                                        {errors.city_id}
                                    </div>
                                )}
                            </div>
                            <button
                                className="btn btn-primary btn-lg w-100"
                                type="submit"
                                disabled={processing}
                            >
                                Save clinic
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <BottomNav />
        </AuthenticatedLayout>
    );
}
