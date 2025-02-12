import { useEffect, useRef, useState } from 'react';
import './App.css';
import './components/Envelope/card.scss';
import gsap from 'gsap';
import $ from 'jquery';

function App() {
  const envelopeRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let t1 = gsap.timeline({ paused: true });
    let t2 = gsap.timeline({ paused: true });
    t1.to('.top', {
      duration: 0.8,
      ease: "back",
      transformOrigin: "top",
      rotateX: 180,
      borderTop: '1px solid rgb(132, 128, 177)',
      zIndex: 1
    })
      .set('.card', {
        zIndex: 2
      })
      .to('.card', {
        duration: 0.3,
        left: 30,
        top: 30,
        width: 250,
        height: 150
      })
      .to('.card', {
        top: -220
      })
      .set('.card', {
        zIndex: 10
      })
      .to('.card', {
        duration: 0.7,
        scaleX: 1.4,
        scaleY: 1.6,
        top: 10,
        ease: "back"
      });

    t2.to('.shadow', {
      delay: 1.6,
      duration: 0.7,
      scaleX: 2.1
    });

    $(envelopeRef.current).click(() => {
      t1.play();
      t2.play();
      setIsClicked(true); // Disable shake after click
    });

    $('.close').click((e) => {
      e.stopPropagation();
      t1.reverse();
      t2.reverse();
      setIsClicked(false); // Enable shake when closed
    });

    gsap.to(envelopeRef.current, {
      rotation: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  const handleMouseEnter = () => {
    if (!isClicked) {
      gsap.to(envelopeRef.current, {
        rotation: 5,
        duration: 0.2,
        yoyo: true,
        repeat: 2,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(envelopeRef.current, {
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        },
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(envelopeRef.current, {
      rotation: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="heart x1"></div>
        <div className="heart x2"></div>
        <div className="heart x3"></div>
        <div className="heart x4"></div>
        <div className="heart x5"></div>
        <div className="heart x6"></div>
        <div
          className="envelope"
          ref={envelopeRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card">
            <i className="fa fa-times close" aria-hidden="true"></i>
            <div className="message">
              <p>I am the luckiest man in the</p>
            </div>
          </div>
          <div className="top"></div>
          <div className="right"></div>
          <div className="bottom"></div>
          <div className="left"></div>
        </div>
      </div>
    </>
  );
}

export default App;