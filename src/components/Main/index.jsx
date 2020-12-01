import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './Main.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

const conf = {
    background: '',
    img: '',
    text: '',
    link: ''
};

const Main = _ => {

    const [bannerConfig, setBannerConfig] = React.useState(conf);

    const handlerChangeText = (title,value) => {
        setBannerConfig( prev => {
            return {
                ...prev,
                [title]: value
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

const Form = ({bannerConfig, onChange}) => {

    const [openBack, setOpenBack] = React.useState(false);
    const [openImg, setOpenImg] = React.useState(false);

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

    return (
        <form className="form">
            <div className={`form__item ${openBack ? 'active' : ''}`}>
                <span className="form__title button" onClick={_ => setOpenBack(prev => !prev)}>
                    Фон
                </span>
                {openBack && (
                <div className="form__container form__container--row">
                    <label className="form__item button form__item--color">
                        <span className="row__title">Цвет</span>
                        <div className="option">
                            <input className="form__color" type="color" value={bannerConfig.background  } onChange={(e) => onChange('background', e.target.value)} />
                        </div>
                    </label>
                    <div className="form__item button form__item--color">
                        <span className="row__title">Градиент</span>
                        <div className="option">
                            <div className="left-color">
                                <input className="form__color form__gradient" type="color" />
                            </div>
                            <div className="right-color">
                                <input className="form__color form__gradient" type="color" />
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
                <div className="form__container form__container--row">
                    <div className="form__item">
                        <div className="option">
                            <input id="file" className="form__file" type="file" accept="image/*,image/jpeg,image/png" onChange={(e) => handlerLoadImg(e)} />
                            <label for="file" className="button--file button">{fileName}</label>
                        </div>
                    </div>
                    <div className="form__item">
                        <div className="option">
                            <input className="form__text form__text--img" type="text" placeholder="Ссылка..." value={bannerConfig.img} onChange={(e) => onChange('img', e.target.value)} />
                        </div>
                    </div>
                </div>
                )}
            </div>
            <Text
                title='text'
                text='Текст'
                placeholder='Введите текст'
                onChange={onChange}
                value={bannerConfig.text}
            />
            <Text
                title='link'
                text='Ссылка'
                placeholder='Введите ссылку'
                onChange={onChange}
                value={bannerConfig.link}
            />
        </form>
    );
};

const Text = ({title, text, placeholder, onChange, value}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`form__item ${isOpen ? 'active' : ''}`}>
            <span className="form__title button" onClick={_ => setIsOpen(prev => !prev)}>
                {text}
            </span>
            {isOpen && (
            <div className="form__container">
                <div className="option">
                    <input className="form__text" type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(title, e.target.value)} />
                </div>
            </div>
            )}
        </div>
    );
};

 const Banner = ({bannerConfig}) => {

    React.useEffect(_ => {
        const decorationText = (text) => {
            while (text.length > 30) {
                let words = text.split(' ');
                words.pop();
                text = words.join(' ') + '...';
            }
    
            return text;
        };

        const span = document.querySelector('.banner__text');
        if (span) span.textContent = decorationText(bannerConfig.text);

    },[bannerConfig.text]);

    const imgRef = React.useRef();
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
        <div className="banner" style={{backgroundColor: bannerConfig.background}}>
            <div
                className='banner__img'
                style={posImg}
                onDragStart={(e) => handlerMouseDrag(e)}
            >
                {bannerConfig.img && (
                    <img src={bannerConfig.img} />
                )}  
            </div>

            {bannerConfig.text && (
                <span className="banner__text"></span>
            )}
        </div>
    );
 };

export default Main;