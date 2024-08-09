import { Link } from "@inertiajs/react";

export default function ErrorPage({ status }) {
    const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <div className="page-content-wrapper d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="error-content text-center">
                    <h1 className="mb-3 text-large">{title}</h1>
                    <p className="mb-4">
                        {description} <br /> Please contact the administrator if
                        you believe this is a mistake.
                    </p>
                    <Link className="btn btn-primary" href={route("home")}>
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
