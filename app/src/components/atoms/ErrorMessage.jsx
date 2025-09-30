import './ErrorMessage.scss';

const ErrorMessage = ({ message, onRetry }) => {
	return (
		<div className='error-message'>
			<span className='error-message__icon'>
				<img
					src={'/assets/images/icon-error.svg'}
					alt={'Error Icon'}
				/>
			</span>
			<h3 className='error-message__title'>Something went wrong</h3>
			<p className='error-message__text'>{message}</p>
			{onRetry && (
				<button
					className='error-message__button'
					onClick={onRetry}>
					<img
						src={'/assets/images/icon-retry.svg'}
						alt={'Retry Icon'}
					/>
					<span>Retry</span>
				</button>
			)}
		</div>
	);
};

export default ErrorMessage;

