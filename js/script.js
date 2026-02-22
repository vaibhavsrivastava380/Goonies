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
    scale: 1.3,
    ease: "none"
}, 0);

heroTimeline.to(".hero-img--front", {
    scale: 1.15,
    ease: "none"
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

heroTimeline.to(".hero-plot", {
    opacity: 0,
    duration: 0.3,
    ease: "power1.inOut"
}, 0.8);

heroTimeline.from(".hero-plot__text", {
    opacity: 0,
    y: 50,
    duration: 0.3,
    ease: "power1.inOut"
}, 0.25);

heroTimeline.to(".hero-cursor", {
    opacity: 0,
    duration: 0.1,
}, 0.25);
