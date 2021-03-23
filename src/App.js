import React from 'react';
import { Form, Banner } from './components';
import { Header } from './ui';
import { isEmpty } from './utils';
import './App.css';

const App = () => {
  const bannerRef = React.useRef();
  const [bannerConfig, setBannerConfig] = React.useState({});

  const [isClear, setIsClear] = React.useState(true);
  const handlerClearConfig = _ => {
      setBannerConfig({});
  };
  React.useEffect(_ => {
    setIsClear(isEmpty(bannerConfig));
  },[bannerConfig]);

  const handlerChangeImg = (img) => {
      handlerChangePosImg({
          top: '0px',
          left: '0px'
      });

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

  const handlerChangePosImg = ({top, left}) => {
      setBannerConfig( prev => {
          return {
              ...prev,
              imgPosition: {top, left}
          }
      });
  };

  const updateHeight = _ => {
    const height = window.innerHeight;
    if (height < 500) {
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
    }
  };
  React.useEffect(_ => {
    updateHeight();
    window.addEventListener('resize', updateHeight);
  }, []);

  return (
      <div className="content">
          <header>
              <div className="container">
                  <Header />
              </div>
          </header>
          <main>
              <div className="left">
                  <div className="container">
                      <Form 
                          bannerConfig={bannerConfig}
                          bannerRef={bannerRef}
                          onChangeValue={handlerChangeValue}
                          onChangeImg={handlerChangeImg}
                          isClear={isClear}
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
                      fontFamily={bannerConfig.fontFamily}
                      img={bannerConfig.img}
                      setConfigPosImg={handlerChangePosImg}
                      imgPosition={bannerConfig.imgPosition}
                      isClear={isClear}
                      onClearConfig={handlerClearConfig}
                      bannerRef={bannerRef}
                  />
              </div>
          </main>
      </div>
  );
}

export default App;
