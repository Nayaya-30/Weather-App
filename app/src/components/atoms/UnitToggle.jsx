import './UnitToggle.scss';
import DropdownBtns from './Buttons';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnit } from '../../slices/weatherSlice';
import { useClickOutside } from '../../hooks/useWindowsClick';

const UnitToggle = () => {
	const dispatch = useDispatch();
	const unit = useSelector((state) => state.weather.unit);
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	useClickOutside(dropdownRef, () => setOpen(false));
	function handleUnitChange(selectedUnit) {
		dispatch(setUnit(selectedUnit));
		setOpen(false);
	}

	return (
		<div
			className='units-dropdown'
			ref={dropdownRef}>
			<button
				type='button'
				className={'units-dropdown__label'}
				onClick={() => setOpen(!open)}>
				<img
					src={'/assets/images/icon-units.svg'}
					alt={'Units Icon'}
				/>
				<span className={''}>Units</span>
				<img
					src={'/assets/images/icon-dropdown.svg'}
					alt={'Dropdown Icon'}
				/>
			</button>

			<div className={`units-dropdown__menu ${open ? 'open' : ''}`}>
				<button
					type='button'
					className={'units-dropdown__toggle-btn'}
					onClick={() =>
						handleUnitChange(
							unit === 'metric' ? 'imperial' : 'metric'
						)
					}>
					{unit === 'metric'
						? 'Switch to Imperial'
						: 'Switch to Metric'}
				</button>

				<DropdownBtns
					unitType={unit}
					unitValue1={'metric'}
					unitValue2={'imperial'}
					child1={'Celsius (°C)'}
					child2={'Fahrenheit (°F)'}
					label={'Temperature'}
				/>

				<hr />

				<DropdownBtns
					unitType={unit}
					unitValue1={'metric'}
					unitValue2={'imperial'}
					child1={'km/h'}
					child2={'mph'}
					label={'Wind Speed'}
				/>

				<hr />

				<DropdownBtns
					unitType={unit}
					unitValue1={'metric'}
					unitValue2={'imperial'}
					child1={'Millimeters (mm)'}
					child2={'Inches (in)'}
					label={'Precipitation'}
				/>
			</div>
		</div>
	);
};

export default UnitToggle;

