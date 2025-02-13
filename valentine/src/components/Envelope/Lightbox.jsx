import React, { useEffect, useRef } from 'react';

const Lightbox = ({ src, onClose, caption }) => {
    const boxRef = useRef(null);

    useEffect(() => {
        if (src && document.startViewTransition) {
            boxRef.current.style.viewTransitionName = 'active-lightbox-image';
        }

        return () => {
            if (document.startViewTransition) {
                boxRef.current?.style.removeProperty('view-transition-name');
            }
        };
    }, [src]);

    return src ? (
        <div className="lightbox-backdrop" onClick={onClose}>
            <img
                ref={boxRef}
                src={src}
                alt="Gift"
                className="lightbox-image"
                style={{
                    viewTransitionName: 'active-lightbox-image',
                }}
            />
            <p className="lightbox-caption">{caption}</p>
        </div>
    ) : null;
};

export default Lightbox;