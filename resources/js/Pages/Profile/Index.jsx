import { useState } from "react";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";

export default function Index({ auth, cities }) {
    const handleCityDelete = (id) => {
        router.visit(route("cities.destroy", id), {
            method: "DELETE",
            onSuccess: () => {
                setAlert({
                    show: true,
                    message: "City deleted successfully!",
                });
            },
            onError: () => {
                setAlert({
                    show: true,
                    message: "Failed to delete city. Please try again.",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Header title="Cities" />
            <div className="page-content-wrapper">
                <div class="container">
                    <div class="settings-wrapper">
                        <div class="card settings-card">
                            <div class="card-body">
                                <div class="single-settings d-flex align-items-center justify-content-between">
                                    <div class="title">
                                        <i class="lni lni-alarm"></i>
                                        <span>Notifications</span>
                                    </div>
                                    <div class="data-content">
                                        <div class="toggle-button-cover">
                                            <div class="button r">
                                                <input
                                                    class="checkbox"
                                                    type="checkbox"
                                                    checked
                                                />
                                                <div class="knobs"></div>
                                                <div class="layer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card settings-card">
                            <div class="card-body">
                                <div class="single-settings d-flex align-items-center justify-content-between">
                                    <div class="title">
                                        <i class="lni lni-night"></i>
                                        <span>Night Mode</span>
                                    </div>
                                    <div class="data-content">
                                        <div class="toggle-button-cover">
                                            <div class="button r">
                                                <input
                                                    class="checkbox"
                                                    id="darkSwitch"
                                                    type="checkbox"
                                                />
                                                <div class="knobs"></div>
                                                <div class="layer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card settings-card">
                            <div class="card-body">
                                <div class="single-settings d-flex align-items-center justify-content-between">
                                    <div class="title">
                                        <i class="lni lni-question-circle"></i>
                                        <span>Support</span>
                                    </div>
                                    <div class="data-content">
                                        <a class="pl-4" href="contact.html">
                                            <i class="lni lni-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card settings-card">
                            <div class="card-body">
                                <div class="single-settings d-flex align-items-center justify-content-between">
                                    <div class="title">
                                        <i class="lni lni-protection"></i>
                                        <span>Privacy</span>
                                    </div>
                                    <div class="data-content">
                                        <a
                                            class="pl-4"
                                            href="#"
                                        >
                                            <i class="lni lni-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card settings-card">
                            <div class="card-body">
                                <div class="single-settings d-flex align-items-center justify-content-between">
                                    <div class="title">
                                        <i class="lni lni-lock"></i>
                                        <span>
                                            Password
                                            <span>Updated 15 days ago</span>
                                        </span>
                                    </div>
                                    <div class="data-content">
                                        <a href="#">
                                            Change
                                            <i class="lni lni-chevron-right"></i>
                                        </a>
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
