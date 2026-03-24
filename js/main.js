const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

document.querySelectorAll('a[href]').forEach((link) => {
  const href = link.getAttribute("href");

  const isInternalLink =
    href &&
    !href.startsWith("http") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("#") &&
    !link.hasAttribute("download") &&
    !link.getAttribute("target");

  if (isInternalLink) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.add("page-exit");

      setTimeout(() => {
        window.location.href = href;
      }, 220);
    });
  }
});