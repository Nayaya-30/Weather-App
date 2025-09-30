import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__ring"></div>
      <p className="loading-spinner__text">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;