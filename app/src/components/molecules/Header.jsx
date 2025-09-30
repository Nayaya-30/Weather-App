import './Header.scss';
import Logo from '../templates/Logo.jsx';

const Header = ({ children }) => {
	return (
		<header className={'header'}>
			<div className={'header__left'}>
				<Logo className={'header__logo'} />
			</div>

			<div className={'header__right'}>{children}</div>
		</header>
	);
};

export default Header;

