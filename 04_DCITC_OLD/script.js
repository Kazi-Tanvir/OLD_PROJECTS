document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navbarLinks = document.querySelector(".navbar-links");

  if (hamburger && navbarLinks) {
    hamburger.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Typewriter Effect
  const typingDelay = 150;
  const erasingDelay = 100;
  const newTextDelay = 1000;
  let textArray = ["INFORMATION", "IT CLUB"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;

  function type() {
    const currentText = textArray[textIndex];
    const typewriterElement = document.getElementById("typewriter-text");

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(
        0,
        charIndex - 1
      );
      charIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(
        0,
        charIndex + 1
      );
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
        isDeleting = true;
        setTimeout(type, erasingDelay);
      }, newTextDelay);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, typingDelay);
      return;
    }

    const delay = isDeleting ? erasingDelay : typingDelay;
    setTimeout(type, delay);
  }

  setTimeout(type, newTextDelay);

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Carousel Functionality
  let nextDom = document.getElementById("next");
  let prevDom = document.getElementById("prev");

  let carouselDom = document.querySelector(".carousel");
  let SliderDom = carouselDom.querySelector(".carousel .list");
  let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
  let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
  let timeDom = document.querySelector(".carousel .time");

  thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
  let timeRunning = 3000;
  let timeAutoNext = 7000;

  nextDom.onclick = function () {
    showSlider("next");
  };

  prevDom.onclick = function () {
    showSlider("prev");
  };

  let runTimeOut;
  let runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);

  function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll(
      ".carousel .list .item"
    );
    let thumbnailItemsDom = document.querySelectorAll(
      ".carousel .thumbnail .item"
    );

    if (type === "next") {
      SliderDom.appendChild(SliderItemsDom[0]);
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      carouselDom.classList.add("next");
    } else {
      SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
      thumbnailBorderDom.prepend(
        thumbnailItemsDom[thumbnailItemsDom.length - 1]
      );
      carouselDom.classList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);
  }

  // Projects Slider Functionality
  const sliderContainer = document.querySelector(".slider-container");
  const slider = sliderContainer.querySelector("#sliderTrack");
  const slides = sliderContainer.querySelectorAll(".slide");
  const gap = 30; // Matches CSS gap in .slider-track
  let currentPosition = 0;

  function calculateMaxScroll() {
    const slideWidth = slides[0].offsetWidth;
    const totalWidth =
      slideWidth * slides.length + gap * (slides.length - 1);
    return -(totalWidth - sliderContainer.offsetWidth);
  }

  let maxScroll = calculateMaxScroll();
  let isWithinSlider = false;

  sliderContainer.addEventListener("mouseenter", function () {
    isWithinSlider = true;
  });

  sliderContainer.addEventListener("mouseleave", function () {
    isWithinSlider = false;
  });

  sliderContainer.addEventListener(
    "wheel",
    function (e) {
      if (
        (currentPosition > maxScroll && e.deltaY > 0) ||
        (currentPosition < 0 && e.deltaY < 0)
      ) {
        e.preventDefault();
        const delta = e.deltaY || e.deltaX;
        currentPosition -= delta;
        if (currentPosition > 0) {
          currentPosition = 0;
        } else if (currentPosition < maxScroll) {
          currentPosition = maxScroll;
        }
        slider.style.transform = `translateX(${currentPosition}px)`;
      }
    },
    { passive: false }
  );

  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  slider.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
    isDragging = true;
    slider.style.transition = "none";
  });

  slider.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    touchEndX = e.touches[0].clientX;
    const diff = touchEndX - touchStartX;
    const newPosition = currentPosition + diff;
    if (
      (newPosition <= 0 && newPosition >= maxScroll) ||
      (newPosition > 0 && currentPosition <= 0) ||
      (newPosition < maxScroll && currentPosition >= maxScroll)
    ) {
      slider.style.transform = `translateX(${newPosition}px)`;
    }
  });

  slider.addEventListener("touchend", function () {
    isDragging = false;
    slider.style.transition =
      "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    const diff = touchEndX - touchStartX;
    currentPosition += diff;
    if (currentPosition > 0) {
      currentPosition = 0;
    } else if (currentPosition < maxScroll) {
      currentPosition = maxScroll;
    }
    slider.style.transform = `translateX(${currentPosition}px)`;
    touchStartX = 0;
    touchEndX = 0;
  });

  let mouseStartX = 0;
  let mouseEndX = 0;

  slider.addEventListener("mousedown", function (e) {
    e.preventDefault();
    mouseStartX = e.clientX;
    isDragging = true;
    slider.style.transition = "none";
    slider.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    mouseEndX = e.clientX;
    const diff = mouseEndX - mouseStartX;
    const newPosition = currentPosition + diff;
    slider.style.transform = `translateX(${newPosition}px)`;
  });

  document.addEventListener("mouseup", function () {
    if (!isDragging) return;
    isDragging = false;
    slider.style.transition =
      "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    slider.style.cursor = "grab";
    const diff = mouseEndX - mouseStartX;
    currentPosition += diff;
    if (currentPosition > 0) {
      currentPosition = 0;
    } else if (currentPosition < maxScroll) {
      currentPosition = maxScroll;
    }
    slider.style.transform = `translateX(${currentPosition}px)`;
    mouseStartX = 0;
    mouseEndX = 0;
  });

  window.addEventListener("resize", function () {
    maxScroll = calculateMaxScroll();
    if (currentPosition < maxScroll) {
      currentPosition = maxScroll;
      slider.style.transform = `translateX(${currentPosition}px)`;
    } else if (currentPosition > 0) {
      currentPosition = 0;
      slider.style.transform = `translateX(${currentPosition}px)`;
    }
  });
});

// 3D Carousel Panel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card-3d");
  let currentIndex = 0;

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "prev", "next", "prev-2", "next-2");
      let position = index - currentIndex;
      if (position < -2) position += cards.length;
      if (position > 2) position -= cards.length;

      if (position === 0) {
        card.classList.add("active");
      } else if (position === -1) {
        card.classList.add("prev");
      } else if (position === -2) {
        card.classList.add("prev-2");
      } else if (position === 1) {
        card.classList.add("next");
      } else if (position === 2) {
        card.classList.add("next-2");
      }
    });
  }

  // Initialize carousel
  updateCards();

  // Add click event listeners to cards
  cards.forEach((card, index) => {
    card.addEventListener("click", function () {
      if (index !== currentIndex) {
        currentIndex = index;
        updateCards();
      }
    });
  });
});
