import React from 'react';
import './Banner.css';
import useDrag from '../../hooks/useDrag';

const Banner = ({
    background, height, width, text, textColor, fontFamily, img, 
    setConfigPosImg, imgPosition, 
    bannerRef,
    isClear, onClearConfig
}) => {

    const { isDragable, handlerMouseDrag } = useDrag(setConfigPosImg);

    const styleBanner = {
        background,
        height: `${height ? height+'px' : '376px'}`,
        width: `${width ? width+'px' : '282px'}`
    };
    const styleText = {
        color: textColor,
        fontFamily
    };

    return (
        <div className="banner-container">
            <div className="banner-option">
                <div ref={bannerRef} className="banner" style={styleBanner}>
                    {img && (
                        <div
                            className={`banner__img ${isDragable ? 'img--dragging' : ''}`}
                            style={imgPosition}
                            onDragStart={(e) => handlerMouseDrag(e)}
                        >
                            <img src={img} alt="banner-img" /> 
                        </div>
                    )}

                    {text && (
                        <span className="banner__text" style={styleText}>
                            {text}
                        </span>
                    )}
                </div>
            </div>
            {!isClear && (
            <div className="banner-clear">
                <button onClick={onClearConfig}>Очистить</button>
            </div>
            )}
        </div>
    );
};

export default Banner;