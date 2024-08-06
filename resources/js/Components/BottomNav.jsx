import { Link, usePage } from "@inertiajs/react";
import NavLink from "./NavLink";

export default function BottomNav() {
    const { url } = usePage();
    return (
        <div className="footer-nav-area" id="footerNav">
            <div className="newsten-footer-nav h-100">
                <ul className="h-100 d-flex align-items-center justify-content-between">
                    <li className={url === "/" ? "active" : ""}>
                        <a href={route("home")}>
                            <i className="lni lni-home"></i>
                        </a>
                    </li>
                    <li className={url === "/dashboard" ? "active" : ""}>
                        <Link href={route("dashboard")}>
                            <i className="lni lni-grid-alt"></i>
                        </Link>
                    </li>
                    <li>
                        <a href="#">
                            <i className="lni lni-bolt-alt"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="lni lni-bookmark"></i>
                        </a>
                    </li>
                    <li className={url === "/user" ? "active" : ""}>
                        <Link href={route("user.index")}>
                            <i className="lni lni-user"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
