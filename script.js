const products = [
  {
    id: "p3-indoor-full-color",
    name: "P3 Indoor Full Color Screen",
    image: "https://picsum.photos/seed/led-p3/900/620",
    specs: {
      size: "500x500mm cabinet",
      pixelPitch: "P3.0",
      brightness: "1200 nits",
      refreshRate: "1920 Hz",
      voltage: "AC 110-220V",
    },
    description: "Well-maintained indoor display with stable colors and low dead-pixel rate. Suitable for conference halls, retail stores, and showrooms.",
    price: "$145 per cabinet",
  },
  {
    id: "p4-outdoor-rental",
    name: "P4 Outdoor Rental LED Panel",
    image: "https://picsum.photos/seed/led-p4/900/620",
    specs: {
      size: "500x1000mm cabinet",
      pixelPitch: "P4.0",
      brightness: "5000 nits",
      refreshRate: "3840 Hz",
      voltage: "AC 110-220V",
    },
    description: "Strong outdoor brightness and robust locking system. Ideal for stage rental and temporary outdoor installations.",
    price: "Contact for price",
  },
  {
    id: "p5-fixed-installation",
    name: "P5 Outdoor Fixed Installation",
    image: "https://picsum.photos/seed/led-p5/900/620",
    specs: {
      size: "960x960mm cabinet",
      pixelPitch: "P5.0",
      brightness: "6500 nits",
      refreshRate: "1920 Hz",
      voltage: "AC 110-220V",
    },
    description: "Reliable fixed-installation option for roadside advertising and building facades. Built for continuous operation.",
    price: "$190 per sqm",
  },
  {
    id: "p2-5-indoor-fine-pitch",
    name: "P2.5 Indoor Fine Pitch Module",
    image: "https://picsum.photos/seed/led-p25/900/620",
    specs: {
      size: "640x480mm cabinet",
      pixelPitch: "P2.5",
      brightness: "1000 nits",
      refreshRate: "3840 Hz",
      voltage: "AC 110-220V",
    },
    description: "Fine-pitch used panels in good condition for control rooms and brand display walls requiring close viewing distance.",
    price: "$260 per cabinet",
  },
  {
    id: "transparent-led-wall",
    name: "Transparent LED Glass Wall",
    image: "https://picsum.photos/seed/led-transparent/900/620",
    specs: {
      size: "1000x500mm",
      pixelPitch: "P7.8-7.8",
      brightness: "4500 nits",
      refreshRate: "3000 Hz",
      voltage: "AC 110-220V",
    },
    description: "Lightweight transparent panels for storefronts and window-facing ads. Easy to integrate with existing structures.",
    price: "Inquiry",
  },
  {
    id: "perimeter-sports-display",
    name: "Sports Perimeter LED Display",
    image: "https://picsum.photos/seed/led-sport/900/620",
    specs: {
      size: "960x960mm cabinet",
      pixelPitch: "P10",
      brightness: "7000 nits",
      refreshRate: "1920 Hz",
      voltage: "AC 110-220V",
    },
    description: "Impact-resistant used perimeter cabinets with high brightness, designed for stadium and arena applications.",
    price: "Contact for price",
  },
];

const views = {
  home: document.getElementById("home-view"),
  about: document.getElementById("about-view"),
  contact: document.getElementById("contact-view"),
  detail: document.getElementById("detail-view"),
};

const productsGrid = document.getElementById("products-grid");
const detailContainer = document.getElementById("product-detail-container");
const navLinks = Array.from(document.querySelectorAll(".top-nav a"));
const topNav = document.getElementById("top-nav");
const menuToggle = document.getElementById("menu-toggle");

function renderProducts() {
  productsGrid.innerHTML = products
    .map((product) => {
      return `
      <article class="product-card">
        <a href="#product/${product.id}" aria-label="Open details for ${product.name}">
          <img class="card-media" src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <ul class="spec-list">
            <li>Size: ${product.specs.size}</li>
            <li>Pixel pitch: ${product.specs.pixelPitch}</li>
            <li>Brightness: ${product.specs.brightness}</li>
          </ul>
          <div class="card-row">
            <span class="price">${product.price}</span>
            <div class="card-actions">
              <a class="action-link" href="#product/${product.id}">Details</a>
              <a class="action-link" href="mailto:sales@ledsecondhandmarket.com?subject=Inquiry%20for%20${encodeURIComponent(product.name)}">Inquiry</a>
            </div>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function renderDetail(id) {
  const product = products.find((item) => item.id === id);

  if (!product) {
    detailContainer.innerHTML = `
      <h2>Product not found</h2>
      <p>The product link may be outdated. Please return to the product list.</p>
      <a class="back-link" href="#products">Back to Products</a>
    `;
    return;
  }

  detailContainer.innerHTML = `
    <div class="detail-grid">
      <img class="detail-image" src="${product.image}" alt="${product.name}">
      <div>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <ul class="detail-specs">
          <li>Size: ${product.specs.size}</li>
          <li>Pixel pitch: ${product.specs.pixelPitch}</li>
          <li>Brightness: ${product.specs.brightness}</li>
          <li>Refresh rate: ${product.specs.refreshRate}</li>
          <li>Voltage: ${product.specs.voltage}</li>
        </ul>
        <p class="detail-price">${product.price}</p>
        <a class="btn btn-primary" href="mailto:sales@ledsecondhandmarket.com?subject=Price%20request%20for%20${encodeURIComponent(product.name)}">Contact for Price</a>
        <br>
        <a class="back-link" href="#products">Back to Products</a>
      </div>
    </div>
  `;
}

function setActiveView(route) {
  Object.values(views).forEach((view) => view.classList.add("hidden"));

  if (route.startsWith("product/")) {
    const productId = route.replace("product/", "");
    views.detail.classList.remove("hidden");
    renderDetail(productId);
    setActiveNav("");
    return;
  }

  if (route === "about") {
    views.about.classList.remove("hidden");
    setActiveNav("#about");
    return;
  }

  if (route === "contact") {
    views.contact.classList.remove("hidden");
    setActiveNav("#contact");
    return;
  }

  views.home.classList.remove("hidden");
  setActiveNav(route === "products" ? "#products" : "#home");

  if (route === "products") {
    requestAnimationFrame(() => {
      document.getElementById("products-anchor").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function setActiveNav(routeHref) {
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === routeHref) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function getCurrentRoute() {
  const raw = window.location.hash.replace("#", "").trim();
  return raw || "home";
}

function onRouteChange() {
  const route = getCurrentRoute();
  setActiveView(route);
  topNav.classList.remove("open");
}

menuToggle.addEventListener("click", () => {
  topNav.classList.toggle("open");
});

renderProducts();
window.addEventListener("hashchange", onRouteChange);
onRouteChange();