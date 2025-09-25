import './weatherDetail.scss';

const WeatherDetail = ({ label, value }) => {
	return (
		<div className='weather-detail'>
			<div className='weather-detail__label'>{label}</div>
			<div className='weather-detail__value'>{value}</div>
		</div>
	);
};

export default WeatherDetail;
