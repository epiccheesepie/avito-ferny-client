import React from 'react';
import './Main.css';

const Main = _ => {

    return (
        <div className="content">
            <div className="left">
                <div className="container">
                    <Header />
                    <Form />
                </div>
            </div>

            <div className="right">
                <img src="https://www.avito.st/s/app/i/story-previews/story-51/preview@3x.jpg" />
            </div>
        </div>
    );
};

const Header = _ => {

    return (
        <div className="header">
            <div className="header__logo">
                <img className="logo" src="https://static.avito.ru/@avito/bx-single-page-main/2.374.2/prod/web/resources/35f5a0d67b53.svg" />
            </div>
            <div className="header__text">
                <span className="header__title">
                    Banner Maker
                </span>
                <span className="header__desc">
                    Приложение-редактор, для создания баннеров для сайта Avito.
                </span>
            </div>
        </div>
    );
};

const Form = _ => {

    const [openBack, setOpenBack] = React.useState(false);
    const [openImg, setOpenImg] = React.useState(false);
    const [openText, setOpenText] = React.useState(false);
    const [openLink, setOpenLink] = React.useState(false);

    const [fileName, setFileName] = React.useState('Загрузить...');
    const handlerLoadImg = (e) => {
        const loadName = e.target.value.split('\\').pop();
        console.log(loadName);
        if (loadName.length > 16) {
            setFileName(_ => {
                return loadName.substring(0, 16) + '...';
            });
        } else {
            setFileName(loadName);
        }
    };

    return (
        <form className="form">
            <div className="form__item">
                <span className={`form__title ${openBack ? 'active' : ''}`} onClick={_ => setOpenBack(prev => !prev)}>
                    Фон...
                </span>
                {openBack && (
                <div className="form__item form__item--row">
                    <div className="row__item">
                        <span className="row__title">Цвет</span>
                        <div className="option">
                            <input className="form__color" type="color" />
                        </div>
                    </div>
                    <div className="row__item">
                        <span className="row__title">Градиент</span>
                        <div className="option">
                            <input className="form__color" type="color" />
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div className="form__item">
                <span className={`form__title ${openImg ? 'active' : ''}`} onClick={_ => setOpenImg(prev => !prev)}>
                    Картинка...
                </span>
                {openImg && (
                <div className="form__item form__item--row">
                    <div className="row__item">
                        <div className="option">
                            <input id="file" className="form__file" type="file" accept="image/*,image/jpeg,image/png" onChange={(e) => handlerLoadImg(e)} />
                            <label for="file" className="file-chooser">{fileName}</label>
                        </div>
                    </div>
                    <div className="row__item">
                        <div className="option">
                            <input className="form__text form__text--img" type="text" placeholder="Ссылка..." />
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div className="form__item">
                <span className={`form__title ${openText ? 'active' : ''}`} onClick={_ => setOpenText(prev => !prev)}>
                    Текст...
                </span>
                {openText && (
                <div className="form__container">
                    <div className="option">
                        <input className="form__text" type="text" placeholder="Введите текст" />
                    </div>
                </div>
                )}
            </div>
            <div className="form__item">
                <span className={`form__title ${openLink ? 'active' : ''}`} onClick={_ => setOpenLink(prev => !prev)}>
                    Ссылка...
                </span>
                {openLink && (
                <div className="form__container">
                    <div className="option">
                        <input className="form__text" type="text" placeholder="Введите ссылку" />
                    </div>
                </div>
                )}
            </div>
        </form>
    );
};

export default Main;