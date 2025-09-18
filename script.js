// Enhanced JavaScript for Smart Scheduler

document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeSmoothScroll();
    initializeFormValidations();
    initializeTimetableForm();
    initializeAuthTabs();
    initializeAnimations();
    initializeCounters();
});

// Theme toggle functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or respect the OS preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'night' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'night');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Day Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'day');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Night Mode';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'night') {
            document.documentElement.setAttribute('data-theme', 'day');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Night Mode';
            localStorage.setItem('theme', 'day');
        } else {
            document.documentElement.setAttribute('data-theme', 'night');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Day Mode';
            localStorage.setItem('theme', 'night');
        }
    });
}

// Add this to the initializeFormValidations function
const contactFormIndex = document.getElementById('contact-form-index');
if (contactFormIndex) {
    contactFormIndex.addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        contactFormIndex.reset();
    });
}
// Smooth scroll functionality
function initializeSmoothScroll() {
    const scrollTopBtn = document.getElementById('scroll-top');
    const scrollBottomBtn = document.getElementById('scroll-bottom');

    // Show/hide scroll buttons based on scroll position
    window.addEventListener('scroll', function () {
        if (scrollTopBtn && scrollBottomBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }

            // Show scroll down button if not at bottom
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
            if (!isAtBottom) {
                scrollBottomBtn.classList.add('show');
            } else {
                scrollBottomBtn.classList.remove('show');
            }
        }
    });

    // Scroll to top when clicked
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll to bottom when clicked
    if (scrollBottomBtn) {
        scrollBottomBtn.addEventListener('click', function () {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
}

// Form validation functionality
function initializeFormValidations() {
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateContactForm()) {
                // Form is valid, you would typically submit to a server here
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            }
        });
    }

    // Login form validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateLoginForm()) {
                // Form is valid, you would typically submit to a server here
                showNotification('Login successful! Redirecting...', 'success');
                loginForm.reset();
            }
        });
    }

    // Signup form validation
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateSignupForm()) {
                // Form is valid, you would typically submit to a server here
                showNotification('Account created successfully! You can now login.', 'success');
                signupForm.reset();
                // Switch to login tab
                const loginTab = document.querySelector('[data-tab="login"]');
                if (loginTab) loginTab.click();
            }
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                newsletterForm.reset();
            }
        });
    }
}

// Contact form validation
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    // Clear previous errors
    clearErrors(contactForm);

    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }

    return isValid;
}

// Login form validation
function validateLoginForm() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    let isValid = true;

    // Clear previous errors
    clearErrors(loginForm);

    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password.value.trim()) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    }

    return isValid;
}

// Signup form validation
function validateSignupForm() {
    const name = document.getElementById('signup-name');
    const email = document.getElementById('signup-email');
    const password = document.getElementById('signup-password');
    const confirm = document.getElementById('signup-confirm');
    let isValid = true;

    // Clear previous errors
    clearErrors(signupForm);

    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password.value.trim()) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    }

    // Validate confirm password
    if (!confirm.value.trim()) {
        showError(confirm, 'Please confirm your password');
        isValid = false;
    } else if (password.value !== confirm.value) {
        showError(confirm, 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

// Helper function to validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message for form field
function showError(field, message) {
    field.style.borderColor = 'var(--error-color)';
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    }
}

// Clear all error messages in a form
function clearErrors(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    });
}

// Timetable form functionality
function initializeTimetableForm() {
    const timetableForm = document.getElementById('timetable-form');
    if (!timetableForm) return;

    // Add subject functionality
    const addSubjectBtn = document.getElementById('add-subject');
    if (addSubjectBtn) {
        addSubjectBtn.addEventListener('click', addSubjectEntry);
    }

    // Add special class functionality
    const addSpecialBtn = document.getElementById('add-special');
    if (addSpecialBtn) {
        addSpecialBtn.addEventListener('click', addSpecialClassEntry);
    }

    // Form submission
    timetableForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateTimetableForm()) {
            // Store form data in localStorage
            storeTimetableData();
            // Show success message
            showNotification('Timetable generated successfully! Data saved.', 'success');
            // You could also update the preview with the actual data here
        }
    });

    // Initialize with one subject entry
    addSubjectEntry();

    // Initialize with one special class entry
    addSpecialClassEntry();
}

// Add a new subject entry
function addSubjectEntry() {
    const container = document.getElementById('subjects-container');
    const entry = document.createElement('div');
    entry.className = 'subject-entry';
    entry.innerHTML = `
        <input type="text" placeholder="Subject Name" class="subject-name" required>
        <input type="text" placeholder="Faculty Name" class="faculty-name" required>
        <input type="number" placeholder="Classes per week" min="1" class="classes-per-week" required>
        <button type="button" class="remove-subject">Remove</button>
    `;
    container.appendChild(entry);

    // Add event listener to remove button
    const removeBtn = entry.querySelector('.remove-subject');
    removeBtn.addEventListener('click', function () {
        // Only remove if there's more than one entry
        if (document.querySelectorAll('.subject-entry').length > 1) {
            entry.remove();
        }
    });
}

