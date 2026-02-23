gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

// Initialize Draggable for the card
Draggable.create(".goon-card", {
    type: "x,y",
    edgeResistance: 0.65,
    bounds: ".goon-overlay",
    inertia: true
});

// Loader Animation
const loaderTimeline = gsap.timeline({
    onComplete: () => {
        gsap.to(".loader", {
            y: "-100%",
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => {
                document.querySelector(".loader").style.display = "none";
            }
        });
    }
});

let obj = { value: 0 };
loaderTimeline.to(obj, {
    value: 100,
    duration: 3.5,
    ease: "power1.inOut",
    onUpdate: () => {
        document.querySelector(".loader__count").textContent = Math.round(obj.value) + "%";
    }
}, 0);

loaderTimeline.to(".loader__bg", {
    height: "100%",
    duration: 3.5,
    ease: "power1.inOut"
}, 0);


// Hero Scroll Animation
const heroTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=200%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1
    }
});

heroTimeline.to(".hero-img--back", {
    scale: 1.7,
}, 0);

heroTimeline.to(".hero-img--front", {
    scale: 1.5,
}, 0);

heroTimeline.to(".hero-overlay", {
    opacity: 0.6,
    duration: 0.5,
    ease: "power1.inOut"
}, 0);

heroTimeline.to(".hero-title", {
    opacity: 0,
    duration: 0.2,
    ease: "power1.inOut"
}, 0);

heroTimeline.to(".hero-plot", {
    opacity: 1,
    duration: 0.3,
    ease: "power1.inOut"
}, 0.25);

heroTimeline.from(".hero-plot__text", {
    opacity: 0,
    y: 50,
    duration: 0.4,
    ease: "power2.out"
}, 0.3);

heroTimeline.to(".hero-plot__line", {
    height: "50vh",
    duration: 0.5,
    ease: "power1.inOut"
}, 0.45);

heroTimeline.to(".hero-overlay", {
    opacity: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
    duration: 0.4,
    ease: "power1.in"
}, 0.6);

heroTimeline.to(".hero-plot__title, .hero-plot__text", {
    opacity: 0,
    duration: 0.3,
    ease: "power1.in"
}, 0.82);

heroTimeline.to(".hero-plot__line", {
    duration: 0.2
}, 0.85);

heroTimeline.to(".hero-plot__line", {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "bottom center",
    duration: 0.3,
    ease: "power1.in"
}, 0.95);

heroTimeline.to(".hero-cursor", {
    opacity: 0,
    duration: 0.1,
}, 0.2);



heroTimeline.to(".nav-indicator", {
    opacity: 1,
    duration: 0.2
}, 0.25);

// Goonies Hover Animation
const goonies = document.querySelectorAll(".goonie");

goonies.forEach((goonie) => {
    const img = goonie.querySelector(".goonie__img");
    const nameText = goonie.querySelector(".goonie__name__text");
    const showMore = goonie.querySelector(".goonie__name__showmore");

    goonie.addEventListener("mouseenter", () => {
        gsap.to(img, {
            filter: "brightness(1)",
            scale: 1.1,
            duration: 0.9,
            ease: "power2.out"
        });
        gsap.to(nameText, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.to(showMore, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    goonie.addEventListener("mouseleave", () => {
        gsap.to(img, {
            filter: "brightness(0.5)",
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
        });
        gsap.to(nameText, {
            y: 30,
            opacity: 0,
            duration: 0.2,
            ease: "power4.in"
        });
        gsap.to(showMore, {
            y: 40,
            opacity: 0,
            duration: 0.2,
            ease: "power4.in"
        });
    });
});

// Mikey Video Animation
const mikeyGoonie = goonies[0];
const goonOverlay = document.querySelector(".goon-overlay");
const goonVideo = document.querySelector(".goon-video");
const goonClose = document.querySelector(".goon-close");
const goonCard = document.querySelector(".goon-card");
const otherGoonies = Array.from(goonies).slice(1);

if (mikeyGoonie && goonOverlay) {
    mikeyGoonie.addEventListener("click", () => {
        const tl = gsap.timeline();

        // 1. Expand Mikey, slide others, and fade out original image/text (Slower: 2s)
        tl.to(mikeyGoonie, {
            flex: 5,
            duration: 2,
            ease: "power3.inOut"
        });
        tl.to(mikeyGoonie.querySelector(".goonie__img"), {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut"
        }, 0);
        tl.to(mikeyGoonie.querySelector(".goonie__name"), {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, 0);
        tl.to(otherGoonies, {
            flex: 0,
            padding: 0,
            margin: 0,
            opacity: 0,
            pointerEvents: "none",
            duration: 2,
            ease: "power3.inOut"
        }, 0);

        // 2. Show overlay (Slower: 1.5s)
        tl.to(goonOverlay, {
            opacity: 1,
            visibility: "visible",
            pointerEvents: "all",
            duration: 1.5,
            ease: "power2.inOut",
            onStart: () => {
                goonOverlay.classList.add("active");
                goonVideo.play();
            }
        }, "-=1.5");

        // 3. Animate card content (Slower: 1.8s)
        tl.fromTo(goonCard,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.8, ease: "power3.out" }
            , "-=1");
    });
}

if (goonClose) {
    goonClose.addEventListener("click", (e) => {
        e.stopPropagation();
        const tl = gsap.timeline();

        // 1. Fade out card and overlay together (Slower: 1s & 1.2s)
        tl.to(goonCard, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        });

        tl.to(goonOverlay, {
            opacity: 0,
            visibility: "hidden",
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
                goonOverlay.classList.remove("active");
                goonVideo.pause();
                goonVideo.currentTime = 0;
                gsap.set(goonCard, { x: 0, y: 0 });
            }
        }, "-=0.8");

        // 2. Collapse Mikey and expand others (Slower: 1.8s)
        tl.to(mikeyGoonie, {
            flex: 1,
            duration: 1.8,
            ease: "power3.inOut"
        }, "-=0.8");

        tl.to(mikeyGoonie.querySelector(".goonie__img"), {
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut"
        }, "-=1.8");

        tl.to(mikeyGoonie.querySelector(".goonie__name"), {
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut"
        }, "-=1.8");

        tl.to(otherGoonies, {
            flex: 1,
            opacity: 1,
            pointerEvents: "all",
            duration: 1.8,
            ease: "power3.inOut"
        }, "-=1.8");
    });
}





// Goonies Coins Scroll Animation
const coinsTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".goonies-coins",
        start: "top bottom",
        end: "bottom top",
        scrub: 2
    }
});

