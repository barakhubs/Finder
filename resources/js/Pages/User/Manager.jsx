import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import ClinicComponent from "./Components/ClinicComponent";

export default function Manager({ auth, clinics }) {
    const handleAddClinicClick = (e) => {
        e.preventDefault();
        router.visit(route("clinics.create", { method: "get" }));
    };

    const handleSingleClinicClick = (e, clinic) => {
        e.preventDefault();
        const { target } = e;

        router.visit(route("clinics.show", clinic), { method: "get" });
    };

    return (
        <AuthenticatedLayout>
            <Header title="Manage Clinics" />
            <div className="page-content-wrapper">
                <div className="profile-content-wrapper">
                    <div className="container">
                        <div className="user-meta-data d-flex align-items-center">
                            <div className="user-content">
                                <h6>Manage Clinics</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-all-article-wrapper">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-3 newsten-title">Your Clinics</h6>
                            <h6
                                onClick={handleAddClinicClick}
                                className="mb-3 line-height-1"
                            >
                                Add new
                            </h6>
                        </div>
                    </div>

                    <div className="container">
                        {clinics.length > 0 ? (
                            clinics.map((clinic) => (
                                <div
                                    key={clinic.id}
                                    className="single-news-post d-flex align-items-center bg-gray"
                                    onClick={(e) =>
                                        handleSingleClinicClick(e, clinic)
                                    }
                                >
                                    <div className="post-thumbnail">
                                        <img
                                            src={
                                                clinic.image_url ||
                                                "default-image.jpg"
                                            }
                                            alt={clinic.name}
                                        />
                                    </div>
                                    <div className="post-content">
                                        <a
                                            className="post-title text-dark"
                                            href="#"
                                        >
                                            {clinic.name}
                                        </a>
                                        <p>
                                            {clinic.description.length > 50
                                                ? clinic.description.substring(
                                                      0,
                                                      50
                                                  ) + "..."
                                                : clinic.description}
                                        </p>
                                        <div className="post-meta d-flex align-items-center justify-content-between">
                                            <span>
                                                <a href="profile-for-viewer.html#">
                                                    {clinic.category.name}
                                                </a>
                                                <a href="">
                                                    {clinic.city.name}
                                                </a>
                                            </span>
                                            {clinic.status === "active" ? (
                                                <a
                                                    href="#"
                                                    data-action="disable"
                                                >
                                                    Pending approval
                                                </a>
                                            ) : (
                                                <a
                                                    href="#"
                                                    data-action="enable"
                                                >
                                                    Approved
                                                </a>
                                            )}
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
            <BottomNav />
        </AuthenticatedLayout>
    );
}
