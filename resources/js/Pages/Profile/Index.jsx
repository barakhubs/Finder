import { useState } from "react";
import BottomNav from "@/Components/BottomNav";
import Header from "@/Components/Header";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { formatDistanceToNow, parseISO } from 'date-fns';

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

    const updatedAt = parseISO(auth.user.updated_at);

    const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true });

    return (
        <AuthenticatedLayout>
            <Header title="Cities" />
            <div className="page-content-wrapper">
                <div className="container">
                    <div className="settings-wrapper">
                        <div className="card settings-card">
                            <div className="card-body">
                                <div className="single-settings d-flex align-items-center justify-content-between">
                                    <div className="title">
                                        <i className="lni lni-alarm"></i>
                                        <span>Notifications</span>
                                    </div>
                                    <div className="data-content">
                                        <div className="toggle-button-cover">
                                            <div className="button r">
                                                <input
                                                    className="checkbox"
                                                    type="checkbox"
                                                    checked
                                                />
                                                <div className="knobs"></div>
                                                <div className="layer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card settings-card">
                            <div className="card-body">
                                <div className="single-settings d-flex align-items-center justify-content-between">
                                    <div className="title">
                                        <i className="lni lni-night"></i>
                                        <span>Night Mode</span>
                                    </div>
                                    <div className="data-content">
                                        <div className="toggle-button-cover">
                                            <div className="button r">
                                                <input
                                                    className="checkbox"
                                                    id="darkSwitch"
                                                    type="checkbox"
                                                />
                                                <div className="knobs"></div>
                                                <div className="layer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card settings-card">
                            <div className="card-body">
                                <div className="single-settings d-flex align-items-center justify-content-between">
                                    <div className="title">
                                        <i className="lni lni-question-circle"></i>
                                        <span>Support</span>
                                    </div>
                                    <div className="data-content">
                                        <a className="pl-4" href="">
                                            <i className="lni lni-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card settings-card">
                            <div className="card-body">
                                <div className="single-settings d-flex align-items-center justify-content-between">
                                    <div className="title">
                                        <i className="lni lni-protection"></i>
                                        <span>Privacy</span>
                                    </div>
                                    <div className="data-content">
                                        <a className="pl-4" href="#">
                                            <i className="lni lni-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card settings-card">
                            <div className="card-body">
                                <div className="single-settings d-flex align-items-center justify-content-between">
                                    <div className="title">
                                        <i className="lni lni-user"></i>
                                        <span>
                                            Profile
                                            <span>(Updated {timeAgo})</span>
                                        </span>
                                    </div>
                                    <div className="data-content">
                                        <Link href={route('profile.edit')}>
                                            Change
                                            <i className="lni lni-chevron-right"></i>
                                        </Link>
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
