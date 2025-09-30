import React from 'react';
import './ThemeToggle.scss';

const ThemeToggle = ({ onToggle, theme }) => {
	return (
		<button
			type={'button'}
			className={`theme-toggle theme-toggle__${theme}`}
			onClick={onToggle}
			aria-label={`Switch to ${
				theme === 'light' ? 'dark' : 'light'
			} theme`}>
			<span className='theme-toggle__icon'>
				{theme === 'light' ? '🌙' : '☀️'}
			</span>
		</button>
	);
};

export default ThemeToggle;
