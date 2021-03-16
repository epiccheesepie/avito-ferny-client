import React from 'react';
import html2canvas from 'html2canvas';

import { namePng } from '../../utils';

const Export = ({option}) => {
    const {bannerConfig, bannerBlock, disabled} = option;

    const handlerClickPNG = _ => {
    
        html2canvas(bannerBlock).then(canvasBannerBlock => {

            const nameToDownload = namePng();

            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(canvasBannerBlock.msToBlob(), nameToDownload);
            } else {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.download = nameToDownload;
                a.href = canvasBannerBlock.toDataURL('image/png');
                
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    };

    const handlerClickHTML = _ => {
        
        html2canvas(bannerBlock).then(canvasBannerBlock => {

            const dataURI = canvasBannerBlock.toDataURL('image/png');
            let html;

            if (bannerConfig.link) {
                html = `<a href="${bannerConfig.link}">
                    <img src="${dataURI}" />
                </a>`;
            } else {
                html = `<img src="${dataURI}" />`;
            }

            navigator.clipboard.writeText(html);
            alert('HTML разметка баннера скопирована в буфер обмена');

        });
    };

    const handlerClickJSON = _ => {
        const parse = JSON.stringify(bannerConfig);
        navigator.clipboard.writeText(parse);
        alert('Конфигурация баннера скопирована в буфер обмена');
    };

    const methods = [
        {value: 'PNG', handler: handlerClickPNG},
        {value: 'HTML', handler: handlerClickHTML},
        {value: 'JSON', handler: handlerClickJSON}
    ];
    const renderMethods = methods.map(({value, handler}) => {
        return (
            <ButtonExport 
                key={value}
                value={value}
                onClick={handler}
                disabled={disabled}
            />
        );
    });

    return (
        <React.Fragment>
            {renderMethods}
        </React.Fragment>
    );
};

const ButtonExport = ({value,onClick,disabled}) => {

    return (
        <div className="form__item--small">
            <input
                className={`button button--center ${disabled ? 'button--disabled' : ''}`}
                type="button"
                value={value}
                onClick={onClick}
                disabled={disabled}
            />
        </div>
    );
};

export default Export;