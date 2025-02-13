import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import './components/Envelope/card.scss';
import gsap from 'gsap';
import captions from './captions.json';

function App() {
  const envelopeRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  const containerRef = useRef(null);
  const giftsRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [giftStates, setGiftStates] = useState(Array(6).fill(false));
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [showGiftsHeader, setShowGiftsHeader] = useState(false);
  const [allGiftsClicked, setAllGiftsClicked] = useState(false);

  const cards = [
    "Hi Saamiya, It's almost Valentines Day!",
    "This is our first Valentines Day together, but I don’t need a special day to tell you how much I love you.",
    "I couldn’t be more grateful to have this opportunity and privilege.",
    "I know you must've been wondering when am I going to ask hehe lol",
    "But first..."
  ];

  const giftImages = [
    '/cat 1.jpg',
    '/cat 2.jpg',
    '/cat 3.jpg',
    '/cat 4.jpg',
    '/cat 5.jpg',
    '/cat 6.jpg'
  ];

  useEffect(() => {
    t1Ref.current = gsap.timeline({ paused: true });
    t1Ref.current
      .to('.top', { duration: 0.8, ease: "back", transformOrigin: "top", rotateX: 180, borderTop: '1px solid rgb(132, 128, 177)', zIndex: 1 })
      .set('.card', { zIndex: 2 })
      .to('.card', { duration: 0.3, left: 30, top: 30, width: 250, height: 150 })
      .to('.card', { top: -220 })
      .set('.card', { zIndex: 10 })
      .to('.card', { duration: 0.7, scaleX: 1.4, scaleY: 1.6, top: 10, ease: "back" });

    t2Ref.current = gsap.timeline({ paused: true });
    t2Ref.current.to('.shadow', { delay: 1.6, duration: 0.7, scaleX: 2.1 });

    gsap.to(envelopeRef.current, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  }, []);

  const handleEnvelopeClick = () => {
    if (!isClicked) {
      t1Ref.current.play();
      t2Ref.current.play();
      setIsClicked(true);
    } else {
      if (currentCardIndex < cards.length - 1) {
        gsap.to('.card', {
          duration: 0.5,
          y: -50,
          opacity: 0,
          ease: "power1.inOut",
          onComplete: () => {
            setCurrentCardIndex(prev => prev + 1);
            gsap.set('.card', { y: 50 });
            gsap.to('.card', { duration: 0.5, y: 0, opacity: 1, ease: "power1.inOut" });
          }
        });
      } else {
        gsap.to(containerRef.current, {
          duration: 1,
          opacity: 0,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(giftsRef.current, { duration: 1, opacity: 1, ease: "power2.inOut" });
            setShowGiftsHeader(true); // Set showGiftsHeader to true
          }
        });
      }
    }
  };

  const handleGiftClick = (index) => {
    const transition = () => {
      const newGiftStates = [...giftStates];
      if (!giftStates[index]) { // Only set states if gift box is clicked
        setSelectedImage(giftImages[index]);
        setSelectedImageIndex(index);
        newGiftStates[index] = true; // Ensure it opens only once
        setGiftStates(newGiftStates);

        // Check if all gifts have been clicked
        if (newGiftStates.every(state => state)) {
          setAllGiftsClicked(true);
        }
      } else {
        setSelectedImage(giftImages[index]);
        setSelectedImageIndex(index);
      }
    };

    if (document.startViewTransition) {
      document.startViewTransition(transition);
    } else {
      transition();
    }
  };

  const handleMouseEnter = () => {
    if (!isClicked) {
      gsap.to(envelopeRef.current, {
        rotation: 5,
        duration: 0.2,
        yoyo: true,
        repeat: 2,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(envelopeRef.current, { rotation: 0, duration: 0.3, ease: 'power2.out' });
        },
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="heart x1"></div>
      <div className="heart x2"></div>
      <div className="heart x3"></div>
      <div className="heart x4"></div>
      <div className="heart x5"></div>
      <div className="heart x6"></div>

      <div ref={containerRef}>
        <div
          className="envelope"
          ref={envelopeRef}
          onClick={handleEnvelopeClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => gsap.to(envelopeRef.current, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })}
        >
          <div className="card">
            <div className="message">
              <p>{cards[currentCardIndex]}</p>
            </div>
          </div>
          <div className="top"></div>
          <div className="right"></div>
          <div className="bottom"></div>
          <div className="left"></div>
        </div>
      </div>

      <div className="gift-container" ref={giftsRef} style={{ opacity: 0 }}>
        {showGiftsHeader && <h1 className="gift-header">These are for you :)</h1>}
        {giftStates.map((isOpen, index) => (
          <div className="gift" key={index} onClick={() => handleGiftClick(index)}>
            {isOpen ? (
              <img src={giftImages[index]} alt="Gift" className="gift-image" />
            ) : (
              <>
                <div className={`gift-top ${isOpen ? 'boxOpen' : ''}`}></div>
                <div className={`gift-box ${isOpen ? 'boxDown' : ''}`}></div>
              </>
            )}
          </div>
        ))}
        {allGiftsClicked && (
          <div className="reveal-button-container">
            <button className="reveal-button">Click Me</button>
          </div>
        )}
      </div>
      {selectedImage && (
        <div
          className="lightbox-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
              setSelectedImageIndex(-1);
            }
          }}
        >
          <img
            src={selectedImage}
            alt="Gift"
            className="lightbox-image"
            style={{ viewTransitionName: 'active-lightbox-image' }}
          />
          <p className="lightbox-caption">{captions[selectedImageIndex]}</p>
        </div>
      )}
    </div>
  );
}

export default App;