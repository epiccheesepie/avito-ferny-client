import React from 'react';

const Settinger = ({title, col, active, onClick, children}) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const handlerOpen = _ => {
        onClick();
        setIsOpen(prev => !prev);
    };
    React.useEffect(() => {
        if (active) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    },[active]);

    return (
        <div className={`form__item ${isOpen ? 'active' : ''}`}>
            <span className="button" onClick={handlerOpen}>
                <div className="icon">

                </div>
                <div className="form__title form__arrow">
                    {title}
                </div>
            </span>
            {isOpen && (
                <div className={`${col ? 'form__container column' : 'form__container'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Settinger;