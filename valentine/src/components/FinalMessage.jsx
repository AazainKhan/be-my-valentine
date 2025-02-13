import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FinalMessage = () => {
    const paperContentRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            paperContentRef.current,
            { opacity: 0, scale: 0.5 },
            {
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: 'power2.out',
            }
        );
    }, []);

    return (
        <div className="final-message-container">
            <div className="paper">
                <div className="paper-content" ref={paperContentRef}>
                    <p>
                        I love you so much Saamiya! Thank you for being mine! I know I am miles away (specifically 3491.35 miles) but I hold you closest to my heart - now and forever. With you everyday is special, even the mundane and slow days, not cause i'm obsessed with you (i am) but cause out of all the people in this world I get to have mundane and slow days with YOU. I am grateful I get to tell the most amazing, kind, gentle, and beautiful girl in the whole world I love her. Happy Valentines Day my love! ❤️
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FinalMessage;
