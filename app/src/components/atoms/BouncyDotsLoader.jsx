import './BouncyDotsLoader.scss';

export default function BouncyDotsLoader({ ariaLabel = 'Loading...', color, size }) {
	return (
		<div
			className='dots-loader'
			role='status'
			aria-label={ariaLabel}
			style={{
				'--dot-color': color,
				'--dot-size': size ? `${size}px` : undefined
			}}>
			<span className='dot' />
			<span className='dot' />
			<span className='dot' />
			<span className='sr-only'>{ariaLabel}</span>
		</div>
	);
}
