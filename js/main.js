const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const successPopup = document.querySelector("#successPopup");
const closeSuccessPopup = document.querySelector("#closeSuccessPopup");

function openMenu() {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
}

function handlePageTransitions() {
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute("href");

    const isInternalLink =
      href &&
      !href.startsWith("http") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("#") &&
      !link.hasAttribute("download") &&
      !link.getAttribute("target");

    if (!isInternalLink) return;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.add("page-exit");

      setTimeout(() => {
        window.location.href = href;
      }, 220);
    });
  });
}

function showFormError(message = "Something went wrong. Please try again.") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.add("error");
}

function clearFormStatus() {
  if (!formStatus) return;
  formStatus.textContent = "";
  formStatus.classList.remove("error");
}

function openSuccessPopup() {
  if (!successPopup) return;
  successPopup.classList.add("show");
  successPopup.setAttribute("aria-hidden", "false");
}

function closePopup() {
  if (!successPopup) return;
  successPopup.classList.remove("show");
  successPopup.setAttribute("aria-hidden", "true");
}

function handleContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (!submitButton) return;

    const originalButtonText = submitButton.textContent;
    const formData = new FormData(contactForm);

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    clearFormStatus();

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        showFormError();
        return;
      }

      contactForm.reset();
      openSuccessPopup();
    } catch (error) {
      showFormError();
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

function handleSuccessPopup() {
  if (!successPopup) return;

  if (closeSuccessPopup) {
    closeSuccessPopup.addEventListener("click", closePopup);
  }

  successPopup.addEventListener("click", (event) => {
    if (event.target === successPopup) {
      closePopup();
    }
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", openMenu);
}

handlePageTransitions();
handleContactForm();
handleSuccessPopup();