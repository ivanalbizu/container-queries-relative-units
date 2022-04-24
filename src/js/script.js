const containers = document.querySelectorAll("[data-container]");
const debug = document.querySelector("#debug");

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    if (entry.contentBoxSize) {
      const contentBoxSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;
      entry.target.setAttribute(
        "data-debug",
        Math.round(contentBoxSize.inlineSize)
      );
    } else {
      entry.target.setAttribute(
        "data-debug",
        Math.round(entry.contentRect.width)
      );
    }
  }
});

const handleCheckbox = () => {
  if (debug) {
    containers.forEach((container) => resizeObserver.observe(container));
  } else {
    containers.forEach((container) => resizeObserver.unobserve(container));
  }
};

debug.addEventListener("click", () => handleCheckbox());
