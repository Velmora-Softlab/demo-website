/* MY FIRST PIERCING — Vanilla JavaScript interactions */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const detailData = {
    "ear-stack": [
      "Ear stack",
      "LAYERED EXPRESSION",
      "A personal composition of ear placements and jewelry. The right arrangement depends on your anatomy, preferred aesthetic, and suitable healing stages.",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=85",
    ],
    helix: [
      "Helix",
      "AN ELEVATED EDGE",
      "A cartilage placement along the outer upper ear. Explore how a subtle stud or hoop could complement your style. Suitability should be assessed by a qualified piercer.",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
    ],
    "forward-helix": [
      "Forward helix",
      "A CLOSER DETAIL",
      "A placement on the forward-facing upper ear cartilage. Anatomy, available space, and jewelry suitability need professional assessment.",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
    ],
    conch: [
      "Conch",
      "SCULPTURAL SIMPLICITY",
      "Positioned in the bowl-shaped area of the ear, a conch piercing can become a striking focal point. Discuss jewelry style and placement with your piercer.",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1100&q=85",
    ],
    tragus: [
      "Tragus",
      "UNDERSTATED IMPACT",
      "A detail placed on the small cartilage projection near the ear canal. Individual assessment is important when discussing jewelry, comfort, and suitability.",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1100&q=85",
    ],
    nostril: [
      "Nostril",
      "A SIGNATURE POINT",
      "A nostril piercing can feel minimal, expressive, or somewhere in between. Placement, jewelry fit, and material choice should be discussed with a qualified professional.",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1100&q=85",
    ],
    septum: [
      "Septum",
      "CONFIDENT EXPRESSION",
      "A septum piercing offers a distinctive focal point. Correct placement depends on anatomy and professional assessment.",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1100&q=85",
    ],
    jewelry: [
      "The finishing touch",
      "THE JEWELRY EDIT",
      "Consider proportion, shape, finish, and how pieces work together. Images are inspiration rather than verified inventory. Confirm designs, materials, and suitability directly.",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1100&q=85",
    ],
  };
  const labels = {
    "ear-stack": "Ear stack",
    helix: "Helix",
    "forward-helix": "Forward helix",
    conch: "Conch",
    tragus: "Tragus",
    nostril: "Nostril",
    septum: "Septum",
    jewelry: "Jewelry consultation",
  };

  // Mobile navigation
  const menuToggle = $("#menu-toggle"),
    nav = $("#primary-nav");
  function closeMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }
  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    nav?.classList.toggle("is-open", open);
  });
  $$(".primary-nav a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (e) => {
    if (
      nav?.classList.contains("is-open") &&
      !nav.contains(e.target) &&
      !menuToggle?.contains(e.target)
    )
      closeMenu();
  });
  window.addEventListener("resize", () => {
    if (innerWidth > 720) closeMenu();
  });
  $("#current-year").textContent = new Date().getFullYear();

  // Graceful fallback for broken remote images.
  const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#263F45"/><circle cx="400" cy="440" r="215" fill="none" stroke="#C8F2E8" stroke-opacity=".35" stroke-width="2"/><circle cx="400" cy="440" r="130" fill="none" stroke="#F0EDE4" stroke-opacity=".5" stroke-width="2"/><circle cx="400" cy="440" r="48" fill="none" stroke="#C8F2E8" stroke-width="2"/><text x="400" y="770" text-anchor="middle" fill="#F0EDE4" font-family="Georgia,serif" font-size="42">M · P</text><text x="400" y="820" text-anchor="middle" fill="#C8F2E8" font-family="Arial,sans-serif" font-size="17" letter-spacing="5">YOUR BODY. YOUR ART.</text></svg>`;
  const fallbackUrl =
    "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(fallbackSvg);
  $$("img").forEach((img) =>
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = "true";
      img.src = fallbackUrl;
    }),
  );
  const heroBg = $(".hero-image");
  if (heroBg) {
    const probe = new Image();
    probe.onload = () => (heroBg.style.backgroundImage = `url("${probe.src}")`);
    probe.onerror = () =>
      (heroBg.style.backgroundImage =
        "linear-gradient(135deg,#102F35,#263F45)");
    probe.src =
      "https://images.unsplash.com/photo-1785861137373-d06d18bdf961?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
  }

  // Scroll reveals
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(
      (entries, obs) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );
    revealItems.forEach((el) => observer.observe(el));
  } else revealItems.forEach((el) => el.classList.add("is-visible"));

  // True 3D carousel: eight cards around a ring using rotateY + translateZ.
  const carousel = $("#piercing-carousel"),
    ring = $("#carousel-ring"),
    stage = $(".carousel-stage");
  const cards = $$(".carousel-card"),
    count = $("#carousel-count");
  const title = $("#carousel-detail-title"),
    description = $("#carousel-detail-description");
  const detailLink = $("#carousel-detail-link"),
    playButton = $("#carousel-play");
  let active = 0,
    radius = 370,
    timer = null,
    autoplay = !reducedMotion.matches;
  let pointerInside = false,
    focusInside = false,
    touchStart = null;
  const step = 360 / Math.max(cards.length, 1);

  function calcRadius() {
    const width = stage?.clientWidth || 800;
    if (width <= 420) return Math.max(205, width * 0.65);
    if (width <= 720) return Math.max(270, width * 0.68);
    return Math.max(340, Math.min(490, width * 0.46));
  }
  function renderCarousel() {
    if (!ring || !cards.length) return;
    radius = calcRadius();
    cards.forEach((card, i) => {
      card.style.transform = `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`;
      card.classList.toggle("is-active", i === active);
      const button = $(".carousel-card-button", card);
      button?.setAttribute("aria-pressed", String(i === active));
      const key = card.dataset.key,
        data = detailData[key];
      button?.setAttribute(
        "aria-label",
        `${data?.[0] || key}, ${i + 1} of ${cards.length}`,
      );
      card.style.zIndex = String(
        cards.length -
          Math.min(Math.abs(i - active), cards.length - Math.abs(i - active)),
      );
    });
    ring.style.transform = `rotateY(${-active * step}deg)`;
    if (count) count.textContent = String(active + 1).padStart(2, "0");
    const data = detailData[cards[active]?.dataset.key];
    if (data) {
      if (title) title.textContent = data[0];
      if (description) description.textContent = data[2];
      if (detailLink) {
        detailLink.dataset.piercing = cards[active].dataset.key;
        detailLink.setAttribute("aria-label", `Ask about ${data[0]}`);
      }
    }
  }
  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function pauseRequired() {
    return (
      pointerInside ||
      focusInside ||
      document.hidden ||
      reducedMotion.matches ||
      !autoplay
    );
  }
  function startAutoplay() {
    stopAutoplay();
    if (!pauseRequired() && cards.length > 1)
      timer = setInterval(() => moveTo(active + 1, true), 4200);
    if (playButton) {
      playButton.textContent = autoplay ? "PAUSE MOTION" : "PLAY MOTION";
      playButton.setAttribute("aria-pressed", String(autoplay));
    }
  }
  function moveTo(index, fromTimer = false) {
    active = (index + cards.length) % cards.length;
    renderCarousel();
    if (!fromTimer) startAutoplay();
  }
  if (carousel && ring && cards.length) {
    renderCarousel();
    startAutoplay();
    $("#carousel-prev")?.addEventListener("click", () => moveTo(active - 1));
    $("#carousel-next")?.addEventListener("click", () => moveTo(active + 1));
    playButton?.addEventListener("click", () => {
      autoplay = !autoplay && !reducedMotion.matches;
      startAutoplay();
    });
    cards.forEach((card, i) =>
      $(".carousel-card-button", card)?.addEventListener("click", () => {
        if (active === i)
          openDetail(card.dataset.key, $(".carousel-card-button", card));
        else moveTo(i);
      }),
    );
    carousel.addEventListener("pointerenter", () => {
      pointerInside = true;
      stopAutoplay();
    });
    carousel.addEventListener("pointerleave", () => {
      pointerInside = false;
      startAutoplay();
    });
    carousel.addEventListener("focusin", () => {
      focusInside = true;
      stopAutoplay();
    });
    carousel.addEventListener("focusout", (e) => {
      if (!carousel.contains(e.relatedTarget)) {
        focusInside = false;
        startAutoplay();
      }
    });
    carousel.addEventListener("keydown", (e) => {
      if (
        e.target instanceof HTMLButtonElement &&
        ["Enter", " "].includes(e.key)
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveTo(active - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        moveTo(active + 1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        moveTo(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        moveTo(cards.length - 1);
      }
    });
    stage?.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      touchStart = { x: e.clientX, y: e.clientY };
    });
    stage?.addEventListener("pointerup", (e) => {
      if (!touchStart) return;
      const dx = e.clientX - touchStart.x,
        dy = e.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy))
        moveTo(active + (dx < 0 ? 1 : -1));
    });
    stage?.addEventListener("pointercancel", () => (touchStart = null));
    window.addEventListener("resize", renderCarousel, { passive: true });
    document.addEventListener("visibilitychange", () =>
      document.hidden ? stopAutoplay() : startAutoplay(),
    );
    const motionChanged = (e) => {
      if (e.matches) {
        autoplay = false;
        stopAutoplay();
        if (playButton) {
          playButton.textContent = "PLAY MOTION";
          playButton.setAttribute("aria-pressed", "false");
        }
      }
    };
    reducedMotion.addEventListener?.("change", motionChanged);
  }

  // Accessible details dialog
  const modal = $("#detail-modal"),
    modalImg = $("#modal-image");
  const modalEyebrow = $("#modal-eyebrow"),
    modalTitle = $("#modal-title");
  const modalDesc = $("#modal-description"),
    modalClose = $("#modal-close"),
    modalBook = $("#modal-book");
  let lastTrigger = null;
  function openDetail(key, trigger = document.activeElement) {
    const data = detailData[key];
    if (!data || !modal) return;
    lastTrigger = trigger instanceof HTMLElement ? trigger : null;
    if (modalImg) {
      modalImg.dataset.fallbackApplied = "";
      modalImg.src = data[3];
      modalImg.alt = `${data[0]} — editorial jewelry inspiration`;
    }
    if (modalEyebrow) modalEyebrow.textContent = data[1];
    if (modalTitle) modalTitle.textContent = data[0];
    if (modalDesc) modalDesc.textContent = data[2];
    if (modalBook) modalBook.dataset.piercing = key;
    if (modal.showModal) {
      if (!modal.open) modal.showModal();
    } else modal.setAttribute("open", "");
    document.body.classList.add("modal-open");
    modalClose?.focus();
  }
  function closeDetail() {
    if (!modal) return;
    if (modal.close && modal.open) modal.close();
    else {
      modal.removeAttribute("open");
      document.body.classList.remove("modal-open");
      lastTrigger?.focus();
    }
  }
  $$(".discovery-card").forEach((card) =>
    card.addEventListener("click", () => openDetail(card.dataset.detail, card)),
  );
  modalClose?.addEventListener("click", closeDetail);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeDetail();
  });
  modal?.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (lastTrigger?.isConnected) lastTrigger.focus();
  });
  function selectPiercing(key) {
    const select = $("#piercing-type");
    if (select && labels[key]) {
      const option = [...select.options].find((o) => o.value === labels[key]);
      if (option) select.value = option.value;
    }
  }
  modalBook?.addEventListener("click", () => {
    selectPiercing(modalBook.dataset.piercing);
    closeDetail();
  });
  detailLink?.addEventListener("click", () =>
    selectPiercing(detailLink.dataset.piercing),
  );

  // Demo form validation — no network request or persistence.
  const form = $("#booking-form"),
    nameInput = $("#full-name"),
    contactInput = $("#contact");
  const piercingInput = $("#piercing-type"),
    dateInput = $("#preferred-date"),
    messageInput = $("#message");
  const feedback = $("#form-feedback");
  const errors = {
    name: $("#name-error"),
    contact: $("#contact-error"),
    piercing: $("#piercing-error"),
    date: $("#date-error"),
  };
  const localDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  if (dateInput) dateInput.min = localDate(new Date());
  function error(input, node, message) {
    if (node) node.textContent = message;
    input?.setAttribute("aria-invalid", message ? "true" : "false");
  }
  function validateName() {
    const v = nameInput?.value.trim() || "";
    const message = !v
      ? "Please enter your name."
      : v.length < 2
        ? "Please enter at least 2 characters."
        : "";
    error(nameInput, errors.name, message);
    return !message;
  }
  function validateContact() {
    const v = contactInput?.value.trim() || "",
      digits = v.replace(/\D/g, "");
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const phone =
      /^\+?[\d\s().-]+$/.test(v) && digits.length >= 7 && digits.length <= 15;
    const message = !v
      ? "Enter an email address or phone number."
      : !email && !phone
        ? "Enter a valid email address or phone number."
        : "";
    error(contactInput, errors.contact, message);
    return !message;
  }
  function validatePiercing() {
    const message = piercingInput?.value
      ? ""
      : "Please choose a piercing category.";
    error(piercingInput, errors.piercing, message);
    return !message;
  }
  function validateDate() {
    const v = dateInput?.value || "",
      today = localDate(new Date());
    const message = !v
      ? "Choose your preferred date."
      : v < today
        ? "Choose today or a future date."
        : "";
    error(dateInput, errors.date, message);
    return !message;
  }
  function clearFeedback() {
    if (feedback) {
      feedback.hidden = true;
      feedback.replaceChildren();
    }
  }
  [
    [nameInput, validateName],
    [contactInput, validateContact],
    [piercingInput, validatePiercing],
    [dateInput, validateDate],
  ].forEach(([input, validator]) => {
    input?.addEventListener("input", () => {
      validator();
      clearFeedback();
    });
    input?.addEventListener("change", () => {
      validator();
      clearFeedback();
    });
  });
  messageInput?.addEventListener("input", clearFeedback);
  function showFeedback(headingText, messageText, inquiry) {
    if (!feedback) return;
    feedback.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = headingText;
    const body = document.createElement("p");
    body.textContent = messageText;
    feedback.append(heading, body);
    if (inquiry) {
      const preview = document.createElement("pre");
      preview.textContent = [
        `Name: ${inquiry.name}`,
        `Contact: ${inquiry.contact}`,
        `Piercing: ${inquiry.piercing}`,
        `Preferred date: ${inquiry.date}`,
        `Message: ${inquiry.message || "None provided"}`,
      ].join("\n");
      feedback.append(preview);
    }
    feedback.hidden = false;
    feedback.focus();
  }
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFeedback();
    const valid = [
      validateName(),
      validateContact(),
      validatePiercing(),
      validateDate(),
    ].every(Boolean);
    if (!valid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      showFeedback(
        "A few details need attention.",
        "Review the highlighted fields. Your information has not been sent.",
      );
      return;
    }
    const inquiry = {
      name: nameInput.value.trim(),
      contact: contactInput.value.trim(),
      piercing: piercingInput.value,
      date: dateInput.value,
      message: messageInput.value.trim(),
    };
    showFeedback(
      "Your inquiry preview is ready.",
      "Demo only — nothing has been sent or saved. To arrange a real appointment, call +1 659-280-7372 and confirm availability directly.",
      inquiry,
    );
  });
  form?.addEventListener("reset", () =>
    setTimeout(() => {
      Object.entries(errors).forEach(([key, node]) => {
        const input = {
          name: nameInput,
          contact: contactInput,
          piercing: piercingInput,
          date: dateInput,
        }[key];
        error(input, node, "");
      });
      clearFeedback();
    }, 0),
  );

  // Gentle hero parallax for fine pointers only.
  const hero = $(".hero"),
    orbits = $$(".hero-orbit");
  if (
    hero &&
    matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !reducedMotion.matches
  ) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      orbits.forEach((orbit, i) => {
        orbit.style.marginLeft = `${x * (i ? 7 : 12)}px`;
        orbit.style.marginTop = `${y * (i ? 7 : 12)}px`;
      });
    });
    hero.addEventListener("pointerleave", () =>
      orbits.forEach((o) => {
        o.style.marginLeft = "";
        o.style.marginTop = "";
      }),
    );
  }
});
