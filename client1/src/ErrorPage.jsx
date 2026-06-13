import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error); // Logs the full traceback to your console for debugging

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
            color: "#2d3748"
        }}>
            <h1 style={{ fontSize: "3rem", margin: "0 0 10px 0", color: "#e53e3e" }}>
                Oops! 
            </h1>
            <p style={{ fontSize: "1.25rem", margin: "0 0 20px 0" }}>
                Something went wrong on our end.
            </p>
            
            {/* Displaying the specific error message safely */}
            <p style={{ color: "#718096", fontStyle: "italic", marginBottom: "30px" }}>
                {error.statusText || error.message || "Unknown Error"}
            </p>

            <Link to="/" style={{
                textDecoration: "none",
                color: "#ffffff",
                backgroundColor: "#3182ce",
                padding: "10px 20px",
                borderRadius: "6px",
                fontWeight: "600"
            }}>
                Back to Home Page
            </Link>
        </div>
    );
}

export default ErrorPage;