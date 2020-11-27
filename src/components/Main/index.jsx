import React from 'react';
import './Main.css';

const conf = {
    background: '',
    img: '',
    text: '',
    link: ''
};

const Main = _ => {

    const [banner, setBanner] = React.useState(conf);
    const handlerChangeText = (title,value) => {
        setBanner( prev => {
            return {
                ...prev,
                [title]: value
            };
        });

        console.log(banner);
    };

    const imgRef = React.useRef();
    const bannerRef = React.useRef();
    React.useEffect( () => {
        const thumb = imgRef.current;
        const slider = bannerRef.current;

        thumb.onmousedown = function(event) {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)
      
            let shiftX = event.clientX - thumb.getBoundingClientRect().left;
            let shiftY = event.clientY - thumb.getBoundingClientRect().top;
            // shiftY здесь не нужен, слайдер двигается только по горизонтали
      
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
      
            function onMouseMove(event) {
              let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
              let newTop = event.clientY - shiftY - slider.getBoundingClientRect().top;
      
              // курсор вышел из слайдера => оставить бегунок в его границах.
              if (newLeft < 0) {
                newLeft = 0;
              }
              let rightEdge = slider.offsetWidth - thumb.offsetWidth;
              if (newLeft > rightEdge) {
                newLeft = rightEdge;
              }

              if (newTop < 0) {
                  newTop = 0;
              }
              let botEdge = slider.offsetHeight - thumb.offsetHeight;
              if (newTop > botEdge) {
                newTop = botEdge;
              }

              thumb.style.left = newLeft + 'px';
              thumb.style.top = newTop + 'px';
            }
      
            function onMouseUp() {
              document.removeEventListener('mouseup', onMouseUp);
              document.removeEventListener('mousemove', onMouseMove);
            }
      
          };
      
          thumb.ondragstart = function() {
            return false;
          };

    }, [imgRef]);

    return (
        <div className="content">
            <div className="left">
                <div className="container">
                    <Header />
                    <Form 
                        banner={banner}
                        onChange={handlerChangeText}
                    />
                </div>
            </div>

            <div className="right">
                <div ref={bannerRef} className="banner">
                    <div ref={imgRef} className="banner__img">
                        {/* <img src="./1.jpg" /> */}
                        {banner.img && (
                            <img src={banner.img} />
                        )}
                    </div>

                    {banner.text && (
                        <span className="banner__text">{banner.text}</span>
                    )}
                </div>
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

const Form = ({banner, onChange}) => {

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
                <span className="form__title" onClick={_ => setOpenBack(prev => !prev)}>
                    Фон
                </span>
                {openBack && (
                <div className="form__container form__container--row">
                    <div className="form__item">
                        <span className="row__title">Цвет</span>
                        <div className="option">
                            <input className="form__color" type="color" />
                        </div>
                    </div>
                    <div className="form__item">
                        <span className="row__title">Градиент</span>
                        <div className="option">
                            <input className="form__color" type="color" />
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div className={`form__item ${openImg ? 'active' : ''}`}>
                <span className="form__title" onClick={_ => setOpenImg(prev => !prev)}>
                    Картинка
                </span>
                {openImg && (
                <div className="form__container form__container--row">
                    <div className="form__item">
                        <div className="option">
                            <input id="file" className="form__file" type="file" accept="image/*,image/jpeg,image/png" onChange={(e) => handlerLoadImg(e)} />
                            <label for="file" className="file-chooser">{fileName}</label>
                        </div>
                    </div>
                    <div className="form__item">
                        <div className="option">
                            <input className="form__text form__text--img" type="text" placeholder="Ссылка..." value={banner.img} onChange={(e) => onChange('img', e.target.value)} />
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
                value={banner.text}
            />
            <Text
                title='link'
                text='Ссылка'
                placeholder='Введите ссылку'
                onChange={onChange}
                value={banner.link}
            />
        </form>
    );
};

const Text = ({title, text, placeholder, onChange, value}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`form__item ${isOpen ? 'active' : ''}`}>
            <span className="form__title" onClick={_ => setIsOpen(prev => !prev)}>
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

export default Main;