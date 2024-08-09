import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import ClinicComponent from "./Components/ClinicComponent";

export default function Dashboard({
    auth,
    categoriesCount,
    citiesCount,
    clinicsCount,
    managersCount,
    clinics,
    can,
}) {
    const handleCategoryClick = (e) => {
        e.preventDefault();
        router.visit(route("categories.index", { method: "get" }));
    };

    const handleCityClick = (e) => {
        e.preventDefault();
        router.visit(route("cities.index", { method: "get" }));
    };

    const handleClinicClick = (e) => {
        e.preventDefault();
        router.visit(route("clinics.index", { method: "get" }));
    };

    const handleSingleClinicClick = (e) => {
        e.preventDefault();
        const { target } = e;

        router.visit(route("clinics.show", clinic.id), { method: "get" });
    };

    return (
        <AuthenticatedLayout>
            <Header title="Dashboard" />
            <div className="page-content-wrapper">
                <div className="profile-content-wrapper">
                    <div className="profile-settings-option">
                        <a
                            className=""
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="lni lni-plus"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            {can["admin-only"] ? (
                                <>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={handleCategoryClick}
                                    >
                                        <i className="mr-1 lni lni-layers"></i>
                                        Categories
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={handleCityClick}
                                    >
                                        <i className="mr-1 lni lni-road"></i>
                                        Cities
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={handleClinicClick}
                                >
                                    <i className="mr-1 lni lni-crop"></i>
                                    Clinics
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="container">
                        <div className="user-meta-data d-flex align-items-center">
                            <div className="user-content">
                                <h6>Welcome</h6>
                                <p>{auth.name}</p>
                                <br />
                                <div className="mt-4 user-meta-data d-flex align-items-center justify-content-between">
                                    <p className="mx-1">
                                        <span className="counter">
                                            {clinicsCount}
                                        </span>
                                        <span>Clinics</span>
                                    </p>
                                    <p className="mx-1">
                                        <span className="counter">
                                            {categoriesCount}
                                        </span>
                                        <span>Categories</span>
                                    </p>
                                    <p className="mx-1">
                                        <span className="counter">
                                            {citiesCount}
                                        </span>
                                        <span>Cities</span>
                                    </p>
                                    <p className="mx-1">
                                        <span className="counter">
                                            {managersCount}
                                        </span>
                                        <span>Managers</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-all-article-wrapper">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-3 newsten-title">
                                Recent Clinics
                            </h6>
                            <h6 className="mb-3 line-height-1">View all</h6>
                        </div>
                    </div>

                    <div className="container">
                        {clinics.length > 0 ? (
                            clinics.map((clinic) => (
                                <ClinicComponent key={clinic.id} clinic={clinic} />
                            ))
                        ) : (
                            <p className="text-center">No clinics available</p>
                        )}
                    </div>
                </div>
            </div>
            <BottomNav />
        </AuthenticatedLayout>
    );
}
