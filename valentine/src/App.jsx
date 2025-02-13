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
  const [showCanvas, setShowCanvas] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

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

  useEffect(() => {
    if (showCanvas) {
      const canv = document.getElementById("monCanvas");
      const ctx = canv.getContext("2d");
      const maxx = window.innerWidth - 16;
      const maxy = window.innerHeight - 50;
      let toggle = true;
      let togglesync = true;

      canv.width = maxx;
      canv.height = maxy;
      canv.style.backgroundColor = "transparent";

      const clickCanvas = () => {
        toggle = !toggle;
        if (toggle && !togglesync) {
          togglesync = true;
          enchaine();
        }
      };

      canv.addEventListener("click", clickCanvas);

      const uneFleur = () => {
        let xRacine, yRacine, hTige, xHaut, yHaut, xP1, yP1, xP2, yP2;

        xRacine = Math.floor(maxx * Math.random());
        yRacine = maxy - 1;
        hTige = (0.4 + 0.3 * Math.random()) * maxy;
        yHaut = yRacine - hTige;
        let dech = (0.05 + 0.1 * Math.random()) * hTige;
        if (Math.random() > 0.5) dech = -dech;
        xHaut = xRacine + dech;
        let thRacine = (5 + 10 * Math.random()) * Math.PI / 180;
        let thHaut = (5 + 10 * Math.random()) * Math.PI / 180;
        if (Math.random() > 0.5) {
          thRacine = -thRacine;
          thHaut = -thHaut;
        }
        let lRacine = (0.4 + 0.2 * Math.random()) * hTige;
        let lHaut = (0.4 + 0.2 * Math.random()) * hTige;

        let angleTige = Math.atan2(hTige, dech);
        xP1 = xRacine + lRacine * Math.cos(angleTige + thRacine);
        yP1 = yRacine - lRacine * Math.sin(angleTige + thRacine);

        xP2 = xHaut - lHaut * Math.cos(angleTige + thHaut);
        yP2 = yHaut + lRacine * Math.sin(angleTige + thHaut);

        const pousseTige = () => {
          const pousseTige1 = () => {
            let t = kPas / nPas;
            let unmt = 1 - t;
            let xP4 = xRacine * unmt + xP1 * t;
            let yP4 = yRacine * unmt + yP1 * t;
            let xP5 = xP1 * unmt + xP2 * t;
            let yP5 = yP1 * unmt + yP2 * t;
            let xP6 = xP2 * unmt + xHaut * t;
            let yP6 = yP2 * unmt + yHaut * t;

            let xP7 = xP4 * unmt + xP5 * t;
            let yP7 = yP4 * unmt + yP5 * t;
            let xP8 = xP5 * unmt + xP6 * t;
            let yP8 = yP5 * unmt + yP6 * t;

            let xP = xP7 * unmt + xP8 * t;
            let yP = yP7 * unmt + yP8 * t;

            ctx.beginPath();
            ctx.moveTo(xP, yP);

            ++kPas;

            t = kPas / nPas;
            unmt = 1 - t;
            xP4 = xRacine * unmt + xP1 * t;
            yP4 = yRacine * unmt + yP1 * t;
            xP5 = xP1 * unmt + xP2 * t;
            yP5 = yP1 * unmt + yP2 * t;
            xP6 = xP2 * unmt + xHaut * t;
            yP6 = yP2 * unmt + yHaut * t;

            xP7 = xP4 * unmt + xP5 * t;
            yP7 = yP4 * unmt + yP5 * t;
            xP8 = xP5 * unmt + xP6 * t;
            yP8 = yP5 * unmt + yP6 * t;

            xP = xP7 * unmt + xP8 * t;
            yP = yP7 * unmt + yP8 * t;

            ctx.lineTo(xP, yP);
            ctx.stroke();

            if (kPas >= nPas) {
              pousseFleur();
              return;
            }
            setTimeout(pousseTige1, 10);
          };

          let kPas = 0;
          let nPas = Math.round(hTige / 5);

          ctx.lineWidth = 1 + 5 * Math.random();
          let hue = 80 + 80 * Math.random();
          let sat = 80 + 20 * Math.random();
          let lum = 30 + 40 * Math.random();
          ctx.strokeStyle = `hsl(${hue},${sat}%,${lum}%)`;
          pousseTige1();
        };

        const pousseFleur = () => {
          const pousseFleur1 = () => {
            for (let ncons = 0; ncons < 10; ncons++) {
              let av = kPas / nPas;
              let unmav = 1 - av;
              let r = 1.5 + kPas * 0.5;
              let npp = Math.round(2 * r / nPetales);

              ctx.beginPath();
              ctx.moveTo(xHaut, yHaut);
              for (let kpet = 0; kpet < nPetales; kpet++) {
                let thPet = thPetale + 2 * Math.PI / nPetales * kpet;

                for (let kdp = 1; kdp <= npp; kdp++) {
                  let thdp = kdp / npp * Math.PI;
                  let rdp = r * Math.sin(thdp);
                  let thp = thPet + 2 * Math.PI / nPetales * kdp / npp;
                  ctx.lineTo(
                    xHaut + rdp * Math.cos(thp),
                    yHaut + rdp * Math.sin(thp)
                  );
                }
              }

              ctx.lineWidth = 1;
              let hue = (h0 * unmav + h1 * av + 160) % 360;
              let sat = s0 * unmav + s1 * av;
              let lum = l0 * unmav + l1 * av;
              ctx.strokeStyle = `hsl(${hue},${sat}%,${lum}%)`;
              ctx.stroke();

              if (++kPas > nPas) {
                enchaine();
                return;
              }
            }
            setTimeout(pousseFleur1, 10);
          };

          let rayon = (0.1 + 0.3 * Math.random()) * maxy;

          let nPetales = 4 + Math.floor(10 * Math.random());
          let thPetale = Math.random() * Math.PI * 2;

          let h1 = Math.random() * Math.PI / 2;
          h1 = Math.sin(h1 * h1) * 280;
          let h0 = h1;
          while (true) {
            h0 = Math.random() * 280;
            if (Math.abs(h1 - h0) < 100) break;
          }

          let s0 = 90 + 10 * Math.random();
          let s1 = 90 + 10 * Math.random();

          let l0 = 40 + 20 * Math.random();
          let l1 = 40 + 20 * Math.random();

          let nPas = Math.round((rayon - 1.5) / 0.5);
          let kPas = 0;

          pousseFleur1();
        };

        pousseTige();
      };

      const enchaine = () => {
        if (!toggle && togglesync) {
          togglesync = false;
          return;
        }

        uneFleur();
      };

      enchaine();

      setTimeout(() => {
        setShowBlur(true);
        setShowQuestion(true);
      }, 5000);

      return () => {
        canv.removeEventListener("click", clickCanvas);
      };
    }
  }, [showCanvas]);

  useEffect(() => {
  }, [showQuestion]);

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

  const handleRevealClick = () => {
    gsap.to([containerRef.current, giftsRef.current], {
      duration: 1,
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        setShowCanvas(true);
      }
    });
  };


  return (
    <div className="wrapper">
      <div className="heart x1"></div>
      <div className="heart x2"></div>
      <div className="heart x3"></div>
      <div className="heart x4"></div>
      <div className="heart x5"></div>
      <div className="heart x6"></div>

      {!showCanvas ? (
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
      ) : null}

      {!showCanvas ? (
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
              <button className="reveal-button" onClick={handleRevealClick}>Click Me</button>
            </div>
          )}
        </div>
      ) : null}

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

      <div className={`canvas-container ${showBlur ? 'blurred active' : ''}`}>
        {showCanvas && <canvas id="monCanvas" className="canvas-layer"></canvas>}
      </div>

      <div className={`question-container ${showQuestion ? 'visible' : ''}`}>
        <h1 className="valentine-question">Will you be my valentine?</h1>
        <div className="button-container">
          <button className="yes-button" onClick={() => alert('Yay!')}>Yes</button>
          <button className="no-button"onClick={() => alert(':(')}>No</button>
        </div>
      </div>
    </div>
  );
}

export default App;