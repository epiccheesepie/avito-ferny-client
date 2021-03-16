import React from 'react';
import './Color.css';

const Color = ({option}) => {
    const {value, onChange} = option;

    return (
        <label className="form__item--small button button--left">
            <span className="small-title">Цвет</span>
            <div className="option">
                <input className="form__color"
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </label>
    );
};

export default Color;