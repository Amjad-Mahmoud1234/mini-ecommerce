import "./LoadingSpinner.css";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading-state" role="status">
      <div className="loading-spinner"></div>

      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;