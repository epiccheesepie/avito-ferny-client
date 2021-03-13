import React from 'react';
import './Banner.css';

const Banner = ({background, height, width, text, textColor, img, bannerRef}) => {

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
        e.preventDefault(); //для moz
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

    const style = {
        background,
        height: `${height ? height+'px' : '376px'}`,
        width: `${width ? width+'px' : '282px'}`
    };

    return (
        <div className="banner-container">
            <div ref={bannerRef} className="banner" style={style}>
                {img && (
                    <div
                        className={`banner__img ${isDragable ? 'img--dragging' : ''}`}
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

export default Banner;