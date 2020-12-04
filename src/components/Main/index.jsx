import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './Main.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import html2canvas from 'html2canvas';

const Main = _ => {

    const bannerRef = React.useRef();
    const [bannerConfig, setBannerConfig] = React.useState({});

    const handlerClearConfig = _ => {
        setBannerConfig({});
    };

    const handlerChangeImg = (file) => {

        const reader = new FileReader();
        reader.onloadend = _ => {
            setBannerConfig( prev => {
                return {
                    ...prev,
                    img: {dataURI: reader.result}
                };
            });
        };
        reader.readAsDataURL(file);
    };

    const handlerChangeText = (title,value) => {
        setBannerConfig( prev => {
            return {
                ...prev,
                [title]: value
            };
        });

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
    };

    return (
        <div className="content">
            <div className="left">
                <PerfectScrollbar>
                    <div className="container">
                        <Header />
                        <Form 
                            bannerConfig={bannerConfig}
                            bannerRef={bannerRef}
                            onChangeText={handlerChangeText}
                            onChangeGradient={handlerChangeGradient}
                            onChangeImg={handlerChangeImg}
                            onClear={handlerClearConfig}
                        />
                    </div>
                </PerfectScrollbar>
            </div>

            <div className="right">
                <Banner 
                    bannerConfig={bannerConfig}
                    bannerRef={bannerRef}
                />
                {/* <div className="preview" style={{marginLeft: '20px', lineHeight: '0'}}>
                    <img src="1.png" />
                </div> */}
            </div>
        </div>
    );
};

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

const Form = ({bannerConfig, bannerRef, onChangeText, onChangeGradient, onChangeImg, onClear}) => {

    const [openBack, setOpenBack] = React.useState(false);
    const [openImg, setOpenImg] = React.useState(false);
    const [openText, setOpenText] = React.useState(false);
    const [openLink, setOpenLink] = React.useState(false);
    const [openExp, setOpenExp] = React.useState(false);
    const [isClear, setIsClear] = React.useState(false);

    React.useEffect(_ => {
        const isEmpty = (obj) => {
            for (let key in obj) {
                return false;
            }
            return true;
        };
        
        (isEmpty(bannerConfig)) ? setIsClear(false) : setIsClear(true);
    },[bannerConfig]);

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
                        onChange={onChangeText}
                    />
                    <div className="form__item--row button button--left button--disabled">
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
                    <File 
                        onChange={onChangeImg}
                    />
                    <Text 
                        placeholder="Ссылка..."
                        value={`${(typeof bannerConfig.img === 'object' || typeof bannerConfig.img === 'undefined') ? '' : bannerConfig.img}`}
                        title="img"
                        onChange={onChangeText}
                    />
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
                        onChange={onChangeText}
                    />
                    <Text 
                        placeholder="Введите текст"
                        value={bannerConfig.text}
                        title="text"
                        onChange={onChangeText}
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
                        onChange={onChangeText}
                    />
                </div>
                )}
            </div>
            <div className={`form__item ${openExp ? 'active' : ''}`}>
                <span className="form__title button" onClick={_ => setOpenExp(prev => !prev)}>
                    Экспорт
                </span>
                {openExp && (
                    <Export 
                        bannerConfig={bannerConfig}
                        bannerBlock={bannerRef.current} 
                    />
                )}
            </div>
            {isClear && (
                <div className="form__item clear">
                    <span className="form__title button" onClick={_ => onClear()}>
                        Очистить
                    </span>
                </div>
            )}
        </form>
    );
};

const File = ({onChange}) => {

    const [fileName, setFileName] = React.useState('Загрузить...');
    const handlerLoadImg = (e) => {
        const loadName = e.target.value.split('\\').pop() || 'Загрузить...';
        if (loadName.length > 16) {
            setFileName(_ => {
                return loadName.substring(0, 16) + '...';
            });
        } else {
            setFileName(loadName);
        }

        const file = e.target.files[0];
        return (file) ? onChange(file) : undefined;
    };

    return (
        <div className="form__item--row">
            <div className="option">
                <label className="button button--center">
                    {fileName}
                    <input
                        className="form__file"
                        type="file"
                        accept="image/*,image/jpeg,image/png"
                        onChange={(e) => handlerLoadImg(e)} 
                    />
                </label>
            </div>
        </div>
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
        <div className="form__item--row">
            <div className="option">
                <input 
                    className="form__text"
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(title, e.target.value)}
                />
            </div>
        </div>
    );
};

const Export = ({bannerConfig, bannerBlock}) => {

    const handlerClickPNG = _ => {
        const namePng = _ => {
            let name = '';
            const symbols = 'abcdefghijklmnopqrstuvwxyz0123456789';

            for (let i=0; i<4; i++) {
                name += symbols.charAt(Math.floor(Math.random() * symbols.length));
            }

            return 'banner_' + name + '.png';
        };
        
        html2canvas(bannerBlock).then(canvasBannerBlock => {

            const nameToDownload = namePng();

            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(canvasBannerBlock.msToBlob(), nameToDownload);
            } else {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.download = nameToDownload;
                a.href = canvasBannerBlock.toDataURL('image/png');
                
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    };

    const handlerClickHTML = _ => {
        
        html2canvas(bannerBlock).then(canvasBannerBlock => {

            const dataURI = canvasBannerBlock.toDataURL('image/png');
            let html;

            if (bannerConfig.link) {
                html = `<a href="${bannerConfig.link}">
                    <img src="${dataURI}" />
                </a>`;
            } else {
                html = `<img src="${dataURI}" />`;
            }

            navigator.clipboard.writeText(html);
            alert('HTML разметка баннера скопирована в буфер обмена');

        });
    };

    const handlerClickJSON = _ => {
        const parse = JSON.stringify(bannerConfig);
        navigator.clipboard.writeText(parse);
        alert('Конфигурация баннера скопирована в буфер обмена');
    };

    const methods = [
        {name: 'PNG', handler: handlerClickPNG},
        {name: 'HTML', handler: handlerClickHTML},
        {name: 'JSON', handler: handlerClickJSON}
    ];
    const renderMethods = methods.map( ({name,handler}) => {
        return (
            <div key={name} className="form__item--row">
                <input
                    className="button button--center"
                    type="button"
                    value={name}
                    onClick={handler}
                />
            </div>
        );
    });

    return (
        <div className="form__container">
            {renderMethods}
        </div>
    );
};


const Banner = ({bannerConfig, bannerRef}) => {

    const [bannerImg, setBannerImg] = React.useState(''); //рендер изображения
    React.useEffect(_ => {
        const { img } = bannerConfig;

        let bannerImg;
        (typeof img === 'object') ? bannerImg = img.dataURI : bannerImg = img;
        setBannerImg(bannerImg);
        setPosImg({
            top: '0px',
            left: '0px'
        });
    }, [bannerConfig.img]);

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
        <div className="banner-container">
            <div ref={bannerRef} className="banner" style={{background: bannerBackground}}>
                {bannerConfig.img && (
                    <div
                        className='banner__img'
                        style={posImg}
                        onDragStart={(e) => handlerMouseDrag(e)}
                    >
                        <img src={bannerImg} alt="banner-img" /> 
                    </div>
                )}

                {bannerConfig.text && (
                    <span className="banner__text" style={{color: bannerConfig.textColor}}>
                        {bannerConfig.text}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Main;