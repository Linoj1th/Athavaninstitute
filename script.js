// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        })

        // Close mobile menu if open
        document.getElementById("nav-toggle").checked = false
      }
    })
  })

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animated")
      }
    })
  }

  // Add animation classes to elements
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.classList.add("animate-on-scroll")
  })

  const classCards = document.querySelectorAll(".class-card")
  classCards.forEach((card) => {
    card.classList.add("animate-on-scroll")
  })

  const posterItems = document.querySelectorAll(".poster-item")
  posterItems.forEach((item) => {
    item.classList.add("animate-on-scroll")
  })

  const subjectCards = document.querySelectorAll(".subject-card")
  subjectCards.forEach((card) => {
    card.classList.add("animate-on-scroll")
  })

  // Hero section animation
  const heroContent = document.querySelector(".hero-content")
  const heroImage = document.querySelector(".hero-image")

  if (heroContent && heroImage) {
    heroContent.classList.add("animate-slide-right")
    heroImage.classList.add("animate-slide-left")
  }


  // Run animations on page load
  animateOnScroll()

  // Run animations on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Add typing animation to hero heading
  const heroHeading = document.querySelector(".hero-content h2")
  if (heroHeading) {
    const text = heroHeading.textContent
    heroHeading.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroHeading.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    // Start typing animation after a short delay
    setTimeout(typeWriter, 500)
  }

  // Add counter animation to subject cards
  const animateCounter = (element, target, duration) => {
    let start = 0
    const increment = target > 0 ? 1 : 0
    const stepTime = Math.abs(Math.floor(duration / target))

    const timer = setInterval(() => {
      start += increment
      element.textContent = start
      if (start >= target) {
        element.textContent = target
        clearInterval(timer)
      }
    }, stepTime)
  }

  // Add student count to subject cards
  const subjectLevels = document.querySelectorAll(".subject-level")
  subjectLevels.forEach((level, index) => {
    // Create student count element
    const studentCount = document.createElement("div")
    studentCount.classList.add("student-count")

    // Generate random number between 20 and 50
    const randomCount = Math.floor(Math.random() * 31) + 20
    studentCount.innerHTML = `<span class="count">0</span> Students Enrolled`

    // Add to DOM
    level.parentNode.insertBefore(studentCount, level)

    // Animate counter when element comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const countElement = entry.target.querySelector(".count")
          animateCounter(countElement, randomCount, 1000)
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(studentCount)
  })
})
