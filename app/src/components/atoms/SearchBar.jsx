import React, { useState } from 'react';
import SearchSuggestions from './SearchSuggestions';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Sample popular cities for suggestions
  const popularCities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 
    'Dubai', 'Singapore', 'Los Angeles', 'Barcelona', 'Rome'
  ];

  const filteredSuggestions = popularCities.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
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
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search for places..."
          className="search-bar__input"
        />
        <button type="submit" className="search-bar__button">
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