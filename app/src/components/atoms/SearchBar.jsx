import React, { useState } from 'react';
import SearchSuggestions from './SearchSuggestions';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
	const [query, setQuery] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);

	// Sample popular cities for suggestions
	const popularCities = [
		'Abuja',
		'Kano',
		'Akwanga',
		'Bosso',
		'Lagos',
		'Abia',
		'Enugu',
		'Anambra',
		'Delta',
		'Minna',
	];

	const filteredSuggestions = popularCities.filter((city) =>
		city.toLowerCase().includes(query.toLowerCase())
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query.trim()) {
			onSearch(query);
			popularCities.includes(query) ?? popularCities.push(query); // Add to popular cities if not already present
			setQuery('');
			setShowSuggestions(false);
		}
	};

	const handleSuggestionClick = (suggestion) => {
		setQuery(suggestion);
		onSearch(suggestion);
		setShowSuggestions(false);
	};

	return (
		<form
			className={'search-bar'}
			onSubmit={handleSubmit}>
			<h3 className={'search-bar__text'}>How's the sky looking today?</h3>
			<div className={'search-bar__container'}>
				<label
					htmlFor={'search-input'}
					className={'search-bar__icon'}>
					<img
						src={'/assets/images/icon-search.svg'}
						alt={'Search Icon'}
					/>
				</label>

				<input
					className={'search-bar__input'}
					type={'text'}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setShowSuggestions(true)}
					onBlur={() =>
						setTimeout(() => setShowSuggestions(false), 200)
					}
					placeholder={'Search for places...'}
					aria-label={'Search Input'}
				/>

				<button
					type={'submit'}
					className={'search-bar__button'}
					aria-label={'Search Button'}>
					Search
				</button>

				{showSuggestions && query && (
					<SearchSuggestions
						suggestions={filteredSuggestions}
						onSuggestionClick={handleSuggestionClick}
					/>
				)}
			</div>
		</form>
	);
};

export default SearchBar;

