import BottomNav from "@/Components/BottomNav";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    const handleLoginClick = (e) => {
        e.preventDefault();
        router.visit(route("login", { method: "get" }));
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        router.visit(route("register", { method: "get" }));
    };

    const handleManageClick = (e) => {
        e.preventDefault();
        router.visit(route("register", { method: "get" }));
    };

    const { data, setData, get } = useForm({ query: "" });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("search.post"));
    };

    return (
        <AuthenticatedLayout>
            <div className="login-wrapper d-flex flex-column align-items-center justify-content-between min-vh-100">
                <div className="container text-center mt-5">
                    <div className="login-shape">
                        <img src="img/core-img/login.png" alt="" />
                    </div>
                    <div className="login-shape2">
                        <img src="img/core-img/login2.png" alt="" />
                    </div>
                    <img
                        className="login-im"
                        src="img/core-img/logo-alt.png"
                        alt=""
                    />

                    <div className="bg-shapes">
                        <div className="shape1"></div>
                        <div className="shape2"></div>
                        <div className="shape3"></div>
                        <div className="shape4"></div>
                        <div className="shape5"></div>
                        <div className="shape6"></div>
                        <div className="shape7"></div>
                        <div className="shape8"></div>
                    </div>

                    <div className="mt-5">
                        <button className="btn btn-primary btn-lg w-70">
                            DISCOVER CLINICS
                        </button>
                    </div>

                    <div className="search-page-form mt-5 px-1">
                        <a className="search-via-voice">
                            <i className="lni lni-mic"></i>
                        </a>
                        <form onSubmit={handleSearch}>
                            <input
                                className="form-control"
                                id="query"
                                type="search"
                                placeholder="Search clinics by name or category"
                                value={data.query}
                                onChange={(e) =>
                                    setData("query", e.target.value)
                                }
                            />
                            <button type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                    </div>
                    {!auth ? (
                        <div className="mt-5 px-1 d-flex align-items-center justify-content-between">
                            <button
                                className="btn btn-primary btn-lg w-50"
                                onClick={handleLoginClick}
                            >
                                Login
                            </button>
                            <div className="w-5"></div>
                            <button
                                className="btn btn-outline-primary btn-lg w-50"
                                onClick={handleRegisterClick}
                            >
                                Register
                            </button>
                        </div>
                    ) : (
                        <div className="mt-5 px-1 text-center">
                            <button
                                className="btn btn-outline-primary btn-lg w-100"
                                onClick={handleManageClick}
                            >
                                Manage Clinics
                            </button>
                        </div>
                    )}
                </div>

                <span className="mb-3">Rashid & Fauzi</span>

                <BottomNav />
            </div>
        </AuthenticatedLayout>
    );
}
