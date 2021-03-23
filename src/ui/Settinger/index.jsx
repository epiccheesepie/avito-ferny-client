import React from 'react';

const Settinger = ({title, row, Icon, active, onClick, children}) => {

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
                    <Icon />
                </div>
                <div className="form__title form__arrow">
                    {title}
                </div>
            </span>
            {isOpen && (
                <div className={`${row ? 'form__container row' : 'form__container'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Settinger;