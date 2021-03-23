import { useState } from 'react'; 

const useDrag = (setPos) => {

    const [isDragable, setIsDragable] = useState(false);

    const handlerMouseDrag = (e) => {
        e.preventDefault(); //для moz
        setIsDragable(true);

        const img = e.currentTarget;
        const banner = img.parentNode;
        const left = e.clientX - img.getBoundingClientRect().left;
        const top = e.clientY - img.getBoundingClientRect().top;

        const onMouseMove = (e) => { 
            let newLeft = e.clientX - left - banner.getBoundingClientRect().left;
            let newTop = e.clientY - top - banner.getBoundingClientRect().top;

            const deviation = 10; //погрешность заступа за блок баннера
            const imgWidth = img.offsetWidth; //ширина изображения
            const imgHeight = img.offsetHeight; //высота изображения
            const bannerWidth = banner.offsetWidth; //ширина баннера
            const bannerHeight = banner.offsetHeight; //высота баннера

            const leftEdge = -imgWidth;
            const topEdge = -imgHeight;
            const rightEdge = bannerWidth;
            const botEdge = bannerHeight;

            if (newLeft < leftEdge + deviation) newLeft = 0;
            if (newLeft > rightEdge - deviation) newLeft = rightEdge - imgWidth;

            if (newTop < topEdge + deviation) newTop = 0;
            if (newTop > botEdge - deviation) newTop = botEdge - imgHeight;

            setPos({
                top: newTop + 'px',
                left: newLeft + 'px'
            });
        }

        const onMouseUp = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            setIsDragable(false);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return {
        isDragable,
        handlerMouseDrag
    };
};

export default useDrag;