// Coin Big: Rotate from 45deg to left
coinsTimeline.fromTo(".coin-big", {
    rotate: 45
}, {
    rotate: -45,
    ease: "none"
}, 0);

coinsTimeline.fromTo(".coin-1", {
    y: 200,
}, {
    y: -200,
    ease: "none"
}, 0);

coinsTimeline.fromTo(".coin-2", {
    y: -300,
    rotate: 0
}, {
    y: 700,
    rotate: 720,
    ease: "none"
}, 0);

coinsTimeline.fromTo(".coin-4", {
    y: 300,
    rotate: 0
}, {
    y: -700,
    rotate: -720,
    ease: "none"
}, 0);

coinsTimeline.fromTo(".coin-3", {
    y: -500,
    rotate: 0
}, {
    y: 500,
    rotate: 360,
    ease: "none"
}, 0);

// Credits Hover Animation
const creditsCards = document.querySelectorAll(".credits__top > div");

creditsCards.forEach((card) => {
    const text = card.querySelector(".card__text");
    const img = card.querySelector(".card__img img");

    card.addEventListener("mouseenter", () => {
        if (text) {
            const tl = gsap.timeline();
            tl.to(text, {
                y: 15,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });

            tl.set(text, { y: -15 });
            tl.to(text, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        if (img) {
            const isLogoCard = card.classList.contains("credits__top__card--4") ||
                card.classList.contains("credits__top__card--5") ||
                card.classList.contains("credits__top__card--7");

            if (!isLogoCard) {
                gsap.to(img, {
                    filter: "brightness(1) blur(0px)",
                    scale: 1.05,
                    duration: 0.8,
                    ease: "power2.out"
                });
            } else {
                gsap.to(img, {
                    scale: 1.08,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        }
    });

    if (card.classList.contains("credits__top__card--3")) {
        card.addEventListener("mousemove", (e) => {
            const { width } = card.getBoundingClientRect();
            const mouseX = e.offsetX;
            const movePercent = (mouseX / width) - 0.5;
            const moveAmount = movePercent * 60;

            gsap.to(img, {
                x: -moveAmount,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    }

    card.addEventListener("mouseleave", () => {
        if (img) {
            const isLogoCard = card.classList.contains("credits__top__card--4") ||
                card.classList.contains("credits__top__card--5") ||
                card.classList.contains("credits__top__card--7");

            gsap.to(img, { x: 0, duration: 0.5, ease: "power2.inOut" });

            if (!isLogoCard) {
                gsap.to(img, {
                    filter: "brightness(0.4) ",
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.inOut"
                });
            } else {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.inOut"
                });
            }
        }
    });
});

// Skull Section Scroll Animation
gsap.to(".skull", {
    scale: 1.5,
    ease: "none",
    scrollTrigger: {
        trigger: ".credits__bottom",
        start: "top bottom",
        end: "bottom top",
        scrub: 2
    }
});

gsap.to(".skull-front", {
    y: -100,
    ease: "none",
    scrollTrigger: {
        trigger: ".credits__bottom",
        start: "top bottom",
        end: "bottom top",
        scrub: 2
    }
});

// Share Section Line Animation
gsap.from(".share__line", {
    height: "30%",
    ease: "none",
    scrollTrigger: {
        trigger: ".share",
        start: "top center",
        end: "bottom bottom",
        scrub: 1
    }
});
// Audio Player Toggle Logic
const audioToggle = document.getElementById("audioToggle");
const audioPlayer = document.getElementById("audioPlayer");

if (audioToggle && audioPlayer) {
    audioToggle.addEventListener("click", () => {
        audioPlayer.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!audioToggle.contains(e.target) && !audioPlayer.contains(e.target)) {
            audioPlayer.classList.remove("active");
        }
    });
}

// Navbar Indicator Animation
gsap.set(".nav-indicator", { opacity: 0 });

const masterNavTL = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    }
});

masterNavTL
    .to(".nav-indicator", { left: "12.5%", duration: 0.5 })
    .to(".nav-indicator", { left: "37.5%", duration: 1, ease: "none" })
    .to(".nav-indicator", { left: "62.5%", duration: 1, ease: "none" })
    .to(".nav-indicator", { left: "87.5%", duration: 1, ease: "none" });

// Back to Top Smooth Scroll
const backToTopBtn = document.querySelector(".share__back-to-top");


backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(window, {
        duration: 7,
        scrollTo: 0,
        ease: "power2.inOut"
    });
});



