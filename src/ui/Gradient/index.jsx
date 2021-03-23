import React from 'react';

const Gradient = ({onChange, top, bot}) => {

    return (
        <div className="form__item--small button button--small button--disabled">
            <span className="form__title--small">Градиент</span>
            <div className="option">
                <div className="left-color">
                    <input 
                        className="form__color"
                        type="color"
                        name="top"
                        value={top || '#000000'}
                        onChange={(e) => onChange(e)} 
                    />
                </div>
                <div className="right-color">
                    <input
                        className="form__color"
                        type="color"
                        name="bot"
                        value={bot || '#000000'}
                        onChange={(e) => onChange(e)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Gradient;