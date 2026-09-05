// Dream Digital Hub - Frontend script
// Loads content from the static data.json file and fills whichever page
// is currently open. Every render function checks if its target element
// exists on the page before doing anything, so this single script works
// across all pages.

async function loadSiteData() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    renderLogo(data.logo);
    renderHero(data.hero);
    renderTicker(data.services);
    renderServicesPreview(data.services);
    renderServicesFull(data.services);
    renderPricing(data.pricing);
    renderFAQ(data.faq);
    renderTeamPreview(data.team);
    renderTeamFull(data.team);
    renderContact(data.contact);
    renderFooter(data.footer);
  } catch (err) {
    console.error("Could not load site data:", err);
  }
}

function renderLogo(logo) {
  const imgEl = document.getElementById("logoImage");
  if (!logo || !imgEl) return;
  imgEl.src = logo.image;
}

function renderHero(hero) {
  const heading = document.getElementById("heroHeading");
  const desc = document.getElementById("heroDescription");
  if (!hero || !heading || !desc) return;
  heading.textContent = hero.heading;
  desc.textContent = hero.description;
}

// ---- Scrolling price ticker (shown at the very top of every page) ----
function renderTicker(services) {
  const track = document.getElementById("tickerTrack");
  if (!track || !services) return;
  const items = services
    .map((s) => `<span class="ticker-item">${escapeHTML(s.name)} <strong>${escapeHTML(s.price || "Custom Pricing")}</strong></span>`)
    .join("");
  // duplicated once so the CSS animation loop is seamless
  track.innerHTML = items + items;
}

// ---- Services: short preview on the Home page ----
function renderServicesPreview(services) {
  const grid = document.getElementById("servicesPreviewGrid");
  if (!grid) return;
  grid.innerHTML = "";
  (services || []).slice(0, 6).forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "service-card accent-" + (i % 4);
    card.innerHTML = `<h3>${escapeHTML(s.name)}</h3><p>${escapeHTML(s.desc)}</p>`;
    grid.appendChild(card);
  });
}

// ---- Services: full list with pricing on the Services page ----
function renderServicesFull(services) {
  const grid = document.getElementById("servicesFullGrid");
  if (!grid) return;
  grid.innerHTML = "";
  (services || []).forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "service-card accent-" + (i % 4);
    const priceHTML = s.price
      ? `<div class="service-price">${escapeHTML(s.price)}</div>`
      : `<div class="service-price service-price-custom">Custom Pricing</div>`;
    card.innerHTML = `<h3>${escapeHTML(s.name)}</h3><p>${escapeHTML(s.desc)}</p>${priceHTML}`;
    grid.appendChild(card);
  });
}

function renderPricing(pricing) {
  const grid = document.getElementById("pricingGrid");
  if (!grid) return;
  grid.innerHTML = "";
  (pricing || []).forEach((p) => {
    const card = document.createElement("div");
    card.className = "pricing-card" + (p.popular ? " pricing-card-popular" : "");
    card.innerHTML = `
      ${p.popular ? '<div class="popular-badge">Most Popular</div>' : ""}
      <h3>${escapeHTML(p.name)}</h3>
      <div class="pricing-price">${escapeHTML(p.price)}</div>
      <p class="pricing-desc">${escapeHTML(p.desc)}</p>
      <p class="pricing-features">${escapeHTML(p.features)}</p>
      <a href="contact.html" class="btn">Get Started</a>
    `;
    grid.appendChild(card);
  });
}

// ---- FAQ accordion (Services page) ----
function renderFAQ(faq) {
  const list = document.getElementById("faqList");
  if (!list || !faq) return;
  list.innerHTML = "";
  faq.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "faq-item";
    row.innerHTML = `
      <button class="faq-question" type="button" aria-expanded="false">
        <span>${escapeHTML(item.q)}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer"><p>${escapeHTML(item.a)}</p></div>
    `;
    const btn = row.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isOpen = row.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    list.appendChild(row);
  });
}

// ---- Team: short preview on the Home page ----
function renderTeamPreview(team) {
  const grid = document.getElementById("teamPreviewGrid");
  if (!grid) return;
  grid.innerHTML = "";
  (team || []).forEach((member) => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
      <img class="team-photo" src="${member.photo}" alt="${escapeHTML(member.name)}"
           onerror="this.src='/uploads/placeholder.png'" />
      <h3>${escapeHTML(member.name)}</h3>
      <p>${escapeHTML(member.role)}</p>
    `;
    grid.appendChild(card);
  });
}

// ---- Team: full bios on the About page ----
function renderTeamFull(team) {
  const list = document.getElementById("teamFullList");
  if (!list) return;
  list.innerHTML = "";
  (team || []).forEach((member) => {
    const row = document.createElement("div");
    row.className = "team-full-card";
    const skills = (member.skills || [])
      .map((sk) => `<span class="skill-tag">${escapeHTML(sk)}</span>`)
      .join("");
    row.innerHTML = `
      <img class="team-full-photo" src="${member.photo}" alt="${escapeHTML(member.name)}"
           onerror="this.src='/uploads/placeholder.png'" />
      <div class="team-full-body">
        <p class="team-full-role">${escapeHTML(member.role)}</p>
        <h2>${escapeHTML(member.name)}</h2>
        <p class="team-full-bio">${escapeHTML(member.bio || "")}</p>
        <div class="skill-tags">${skills}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

function renderContact(contact) {
  const phoneEl = document.getElementById("contactPhone");
  const emailEl = document.getElementById("contactEmail");
  const waBtn = document.getElementById("whatsappBtn");
  if (!contact) return;
  if (phoneEl) phoneEl.textContent = contact.phone;
  if (emailEl) emailEl.textContent = contact.email;
  if (waBtn) waBtn.href = `https://wa.me/${contact.whatsapp}`;
}

function renderFooter(footerText) {
  const el = document.getElementById("footerText");
  if (!footerText || !el) return;
  el.textContent = footerText;
}

function escapeHTML(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("open");
  });
}

// Close mobile menu after clicking a link
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.remove("open");
  });
});

// Contact form (demo submit - shows confirmation)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! Your message has been received. We'll contact you soon.");
    this.reset();
  });
}

loadSiteData();
