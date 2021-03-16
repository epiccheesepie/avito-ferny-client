import React from 'react';
import './Text.css';

const Text = ({option}) => {
    const {placeholder, value, onChange} = option;

    return (
        <div className="form__item--small">
            <div className="option">
                <input 
                    className="form__text"
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Text;