// Your JavaScript code can go here
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');

    // Wait for components to load
    setTimeout(() => {
        // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                console.log('Mobile menu button clicked');
                mobileMenu.classList.toggle('hidden');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });

            // Close menu when window is resized to desktop view
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) { // md breakpoint
                    mobileMenu.classList.remove('hidden');
                } else {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    }, 200);
}); 