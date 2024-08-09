import BottomNav from "@/Components/BottomNav";
import ClinicComponent from "@/Components/ClinicComponent";
import { Link, Head, useForm, usePage, router } from "@inertiajs/react";

export default function SearchResult({ clinics, query }) {
    const { data, setData, get } = useForm({ query: "" });
    const { url } = usePage();

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("search.post"));
    };

    const handleExploreOnMapClick = (e) => {
        e.preventDefault();
        const { target } = e;
        router.visit(route("clinic.explore"), {
            method: "get",
        });
    };

    return (
        <>
            <div className="header-area" id="headerArea">
                <div className="container h-100 d-flex align-items-center justify-content-between">
                    <div className="logo-wrapper">
                        <a href="#">
                            <img src="img/core-img/logo.png" alt="" />
                        </a>
                    </div>

                    <div>
                        <a href="#" onClick={handleExploreOnMapClick}>
                            Explore on Map
                        </a>
                    </div>
                </div>
            </div>

            <div className="page-content-wrapper">
                <div className="search-post-wrapper">
                    <div className="bg-shapes">
                        <div className="shape1"></div>
                        <div className="shape2"></div>
                        <div className="shape3"></div>
                        <div className="shape4"></div>
                        <div className="shape5"></div>
                    </div>

                    <div className="container">
                        {url === "/search?query=" + query ? (
                            <h6 className="mb-3 pl-2">
                                You searched for: {query}
                            </h6>
                        ) : url === "/list" ? (
                            <h4 className="mb-3 pl-2">Clinics near you!</h4>
                        ) : (
                            <h4 className="mb-3 pl-2">Clinics near you!</h4>
                        )}

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
                    </div>
                </div>

                <div className="for-you-news-wrapper">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            {url === "/search?query=" + query ? (
                                <h5 className="mb-0 pl-1 newsten-title">
                                    Search Results
                                </h5>
                            ) : (
                                <h5 className="mb-0 pl-1 newsten-title">
                                    Near you
                                </h5>
                            )}

                            <small>{clinics.length} results</small>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            {clinics.length > 0 ? (
                                clinics.map((clinic) => (
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
            </div>

            <BottomNav />
        </>
    );
}
