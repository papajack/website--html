const defaultProducts = [
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

const STORAGE_KEY = "led_second_hand_market_products_v1";

let products = loadProducts();

const views = {
  home: document.getElementById("home-view"),
  about: document.getElementById("about-view"),
  contact: document.getElementById("contact-view"),
  admin: document.getElementById("admin-view"),
  detail: document.getElementById("detail-view"),
};

const productsGrid = document.getElementById("products-grid");
const detailContainer = document.getElementById("product-detail-container");
const navLinks = Array.from(document.querySelectorAll(".top-nav a"));
const topNav = document.getElementById("top-nav");
const menuToggle = document.getElementById("menu-toggle");
const productForm = document.getElementById("product-form");
const resetFormButton = document.getElementById("reset-form");
const adminProductList = document.getElementById("admin-product-list");
const exportButton = document.getElementById("export-products");
const importInput = document.getElementById("import-products");

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
    return [...defaultProducts];
  } catch (error) {
    return [...defaultProducts];
  }
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

function renderAdminList() {
  if (!adminProductList) {
    return;
  }

  adminProductList.innerHTML = products
    .map(
      (product) => `
      <article class="admin-item">
        <div>
          <h4>${product.name}</h4>
          <p>${product.specs.pixelPitch} • ${product.specs.brightness} • ${product.price}</p>
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

function resetAdminForm() {
  productForm.reset();
  document.getElementById("product-id").value = "";
}

function fillAdminForm(product) {
  document.getElementById("product-id").value = product.id;
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-image").value = product.image;
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
  const image = document.getElementById("product-image").value.trim();
  const size = document.getElementById("spec-size").value.trim();
  const pixelPitch = document.getElementById("spec-pixel").value.trim();
  const brightness = document.getElementById("spec-brightness").value.trim();
  const refreshRate = document.getElementById("spec-refresh").value.trim();
  const voltage = document.getElementById("spec-voltage").value.trim();
  const description = document.getElementById("product-description").value.trim();
  const price = document.getElementById("product-price").value.trim();

  const baseId = slugify(name);
  const finalId = idValue || `${baseId}-${Date.now()}`;

  const productData = {
    id: finalId,
    name,
    image,
    specs: { size, pixelPitch, brightness, refreshRate, voltage },
    description,
    price,
  };

  const existingIndex = products.findIndex((product) => product.id === finalId);
  if (existingIndex >= 0) {
    products[existingIndex] = productData;
  } else {
    products.unshift(productData);
  }

  saveProducts();
  renderProducts();
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
    const shouldDelete = window.confirm("Delete this product?");
    if (!shouldDelete) {
      return;
    }
    products = products.filter((item) => item.id !== deleteId);
    saveProducts();
    renderProducts();
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
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!Array.isArray(parsed)) {
        window.alert("Import failed: JSON must be an array of products.");
        return;
      }

      products = parsed;
      saveProducts();
      renderProducts();
      renderAdminList();
      resetAdminForm();
      window.alert("Products imported successfully.");
    } catch (error) {
      window.alert("Import failed: invalid JSON file.");
    }
  };
  reader.readAsText(file);
  importInput.value = "";
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

  if (route === "admin") {
    views.admin.classList.remove("hidden");
    setActiveNav("#admin");
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

productForm.addEventListener("submit", handleAdminSave);
resetFormButton.addEventListener("click", resetAdminForm);
adminProductList.addEventListener("click", handleAdminListClick);
exportButton.addEventListener("click", handleExport);
importInput.addEventListener("change", handleImport);

renderProducts();
renderAdminList();
window.addEventListener("hashchange", onRouteChange);
onRouteChange();