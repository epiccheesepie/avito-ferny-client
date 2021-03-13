import React from 'react';
import './Main.css';
import { Form, Banner } from '..';

const Main = _ => {

    const bannerRef = React.useRef();
    const [bannerConfig, setBannerConfig] = React.useState({});

    const handlerClearConfig = _ => {
        setBannerConfig({});

        console.log(bannerConfig);
    };

    const handlerChangeImg = (img) => {

        if (typeof img === 'string') {
            setBannerConfig( prev => {
                return {
                    ...prev,
                    img
                };
            });
        } else if (typeof img === 'object') {
            const reader = new FileReader();
            reader.onloadend = _ => {
                setBannerConfig( prev => {
                    return {
                        ...prev,
                        img: reader.result
                    };
                });
            };
            reader.readAsDataURL(img);
        }
    };

    const handlerChangeValue = (title) => (value) => {
        setBannerConfig( prev => {
            return {
                ...prev,
                [title]: value
            };
        });

    };

    return (
        <div className="content">
            <div className="left">
                <div className="container">
                    <Form 
                        bannerConfig={bannerConfig}
                        bannerRef={bannerRef}
                        onChangeValue={handlerChangeValue}
                        onChangeImg={handlerChangeImg}
                        onClear={handlerClearConfig}
                    />
                </div>
            </div>

            <div className="right">
                <Banner
                    height={bannerConfig.height}
                    width={bannerConfig.width}
                    background={bannerConfig.background}
                    text={bannerConfig.text}
                    textColor={bannerConfig.textColor}
                    img={bannerConfig.img}
                    bannerRef={bannerRef}
                />
            </div>
        </div>
    );
};

export default Main;