// Add a new special class entry
function addSpecialClassEntry() {
    const container = document.getElementById('special-classes');
    const entry = document.createElement('div');
    entry.className = 'special-class-entry';
    entry.innerHTML = `
        <input type="text" placeholder="Class Name" class="special-class-name">
        <select class="special-day">
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
        </select>
        <select class="special-time">
            <option value="1">Period 1</option>
            <option value="2">Period 2</option>
            <option value="3">Period 3</option>
            <option value="4">Period 4</option>
            <option value="5">Period 5</option>
            <option value="6">Period 6</option>
        </select>
        <button type="button" class="remove-special">Remove</button>
    `;
    container.appendChild(entry);

    // Add event listener to remove button
    const removeBtn = entry.querySelector('.remove-special');
    removeBtn.addEventListener('click', function () {
        // Only remove if there's more than one entry
        if (document.querySelectorAll('.special-class-entry').length > 1) {
            entry.remove();
        }
    });
}

// Validate timetable form
function validateTimetableForm() {
    const classrooms = document.getElementById('classrooms');
    const batches = document.getElementById('batches');
    const maxClasses = document.getElementById('max-classes');
    const facultyLeaves = document.getElementById('faculty-leaves');
    let isValid = true;

    // Clear previous errors
    clearErrors(timetableForm);

    // Validate basic fields
    if (!classrooms.value || classrooms.value < 1) {
        showError(classrooms, 'Please enter a valid number of classrooms');
        isValid = false;
    }

    if (!batches.value || batches.value < 1) {
        showError(batches, 'Please enter a valid number of batches');
        isValid = false;
    }

    if (!maxClasses.value || maxClasses.value < 1 || maxClasses.value > 8) {
        showError(maxClasses, 'Please enter a value between 1 and 8');
        isValid = false;
    }

    if (!facultyLeaves.value || facultyLeaves.value < 0) {
        showError(facultyLeaves, 'Please enter a valid number');
        isValid = false;
    }

    // Validate subject entries
    const subjectEntries = document.querySelectorAll('.subject-entry');
    subjectEntries.forEach(entry => {
        const subjectName = entry.querySelector('.subject-name');
        const facultyName = entry.querySelector('.faculty-name');
        const classesPerWeek = entry.querySelector('.classes-per-week');

        if (!subjectName.value.trim()) {
            showError(subjectName, 'Subject name is required');
            isValid = false;
        }

        if (!facultyName.value.trim()) {
            showError(facultyName, 'Faculty name is required');
            isValid = false;
        }

        if (!classesPerWeek.value || classesPerWeek.value < 1) {
            showError(classesPerWeek, 'Please enter a valid number');
            isValid = false;
        }
    });

    return isValid;
}

// Store timetable data in localStorage
function storeTimetableData() {
    const timetableData = {
        classrooms: document.getElementById('classrooms').value,
        batches: document.getElementById('batches').value,
        maxClasses: document.getElementById('max-classes').value,
        facultyLeaves: document.getElementById('faculty-leaves').value,
        subjects: [],
        specialClasses: []
    };

    // Get subject data
    const subjectEntries = document.querySelectorAll('.subject-entry');
    subjectEntries.forEach(entry => {
        timetableData.subjects.push({
            subject: entry.querySelector('.subject-name').value,
            faculty: entry.querySelector('.faculty-name').value,
            classesPerWeek: entry.querySelector('.classes-per-week').value
        });
    });

    // Get special class data
    const specialEntries = document.querySelectorAll('.special-class-entry');
    specialEntries.forEach(entry => {
        timetableData.specialClasses.push({
            className: entry.querySelector('.special-class-name').value,
            day: entry.querySelector('.special-day').value,
            time: entry.querySelector('.special-time').value
        });
    });

    // Store in localStorage
    localStorage.setItem('timetableData', JSON.stringify(timetableData));
}

// Auth tab functionality
function initializeAuthTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const authForms = document.querySelectorAll('.auth-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tab = this.getAttribute('data-tab');

            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding form
            authForms.forEach(form => {
                if (form.id === `${tab}-form`) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });
}

// Animation initialization
function initializeAnimations() {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .about-content, .contact-container').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation for statistics
function initializeCounters() {
    const counterElements = document.querySelectorAll('.counter');
    if (counterElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counterElements.forEach(el => {
            counterObserver.observe(el);
        });
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize any charts if needed
function initializeCharts() {
    // This would be where you initialize any chart libraries
    // For example, if using Chart.js:
    /*
    const ctx = document.getElementById('timetableChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Classes per day',
                    data: [12, 19, 3, 5, 2],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    */
}