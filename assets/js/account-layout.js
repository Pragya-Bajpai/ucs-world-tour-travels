document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("accountHeader");
  const sidebarContainer = document.getElementById("accountSidebarContainer");
  const overlay = document.getElementById("sidebarOverlay");

  const mobileBreakpoint = 991;

  // =====================================
  // LOAD HEADER AND SIDEBAR
  // =====================================

  async function loadAccountLayout() {
    try {
      const [headerResponse, sidebarResponse] = await Promise.all([
        fetch("includes/account-header.html"),
        fetch("includes/account-sidebar.html"),
      ]);

      if (!headerResponse.ok || !sidebarResponse.ok) {
        throw new Error("Unable to load account layout files.");
      }

      const headerHTML = await headerResponse.text();
      const sidebarHTML = await sidebarResponse.text();

      headerContainer.innerHTML = headerHTML;
      sidebarContainer.innerHTML = sidebarHTML;

      initializeAccountLayout();
    } catch (error) {
      console.error("Account Layout Error:", error);

      if (headerContainer) {
        headerContainer.innerHTML =
          '<p class="layout-error">Header could not be loaded.</p>';
      }

      if (sidebarContainer) {
        sidebarContainer.innerHTML =
          '<p class="layout-error">Sidebar could not be loaded.</p>';
      }
    }
  }

  // =====================================
  // INITIALIZE ACCOUNT LAYOUT
  // =====================================

  function initializeAccountLayout() {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("accountSidebar");

    const dropdown = document.getElementById("bookingDropdown");
    const dropdownToggle = document.getElementById("bookingDropdownToggle");

    // Header sidebar toggle
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", function () {
        if (window.innerWidth <= mobileBreakpoint) {
          toggleMobileSidebar();
        } else {
          document.body.classList.toggle("sidebar-collapsed");
        }
      });
    }

    // Booking history dropdown
    if (dropdown && dropdownToggle) {
      dropdownToggle.addEventListener("click", function () {
        const isOpen = dropdown.classList.toggle("open");

        dropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    // Mobile overlay click
    if (overlay) {
      overlay.addEventListener("click", closeMobileSidebar);
    }

    // Close mobile sidebar with Escape
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMobileSidebar();
      }
    });

    // Set active menu
    setActiveMenu();

    // Set current dashboard date
    setDashboardDate();
  }

  // =====================================
  // MOBILE SIDEBAR
  // =====================================

  
function toggleMobileSidebar() {
  document.body.classList.toggle("sidebar-open");
}

