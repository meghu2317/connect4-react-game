import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
// Initialize the app with 7 columns and 6 rows
ReactDOM.render(
    <App columns={7} rows={6} />,
    document.getElementById("root")
);