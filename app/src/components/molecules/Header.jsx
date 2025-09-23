import './Header.scss';

const Header = ({ children }) => {
  return (
    <header className={'header'}>
      <div className={'header__left'}>
        <img className={'header__logo'} src={'/assets/images/logo.svg'} alt={'Weathe App Logo'} />
      </div>

      <div className={'header__right'}>
          {children}
      </div>
    </header>
  );
};

export default Header;