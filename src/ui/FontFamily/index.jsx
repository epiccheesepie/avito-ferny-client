import React from 'react';
import './FontFamily.css';

const fonts = [
    'Roboto', 
    'Helvetica Neue', 
    'Fira Sans Condensed', 
    'Montserrat'
];

const FontFamily = ({handler, value}) => {

    const [open, setOpen] = React.useState(false);
    const handlerClickOpen = _ => {
        setOpen(prev => !prev);
    };

    const handlerClickOption = (font) => {
        handler(font);
    };

    return (
        <label className="form__item--small button button--small" onClick={handlerClickOpen}>
            <span className="form__title--small form__arrow--small">{(value || 'Шрифт')}</span>
            {open && (
            <div className="form__select">
                {fonts.map(font => {
                    return (
                        <div key={font} className="form__option" onClick={_ => handlerClickOption(font)}>
                            {font}
                        </div>
                    );
                })}
            </div>
            )}
        </label>
    );
};

export default FontFamily;