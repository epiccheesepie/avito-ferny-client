import React from 'react';

const Settinger = ({title, children}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`form__item ${isOpen ? 'active' : ''}`}>
            <span className="form__title button" onClick={_ => setIsOpen(prev => !prev)}>
                {title}
            </span>
            {isOpen && (
            <div className="form__container">
                {children}
            </div>
            )}
        </div>
    );
};

export default Settinger;