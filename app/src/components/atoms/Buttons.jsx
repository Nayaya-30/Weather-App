const DropdownBtns = ({ unitType, unitValue1, unitValue2, label, child1, child2 }) => {
	return (
		<div className={'units-dropdown__item'}>
			<p className='units-dropdown__title'>{label}</p>
			<button
				className={`units-dropdown__btn ${unitType === unitValue1 ? 'active' : ''}`}
			>
				<span>
					{child1 ? child1 : unitValue1}
				</span>
				<img 
					src={unitType === unitValue1 ? '/assets/images/icon-checkmark.svg' : undefined} 
					alt={unitType === unitValue1 ? 'Check Icon' : ''}
				/>
			</button>
			<button
				className={`units-dropdown__btn ${unitType === unitValue2 ? 'active' : ''}`}
			>
				<span>
					{child2 ? child2 : unitValue2}
				</span>
				<img 
					src={unitType === unitValue2 ? '/assets/images/icon-checkmark.svg' : null} 
					alt={unitType === unitValue2 ? 'Check Icon' : ''} 
				/>
			</button>
		</div>
	);
};

export default DropdownBtns;