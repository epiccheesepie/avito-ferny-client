import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import './Main.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { Form, Banner } from '..';
import { Header } from '../../ui';

const Main = _ => {

    const bannerRef = React.useRef();
    const bannerTextRef = React.useRef();
    const [bannerConfig, setBannerConfig] = React.useState({});

    const handlerClearConfig = _ => {
        setBannerConfig({});
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

    const handlerChangeValue = (title,value) => {
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
                <PerfectScrollbar>
                    <div className="container">
                        <Header />
                        <Form 
                            bannerConfig={bannerConfig}
                            bannerRef={bannerRef}
                            bannerTextRef={bannerTextRef}
                            onChangeValue={handlerChangeValue}
                            onChangeImg={handlerChangeImg}
                            onClear={handlerClearConfig}
                        />
                    </div>
                </PerfectScrollbar>
            </div>

            <div className="right">
                <Banner
                    background={bannerConfig.background}
                    text={bannerConfig.text}
                    textColor={bannerConfig.textColor}
                    img={bannerConfig.img}
                    bannerRef={bannerRef}
                    bannerTextRef={bannerTextRef}
                />
            </div>
        </div>
    );
};

export default Main;