import BottomNav from "@/Components/BottomNav";
import ClinicComponent from "@/Components/ClinicComponent";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({
    randomClinics,
    latestClinics,
    popularClinics,
    featuredClinics,
}) {
    return (
        <>
            <div className="header-area" id="headerArea">
                <div className="container h-100 d-flex align-items-center justify-content-between">
                    <div className="logo-wrapper">
                        <a href="home.html">
                            <img src="img/core-img/logo.png" alt="" />
                        </a>
                    </div>

                    <div className="search-form">
                        <a href="">
                            <i className="fa fa-search"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="page-content-wrapper">
                <div className="news-today-wrapper">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-3 pl-1 newsten-title">
                                News Today
                            </h5>
                            <p
                                className="mb-3 line-height-1"
                                id="dashboardDate2"
                            ></p>
                        </div>

                        <div className="hero-slides owl-carousel">
                            <div
                                className="single-hero-slide"
                                style={{
                                    backgroundImage: "url('img/bg-img/4.jpg')",
                                }}
                            >
                                <div className="background-shape">
                                    <div className="circle2"></div>
                                    <div className="circle3"></div>
                                </div>
                                <div className="slide-content h-100 d-flex align-items-end">
                                    <div className="container-fluid mb-3">
                                        <div className="video-icon">
                                            <i className="lni lni-play"></i>
                                        </div>
                                        <a
                                            className="bookmark-post"
                                            href="home.html#"
                                        >
                                            <i className="lni lni-bookmark"></i>
                                        </a>
                                        <a
                                            className="post-catagory"
                                            href="catagory.html"
                                        >
                                            Politics
                                        </a>
                                        <a
                                            className="post-title d-block"
                                            href="single.html"
                                        >
                                            Massive riots in the city to
                                            establish rule of law
                                        </a>
                                        <div className="post-meta d-flex align-items-center">
                                            <a href="home.html#">
                                                <i className="mr-1 lni lni-user"></i>
                                                Mayaj
                                            </a>
                                            <a href="home.html#">
                                                <i className="mr-1 lni lni-calendar"></i>
                                                26 March
                                            </a>
                                            <span>
                                                <i className="mr-1 lni lni-bar-chart"></i>
                                                4 min read
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="for-you-news-wrapper">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0 pl-1 newsten-title">For You</h5>
                            <a
                                className="btn btn-primary btn-sm"
                                href="home.html#"
                            >
                                View All
                            </a>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            {randomClinics.length > 0 ? (
                                randomClinics.map((clinic) => (
                                    <div
                                        className="col-6 col-md-4"
                                        key={clinic.id}
                                    >
                                        <ClinicComponent clinic={clinic} />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">
                                    No clinics available
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="tabs-news-wrapper bg-gray">
                    <div className="container">
                        <nav>
                            <div
                                className="nav nav-tabs"
                                id="nav-tab"
                                role="tablist"
                            >
                                <a
                                    className="nav-item nav-link"
                                    id="nav-newest-tab"
                                    href="#nav-newest"
                                    data-toggle="tab"
                                    role="tab"
                                    aria-controls="nav-newest"
                                    aria-selected="true"
                                >
                                    Newest
                                </a>
                                <a
                                    className="nav-item nav-link active"
                                    id="nav-popular-tab"
                                    href="#nav-popular"
                                    data-toggle="tab"
                                    role="tab"
                                    aria-controls="nav-popular"
                                    aria-selected="false"
                                >
                                    Popular
                                </a>
                                <a
                                    className="nav-item nav-link"
                                    id="nav-featured-tab"
                                    href="#nav-featured"
                                    data-toggle="tab"
                                    role="tab"
                                    aria-controls="nav-featured"
                                    aria-selected="false"
                                >
                                    Featured
                                </a>
                            </div>
                        </nav>

                        <div className="tab-content" id="nav-tabContent">
                            <div
                                className="tab-pane fade"
                                id="nav-newest"
                                role="tabpanel"
                                aria-labelledby="nav-newest-tab"
                            >
                                <div className="container">
                                    <div className="row">
                                        {latestClinics.length > 0 ? (
                                            latestClinics.map((clinic) => (
                                                <div
                                                    className="col-6 col-md-4"
                                                    key={clinic.id}
                                                >
                                                    <ClinicComponent
                                                        clinic={clinic}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">
                                                No clinics available
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="tab-pane fade show active"
                                id="nav-popular"
                                role="tabpanel"
                                aria-labelledby="nav-popular-tab"
                            >
                                <div className="container">
                                    <div className="row">
                                        {popularClinics.length > 0 ? (
                                            popularClinics.map((clinic) => (
                                                <div
                                                    className="col-6 col-md-4"
                                                    key={clinic.id}
                                                >
                                                    <ClinicComponent
                                                        clinic={clinic}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">
                                                No clinics available
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="tab-pane fade"
                                id="nav-featured"
                                role="tabpanel"
                                aria-labelledby="nav-featured-tab"
                            >
                                <div className="container">
                                    <div className="row">
                                        {featuredClinics.length > 0 ? (
                                            featuredClinics.map((clinic) => (
                                                <div
                                                    className="col-6 col-md-4"
                                                    key={clinic.id}
                                                >
                                                    <ClinicComponent
                                                        clinic={clinic}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">
                                                No clinics available
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav />
        </>
    );
}
