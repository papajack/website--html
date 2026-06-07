const STORAGE_KEY = "led_second_hand_market_products_v2";
const ADMIN_SESSION_KEY = "led_second_hand_market_admin_authed";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "change-me-123";

const defaultProducts = [
  {
    id: "p3.76-indoor-full-color",
    name: "P3 Indoor Full Color Screen",
    category: "Indoor",
    template: "template-a",
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
    category: "Rental",
    template: "template-b",
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
    category: "Outdoor",
    template: "template-c",
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
    category: "Indoor",
    template: "template-d",
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
    category: "Creative",
    template: "template-a",
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
    category: "Outdoor",
    template: "template-b",
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

let products = loadProducts();

function loadProducts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [...defaultProducts];
  }

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    return [...defaultProducts];
  }

  return [...defaultProducts];
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function setupMobileNav() {
  const menuToggle = document.getElementById("menu-toggle");
  const topNav = document.getElementById("top-nav");
  if (!menuToggle || !topNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    topNav.classList.toggle("open");
  });
}

function productLink(productId) {
  return `product-detail.html?id=${encodeURIComponent(productId)}`;
}

function createProductCard(product) {
  return `
    <article class="product-card">
      <a href="${productLink(product.id)}" aria-label="Open details for ${product.name}">
        <img class="card-media" src="${product.image}" alt="${product.name}" loading="lazy">
      </a>
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <ul class="spec-list">
          <li>Category: ${product.category || "General"}</li>
          <li>Size: ${product.specs.size}</li>
          <li>Pixel pitch: ${product.specs.pixelPitch}</li>
          <li>Brightness: ${product.specs.brightness}</li>
        </ul>
        <div class="card-row">
          <span class="price">${product.price}</span>
          <div class="card-actions">
            <a class="action-link" href="${productLink(product.id)}">Details</a>
            <a class="action-link" href="mailto:sales01@usedleddisplay.com?subject=Inquiry%20for%20${encodeURIComponent(product.name)}">Inquiry</a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderProductsInto(containerId, maxItems) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const list = typeof maxItems === "number" ? products.slice(0, maxItems) : products;
  container.innerHTML = list.map(createProductCard).join("");
}

function renderTemplateA(product) {
  return `
    <div class="detail-grid">
      <img class="detail-image" src="${product.image}" alt="${product.name}">
      <div>
        <p class="detail-tag">Template A - Standard Spec Overview</p>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <ul class="detail-specs">
          <li>Category: ${product.category || "General"}</li>
          <li>Size: ${product.specs.size}</li>
          <li>Pixel pitch: ${product.specs.pixelPitch}</li>
          <li>Brightness: ${product.specs.brightness}</li>
          <li>Refresh rate: ${product.specs.refreshRate}</li>
          <li>Voltage: ${product.specs.voltage}</li>
        </ul>
        <p class="detail-price">${product.price}</p>
      </div>
    </div>
  `;
}

function renderTemplateB(product) {
  return `
    <div class="detail-grid">
      <img class="detail-image" src="${product.image}" alt="${product.name}">
      <div>
        <p class="detail-tag">Template B - Technical Table</p>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <div class="spec-table">
          <div>Category</div><div>${product.category || "General"}</div>
          <div>Cabinet Size</div><div>${product.specs.size}</div>
          <div>Pixel Pitch</div><div>${product.specs.pixelPitch}</div>
          <div>Brightness</div><div>${product.specs.brightness}</div>
          <div>Refresh Rate</div><div>${product.specs.refreshRate}</div>
          <div>Voltage</div><div>${product.specs.voltage}</div>
        </div>
        <p class="detail-price">${product.price}</p>
      </div>
    </div>
  `;
}

function renderTemplateC(product) {
  return `
    <div class="detail-grid">
      <img class="detail-image" src="${product.image}" alt="${product.name}">
      <div>
        <p class="detail-tag">Template C - Feature Badges</p>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <div class="badge-stack">
          <span class="feature-badge">${product.category || "General"}</span>
          <span class="feature-badge">${product.specs.pixelPitch}</span>
          <span class="feature-badge">${product.specs.brightness}</span>
          <span class="feature-badge">${product.specs.refreshRate}</span>
          <span class="feature-badge">${product.specs.voltage}</span>
        </div>
        <ul class="detail-specs">
          <li>Cabinet size: ${product.specs.size}</li>
        </ul>
        <p class="detail-price">${product.price}</p>
      </div>
    </div>
  `;
}

function renderTemplateD(product) {
  return `
    <div class="detail-grid">
      <img class="detail-image" src="${product.image}" alt="${product.name}">
      <div>
        <p class="detail-tag">Template D - Project-Oriented Notes</p>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <div class="project-notes">
          <p><strong>Recommended use:</strong> ${product.category || "General project"} installations</p>
          <p><strong>Panel size:</strong> ${product.specs.size}</p>
          <p><strong>Visual density:</strong> ${product.specs.pixelPitch}</p>
          <p><strong>Light output:</strong> ${product.specs.brightness}</p>
          <p><strong>Drive frequency:</strong> ${product.specs.refreshRate}</p>
          <p><strong>Power input:</strong> ${product.specs.voltage}</p>
        </div>
        <p class="detail-price">${product.price}</p>
      </div>
    </div>
  `;
}

function renderProductDetailPage() {
  const container = document.getElementById("product-detail-container");
  if (!container) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "";
  const product = products.find((item) => item.id === id);

  if (!product) {
    container.innerHTML = `
      <h1>Product not found</h1>
      <p>This product may have been removed.</p>
      <a class="back-link" href="product-cat.html">Back to Products</a>
    `;
    return;
  }

  const template = product.template || "template-a";
  const templateMap = {
    "template-a": renderTemplateA,
    "template-b": renderTemplateB,
    "template-c": renderTemplateC,
    "template-d": renderTemplateD,
  };

  const renderer = templateMap[template] || renderTemplateA;
  container.innerHTML = `
    ${renderer(product)}
    <a class="btn btn-primary" href="mailto:sales01@usedleddisplay.com?subject=Price%20request%20for%20${encodeURIComponent(product.name)}">Contact for Price</a>
    <br>
    <a class="back-link" href="product-cat.html">Back to Products</a>
  `;
}

function resetAdminForm() {
  const form = document.getElementById("product-form");
  if (!form) {
    return;
  }

  form.reset();
  document.getElementById("product-id").value = "";
  document.getElementById("product-template").value = "template-a";
}

function renderAdminList() {
  const container = document.getElementById("admin-product-list");
  if (!container) {
    return;
  }

  container.innerHTML = products
    .map(
      (product) => `
      <article class="admin-item">
        <div>
          <h4>${product.name}</h4>
          <p>${product.category || "General"} • ${product.specs.pixelPitch} • ${product.price} • ${product.template || "template-a"}</p>
        </div>
        <div class="admin-item-actions">
          <button type="button" data-edit-id="${product.id}">Edit</button>
          <button type="button" data-delete-id="${product.id}">Delete</button>
        </div>
      </article>
      `
    )
    .join("");
}

function fillAdminForm(product) {
  document.getElementById("product-id").value = product.id;
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-category").value = product.category || "";
  document.getElementById("product-image").value = product.image;
  document.getElementById("product-template").value = product.template || "template-a";
  document.getElementById("spec-size").value = product.specs.size;
  document.getElementById("spec-pixel").value = product.specs.pixelPitch;
  document.getElementById("spec-brightness").value = product.specs.brightness;
  document.getElementById("spec-refresh").value = product.specs.refreshRate;
  document.getElementById("spec-voltage").value = product.specs.voltage;
  document.getElementById("product-description").value = product.description;
  document.getElementById("product-price").value = product.price;
}

function handleAdminSave(event) {
  event.preventDefault();

  const idValue = document.getElementById("product-id").value.trim();
  const name = document.getElementById("product-name").value.trim();
  const category = document.getElementById("product-category").value.trim();
  const image = document.getElementById("product-image").value.trim();
  const template = document.getElementById("product-template").value;
  const size = document.getElementById("spec-size").value.trim();
  const pixelPitch = document.getElementById("spec-pixel").value.trim();
  const brightness = document.getElementById("spec-brightness").value.trim();
  const refreshRate = document.getElementById("spec-refresh").value.trim();
  const voltage = document.getElementById("spec-voltage").value.trim();
  const description = document.getElementById("product-description").value.trim();
  const price = document.getElementById("product-price").value.trim();

  const finalId = idValue || `${slugify(name)}-${Date.now()}`;

  const productData = {
    id: finalId,
    name,
    category,
    template,
    image,
    specs: { size, pixelPitch, brightness, refreshRate, voltage },
    description,
    price,
  };

  const existingIndex = products.findIndex((item) => item.id === finalId);
  if (existingIndex >= 0) {
    products[existingIndex] = productData;
  } else {
    products.unshift(productData);
  }

  saveProducts();
  renderAdminList();
  resetAdminForm();
}

function handleAdminListClick(event) {
  const editId = event.target.getAttribute("data-edit-id");
  const deleteId = event.target.getAttribute("data-delete-id");

  if (editId) {
    const product = products.find((item) => item.id === editId);
    if (product) {
      fillAdminForm(product);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  if (deleteId) {
    if (!window.confirm("Delete this product?")) {
      return;
    }
    products = products.filter((item) => item.id !== deleteId);
    saveProducts();
    renderAdminList();
    resetAdminForm();
  }
}

function handleExport() {
  const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "products.json";
  link.click();
  URL.revokeObjectURL(url);
}

function handleImport(event) {
  const input = event.target;
  const file = input.files && input.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!Array.isArray(parsed)) {
        window.alert("Import failed: JSON must be an array.");
        return;
      }
      products = parsed;
      saveProducts();
      renderAdminList();
      resetAdminForm();
      window.alert("Products imported successfully.");
    } catch (error) {
      window.alert("Import failed: invalid JSON.");
    }
  };
  reader.readAsText(file);
  input.value = "";
}

function setupAdminAuth() {
  const loginWrap = document.getElementById("admin-login-wrap");
  const managerWrap = document.getElementById("admin-manager-wrap");
  const loginForm = document.getElementById("admin-login-form");
  const logoutButton = document.getElementById("admin-logout");
  const productForm = document.getElementById("product-form");
  const resetButton = document.getElementById("reset-form");
  const adminList = document.getElementById("admin-product-list");
  const exportButton = document.getElementById("export-products");
  const importInput = document.getElementById("import-products");

  if (!loginWrap || !managerWrap || !loginForm) {
    return;
  }

  const setAuthedView = (isAuthed) => {
    if (isAuthed) {
      loginWrap.classList.add("hidden");
      managerWrap.classList.remove("hidden");
      renderAdminList();
    } else {
      loginWrap.classList.remove("hidden");
      managerWrap.classList.add("hidden");
    }
  };

  const existingAuth = sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
  setAuthedView(existingAuth);

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      setAuthedView(true);
      loginForm.reset();
      return;
    }

    window.alert("Invalid credentials.");
  });

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      setAuthedView(false);
    });
  }

  if (productForm) {
    productForm.addEventListener("submit", handleAdminSave);
  }
  if (resetButton) {
    resetButton.addEventListener("click", resetAdminForm);
  }
  if (adminList) {
    adminList.addEventListener("click", handleAdminListClick);
  }
  if (exportButton) {
    exportButton.addEventListener("click", handleExport);
  }
  if (importInput) {
    importInput.addEventListener("change", handleImport);
  }
}

function boot() {
  setupMobileNav();
  const page = document.body.getAttribute("data-page") || "home";

  if (page === "home") {
    renderProductsInto("home-featured-grid", 4);
    return;
  }

  if (page === "products") {
    renderProductsInto("products-grid");
    return;
  }

  if (page === "detail") {
    renderProductDetailPage();
    return;
  }

  if (page === "admin") {
    setupAdminAuth();
  }
}

boot();
