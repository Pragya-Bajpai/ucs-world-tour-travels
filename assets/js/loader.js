(function () {
  const loader = document.createElement("div");

  loader.id = "ucs-page-loader";

  loader.innerHTML = `
        <div class="ucs-loader-dots"></div>

        <!-- Flying Aeroplane -->
        <div class="ucs-flight-plane" aria-hidden="true">
            <div class="ucs-flight-trail"></div>

            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M480 32L32 224l190 66 66 190L480 32zM222 290l-2 122 49-101 211-279-258 258z"/>
            </svg>
        </div>

        <!-- Loader Content -->
        <div class="ucs-loader-content">

            <div class="ucs-loader-circle">

                <div class="ucs-loader-ring ucs-ring-one"></div>
                <div class="ucs-loader-ring ucs-ring-two"></div>
                <div class="ucs-loader-ring ucs-ring-three"></div>

                <div class="ucs-loader-center">
                    <img src="assets/images/logo-dark.png"
                         alt="UCS Logo">
                </div>

            </div>

            <h3 class="ucs-loader-title">
                UCS WORLD TOUR & TRAVELS
            </h3>

            <p class="ucs-loader-subtitle">
                Preparing Your Journey...
            </p>

            <div class="ucs-loader-progress">
                <span></span>
            </div>

        </div>
    `;

  document.body.appendChild(loader);

  window.addEventListener("load", function () {
    setTimeout(function () {
      loader.classList.add("loader-hidden");

      setTimeout(function () {
        loader.remove();
      }, 600);
    }, 400);
  });
})();
