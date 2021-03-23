import React from 'react';
import './Color.css';

const Color = ({value, onChange}) => {

    return (
        <label className="form__item--small button button--small">
            <span className="form__title--small">Цвет</span>
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