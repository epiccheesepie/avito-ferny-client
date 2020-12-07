import React from 'react';
import './Header.css';

const Header = _ => {

    return (
        <div className="header">
            <div className="header__logo">
                <img className="logo" alt="logo" src="https://static.avito.ru/@avito/bx-single-page-main/2.374.2/prod/web/resources/35f5a0d67b53.svg" />
            </div>
            <div className="header__text">
                <span className="header__desc">
                    Приложение-редактор, для создания баннеров для сайта Avito.
                </span>
            </div>
        </div>
    );
};

export default Header;