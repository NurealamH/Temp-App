// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Functionality ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    // Function to open the mobile menu
    const openMobileMenu = () => {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('hidden');
            requestAnimationFrame(() => {
                mobileMenuOverlay.classList.add('opacity-100');
            });
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        }
    };

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('opacity-100');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
            }, 300); // Matches CSS transition duration
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    // Event listeners for mobile menu buttons
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    } else {
        console.warn("Mobile menu toggle button not found. Check ID 'mobile-menu-toggle'.");
    }
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    } else {
        console.warn("Mobile menu close button not found. Check ID 'mobile-menu-close'.");
    }

    // --- Dark Mode Toggle Functionality ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const body = document.body; // Reference to the body element

    // Function to apply the theme based on localStorage or default
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        console.log("Applying theme. Saved theme:", savedTheme); // Debugging log

        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (darkModeIcon) {
                darkModeIcon.classList.remove('fa-moon');
                darkModeIcon.classList.add('fa-sun');
                console.log("Dark mode applied. Icon: sun."); // Debugging log
            }
        } else {
            // Default to light mode if no preference or 'light' is saved
            body.classList.remove('dark-mode');
            if (darkModeIcon) {
                darkModeIcon.classList.remove('fa-sun');
                darkModeIcon.classList.add('fa-moon');
                console.log("Light mode applied. Icon: moon."); // Debugging.log
            }
        }
    };

    // Apply theme immediately when the DOM content is loaded
    applyTheme();

    // Event listener for dark mode toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            console.log("Dark mode toggle clicked."); // Debugging log
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                if (darkModeIcon) {
                    darkModeIcon.classList.remove('fa-sun');
                    darkModeIcon.classList.add('fa-moon');
                }
                console.log("Switched to light mode."); // Debugging log
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                if (darkModeIcon) {
                    darkModeIcon.classList.remove('fa-moon');
                    darkModeIcon.classList.add('fa-sun');
                }
                console.log("Switched to dark mode."); // Debugging log
            }
        });
    } else {
        console.warn("Dark mode toggle button not found. Check ID 'dark-mode-toggle'.");
    }

    // --- Feedback Modal Functionality ---
    const openFeedbackModalBtn = document.getElementById('open-feedback-modal');
    const feedbackModalOverlay = document.getElementById('feedback-modal-overlay');
    const feedbackModalCloseBtn = document.getElementById('feedback-modal-close');
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackStatusMessage = document.getElementById('feedback-status-message');

    const openFeedbackModal = () => {
        if (feedbackModalOverlay) {
            feedbackModalOverlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    };

    const closeFeedbackModal = () => {
        if (feedbackModalOverlay) {
            feedbackModalOverlay.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
            // Reset form and message when closing
            if (feedbackForm) feedbackForm.reset();
            if (feedbackStatusMessage) feedbackStatusMessage.classList.remove('show', 'success', 'error');
            if (feedbackStatusMessage) feedbackStatusMessage.textContent = '';
        }
    };

    if (openFeedbackModalBtn) {
        openFeedbackModalBtn.addEventListener('click', openFeedbackModal);
    } else {
        console.warn("Feedback button not found. Check ID 'open-feedback-modal'.");
    }

    if (feedbackModalCloseBtn) {
        feedbackModalCloseBtn.addEventListener('click', closeFeedbackModal);
    } else {
        console.warn("Feedback modal close button not found. Check ID 'feedback-modal-close'.");
    }

    // Close modal if clicked outside content
    if (feedbackModalOverlay) {
        feedbackModalOverlay.addEventListener('click', (event) => {
            if (event.target === feedbackModalOverlay) {
                closeFeedbackModal();
            }
        });
    }

    // Handle feedback form submission with Web3Forms API
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            // Clear previous messages
            if (feedbackStatusMessage) {
                feedbackStatusMessage.classList.remove('show', 'success', 'error');
                feedbackStatusMessage.textContent = '';
            }

            const message = document.getElementById('feedback-message').value;
            if (!message.trim()) {
                if (feedbackStatusMessage) {
                    feedbackStatusMessage.textContent = 'Please enter your feedback message.';
                    feedbackStatusMessage.classList.add('error', 'show');
                }
                return;
            }

            // Web3Forms now handles formData creation and access_key automatically via form attributes
            // No need to manually append access_key or create FormData object here for fetch.
            // The form's 'action' and 'method' attributes will handle the submission.

            // Show a loading message
            if (feedbackStatusMessage) {
                feedbackStatusMessage.textContent = 'Submitting feedback...';
                feedbackStatusMessage.classList.add('show');
                feedbackStatusMessage.classList.remove('success', 'error');
            }

            // The form will submit normally via its action attribute.
            // We can still use fetch to intercept and show status, but it's not strictly necessary
            // if the form action is set. For a more direct fetch, we'd manually build FormData
            // and send it, but the user requested action/method on the form.
            // Let's revert to a direct fetch as it's more common with JS handling.

            const formData = new FormData(feedbackForm);
            // The hidden access_key input is already part of formData

            try {
                const response = await fetch(feedbackForm.action, { // Use form.action for fetch URL
                    method: feedbackForm.method, // Use form.method
                    body: formData,
                });

                const data = await response.json();
                console.log("Web3Forms API Response:", data); // Log the full response

                if (response.ok && data.success) {
                    if (feedbackStatusMessage) {
                        feedbackStatusMessage.textContent = 'Thank you for your feedback! It has been sent.';
                        feedbackStatusMessage.classList.add('success', 'show');
                    }
                    feedbackForm.reset();
                    setTimeout(closeFeedbackModal, 2000);
                } else {
                    console.error('Web3Forms Submission Failed:', data.message || 'Unknown error from API');
                    if (feedbackStatusMessage) {
                        feedbackStatusMessage.textContent = `Failed to send feedback: ${data.message || 'Unknown error'}. Please try again.`;
                        feedbackStatusMessage.classList.add('error', 'show');
                    }
                }
            } catch (error) {
                console.error('Network or API Error during fetch:', error);
                if (feedbackStatusMessage) {
                    feedbackStatusMessage.textContent = 'An error occurred while sending feedback. Please check your internet connection and try again.';
                    feedbackStatusMessage.classList.add('error', 'show');
                }
            }
        });
    } else {
        console.warn("Feedback form not found. Check ID 'feedback-form'.");
    }

    // --- Disable Right-Click ---
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        console.log("Right-click disabled.");
    });

    // --- Hide Developer Mode (Basic Prevention) ---
    document.addEventListener('keydown', (e) => {
        // Disable F12
        if (e.key === 'F12') {
            e.preventDefault();
            console.log("F12 (Developer Tools) disabled.");
        }
        // Disable Ctrl+Shift+I (Chrome/Edge/Firefox DevTools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            console.log("Ctrl+Shift+I (Developer Tools) disabled.");
        }
        // Disable Ctrl+Shift+J (Chrome/Edge Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            console.log("Ctrl+Shift+J (Console) disabled.");
        }
        // Disable Ctrl+Shift+C (Chrome/Edge Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            console.log("Ctrl+Shift+C (Inspect Element) disabled.");
        }
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'U') {
            e.preventDefault();
            console.log("Ctrl+U (View Source) disabled.");
        }
    });
});

// Make closeMobileMenu globally accessible if needed by inline onclick attributes
function closeMobileMenu() {
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('opacity-100');
        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }
}
