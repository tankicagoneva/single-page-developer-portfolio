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
    // mark as hidden for assistive tech
    if (modal) modal.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      // ensure trigger has id so we can restore focus later
      if (!trigger.id) trigger.id = `modal-trigger-${Math.floor(Math.random() * 100000)}`;
      const modalId = trigger.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modal && overlay) {
        // store trigger id to restore focus after close
        modal.setAttribute('data-trigger-id', trigger.id);
        modal.classList.remove("o-modal-hidden");
        overlay.classList.remove("o-modal-hidden");
        // mark as visible for assistive tech
        modal.setAttribute('aria-hidden', 'false');
        overlay.setAttribute('aria-hidden', 'false');
        // move focus into the modal for keyboard users
        modal.focus();
      }
    });
  });

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      const modal = closeButton.closest(".o-modal");
      hideModal(modal);
      // move focus back to the trigger when possible
      const triggerId = modal ? modal.getAttribute('data-trigger-id') : null;
      if (triggerId) {
        const trigger = document.querySelector(`[data-modal="${triggerId}"]`);
        if (trigger) trigger.focus();
      }
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
