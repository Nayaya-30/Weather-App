import './SearchSuggestions.scss';

const SearchSuggestions = ({ suggestions, onSuggestionClick }) => {
	if (!suggestions || suggestions.length === 0) {
		return null;
	}

	return (
		<ul className='search-suggestions'>
			{suggestions.map((suggestion, index) => (
				<li
					key={index}
					className='search-suggestions__item'
					onClick={() => onSuggestionClick(suggestion)}>
					{suggestion}
				</li>
			))}
		</ul>
	);
};

export default SearchSuggestions;

