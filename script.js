// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Hero Slider Functionality
  const initHeroSlider = () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    const showSlide = (index) => {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    };
    
    // Function to show the next slide
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };
    
    // Function to show the previous slide
    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };
    
    // Start automatic slideshow
    const startSlideshow = () => {
      slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };
    
    // Stop automatic slideshow
    const stopSlideshow = () => {
      clearInterval(slideInterval);
    };
    
    // Event listeners for navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow(); // Restart the timer
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow(); // Restart the timer
      });
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopSlideshow();
        startSlideshow(); // Restart the timer
      });
    });
    
    // Pause slideshow when hovering over the slider
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopSlideshow);
      heroSection.addEventListener('mouseleave', startSlideshow);
    }
    
    // Initialize the slider
    showSlide(currentSlide);
    startSlideshow();
  };
  
  // Initialize the hero slider if it exists
  if (document.querySelector('.hero-slider')) {
    initHeroSlider();
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        });

        // Close mobile menu if open
        document.getElementById("nav-toggle").checked = false;
      }
    });
  });

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animated");
      }
    });
  };

  // Add animation classes to elements
  const sections = document.querySelectorAll("section:not(.hero-section)");
  sections.forEach((section) => {
    section.classList.add("animate-on-scroll");
  });

  const classCards = document.querySelectorAll(".class-card");
  classCards.forEach((card) => {
    card.classList.add("animate-on-scroll");
  });
  
  const posterItems = document.querySelectorAll(".poster-item");
  posterItems.forEach((item) => {
    item.classList.add("animate-on-scroll");
  });
  
  const subjectCards = document.querySelectorAll(".subject-card");
  subjectCards.forEach((card) => {
    card.classList.add("animate-on-scroll");
  });

  // Run animations on page load
  animateOnScroll();

  // Run animations on scroll
  window.addEventListener("scroll", animateOnScroll);
  
  // Add student count to subject cards
  const addStudentCounts = () => {
    const subjectCards = document.querySelectorAll(".subject-card");
    
    subjectCards.forEach((card) => {
      // Check if student count already exists
      if (!card.querySelector('.student-count')) {
        // Create student count element
        const studentCount = document.createElement("div");
        studentCount.classList.add("student-count");
        
        // Generate random number between 20 and 50
        const randomCount = Math.floor(Math.random() * 31) + 20;
        studentCount.innerHTML = `<span class="count">0</span> Students Enrolled`;
        
        // Add to DOM before the subject level
        const subjectLevel = card.querySelector('.subject-level');
        if (subjectLevel) {
          card.insertBefore(studentCount, subjectLevel);
        } else {
          card.appendChild(studentCount);
        }
        
        // Animate counter when element comes into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const countElement = entry.target.querySelector(".count");
              animateCounter(countElement, randomCount, 1000);
              observer.unobserve(entry.target);
            }
          });
        });
        
        observer.observe(studentCount);
      }
    });
  };
  
  // Counter animation function
  const animateCounter = (element, target, duration) => {
    let start = 0;
    const increment = target > 0 ? 1 : 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
      start += increment;
      element.textContent = start;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  };
  
  // Initialize student counts
  addStudentCounts();
  
  // Check if we're on mobile and show appropriate form option
  const checkFormDisplay = () => {
    const googleForm = document.querySelector('.google-form');
    const mobileButton = document.querySelector('.mobile-form-button');
    
    if (googleForm && mobileButton) {
      if (window.innerWidth <= 768) {
        googleForm.style.display = 'none';
        mobileButton.style.display = 'block';
      } else {
        googleForm.style.display = 'block';
        mobileButton.style.display = 'none';
      }
    }
  };
  
  // Run on load and resize
  checkFormDisplay();
  window.addEventListener('resize', checkFormDisplay);
});