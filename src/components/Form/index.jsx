import React from 'react';
import './Form.css';

import { Settinger, Color, File, Gradient, Text, FontFamily } from '../../ui';
import { Export } from '..';
import { isEmpty } from '../../utils';

const Form = ({bannerConfig, bannerRef, onChangeValue, onChangeImg, onClear}) => {

    const defaultFileName = 'Загрузить...'; 
    const defaultGradient = {top: null, bot: null};
    const defaultBackColor = null;

    const [isClear, setIsClear] = React.useState(false);
    React.useEffect(_ => {
        setIsClear(!isEmpty(bannerConfig));

    },[bannerConfig]);
    React.useEffect(_ => {
        if (!isClear) {
            setImgLink('');
            setFileName(defaultFileName);
            setGradient(defaultGradient);
            setBackColor(defaultBackColor);
        }
    },[isClear]);

    const [imgLink, setImgLink] = React.useState('');
    const handlerTextImg = (link) => {
        setImgLink(link);
        onChangeImg(link);

        setFileName(defaultFileName);
    };

    const [fileName, setFileName] = React.useState(defaultFileName);
    const handlerLoadImg = (e) => {

        const file = e.target.files[0];
        const loadName = file.name;

        if (loadName.length > 15) {
            setFileName(loadName.substring(0, 15) + '...');
        } else {
            setFileName(loadName);
        }

        onChangeImg(file);

        e.target.value = ''; //сброс value для срабатывания onChange на тот же файл
        setImgLink('');
    };

    const [gradient, setGradient] = React.useState(defaultGradient);
    const handlerChangeGradient = (e) => {
        const { name, value } = e.target;
        setGradient( prev => {
            return {
                ...prev,
                [name]: value
            };
        });
        
        if (gradient.top && gradient.bot) {
            const linearGradient = `linear-gradient(${gradient.top},${gradient.bot})`;
            onChangeValue('background')(linearGradient);

            setBackColor(defaultBackColor);
        }
    };

    const [backColor, setBackColor] = React.useState(defaultBackColor);
    const handlerChangeBackColor = (value) => {
        setBackColor(value);
        onChangeValue('background')(value);

        setGradient(defaultGradient);
    };
    
    const [activeItem, setActiveItem] = React.useState(null); //активный сеттингер на данный момент
    const handlerClickActive = (index) => _ => {
        setActiveItem(index);
    };
    const menu = [ //объектная модель основного меню
        {
            title: 'Размер',
            properties: [
                {
                    Ui: Text,
                    option: {
                        placeholder: 'Высота',
                        value: bannerConfig.height || '',
                        onChange: onChangeValue('height')
                    }
                },
                {
                    Ui: Text,
                    option: {
                        placeholder: 'Ширина',
                        value: bannerConfig.width || '',
                        onChange: onChangeValue('width')
                    }
                }
            ]
        },
        {
            title: 'Фон',
            col: true,
            properties: [
                {
                    Ui: Color,
                    option: {
                        value: backColor,
                        onChange: handlerChangeBackColor
                    }
                },
                {
                    Ui: Gradient,
                    option: {
                        onChange: handlerChangeGradient,
                        top: gradient.top,
                        bot: gradient.bot
                    }
                }
            ]
        },
        {
            title: 'Картинка',
            col: true,
            properties: [
                {
                    Ui: File,
                    option: {
                        fileName: fileName,
                        onChange: handlerLoadImg
                    }
                },
                {
                    Ui: Text,
                    option: {
                        placeholder: 'Ссылка на картинку...',
                        value: imgLink,
                        onChange: handlerTextImg
                    }
                }
            ]
        },
        {
            title: 'Текст',
            col: true,
            properties: [
                {
                    Ui: Text,
                    option: {
                        placeholder: 'Введите текст...',
                        value: bannerConfig.text || '',
                        onChange: onChangeValue('text')
                    }
                },
                {
                    Ui: Color,
                    option: {
                        value: bannerConfig.textColor,
                        onChange: onChangeValue('textColor')
                    }
                },
                {
                    Ui: FontFamily,
                    option: {
                        value: bannerConfig.fontFamily,
                        handler: onChangeValue('fontFamily')
                    }
                }
            ]
        },
        {
            title: 'Ссылка',
            col: true,
            properties: [
                {
                    Ui: Text,
                    option: {
                        placeholder: 'Ссылка баннера...',
                        value: bannerConfig.link || '',
                        onChange: onChangeValue('link')
                    }
                }
            ]
        },
        {
            title: 'Экспорт',
            col: true,
            properties: [
                {
                    Ui: Export,
                    option: {
                        bannerConfig: bannerConfig,
                        bannerBlock: bannerRef.current,
                        disabled: isEmpty(bannerConfig)
                    }
                }
            ]
        }
    ];

    return (
        <form className="form">
            {
                menu.map(({title, col, properties}, index) => {
                    return (
                        <Settinger 
                            key={title} 
                            title={title} 
                            col={col}
                            active={activeItem === index}
                            onClick={handlerClickActive(index)}
                        >
                            {properties.map(({Ui, option}, index) => {
                                return (
                                    <Ui key={Ui.constructor.name + index} option={option} />
                                );
                            })}
                        </Settinger>
                    );
                })
            }
            {isClear && (
                <div className="form__item clear">
                    <span className="button" onClick={_ => onClear()}>
                        <div className="form__title">
                            Очистить
                        </div>
                    </span>
                </div>
            )}
        </form>
    );
};

export default Form;