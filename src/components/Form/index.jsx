import React from 'react';
import './Form.css';

import { Settinger, Color, File, Gradient, Text, FontFamily, Export } from '../../ui';

const defaultFileName = 'Загрузить...'; 
const defaultLinkImg = '';
const defaultGradient = {};
const defaultBackColor = null;

const Form = ({bannerConfig, bannerRef, onChangeValue, onChangeImg, isClear}) => {

    React.useEffect(() => {
        if (isClear) {
            setFileName(defaultFileName);
            setGradient(defaultGradient);
            setImgLink(defaultLinkImg);
            setBackColor(defaultBackColor);
        }
    },[isClear]);

    const [imgLink, setImgLink] = React.useState(defaultLinkImg);
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
        setImgLink(defaultLinkImg);
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
            row: true,
            Icon: SvgSize, 
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
            Icon: SvgBackground,
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
            Icon: SvgImg,
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
            Icon: SvgText,
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
            Icon: SvgLink,
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
            Icon: SvgExport,
            properties: [
                {
                    Ui: Export,
                    option: {
                        bannerConfig: bannerConfig,
                        bannerBlock: bannerRef.current
                    }
                }
            ]
        }
    ];

    return (
        <form className="form">
            {
                menu.map(({title, row, Icon, properties}, index) => {
                    return (
                        <Settinger 
                            key={title} 
                            title={title} 
                            row={row || false}
                            active={activeItem === index}
                            onClick={handlerClickActive(index)}
                            Icon={Icon}
                        >
                            {properties.map(({Ui, option}, index) => {
                                return (
                                    <Ui key={Ui.constructor.name + index} {...option} />
                                );
                            })}
                        </Settinger>
                    );
                })
            }
        </form>
    );
};

function SvgBackground() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: "24px", height: "24px"}} viewBox="0 0 24 24">
            <path d="M4.03 21.03a.75.75 0 0 1-1.06-1.06l17-17a.75.75 0 0 1 1.06 1.06l-17 17zm4.5.5a.75.75 0 0 1-1.06-1.06l13-13a.75.75 0 0 1 1.06 1.06l-13 13zm5 0a.75.75 0 0 1-1.06-1.06l8-8a.75.75 0 0 1 1.06 1.06l-8 8zm5.5-.5a.75.75 0 0 1-1.06-1.06l2-2a.75.75 0 0 1 1.06 1.06l-2 2zm-15.5-4.5a.75.75 0 0 1-1.06-1.06l13-13a.75.75 0 0 1 1.06 1.06l-13 13zm0-5a.75.75 0 0 1-1.06-1.06l8-8a.75.75 0 0 1 1.06 1.06l-8 8zm.5-5.5a.75.75 0 0 1-1.06-1.06l2-2a.75.75 0 0 1 1.06 1.06l-2 2z" fill="currentColor"></path>
        </svg>
    );
};

function SvgText() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: "24px", height: "24px"}} viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M18 5.5h-5.25V18c0 .28.22.5.5.5h2a.75.75 0 1 1 0 1.5h-6.5a.75.75 0 1 1 0-1.5h2a.5.5 0 0 0 .5-.5V5.5H6a.5.5 0 0 0-.5.5v1.25a.75.75 0 0 1-1.5 0V5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v1.75a.75.75 0 1 1-1.5 0V6a.5.5 0 0 0-.5-.5z"></path>
        </svg>
    );
};

function SvgImg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: "24px", height: "24px"}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 1.5a.5.5 0 0 0-.5.5v14c0 .28.22.5.5.5h14a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5zm5.75 10.1l3.05-4.15a2 2 0 0 1 3.22-.01L21 15.78V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-.09l3.82-5.25a2 2 0 0 1 3.22 0l.7.95zm3.6 4.9H19a.5.5 0 0 0 .5-.5v-2.72l-3.69-4.94a.5.5 0 0 0-.8 0l-3.33 4.53 2.68 3.63zm-5.51-4.96a.5.5 0 0 0-.81 0l-3.44 4.74a.5.5 0 0 0 .41.22h7.5l-3.66-4.96zM8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
        </svg>
    );
};

function SvgExport() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: "24px", height: "24px"}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.75 13.81v7.44a.75.75 0 1 1-1.5 0v-7.4L9.49 15.6a.75.75 0 1 1-1.06-1.06l2.35-2.36c.68-.68 1.8-.68 2.48 0l2.35 2.36a.75.75 0 1 1-1.06 1.06l-1.8-1.8zM9 18v1.5H6.75v-.01A5.63 5.63 0 0 1 5.01 8.66a6 6 0 0 1 11.94-.4 5.63 5.63 0 0 1 .3 11.23v.01H15V18h1.88a4.12 4.12 0 1 0-1.5-7.97A4.51 4.51 0 0 0 11 4.5a4.5 4.5 0 0 0-4.43 5.29 4.13 4.13 0 0 0 .68 8.2V18H9z"></path>
        </svg>
    );
};

function SvgSize() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: "24px", height: "24px"}} viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M19.5 10V5a.5.5 0 0 0-.5-.5h-4.5V10h5zm0 1.5h-5v8H19a.5.5 0 0 0 .5-.5v-7.5zm-6.5-7H5a.5.5 0 0 0-.5.5v14c0 .28.22.5.5.5h8v-15zM5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2z"></path>
        </svg>
    );
};

function SvgLink() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: "24px", height: "24px"}} viewBox="0 0 24 24">
            <path d="M21,11c0,6.708-4.282,6.437-4.826,6.437c-0.616,0-1.147-0.133-1.595-0.397c-0.448-0.265-0.786-0.645-1.016-1.139 c-0.358,0.501-0.775,0.877-1.252,1.128c-0.476,0.251-0.993,0.376-1.552,0.376c-0.522,0-0.99-0.114-1.401-0.344 c-0.412-0.229-0.754-0.553-1.026-0.973c-0.272-0.418-0.466-0.924-0.58-1.514c-0.114-0.592-0.136-1.252-0.064-1.982 c0.101-0.917,0.299-1.746,0.597-2.487C8.581,9.364,8.95,8.732,9.39,8.209C9.831,7.687,10.332,7.284,10.893,7 c0.563-0.283,1.159-0.424,1.789-0.424c2.026,0,3.083,1.021,3.298,1.171l-0.548,6.209c-0.043,0.358-0.203,1.751,1.128,1.751 C16.911,15.707,19,15.25,19,11c0-0.133,0.917-7-6.575-7C6.271,4,5,9.896,5,12c0,8.388,5.312,8,7,8c2.021,0,3.053-0.426,3.282-0.533 l0.447,1.825C15.478,21.457,14.479,22,12,22c-3.063,0-9-0.146-9-10c0-1.362,0.75-10,9.468-10C20.812,2,21,9.563,21,11z M10.072,12.592c-0.079,0.945,0.004,1.663,0.247,2.154c0.243,0.49,0.638,0.735,1.182,0.735c1.103,0,1.654-1.436,1.783-1.794 l0.451-5.081c-0.129-0.043-0.702-0.14-0.859-0.14c-0.823,0-1.463,0.351-1.918,1.053C10.504,10.222,10.208,11.246,10.072,12.592z"/>
        </svg>
    );
}

export default Form;