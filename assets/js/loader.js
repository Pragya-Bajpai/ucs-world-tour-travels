(function () {
  const loader = document.createElement("div");

  loader.id = "ucs-page-loader";

  loader.innerHTML = `
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
