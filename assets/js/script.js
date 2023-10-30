// FORM VALIDATION

const form = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const nameErrorMessage = document.querySelector("#nameError");
const emailErrorMessage = document.querySelector("#emailError");

form.addEventListener("submit", function (event) {
  let valid = true;

  if (nameInput.value.trim() === "") {
    nameErrorMessage.classList.add("form-group__error");
    valid = false;
  } else {
    nameErrorMessage.classList.remove("form-group__error");
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailPattern.test(emailInput.value)) {
    emailErrorMessage.classList.add("form-group__error");
    valid = false;
  } else {
    emailErrorMessage.classList.remove("form-group__error");
  }

  if (!valid) {
    event.preventDefault();
  }
});


// ADD MODAL
function Modal() {
  const modalTriggers = document.querySelectorAll(".o-modal-trigger");
  const closeButtons = document.querySelectorAll(
    ".o-modal .o-modal-button-close",
  );

  const overlay = document.querySelector(".o-modal-overlay");

  function hideModal(modal) {
    modal.classList.add("o-modal-hidden");
    overlay.classList.add("o-modal-hidden");
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const modalId = trigger.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modal && overlay) {
        modal.classList.remove("o-modal-hidden");
        overlay.classList.remove("o-modal-hidden");
      }
    });
  });

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      hideModal(closeButton.closest(".o-modal"));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openModal = document.querySelectorAll(
        ".o-modal:not(.o-modal-hidden)",
      );

      openModal.forEach((modal) => hideModal(modal));
    }
  });
}
Modal();
