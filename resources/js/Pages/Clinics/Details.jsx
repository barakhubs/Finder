import { useState } from "react";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";

export default function Details({ clinic}) {
    const [alert, setAlert] = useState({ show: false, message: "" });

    return (
        <AuthenticatedLayout>
            <Header title={clinic.name} routeName={"dashboard"} />
            <div class="page-content-wrapper">
                <div id="scrollIndicator"></div>

                <div class="single-blog-thumbnail">
                    <img
                        class="w-100"
                        src={clinic.image_url || "default-image.jpg"}
                        alt={clinic.name}
                    />
                </div>

                <div class="single-blog-info">
                    <div class="container">
                        <div class="d-flex align-items-center">
                            <div class="post-like-wrap">
                                <a class="post-share" href="#">
                                    <i class="fa fa-map-marker"></i>
                                </a>
                                <span class="d-block">{clinic.city.name}</span>
                            </div>
                            <div class="post-content-wrap">
                                <a
                                    class="post-catagory d-inline-block mb-2"
                                    href="#"
                                >
                                    {clinic.category.name}
                                </a>
                                <h5 class="mb-2">{clinic.name}</h5>
                                <div class="post-meta">
                                    <a class="post-date" href="single.html#">
                                        {clinic.phone_number}
                                    </a>
                                    <a class="post-views" href="single.html#">
                                        {clinic.views} Views
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="blog-description">
                    <div class="container">
                        <p>{clinic.description}</p>
                        <div className="p-2 mt-3">
                            <div class="card settings-card">
                                <div class="card-body">
                                    <div class="single-settings d-flex align-items-center justify-content-between">
                                        <div className="title">
                                            <a
                                                href={`https://www.google.com/maps?q=${clinic.latitude},${clinic.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span>
                                                    {clinic.address.length > 35
                                                        ? clinic.address.substring(
                                                              0,
                                                              35
                                                          ) + "..."
                                                        : clinic.address}
                                                </span>
                                            </a>
                                        </div>
                                        <div className="data-content">
                                            <a
                                                className="pl-4"
                                                href={`https://www.google.com/maps?q=${clinic.latitude},${clinic.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="lni lni-map-marker"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 mt-1">
                            <div class="card settings-card">
                                <div class="card-body">
                                    <div class="single-settings d-flex align-items-center justify-content-between">
                                        <div class="title">
                                            <a
                                                href={`tel:${clinic.phone_number}`}
                                            >
                                                <span>
                                                    {clinic.phone_number}
                                                </span>
                                            </a>
                                        </div>
                                        <div class="data-content">
                                            <a
                                                className="pl-4"
                                                href={`tel:${clinic.phone_number}`}
                                            >
                                                <i className="lni lni-phone"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 mt-1">
                            <div class="card settings-card">
                                <div class="card-body">
                                    <div class="single-settings d-flex align-items-center justify-content-between">
                                        <div class="title">
                                            <a href={`mailto:${clinic.email}`}>
                                                <span>{clinic.email}</span>
                                            </a>
                                        </div>
                                        <div class="data-content">
                                            <a
                                                className="pl-4"
                                                href={`mailto:${clinic.email}`}
                                            >
                                                <i className="lni lni-envelope"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 mt-1">
                            <div class="card settings-card">
                                <div class="card-body">
                                    <div class="single-settings d-flex align-items-center justify-content-between">
                                        <div class="title">
                                            <a
                                                href={
                                                    clinic.website.startsWith(
                                                        "http"
                                                    )
                                                        ? clinic.website
                                                        : `http://${clinic.website}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span>
                                                    {clinic.website.length > 30
                                                        ? clinic.website.substring(
                                                              0,
                                                              30
                                                          ) + "..."
                                                        : clinic.website}
                                                </span>
                                            </a>
                                        </div>
                                        <div class="data-content">
                                            <a
                                                className="pl-4"
                                                href={
                                                    clinic.website.startsWith(
                                                        "http"
                                                    )
                                                        ? clinic.website
                                                        : `http://${clinic.website}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="lni lni-world"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </AuthenticatedLayout>
    );
}
