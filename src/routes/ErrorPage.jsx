import React from 'react'
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="text-center flex flex-col justify-center h-screen">
            <h1>Error</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage