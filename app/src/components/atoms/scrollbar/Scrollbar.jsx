import { useEffect, useRef } from 'react';
import './Scrollbar.scss';

const Scrollbar = ({ children }) => {
	const containerRef = useRef(null);
	const thumbRef = useRef(null);

	const updateThumb = () => {
		const container = containerRef.current;
		const thumb = thumbRef.current;

		if (!container || !thumb) return;

		const { scrollTop, scrollHeight, clientHeight } = container;

		// Calculate thumb height proportional to content
		const thumbHeight = Math.max(
			(clientHeight / scrollHeight) * clientHeight,
			30
		);

		// Thumb position
		const scrollRatio = scrollTop / (scrollHeight - clientHeight);
		const thumbOffset = (clientHeight - thumbHeight) * scrollRatio;

		thumb.style.height = `${thumbHeight}px`;
		thumb.style.transform = `translateY(${thumbOffset}px)`;
	};

	useEffect(() => {
		const container = containerRef.current;
		updateThumb();

		container.addEventListener('scroll', updateThumb);
		window.addEventListener('resize', updateThumb);

		return () => {
			container.removeEventListener('scroll', updateThumb);
			window.removeEventListener('resize', updateThumb);
		};
	}, []);

	return (
		<div
			className='custom-scrollbar__container'
			ref={containerRef}>
			<div className='custom-scrollbar__content'>{children}</div>

			<div className='custom-scrollbar__track'>
				<div
					className='custom-scrollbar__thumb'
					ref={thumbRef}></div>
			</div>
		</div>
	);
};

export default Scrollbar;
