import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    let error = useRouteError();

    return (
        <div>
            <h1>An error has occurred.</h1>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}