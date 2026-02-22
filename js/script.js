gsap.registerPlugin(ScrollTrigger);

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
