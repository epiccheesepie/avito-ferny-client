import React from 'react';
import './File.css';

const File = ({onChange, fileName}) => {

    return (
        <div className="form__item--small">
            <div className="option">
                <label className="button button--small">
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

export default File;