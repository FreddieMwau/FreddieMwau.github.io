// GSAP Animations

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Asset Loading ---
    const characterPlaceholders = {
        'header-robot': 'https://www.svgrepo.com/show/403911/robot-face.svg', // Simple robot face
        'introduction-owl': 'https://www.svgrepo.com/show/400538/owl.svg', // Simple owl
        'skills-octopus': 'https://www.svgrepo.com/show/379649/octopus.svg', // Simple octopus
        'footer-robot-1': 'https://www.svgrepo.com/show/403911/robot-face.svg',
        'footer-robot-2': 'https://www.svgrepo.com/show/403911/robot-face.svg'
    };

    for (const id in characterPlaceholders) {
        const element = document.getElementById(id);
        if (element) {
            fetch(characterPlaceholders[id])
                .then(response => response.text())
                .then(svgData => {
                    element.innerHTML = svgData;
                    // Initialize animations that depend on these SVGs after they are loaded
                    initializeCharacterAnimation(id);
                })
                .catch(error => console.error('Error loading SVG for:', id, error));
        }
    }

    // --- General Page Animations ---
    gsap.from("header h1", { duration: 1, y: -60, opacity: 0, ease: "power2.out" });
    gsap.from("header p", { duration: 1, y: 40, opacity: 0, ease: "power2.out", delay: 0.3 });

    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            duration: 0.8,
            opacity: 0,
            y: 75,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
            }
        });
    });

    gsap.utils.toArray(".project-card, .skill-category").forEach(card => {
        gsap.from(card, {
            duration: 0.7,
            opacity: 0,
            y: 50,
            scale: 0.95,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
            }
        });
    });

    gsap.utils.toArray("#skills .skill-category ul li").forEach((skill, i) => {
        gsap.from(skill, {
            duration: 0.5,
            opacity: 0,
            x: -30,
            ease: "power2.out",
            scrollTrigger: {
                trigger: skill, // Trigger on each skill item for better effect
                start: "top 95%",
                toggleActions: "play none none none",
            },
            delay: i * 0.05 // Stagger animation
        });
    });

    // --- Character Specific Animations (called after SVG load) ---
    function initializeCharacterAnimation(id) {
        const el = `#${id}`;
        switch (id) {
            case 'header-robot':
                gsap.to(el, { duration: 3, y: "-=15", rotation: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
                // Task: "Welcoming" - make it wave a hand if SVG structure allows path animation
                // For a simple SVG, a little bob and rotate is a start.
                break;
            case 'introduction-owl':
                // Task: "Intellectual" - slow blink, slight head tilt
                gsap.set(el, { transformOrigin: "center bottom" }); // For head tilt
                const owlTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
                owlTimeline.to(el, { duration: 0.3, scaleY: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut", delay: 2 }) // Blink
                           .to(el, { duration: 1.5, rotation: 3, ease: "sine.inOut" }, "+=1")
                           .to(el, { duration: 1.5, rotation: 0, ease: "sine.inOut" });
                break;
            case 'skills-octopus':
                // Task: "Multitasking/Exploring" - tentacles subtly moving, slight float
                gsap.to(el, { duration: 4, y: "-=10", x: "+=5", rotation: -3, repeat: -1, yoyo: true, ease: "sine.inOut" });
                // More complex tentacle animation would require path animation on SVG paths.
                break;
            case 'footer-robot-1':
                gsap.to(el, { duration: 2.5, y: "-=8", rotation: -7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
                break;
            case 'footer-robot-2':
                gsap.to(el, { duration: 2.5, y: "-=8", rotation: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
                break;
        }
    }
});
