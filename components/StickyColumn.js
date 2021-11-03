import { useEffect, useRef, useState } from 'react';
import StickyBox from 'react-sticky-box';
const StickyColumn = ({ offsetTop = 120, offsetBottom = 20, children }) => {
    const obref = useRef();
    const [ready, setready] = useState();
    useEffect(() => {
        if (!obref.current) {
            return;
        }
        let observer;
        let handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setready(true);
                } else {
                    setready(false);
                }
            });
        };
        function createObserver(element) {
            let options = {
                root: null,
                rootMargin: '0px'
            };
            observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(element);
        }
        createObserver(obref.current);
        return () => {
            obref.current && observer.unobserve(obref.current);
            setready(false);
        };
    }, []);
    return (
        <>
            <div
                ref={obref}
                className="opacity-0 w-3 h-3 fixed top-5 left-5 pointer-events-none hidden lg:block"></div>
            {ready ? (
                <StickyBox offsetTop={offsetTop} offsetBottom={offsetBottom}>
                    {children}
                </StickyBox>
            ) : (
                children
            )}
        </>
    );
};

export default StickyColumn;
