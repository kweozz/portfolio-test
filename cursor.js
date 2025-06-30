if (window.innerWidth > 768) {
    const dots = [];
    const cursor = {
        x: 0,
        y: 0,
    };
    const totalDots = 50; // Number of dots

    // Create dots and store them in the 'dots' array
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        document.body.appendChild(dot);
        dots.push(dot);
    }

    // Track mouse movement
    document.addEventListener("mousemove", (e) => {
        // Include scroll position
        cursor.x = e.clientX + window.scrollX;
        cursor.y = e.clientY + window.scrollY;
    });

    function draw() {
        let x = cursor.x;
        let y = cursor.y;

        dots.forEach((dot, index) => {
            const nextDot = dots[index + 1] || dots[0];

            // Move each dot to follow the cursor
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;

            // Gradually fade out the dots
            dot.style.opacity = 1 - index / totalDots;

            // Create a trailing effect
            x += (nextDot.offsetLeft - dot.offsetLeft) * 0.04;
            y += (nextDot.offsetTop - dot.offsetTop) * 0.04;
        });
    }

    // Set up a drawing loop
    setInterval(draw, 16); // 60fps for smoother animation
}

// Toggle the nav menu on burger click
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    const burger = document.querySelector('.burger');
    const body = document.body;

    burger.classList.toggle('active');
    menu.classList.toggle('active');

    // Disable scrolling when the menu is active
    if (menu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.nav-menu');
        const burger = document.querySelector('.burger');
        const body = document.body;

        // Remove the active class to close the menu
        menu.classList.remove('active');
        burger.classList.remove('active');


        // Re-enable scrolling
        body.style.overflow = '';
    });
});


window.onload = function () {
    const texts = [
        "Digital designer & storyteller",
        "UI/UX enthusiast",
        "Creating meaningful experiences"
    ];
    let index = 0;
    let textIndex = 0;
    const speed = 150;

    function typeWriter() {
        const element = document.getElementById("typewriter");
        const currentText = texts[textIndex];

        if (index < currentText.length) {
            element.innerHTML += currentText.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Wait before starting the next text
            setTimeout(() => {
                textIndex = (textIndex + 1) % texts.length;
                index = 0;
                element.innerHTML = ''; // Clear previous text
                typeWriter();
            }, 1000); // 1 second pause before starting next text
        }
    }

    typeWriter();
};

document.querySelectorAll('.video-preview').forEach(preview => {
    let isPlaying = false;

    // Check if the device is mobile
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        // Desktop behavior: Play video on hover
        preview.addEventListener('mouseenter', () => {
            const thumbId = preview.getAttribute('data-thumb');
            const videoId = preview.getAttribute('data-video');
            const thumb = document.getElementById(thumbId);
            const video = document.getElementById(videoId);

            if (!isPlaying) {
                thumb.style.opacity = '0'; // Hide thumbnail
                video.style.display = 'block'; // Show the video
                video.play().then(() => {
                    isPlaying = true; // Video is now playing
                }).catch(error => {
                    console.log("Error playing video:", error);
                });
            }
        });

        preview.addEventListener('mouseleave', () => {
            const thumbId = preview.getAttribute('data-thumb');
            const videoId = preview.getAttribute('data-video');
            const thumb = document.getElementById(thumbId);
            const video = document.getElementById(videoId);

            if (isPlaying) {
                video.pause(); // Pause the video
                video.currentTime = 0; // Reset video to start
                video.style.display = 'none'; // Hide the video
                thumb.style.opacity = '1'; // Show thumbnail
                isPlaying = false; // Mark video as stopped
            }
        });
    } else {
        // Mobile behavior: Redirect to the project page immediately
        preview.addEventListener('click', (e) => {
            const link = preview.querySelector('a.thumb');
            if (link) {
                window.location.href = link.href;
            }
        });
    }
});

//Check if the document is loaded (so that this script can be placed in the <head>)
document.addEventListener("DOMContentLoaded", () => {

    // Use Intersection Observer to determine if objects are within the viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                return;
            }
            entry.target.classList.remove('in-view');
        });
    });

    // Get all the elements with the .animate class applied
    const allAnimatedElements = document.querySelectorAll('.animate');

    // Add the observer to each of those elements
    allAnimatedElements.forEach((element) => observer.observe(element));

});
