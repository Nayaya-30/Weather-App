import './weatherDetail.scss';
import { useSelector } from 'react-redux';
const WeatherDetail = ({ label, value }) => {
	const { loading } = useSelector((state) => state.weather);
	return (
		<div className='weather-detail'>
			<div className='weather-detail__label'>{label}</div>
			<div className='weather-detail__value'>
				{loading ? '...' : value}
			</div>
		</div>
	);
};

export default WeatherDetail;
