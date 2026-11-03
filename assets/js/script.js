const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("show");
  });
}
function loadComponent(elementId, fileName) {
  fetch(fileName)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load ${fileName}`);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;

      if (elementId === "header") {
        initializeHeader();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function initializeHeader() {
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("show");
    });
  }
}

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");

document.addEventListener("DOMContentLoaded", function () {
  const bookingTabs = document.querySelectorAll(".booking-tab");

  const searchForm = document.getElementById("bookingSearchForm");

  const fromField = searchForm.querySelector('[data-field="from"]');
  const swapButton = searchForm.querySelector('[data-field="swap"]');
  const toField = searchForm.querySelector('[data-field="to"]');
  const departField = searchForm.querySelector('[data-field="depart"]');
  const travellersField = searchForm.querySelector('[data-field="travellers"]');
  const destinationField = searchForm.querySelector(
    '[data-field="destination"]',
  );

  bookingTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // Active Tab
      bookingTabs.forEach(function (item) {
        item.classList.remove("active");
      });

      this.classList.add("active");

      const selectedTab = this.dataset.tab;

      // Default: Hide Holiday Destination
      destinationField.hidden = true;

      // Flight
      if (selectedTab === "flight") {
        fromField.hidden = false;
        swapButton.hidden = false;
        toField.hidden = false;
        departField.hidden = false;
        travellersField.hidden = false;
      }

      // Bus
      else if (selectedTab === "bus") {
        fromField.hidden = false;
        swapButton.hidden = false;
        toField.hidden = false;
        departField.hidden = false;
        travellersField.hidden = true;
      }

      // Car
      else if (selectedTab === "car") {
        fromField.hidden = false;
        swapButton.hidden = false;
        toField.hidden = false;
        departField.hidden = false;
        travellersField.hidden = true;
      }

      // Holiday
      else if (selectedTab === "holiday") {
        fromField.hidden = true;
        swapButton.hidden = true;
        toField.hidden = true;
        departField.hidden = true;
        travellersField.hidden = true;

        destinationField.hidden = false;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const bookingTabs = document.querySelectorAll(".booking-tab");
  const tripOptions = document.querySelectorAll(".trip-option");

  const searchForm = document.getElementById("bookingSearchForm");
  const tripType = document.getElementById("tripType");

  const fromField = searchForm.querySelector('[data-field="from"]');
  const swapButton = searchForm.querySelector('[data-field="swap"]');
  const toField = searchForm.querySelector('[data-field="to"]');
  const departField = searchForm.querySelector('[data-field="depart"]');
  const returnField = searchForm.querySelector('[data-field="return"]');
  const travellersField = searchForm.querySelector('[data-field="travellers"]');
  const destinationField = searchForm.querySelector(
    '[data-field="destination"]',
  );

  const travellersInput = document.getElementById("travellerSummary");
  const travellersPopup = document.getElementById("travellersPopup");

  let activeTab = "flight";

  // Booking Tabs: Flight, Bus, Car, Holiday
  bookingTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      bookingTabs.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");

      activeTab = this.dataset.tab;

      travellersPopup.classList.remove("show");

      if (activeTab === "flight") {
        tripType.hidden = false;

        fromField.hidden = false;
        swapButton.hidden = false;
        toField.hidden = false;
        departField.hidden = false;
        travellersField.hidden = false;
        destinationField.hidden = true;

        updateTripType();
      } else if (activeTab === "bus" || activeTab === "car") {
        tripType.hidden = true;

        fromField.hidden = false;
        swapButton.hidden = false;
        toField.hidden = false;
        departField.hidden = false;
        returnField.hidden = true;
        travellersField.hidden = true;
        destinationField.hidden = true;
      } else if (activeTab === "holiday") {
        tripType.hidden = true;

        fromField.hidden = true;
        swapButton.hidden = true;
        toField.hidden = true;
        departField.hidden = true;
        returnField.hidden = true;
        travellersField.hidden = true;
        destinationField.hidden = false;
      }
    });
  });

  // Oneway, Round Trip, Multi City
  function updateTripType() {
    const selectedTrip = document.querySelector('input[name="trip"]:checked');

    if (!selectedTrip) return;

    tripOptions.forEach((option) => {
      option.classList.remove("active-trip");
    });

    selectedTrip.closest(".trip-option").classList.add("active-trip");

    if (
      selectedTrip.value === "roundtrip" ||
      selectedTrip.value === "multicity"
    ) {
      returnField.hidden = false;
    } else {
      returnField.hidden = true;
    }
  }

  tripOptions.forEach(function (option) {
    const radio = option.querySelector('input[name="trip"]');

    radio.addEventListener("change", function () {
      updateTripType();
    });

    option.addEventListener("click", function () {
      radio.checked = true;
      updateTripType();
    });
  });

  // Travellers Popup Open / Close
  travellersInput.addEventListener("click", function (event) {
    event.stopPropagation();
    travellersPopup.classList.toggle("show");
  });

  travellersPopup.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // Traveller Counts
  let adults = 1;
  let children = 0;
  let infants = 0;

  function updateTravellerSummary() {
    document.getElementById("adultsCount").textContent = adults;
    document.getElementById("childrenCount").textContent = children;
    document.getElementById("infantsCount").textContent = infants;

    let total = adults + children + infants;

    travellersInput.value =
      total + (total === 1 ? " Passenger" : " Passengers");
  }

  document.querySelectorAll(".counter-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const counter = this.dataset.counter;
      const action = this.dataset.action;

      if (counter === "adults") {
        if (action === "plus" && adults < 9) adults++;
        if (action === "minus" && adults > 1) adults--;
      }

      if (counter === "children") {
        if (action === "plus" && children < 8) children++;
        if (action === "minus" && children > 0) children--;
      }

      if (counter === "infants") {
        if (action === "plus" && infants < adults) infants++;
        if (action === "minus" && infants > 0) infants--;
      }

      updateTravellerSummary();
    });
  });

  // Cabin Class
  document.getElementById("cabinClass").addEventListener("change", function () {
    // Selected cabin class is available in this field.
  });

  // Close popup on outside click
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".travellers-field")) {
      travellersPopup.classList.remove("show");
    }
  });

  // Swap From and To
  swapButton.addEventListener("click", function () {
    const fromInput = fromField.querySelector("input");
    const toInput = toField.querySelector("input");

    const temp = fromInput.value;

    fromInput.value = toInput.value;
    toInput.value = temp;
  });

  // Initial Setup
  updateTripType();
  updateTravellerSummary();
});

/* =========================================
   SPECIAL OFFERS NORMAL SLIDER
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".offers-slider");
  const track = document.querySelector(".offers-track");
  const prevBtn = document.querySelector(".offer-prev");
  const nextBtn = document.querySelector(".offer-next");
  const dotsContainer = document.querySelector(".offer-dots");

  if (!slider || !track || !prevBtn || !nextBtn || !dotsContainer) {
    return;
  }

  const slides = Array.from(track.children);

  let currentIndex = 0;
  let autoSlide = null;

  function getVisibleSlides() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function getTotalSteps() {
    return Math.max(1, slides.length - getVisibleSlides() + 1);
  }

  function getSlideWidth() {
    const slide = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    return slide.getBoundingClientRect().width + gap;
  }

  function createDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < getTotalSteps(); i++) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.setAttribute("aria-label", "Go to offer " + (i + 1));

      dot.addEventListener("click", function () {
        currentIndex = i;
        updateSlider();
        restartAutoSlide();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const totalSteps = getTotalSteps();

    currentIndex = Math.max(0, Math.min(currentIndex, totalSteps - 1));

    const moveDistance = currentIndex * getSlideWidth();

    track.style.transform = `translateX(-${moveDistance}px)`;

    const dots = dotsContainer.querySelectorAll("button");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex++;

    if (currentIndex >= getTotalSteps()) {
      currentIndex = 0;
    }

    updateSlider();
  }

  function prevSlide() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = getTotalSteps() - 1;
    }

    updateSlider();
  }

  function startAutoSlide() {
    stopAutoSlide();

    autoSlide = setInterval(function () {
      nextSlide();
    }, 3500);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  function restartAutoSlide() {
    startAutoSlide();
  }

  nextBtn.addEventListener("click", function () {
    nextSlide();
    restartAutoSlide();
  });

  prevBtn.addEventListener("click", function () {
    prevSlide();
    restartAutoSlide();
  });

  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  window.addEventListener("resize", function () {
    currentIndex = 0;
    createDots();
    updateSlider();
  });

  createDots();
  updateSlider();
  startAutoSlide();
});
// Open / Close Language Dropdown
document.addEventListener("DOMContentLoaded", function () {
  const translateBtn = document.getElementById("translateBtn");
  const translateWrapper = document.querySelector(".translate-wrapper");

  if (!translateBtn || !translateWrapper) return;

  translateBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    translateWrapper.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!translateWrapper.contains(e.target)) {
      translateWrapper.classList.remove("active");
    }
  });
});

// Change Website Language
function changeLanguage(lang) {
  const select = document.querySelector(".goog-te-combo");

  if (!select) {
    alert("Google Translate is loading. Please try again.");
    return;
  }

  select.value = lang;
  select.dispatchEvent(new Event("change"));

  document.querySelector(".translate-wrapper")?.classList.remove("active");
}

// Google Translate Initialization
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,hi,bn,ta,te,gu,mr,pa",
      autoDisplay: false,
    },
    "google_translate_element",
  );
}
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Mobile Wallet Dropdown
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdown = document.querySelector(".dropdown");

  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  }

  // Language Dropdown
  const translateBtn = document.getElementById("translateBtn");
  const translateWrapper = document.querySelector(".translate-wrapper");

  if (translateBtn && translateWrapper) {
    translateBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      translateWrapper.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (!translateWrapper.contains(e.target)) {
        translateWrapper.classList.remove("active");
      }
    });
  }
});

// Google Translate Language Change
function changeLanguage(lang) {
  const select = document.querySelector(".goog-te-combo");

  if (!select) {
    alert("Google Translate is loading. Please try again.");
    return;
  }

  select.value = lang;
  select.dispatchEvent(new Event("change"));

  document.querySelector(".translate-wrapper")?.classList.remove("active");
}

// Google Translate Initialization
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,hi,bn,ta,te,gu,mr,pa",
      autoDisplay: false,
    },
    "google_translate_element",
  );
}
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Mobile Wallet Dropdown
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdown = document.querySelector(".dropdown");

  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  }

  // Language Dropdown
  const translateBtn = document.getElementById("translateBtn");
  const translateWrapper = document.querySelector(".translate-wrapper");

  if (translateBtn && translateWrapper) {
    translateBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      translateWrapper.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (!translateWrapper.contains(e.target)) {
        translateWrapper.classList.remove("active");
      }
    });
  }
});

// Google Translate Language Change
function changeLanguage(lang) {
  const select = document.querySelector(".goog-te-combo");

  if (!select) {
    alert("Google Translate is loading. Please try again.");
    return;
  }

  select.value = lang;
  select.dispatchEvent(new Event("change"));

  document.querySelector(".translate-wrapper")?.classList.remove("active");
}

// Google Translate Initialization
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,hi,bn,ta,te,gu,mr,pa",
      autoDisplay: false,
    },
    "google_translate_element",
  );
}
/* ================= FAQ ACCORDION ================= */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");

            faqItems.forEach(function (faq) {
                faq.classList.remove("active");
                faq.querySelector(".faq-question")
                    .setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }

        });

    });

});