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

    const handlerChangeImg = (img) => {

        if (typeof img === 'string') {
            setBannerConfig( prev => {
                return {
                    ...prev,
                    img
                };
            });
        } else if (typeof img === 'object') {
            const reader = new FileReader();
            reader.onloadend = _ => {
                setBannerConfig( prev => {
                    return {
                        ...prev,
                        img: reader.result
                    };
                });
            };
            reader.readAsDataURL(img);
        }
    };

    const handlerChangeText = (value,title) => {
        setBannerConfig( prev => {
            return {
                ...prev,
                [title]: value
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
                            onChangeImg={handlerChangeImg}
                            onClear={handlerClearConfig}
                        />
                    </div>
                </PerfectScrollbar>
            </div>

            <div className="right">
                <Banner
                    background={bannerConfig.background}
                    text={bannerConfig.text}
                    textColor={bannerConfig.textColor}
                    img={bannerConfig.img}
                    bannerRef={bannerRef}
                />
                <div className="preview" style={{marginLeft: '20px', lineHeight: '0'}}>
                    <img src="1.png" />
                </div>
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

const Filter = ({title, children}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`form__item ${isOpen ? 'active' : ''}`}>
            <span className="form__title button" onClick={_ => setIsOpen(prev => !prev)}>
                {title}
            </span>
            {isOpen && (
            <div className="form__container">
                {children}
            </div>
            )}
        </div>
    );
};

const Form = ({bannerConfig, bannerRef, onChangeText, onChangeImg, onClear}) => {

    const [isClear, setIsClear] = React.useState(false);
    React.useEffect(_ => {
        const isEmpty = (obj) => Object.keys(obj).length === 0;
        setIsClear(!isEmpty(bannerConfig));

    },[bannerConfig]);

    const [imgLink, setImgLink] = React.useState('');
    const handlerTextImg = (text) => {
        setImgLink(text);
        setFileName('Загрузить...')
        onChangeImg(text);
    };

    const [fileName, setFileName] = React.useState('Загрузить...');
    const handlerLoadImg = (e) => {
        const loadName = e.target.value.split('\\').pop() || 'Загрузить...';
        if (loadName.length > 16) {
            setFileName(loadName.substring(0, 16) + '...');
        } else {
            setFileName(loadName);
        }

        setImgLink('');

        const file = e.target.files[0];
        return (file) ? onChangeImg(file) : undefined;
    };

    const [gradient, setGradient] = React.useState({
        top: '',
        bot: ''
    });
    const handlerChangeGradient = (e) => {
        const { name, value } = e.target;
        setGradient( prev => {
            return {
                ...prev,
                [name]: value
            };
        });
        
        if (gradient.top && gradient.bot) {
            const linearGradient = `linear-gradient(${gradient.top},${gradient.bot})`;
            onChangeText(linearGradient, 'background');
        }
    };
    

    return (
        <form className="form">
            <Filter title='Фон'>
                <Color 
                    value={bannerConfig.background}
                    title='background'
                    onChange={onChangeText}
                />
                <Gradient 
                    onChange={handlerChangeGradient}
                    top={gradient.top}
                    bot={gradient.bot}
                />
            </Filter>
            <Filter title='Картинка'>
                <File 
                    onChange={handlerLoadImg}
                    fileName={fileName}
                />
                <Text 
                    placeholder="Ссылка..."
                    value={imgLink}
                    title="img"
                    onChange={handlerTextImg}
                />
            </Filter>
            <Filter title="Текст">
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
            </Filter>
            <Filter title="Ссылка">
                <Text 
                    placeholder="Введите ссылку"
                    value={bannerConfig.link}
                    title="link"
                    onChange={onChangeText}
                />
            </Filter>
            <Filter title="Экспорт">
                <Export 
                    bannerConfig={bannerConfig}
                    bannerBlock={bannerRef.current} 
                />
            </Filter>
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

const File = ({onChange, fileName}) => {

    return (
        <div className="form__item--row">
            <div className="option">
                <label className="button button--center">
                    {fileName}
                    <input
                        className="form__file"
                        type="file"
                        accept="image/*,image/jpeg,image/png"
                        onChange={(e) => onChange(e)} 
                    />
                </label>
            </div>
        </div>
    );
};

const Gradient = ({onChange, top, bot}) => {

    return (
        <div className="form__item--row button button--left button--disabled">
            <span className="row-title">Градиент</span>
            <div className="option">
                <div className="left-color">
                    <input 
                        className="form__color"
                        type="color"
                        name="top"
                        value={top}
                        onChange={(e) => onChange(e)} 
                    />
                </div>
                <div className="right-color">
                    <input
                        className="form__color"
                        type="color"
                        name="bot"
                        value={bot}
                        onChange={(e) => onChange(e)}
                    />
                </div>
            </div>
        </div>
    );
};

const Color = ({value, title, onChange}) => {

    return (
        <label className="form__item--row button button--left">
            <span className="row-title">Цвет</span>
            <div className="option">
                <input className="form__color"
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value, title)}
                />
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
                    onChange={(e) => onChange(e.target.value, title)}
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

    return (
        <React.Fragment>
            {methods.map(({name, handler}) => {
                return (
                    <ButtonExport
                        key={name}
                        name={name}
                        onClick={handler}
                    />
                );
            })}
        </React.Fragment>
    );
};

const ButtonExport = ({name,onClick}) => {

    return (
        <div className="form__item--row">
            <input
                className="button button--center"
                type="button"
                value={name}
                onClick={onClick}
            />
        </div>
    );
};


const Banner = ({background, text, textColor, img, bannerRef}) => {

    React.useEffect(_ => {
        setPosImg({
            top: '0px',
            left: '0px'
        });
    }, [img]);

    const [posImg, setPosImg] = React.useState({
        top: '0px',
        left: '0px'
    });

    const [isDragable, setIsDragable] = React.useState(false);

    const handlerMouseDrag = (e) => {
        e.preventDefault();
        setIsDragable(true);

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
            setIsDragable(false);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="banner-container">
            <div ref={bannerRef} className="banner" style={{background}}>
                {img && (
                    <div
                        className={`banner__img ${isDragable ? 'drag-img' : ''}`}
                        style={posImg}
                        onDragStart={(e) => handlerMouseDrag(e)}
                    >
                        <img src={img} alt="banner-img" /> 
                    </div>
                )}

                {text && (
                    <span className="banner__text" style={{color: textColor}}>
                        {text}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Main;