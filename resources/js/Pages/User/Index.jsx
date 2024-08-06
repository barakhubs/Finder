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

        if (target.tagName === "A" && target.dataset.action) {
            // Handle the "Disable" or "Enable" button clicks
            if (target.dataset.action === "disable") {
                router.visit(route("clinic.disable", clinic.id), {
                    method: "post",
                });
            } else if (target.dataset.action === "enable") {
                router.visit(route("clinic.enable", clinic.id), {
                    method: "post",
                });
            }
        } else {
            // Handle clicks on any other element
            console.log("Other action performed");
            // Perform the desired action here
        }
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
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={handleClinicClick}
                            >
                                <i className="mr-1 lni lni-crop"></i>
                                Clinics
                            </button>
                            {can["admin-only"] && (
                                <>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={handleCategoryClick}
                                    >
                                        <i className="mr-1 lni lni-crop"></i>
                                        Categories
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={handleCityClick}
                                    >
                                        <i className="mr-1 lni lni-cog"></i>
                                        Cities
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="container">
                        <div className="user-meta-data d-flex align-items-center">
                            <div className="user-content">
                                <h6>{auth.user.username}</h6>
                                <p>Admin</p>
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
                            clinics.map((clinic, index) => (
                                <ClinicComponent clinic={clinic}/>
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
