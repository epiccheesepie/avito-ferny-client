import React from 'react';
import './Form.css';

import { Settinger, Color, File, Gradient, Text } from '../../ui';
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

    return (
        <form className="form">
            <Settinger title='Размер'>
                <Text 
                    placeholder="Высота"
                    value={bannerConfig.height || ''}
                    onChange={onChangeValue('height')}
                />
                <Text 
                    placeholder="Ширина"
                    value={bannerConfig.width || ''}
                    onChange={onChangeValue('width')}
                />
            </Settinger>
            <Settinger title='Фон'>
                <Color 
                    value={backColor}
                    onChange={handlerChangeBackColor}
                />
                <Gradient 
                    onChange={handlerChangeGradient}
                    top={gradient.top}
                    bot={gradient.bot}
                />
            </Settinger>
            <Settinger title='Картинка'>
                <File 
                    onChange={handlerLoadImg}
                    fileName={fileName}
                />
                <Text 
                    placeholder="Ссылка..."
                    value={imgLink}
                    onChange={handlerTextImg}
                />
            </Settinger>
            <Settinger title="Текст">
                <Color 
                    value={bannerConfig.textColor}
                    onChange={onChangeValue('textColor')}
                />
                <Text 
                    placeholder="Введите текст"
                    value={bannerConfig.text || ''}
                    onChange={onChangeValue('text')}
                />
            </Settinger>
            <Settinger title="Ссылка">
                <Text 
                    placeholder="Введите ссылку"
                    value={bannerConfig.link || ''}
                    onChange={onChangeValue('link')}
                />
            </Settinger>
            <Settinger title="Экспорт">
                <Export 
                    bannerConfig={bannerConfig}
                    bannerBlock={bannerRef.current}
                    disabled={isEmpty(bannerConfig)}
                />
            </Settinger>
            {isClear && (
                <div className="form__item clear">
                    <span className="form__title button" onClick={_ => onClear()}>
                        Очистить
                    </span>
                </div>
            )}
        </form>
    );
};

export default Form;