function closeMobileSidebar() {
  document.body.classList.remove("sidebar-open");
}


  // =====================================
  // ACTIVE SIDEBAR MENU
  // =====================================

  function setActiveMenu() {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    const pageMap = {
      "account-dashboard.html": "dashboard",
      "flight-list.html": "flight",
      "bus-list.html": "bus",
      "car-list.html": "car",
      "package-list.html": "package",
      "settings.html": "settings",
      "support-ticket.html": "support",
    };

    const currentKey = pageMap[currentPage];

    // Remove previous active classes
    document
      .querySelectorAll(".sidebar-link, .submenu-link")
      .forEach(function (link) {
        link.classList.remove("active");
      });

    // Find current page link
    if (!currentKey) return;

    const activeLink = document.querySelector(
      '[data-page="' + currentKey + '"]',
    );

    if (!activeLink) return;

    activeLink.classList.add("active");

    // Open booking dropdown for booking pages
    if (activeLink.classList.contains("submenu-link")) {
      const dropdown = document.getElementById("bookingDropdown");
      const dropdownToggle = document.getElementById("bookingDropdownToggle");

      if (dropdown) {
        dropdown.classList.add("open");
      }

      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "true");
      }
    }
  }

  // =====================================
  // CURRENT DATE
  // =====================================

  function setDashboardDate() {
    const dateElement = document.getElementById("currentDate");

    if (!dateElement) return;

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    dateElement.textContent = formattedDate;
  }

  // =====================================
  // WINDOW RESIZE
  // =====================================

  window.addEventListener("resize", function () {
    if (window.innerWidth > mobileBreakpoint) {
      closeMobileSidebar();
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  });

  // Load layout
  loadAccountLayout();
});
//flight-list.html js 
document.addEventListener("DOMContentLoaded", function () {
  const filterForm = document.getElementById("flightFilterForm");
  const fromDateInput = document.getElementById("flightFromDate");
  const toDateInput = document.getElementById("flightToDate");

  const searchInput = document.getElementById("flightBookingSearch");
  const resetButton = document.getElementById("resetFlightFilter");

  const tableBody = document.getElementById("flightBookingTableBody");
  const bookingTable = document.querySelector(".flight-booking-table");

  const noResults = document.getElementById("flightNoResults");

  const bookingCount = document.getElementById("bookingCount");
  const showingBookings = document.getElementById("showingBookings");

  if (!filterForm || !tableBody) {
    return;
  }

  const rows = Array.from(tableBody.querySelectorAll("tr"));

  // Apply date and keyword filters
  function applyFlightFilters() {
    const fromDate = fromDateInput.value;
    const toDate = toDateInput.value;

    const keyword = searchInput.value.trim().toLowerCase();

    let visibleCount = 0;

    rows.forEach(function (row) {
      const bookingDate = row.dataset.bookingDate || "";

      const rowText = row.textContent.toLowerCase();

      let matchesDate = true;
      let matchesSearch = true;

      // From Date Filter
      if (fromDate && bookingDate < fromDate) {
        matchesDate = false;
      }

      // To Date Filter
      if (toDate && bookingDate > toDate) {
        matchesDate = false;
      }

      // Search Filter
      if (keyword && !rowText.includes(keyword)) {
        matchesSearch = false;
      }

      const shouldShow = matchesDate && matchesSearch;

      row.style.display = shouldShow ? "" : "none";

      if (shouldShow) {
        visibleCount++;
      }
    });

    // Update booking counts
    bookingCount.textContent = visibleCount;
    showingBookings.textContent = visibleCount;

    // Show or hide empty state
    if (visibleCount === 0) {
      noResults.classList.add("show");
      bookingTable.style.display = "none";
    } else {
      noResults.classList.remove("show");
      bookingTable.style.display = "table";
    }
  }

  // Date Filter Submit
  filterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fromDate = fromDateInput.value;
    const toDate = toDateInput.value;

    if (fromDate && toDate && fromDate > toDate) {
      alert("From Date cannot be greater than To Date.");

      toDateInput.focus();

      return;
    }

    applyFlightFilters();
  });

  // Live Search
  searchInput.addEventListener("input", function () {
    applyFlightFilters();
  });

  // Reset Filters
  resetButton.addEventListener("click", function () {
    fromDateInput.value = "";
    toDateInput.value = "";
    searchInput.value = "";

    applyFlightFilters();
  });

  // Initial Table Count
  applyFlightFilters();
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.getElementById("mobileNavToggle");
  const navigation = document.getElementById("headerNavigation");

  const walletDropdown = document.getElementById("walletDropdown");

  const walletToggle = walletDropdown
    ? walletDropdown.querySelector(".header-dropdown-toggle")
    : null;

  // =====================================
  // MOBILE NAVIGATION OPEN / CLOSE
  // =====================================

  if (mobileToggle && navigation) {
    mobileToggle.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("active");

      mobileToggle.setAttribute("aria-expanded", isOpen);

      mobileToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';

      if (!isOpen && walletDropdown) {
        walletDropdown.classList.remove("active");
        walletToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // =====================================
  // WALLET DROPDOWN
  // =====================================

  if (walletToggle && walletDropdown) {
    walletToggle.addEventListener("click", function (event) {
      event.stopPropagation();

      const isOpen = walletDropdown.classList.toggle("active");

      walletToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  // =====================================
  // CLOSE ON OUTSIDE CLICK
  // =====================================

  document.addEventListener("click", function (event) {
    if (walletDropdown && !walletDropdown.contains(event.target)) {
      walletDropdown.classList.remove("active");

      if (walletToggle) {
        walletToggle.setAttribute("aria-expanded", "false");
      }
    }

    if (
      navigation &&
      mobileToggle &&
      !navigation.contains(event.target) &&
      !mobileToggle.contains(event.target)
    ) {
      navigation.classList.remove("active");

      mobileToggle.setAttribute("aria-expanded", "false");

      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // =====================================
  // RESET ON DESKTOP RESIZE
  // =====================================

  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
      navigation?.classList.remove("active");

      walletDropdown?.classList.remove("active");

      mobileToggle?.setAttribute("aria-expanded", "false");

      walletToggle?.setAttribute("aria-expanded", "false");

      if (mobileToggle) {
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});
