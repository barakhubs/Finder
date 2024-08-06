import { Link, router, usePage } from "@inertiajs/react";

export default function Header({ title = ""}) {

    const handleBackButton =(e) => {
        e.preventDefault();
        window.history.back();
    }
    const { url } = usePage();
    return (
        <div className="header-area" id="headerArea">
            <div className="container h-100 d-flex align-items-center justify-content-between">
                <div className="back-button">
                    <Link onClick={handleBackButton}>
                        <i className="lni lni-chevron-left"></i>
                    </Link>
                </div>

                <div className="page-heading">
                    <h6 className="mb-0">{title}</h6>
                </div>

                <div className="search-form">
                {url === "/user" ? (
                    <Link method="post" href={route('logout')} as="button">
                        <i className="fa fa-power-off"></i>
                    </Link>
                    ) :
                    <Link to="search">
                            <i className="fa fa-search"></i>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}
