import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './Main.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Main = _ => {

    const [bannerConfig, setBannerConfig] = React.useState({});

    const handlerChangeText = (title,value) => {
        setBannerConfig( prev => {
            return {
                ...prev,
                [title]: value
            };
        });

        console.log(bannerConfig);
    };

    const handlerChangeGradient = (e) => {
        const { name, value } = e.target;
        
        setBannerConfig( prev => {
            if (typeof prev.background === 'string') {
                prev.background = {};
            }

            return {
                ...prev,
                background: {
                    ...prev.background,
                    [name]: value
                }
            };
        });

        console.log(bannerConfig);
    };

    return (
        <div className="content">
            <div className="left">
                <PerfectScrollbar>
                    <div className="container">
                        <Header />
                        <Form 
                            bannerConfig={bannerConfig}
                            onChange={handlerChangeText}
                            onChangeGradient={handlerChangeGradient}
                        />
                    </div>
                </PerfectScrollbar>
            </div>

            <div className="right">
                <Banner 
                    bannerConfig={bannerConfig}
                />
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
                <span className="header__desc">
                    Приложение-редактор, для создания баннеров для сайта Avito.
                </span>
            </div>
        </div>
    );
};

const Form = ({bannerConfig, onChange, onChangeGradient}) => {

    const [openBack, setOpenBack] = React.useState(false);
    const [openImg, setOpenImg] = React.useState(false);
    const [openText, setOpenText] = React.useState(false);
    const [openLink, setOpenLink] = React.useState(false);
    const [openExp, setOpenExp] = React.useState(false);

    const [fileName, setFileName] = React.useState('Загрузить...');
    const handlerLoadImg = (e) => {
        const loadName = e.target.value.split('\\').pop() || 'Загрузить...';
        console.log(loadName);
        if (loadName.length > 16) {
            setFileName(_ => {
                return loadName.substring(0, 16) + '...';
            });
        } else {
            setFileName(loadName);
        }
    };

    const handlerClickJson = _ => {
        const parse = JSON.stringify(bannerConfig);
        navigator.clipboard.writeText(parse);
        alert('Конфигурация баннера скопирована в буфер обмена');
    };

    return (
        <form className="form">
            <div className={`form__item ${openBack ? 'active' : ''}`}>
                <span className="form__title button" onClick={_ => setOpenBack(prev => !prev)}>
                    Фон
                </span>
                {openBack && (
                <div className="form__container">
                    <Color 
                        value={bannerConfig.background}
                        title='background'
                        onChange={onChange}
                    />
                    <div className="form__item--row button button--left button--disabledHover">
                        <span className="row-title">Градиент</span>
                        <div className="option">
                            <div className="left-color">
                                <input 
                                    className="form__color"
                                    type="color"
                                    name="top"
                                    value={bannerConfig.background ? bannerConfig.background.top : '#000'}
                                    onChange={(e) => onChangeGradient(e)} 
                                />
                            </div>
                            <div className="right-color">
                                <input
                                    className="form__color"
                                    type="color"
                                    name="bot"
                                    value={bannerConfig.background ? bannerConfig.background.bot : '#000'}
                                    onChange={(e) => onChangeGradient(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div className={`form__item ${openImg ? 'active' : ''}`}>
                <span className="form__title button" onClick={_ => setOpenImg(prev => !prev)}>
                    Картинка
                </span>
                {openImg && (
                <div className="form__container">
                    <div className="form__item--row">
                        <div className="option">
                            <input id="file" className="form__file" type="file" accept="image/*,image/jpeg,image/png" onChange={(e) => handlerLoadImg(e)} />
                            <label for="file" className="button button--center">{fileName}</label>
                        </div>
                    </div>
                    <div className="form__item--row">
                        <Text 
                            placeholder="Ссылка..."
                            value={bannerConfig.img}
                            title="img"
                            onChange={onChange}
                        />
                    </div>
                </div>
                )}
            </div>
            <div className={`form__item ${openText ? 'active' : ''}`}>
                <span className="form__title button" onClick={_ => setOpenText(prev => !prev)}>
                    Текст
                </span>
                {openText && (
                <div className="form__container">
                    <Color 
                        value={bannerConfig.textColor}
                        title="textColor"
                        onChange={onChange}
                    />
                    <Text 
                        placeholder="Введите текст"
                        value={bannerConfig.text}
                        title="text"
                        onChange={onChange}
                    />
                </div>
                )}
            </div>
            <div className={`form__item ${openLink ? 'active' : ''}`}>
                <span className="form__title button" onClick={_ => setOpenLink(prev => !prev)}>
                    Ссылка
                </span>
                {openLink && (
                <div className="form__container">
                    <Text 
                        placeholder="Введите ссылку"
                        value={bannerConfig.link}
                        title="link"
                        onChange={onChange}
                    />
                </div>
                )}
            </div>
            <div className={`form__item ${openExp ? 'active' : ''}`}>
                <span className="form__title button" onClick={_ => setOpenExp(prev => !prev)}>
                    Экспорт
                </span>
                {openExp && (
                <div className="form__container">
                    <div className="form__item--row">
                        <input className="button button--center" type="button" value="PNG" />
                    </div>
                    <div className="form__item--row">
                        <input className="button button--center" type="button" value="HTML" />
                    </div>
                    <div className="form__item--row">
                        <input className="button button--center" type="button" value="JSON" onClick={handlerClickJson} />
                    </div>
                </div>
                )}
            </div>
        </form>
    );
};

const Color = ({value, title, onChange}) => {

    return (
        <label className="form__item--row button button--left">
            <span className="row-title">Цвет</span>
            <div className="option">
                <input className="form__color" type="color" value={value} onChange={(e) => onChange(title, e.target.value)} />
            </div>
        </label>
    );
};

const Text = ({placeholder, value, title, onChange}) => {

    return (
        <div className="option">
            <input 
                className="form__text"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(title, e.target.value)}
            />
        </div>
    );
};


const Banner = ({bannerConfig}) => {

    const [bannerText, setBannerText] = React.useState(''); //рендер текста
    React.useEffect(_ => {
        const decorationText = (text='') => {
            while (text.length > 26) {
                let words = text.split(' ');
                words.pop();
                text = words.join(' ') + '...';
            }
    
            return text;
        };

        const bannerText = decorationText(bannerConfig.text);
        setBannerText(bannerText);

    }, [bannerConfig.text]);

    const [bannerBackground, setBannerBackground] = React.useState(''); //стиль фона
    React.useEffect(_ => {
        const { background } = bannerConfig;
        let bannerBackground;

        const typeBackground = typeof background;
        if (typeBackground === 'object') {
            bannerBackground = `linear-gradient(${background.top},${background.bot})`;
        } else {
            bannerBackground = background;
        }

        setBannerBackground(bannerBackground);

    }, [bannerConfig.background]);

    const [posImg, setPosImg] = React.useState({
        top: '0px',
        left: '0px'
    });
    const handlerMouseDrag = (e) => {
        e.preventDefault();
        const img = e.currentTarget;
        const banner = img.parentNode;
        const left = e.clientX - img.getBoundingClientRect().left;
        const top = e.clientY - img.getBoundingClientRect().top;

        const onMouseMove = (e) => { 
            let newLeft = e.clientX - left - banner.getBoundingClientRect().left;
            let newTop = e.clientY - top - banner.getBoundingClientRect().top;

            const deviation = 10; //погрешность заступа за блок баннера
            const imgWidth = img.offsetWidth; //ширина изображения
            const imgHeight = img.offsetHeight; //высота изображения
            const bannerWidth = banner.offsetWidth; //ширина баннера
            const bannerHeight = banner.offsetHeight; //высота баннера

            const leftEdge = -imgWidth;
            const topEdge = -imgHeight;
            const rightEdge = bannerWidth;
            const botEdge = bannerHeight;

            if (newLeft < leftEdge + deviation) newLeft = 0;
            if (newLeft > rightEdge - deviation) newLeft = rightEdge - imgWidth;

            if (newTop < topEdge + deviation) newTop = 0;
            if (newTop > botEdge - deviation) newTop = botEdge - imgHeight;

            setPosImg( _ => {
                return {
                    top: newTop + 'px',
                    left: newLeft + 'px'
                };
            });
        }

        const onMouseUp = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            img.classList.remove('drag-img');
        }

        img.classList.add('drag-img');
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="banner" style={{background: bannerBackground}}>
            <div
                className='banner__img'
                style={posImg}
                onDragStart={(e) => handlerMouseDrag(e)}
            >
                {bannerConfig.img && (
                    <img src={bannerConfig.img} alt="banner-img" />
                )}  
            </div>

            {bannerText && (
                <span className="banner__text" style={{color: bannerConfig.textColor}}>
                    {bannerText}
                </span>
            )}
        </div>
    );
};

export default Main;