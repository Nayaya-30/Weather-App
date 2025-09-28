import React, { useState, useEffect } from 'react';
import SearchSuggestions from './SearchSuggestions';
import { useSelector } from 'react-redux';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
	const [query, setQuery] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [popularCities, setPopularCities] = useState([
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
	]);
	const loading = useSelector((state) => state.weather.loading);

	const filteredSuggestions = popularCities.filter((city) =>
		city.toLowerCase().includes(query.toLowerCase())
	);

	useEffect(() => {
		if (query.trim()) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [query]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query.trim()) {
			onSearch(query);
			// Add to popular cities if not already present
			if (!popularCities.includes(query)) {
				let Query = query.charAt(0).toUpperCase() + query.slice(1);
				setPopularCities((prev) => [...prev, Query]);
			}
			setQuery('');
			setShowSuggestions(false);
			setDisabled(true);
		}
	};

	const handleSuggestionClick = (suggestion) => {
		setQuery(suggestion);
		onSearch(suggestion);
		setShowSuggestions(false);
		setDisabled(true);
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
					id={'search-input'}
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
					className={`search-bar__button ${disabled && 'search-bar__button-disabled'}` }
					aria-label={'Search Button'}
					disabled={disabled}>
					{loading ? 'Searching...' : 'Search'}
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
