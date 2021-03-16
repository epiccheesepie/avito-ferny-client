import React from 'react';

const Gradient = ({option}) => {
    const {onChange, top, bot} = option;

    return (
        <div className="form__item--small button button--left button--disabled">
            <span className="small-title">Градиент</span>
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