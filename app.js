const menuRoot = document.querySelector("#menu-root");
const categoryTabs = document.querySelector("#category-tabs");
const categoryRail = document.querySelector("#category-rail");
const categoryPickerToggle = document.querySelector("#category-picker-toggle");
const categoryPickerCurrent = document.querySelector("#category-picker-current");
const categoryPickerBackdrop = document.querySelector("#category-picker-backdrop");
const categoryPickerPanel = document.querySelector("#category-picker-panel");
const categoryPickerList = document.querySelector("#category-picker-list");
const categoryPickerClose = document.querySelector("#category-picker-close");
const searchInput = document.querySelector("#menu-search");
const resultCount = document.querySelector("#result-count");
const clearSearch = document.querySelector("#clear-search");
const featuredRoot = document.querySelector("#featured-specials-root");
const siteHeader = document.querySelector(".site-header");
const menuHero = document.querySelector(".menu-hero");
const backTop = document.querySelector("#back-top");
const priceListToggle = document.querySelector("#price-list-toggle");
const priceListBadge = document.querySelector("#price-list-badge");
const priceListBackdrop = document.querySelector("#price-list-backdrop");
const priceListPanel = document.querySelector("#price-list-panel");
const priceListLines = document.querySelector("#price-list-lines");
const priceListTotal = document.querySelector("#price-list-total");
const priceListClear = document.querySelector("#price-list-clear");
const priceListCopy = document.querySelector("#price-list-copy");
const priceListClose = document.querySelector("#price-list-close");
const priceListFab = document.querySelector("#price-list-fab");
const priceListFabBadge = document.querySelector("#price-list-fab-badge");
const priceSummaryLines = document.querySelector("#price-summary-lines");
const priceSummaryTotal = document.querySelector("#price-summary-total");
const priceSummaryOpenButtons = document.querySelectorAll("[data-price-summary-open]");
const priceSummaryClear = document.querySelector("[data-price-summary-clear]");
const priceSummaryCopy = document.querySelector("[data-price-summary-copy]");

let activeCategory = "all";
let categoryPickerOpen = false;

const menuSearch = window.menuSearch;
if (!menuSearch) throw new Error("menu-search.js must load before app.js");

const scrollMotionBehavior = () =>
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

const getStickyOverlapPx = () => {
  const header = document.querySelector(".site-header");
  const tools = document.querySelector(".menu-tools");
  const headerPosition = header ? window.getComputedStyle(header).position : "";
  const headerOverlap = ["fixed", "sticky"].includes(headerPosition) ? header.offsetHeight : 0;
  return headerOverlap + (tools?.offsetHeight ?? 120) + 8;
};

const updateScrollMargin = () => {
  document.documentElement.style.setProperty("--menu-scroll-margin", `${getStickyOverlapPx()}px`);
};

const slugifyKeyPart = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const itemKey = (item) => String(item?.number || item?.id || slugifyKeyPart(item?.nameEn || item?.nameZh || "item"));

const itemAnchorId = (categoryId, key) => {
  const safe = String(key ?? "").replace(/[^a-zA-Z0-9_-]/g, "_");
  return `dish-${categoryId}__${safe}`;
};

const parseHash = () => {
  if (!window.menuData?.length) return { mode: "all" };
  const raw = decodeURIComponent(String(location.hash || "").replace(/^#/, "")).trim();
  if (!raw || raw === "all") return { mode: "all" };
  if (raw.startsWith("dish-")) {
    const sep = "__";
    const i = raw.indexOf(sep, 5);
    if (i > 5) {
      const categoryId = raw.slice(5, i);
      const key = raw.slice(i + sep.length);
      const cat = window.menuData.find((c) => c.id === categoryId);
      if (cat && cat.items.some((it) => itemKey(it) === key)) {
        return { mode: "item", categoryId, key };
      }
    }
  }
  if (window.menuData.some((c) => c.id === raw)) return { mode: "category", categoryId: raw };
  return { mode: "all" };
};

/** @returns {{ scrollTargetId: string | null, kind: "section" | "dish" | "menu-root" | null }} */
const applyHashToState = () => {
  const p = parseHash();
  if (p.mode === "category") {
    activeCategory = p.categoryId;
    return { scrollTargetId: p.categoryId, kind: "section" };
  }
  if (p.mode === "item") {
    activeCategory = "all";
    searchInput.value = "";
    return { scrollTargetId: itemAnchorId(p.categoryId, p.key), kind: "dish" };
  }
  activeCategory = "all";
  return { scrollTargetId: null, kind: null };
};

const scrollToHashTarget = (scroll) => {
  if (!scroll.scrollTargetId || !scroll.kind) return;
  updateScrollMargin();
  const behavior = scrollMotionBehavior();
  const run = () => {
    let el = null;
    if (scroll.kind === "section") el = document.getElementById(scroll.scrollTargetId);
    if (scroll.kind === "dish") el = document.getElementById(scroll.scrollTargetId);
    if (scroll.kind === "menu-root") el = menuRoot;
    if (!el) return;
    el.scrollIntoView({ behavior, block: "start" });
  };
  requestAnimationFrame(() => requestAnimationFrame(run));
};

const syncUrlHashFromFilter = () => {
  const base = `${location.pathname}${location.search}`;
  const nextHash = activeCategory === "all" ? "#all" : `#${activeCategory}`;
  if (location.hash !== nextHash) history.replaceState(null, "", `${base}${nextHash}`);
};

const handleRouteFromHash = () => {
  const scroll = applyHashToState();
  renderCategories();
  renderFeaturedSpecials();
  renderMenu();
  updateScrollMargin();
  scrollToHashTarget(scroll);
};

const scrollToCategory = (categoryId) => {
  updateScrollMargin();
  const behavior = scrollMotionBehavior();
  const run = () => {
    if (categoryId === "all") {
      menuRoot?.scrollIntoView({ behavior, block: "start" });
      return;
    }
    const el = document.getElementById(categoryId);
    if (el?.classList?.contains("menu-section")) {
      el.scrollIntoView({ behavior, block: "start" });
    }
  };
  requestAnimationFrame(() => requestAnimationFrame(run));
};

const featuredSpecials = [
  {
    categoryId: "seafood",
    number: "111",
    imageSrc: "assets/general-tso-shrimp.webp",
    imageFallback: "assets/general-tso-shrimp.jpg",
    imageAlt: "General Tso's shrimp over rice"
  },
  {
    categoryId: "chicken",
    number: "89",
    imageSrc: "assets/general-tso-chicken.webp",
    imageFallback: "assets/general-tso-chicken.jpg",
    imageAlt: "General Tso's chicken plate"
  },
  {
    categoryId: "appetizers",
    number: "14",
    imageSrc: "assets/salt-pepper-wings.webp",
    imageAlt: "Salt and pepper chicken wings"
  },
  {
    categoryId: "appetizers",
    number: "FCW",
    imageSrc: "assets/chicken wings.png",
    imageAlt: "Fried chicken wings"
  },
  {
    categoryId: "appetizers",
    number: "BBW",
    imageSrc: "assets/bbq-wing.png",
    imageAlt: "BBQ chicken wings"
  }
];

const normalize = (value) => String(value || "").trim().toLowerCase();

const getAllItems = () => window.menuData.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id }))
);

const findMenuItem = ({ categoryId, number, imageSrc, imageFallback, imageAlt }) => {
  const category = window.menuData.find((entry) => entry.id === categoryId);
  if (!category) return null;
  const key = String(number ?? "");
  const item = category.items.find((entry) => itemKey(entry) === key || (key && String(entry.number) === key));
  return item ? { item, category, imageSrc, imageFallback, imageAlt } : null;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const sideChoiceLabels = {
  "white-rice": { labelEn: "White Rice", labelZh: "白饭" },
  "fried-rice": { labelEn: "Fried Rice", labelZh: "炒饭" },
  "french-fries": { labelEn: "French Fries", labelZh: "薯条" }
};

const riceOptionCategoryIds = new Set(["egg-foo-young", "sweet-sour", "vegetables", "pork", "chicken", "beef", "seafood"]);
const optionHeavyCategoryIds = new Set(["specialties", "platters"]);
const riceSizeGroups = [
  { id: "pt", labelEn: "Small", labelZh: "小" },
  { id: "qt", labelEn: "Large", labelZh: "大" }
];
const riceMeatChoices = [
  { id: "chicken", labelEn: "Chicken", labelZh: "鸡" },
  { id: "pork", labelEn: "Pork", labelZh: "猪" },
  { id: "beef", labelEn: "Beef", labelZh: "牛" },
  { id: "shrimp", labelEn: "Shrimp", labelZh: "虾" }
];

const quickNoteGroups = [
  {
    id: "paid",
    labelEn: "Add-ons",
    labelZh: "加料",
    paid: true,
    options: [
      { text: "add egg", cents: 150 },
      { text: "extra veg", cents: 100 },
      { text: "add broccoli", cents: 100 },
      { text: "garlic sauce (鱼香酱)", cents: 100 },
      { text: "general tso sauce", cents: 100 }
    ]
  },
  {
    id: "prefs",
    labelEn: "Preferences",
    labelZh: "口味",
    options: [
      { text: "no veg" },
      { text: "no onion" },
      { text: "no bean sprouts" }
    ]
  },
  {
    id: "condiments",
    labelEn: "Condiments",
    labelZh: "调料",
    options: [
      { text: "salt" },
      { text: "pepper" },
      { text: "ketchup" },
      { text: "hot sauce" },
      { text: "garlic powder" }
    ]
  }
];

/* Extra spellings that should still trigger the add-on charge when typed by hand. */
const noteSurchargeAliases = {
  "add egg": ["egg", "加蛋"],
  "extra veg": ["add veg", "加菜"],
  "add broccoli": ["broccoli", "加西兰花"],
  "garlic sauce (鱼香酱)": ["garlic sauce", "鱼香酱"],
  "general tso sauce": ["general tso's sauce", "左宗酱"]
};

const noteSurchargeCentsByText = (() => {
  const map = new Map();
  for (const group of quickNoteGroups) {
    for (const option of group.options) {
      if (!option.cents) continue;
      map.set(normalize(option.text), option.cents);
      for (const alias of noteSurchargeAliases[option.text] || []) {
        map.set(normalize(alias), option.cents);
      }
    }
  }
  return map;
})();

const getUnitNoteSurchargeCents = (note) =>
  getQuickNoteParts(note).reduce(
    (sum, part) => sum + (noteSurchargeCentsByText.get(normalize(part)) || 0),
    0
  );

const splitSideChoicesForPrice = (price) => {
  const label = normalize(price.labelEn);
  const hasFriedRice = label.includes("fried rice");
  const hasFries = label.includes("french fries") || /\bfries\b/.test(label);
  if (!hasFriedRice || !hasFries) return [];
  const choices = [];
  if (label.includes("white rice")) choices.push("white-rice");
  choices.push("fried-rice", "french-fries");
  return choices;
};

const sideChoiceLabel = (choice) => {
  const entry = sideChoiceLabels[choice];
  if (!entry) return "";
  return `${entry.labelEn} / ${entry.labelZh}`;
};

const riceOptionMeta = (price) => {
  const label = normalize(price.labelEn);
  const size = label.startsWith("pt ") ? "pt" : label.startsWith("qt ") ? "qt" : "";
  if (!size) return null;
  const meat = riceMeatChoices.find((choice) => label.includes(`${choice.id} fried rice`));
  if (meat) return { size, kind: "meat", meat: meat.id };
  if (label.includes("white rice")) return { size, kind: "white" };
  if (label.includes("fried rice")) return { size, kind: "fried" };
  return null;
};

const getRiceOptionMatrix = (item) => {
  const emptySize = () => ({ white: null, fried: null, meat: {} });
  const grouped = { pt: emptySize(), qt: emptySize() };
  for (const [index, price] of (item.prices || []).entries()) {
    const meta = riceOptionMeta(price);
    if (!meta || !grouped[meta.size]) return null;
    const entry = { index, price };
    if (meta.kind === "meat") grouped[meta.size].meat[meta.meat] = entry;
    else grouped[meta.size][meta.kind] = entry;
  }

  const complete = riceSizeGroups.every((size) => {
    const group = grouped[size.id];
    return group.white && group.fried && riceMeatChoices.every((choice) => group.meat[choice.id]);
  });
  return complete ? grouped : null;
};

const priceAddButtonHtml = (categoryId, key, priceIndex, sideChoice = "") => {
  const cat = escapeHtml(categoryId);
  const num = escapeHtml(String(key));
  const idx = String(priceIndex);
  const side = sideChoice ? ` data-side-choice="${escapeHtml(sideChoice)}"` : "";
  const sideText = sideChoice ? ` ${escapeHtml(sideChoiceLabel(sideChoice))}` : "";
  return `<button type="button" class="price-add-btn" data-add-price data-category-id="${cat}" data-item-number="${num}" data-price-index="${idx}"${side} aria-label="Add${sideText} to price list / 加入算价"><span aria-hidden="true">+</span></button>`;
};

const formatPrice = (category, item, priceIndex, price) => {
  const label = price.labelEn ? `<span class="price-label">${price.labelEn}${price.labelZh ? ` / ${price.labelZh}` : ""}</span>` : "";
  const addBtn = priceAddButtonHtml(category.id, itemKey(item), priceIndex);
  return `
    <span class="price-chip">
      ${label}
      <span class="price-chip-end">
        <span class="price-value">$${price.amount}</span>
        ${addBtn}
      </span>
    </span>
  `;
};

const formatFeaturedPrice = (price) => {
  const label = price.labelEn ? `${price.labelEn}${price.labelZh ? ` / ${price.labelZh}` : ""}` : "Price / 价格";
  return `
    <span class="featured-price-chip">
      <span>${label}</span>
      <strong>$${price.amount}</strong>
    </span>
  `;
};

const getWingPricing = (item) => {
  const pricing = item?.wingPricing;
  if (!pricing) return null;
  const unitCents = parsePriceToCents(pricing.unitPrice);
  const minQty = Number.parseInt(pricing.minQty, 10);
  const maxQty = Number.parseInt(pricing.maxQty, 10);
  if (!unitCents || !Number.isFinite(minQty) || !Number.isFinite(maxQty)) return null;
  return {
    unitCents,
    minQty,
    maxQty: Math.max(minQty, maxQty)
  };
};

const clampWingCount = (item, value) => {
  const pricing = getWingPricing(item);
  if (!pricing) return null;
  const count = Number.parseInt(value, 10);
  if (!Number.isFinite(count)) return pricing.minQty;
  return Math.min(pricing.maxQty, Math.max(pricing.minQty, count));
};

const wingCountLabel = (count) => `${count} pcs / ${count}只`;

const renderWingStepper = (category, item, context = "menu") => {
  const pricing = getWingPricing(item);
  if (!pricing) return "";
  const count = pricing.minQty;
  const total = formatMoney(pricing.unitCents * count);
  const cat = escapeHtml(category.id);
  const num = escapeHtml(itemKey(item));
  const name = escapeHtml(item.nameEn);
  return `
    <div
      class="wing-stepper wing-stepper--${escapeHtml(context)}"
      data-wing-stepper
      data-category-id="${cat}"
      data-item-number="${num}"
      data-min-qty="${pricing.minQty}"
      data-max-qty="${pricing.maxQty}"
      data-unit-cents="${pricing.unitCents}"
      data-wing-count="${count}"
      aria-label="Choose wing count for ${name}"
    >
      <button type="button" class="wing-stepper-btn" data-wing-minus aria-label="Decrease wings / 减少鸡翅" disabled>-</button>
      <label class="wing-stepper-count">
        <input
          class="wing-stepper-input"
          data-wing-count-input
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          min="${pricing.minQty}"
          max="${pricing.maxQty}"
          step="1"
          value="${count}"
          aria-label="Wing count / 鸡翅数量"
        >
        <span>pcs</span>
      </label>
      <button type="button" class="wing-stepper-btn" data-wing-plus aria-label="Increase wings / 增加鸡翅">+</button>
      <span class="wing-stepper-total" data-wing-total>${escapeHtml(total)}</span>
      <button
        type="button"
        class="wing-stepper-add"
        data-add-wing
        data-wing-count-value="${count}"
        aria-label="Add ${count} fried chicken wings to price list / 加入${count}只炸鸡翅"
      >Add / 加入</button>
    </div>
  `;
};

const renderWingOrder = (category, item, context = "menu") => {
  const pricing = getWingPricing(item);
  if (!pricing) return "";
  return `
    <div class="wing-order wing-order--${escapeHtml(context)}">
      <div class="wing-order-rate">
        <span>${pricing.minQty} pcs min / 三只起</span>
        <strong>${formatMoney(pricing.unitCents)} each / 每只</strong>
      </div>
      ${renderWingStepper(category, item, context)}
    </div>
  `;
};

const formatOption = (category, item, priceIndex, price) => {
  const splitChoices = splitSideChoicesForPrice(price);
  if (splitChoices.length) {
    return splitChoices.map((choice) => {
      const label = sideChoiceLabels[choice];
      const addBtn = priceAddButtonHtml(category.id, itemKey(item), priceIndex, choice);
      return `
    <span class="opt-row opt-row--split-side">
      <span class="opt-label">${label.labelEn}<span class="opt-zh">${label.labelZh}</span></span>
      <span class="opt-price-wrap">
        <span class="opt-price">$${price.amount}</span>
        ${addBtn}
      </span>
    </span>
  `;
    }).join("");
  }
  const zh = price.labelZh ? `<span class="opt-zh">${price.labelZh}</span>` : "";
  const label = price.labelEn || "Price / 价格";
  const addBtn = priceAddButtonHtml(category.id, itemKey(item), priceIndex);
  return `
    <span class="opt-row">
      <span class="opt-label">${label}${zh}</span>
      <span class="opt-price-wrap">
        <span class="opt-price">$${price.amount}</span>
        ${addBtn}
      </span>
    </span>
  `;
};

const optionEntriesForPrice = (category, item, priceIndex, price) => {
  const splitChoices = splitSideChoicesForPrice(price);
  if (splitChoices.length) {
    return splitChoices.map((choice) => {
      const label = sideChoiceLabels[choice];
      return {
        labelEn: label.labelEn,
        labelZh: label.labelZh,
        amount: price.amount,
        addButton: priceAddButtonHtml(category.id, itemKey(item), priceIndex, choice)
      };
    });
  }
  return [{
    labelEn: price.labelEn || "Price",
    labelZh: price.labelZh || "",
    amount: price.amount,
    addButton: priceAddButtonHtml(category.id, itemKey(item), priceIndex)
  }];
};

const getLowestPriceAmount = (item) => {
  const cents = (item.prices || [])
    .map((price) => parsePriceToCents(price.amount))
    .filter((amount) => Number.isFinite(amount) && amount > 0);
  if (!cents.length) return item.prices?.[0]?.amount || "0.00";
  return (Math.min(...cents) / 100).toFixed(2);
};

const renderOptionTable = (category, item) => {
  const entries = item.prices.flatMap((price, idx) => optionEntriesForPrice(category, item, idx, price));
  return `
    <div class="option-table" aria-label="Side options and prices for ${escapeHtml(item.nameEn)}">
      ${entries.map((entry) => `
        <span class="option-cell">
          <span class="option-cell-label">
            <strong>${escapeHtml(entry.labelEn)}</strong>
            ${entry.labelZh ? `<span>${escapeHtml(entry.labelZh)}</span>` : ""}
          </span>
          <span class="option-cell-action">
            <span class="option-cell-price">$${escapeHtml(entry.amount)}</span>
            ${entry.addButton}
          </span>
        </span>
      `).join("")}
    </div>
  `;
};

const renderRiceOptionButton = (category, item, entry, label) => {
  const addBtn = priceAddButtonHtml(category.id, itemKey(item), entry.index);
  return `
    <span class="rice-choice">
      <span class="rice-choice-label">${label.labelEn}<span>${label.labelZh}</span></span>
      <span class="rice-choice-action">
        <span class="rice-choice-price">$${entry.price.amount}</span>
        ${addBtn}
      </span>
    </span>
  `;
};

const renderRiceOptionMatrix = (category, item) => {
  const matrix = getRiceOptionMatrix(item);
  if (!matrix) return "";
  return `
    <div class="rice-price-matrix" aria-label="Rice options and prices for ${escapeHtml(item.nameEn)}">
      ${riceSizeGroups.map((size) => {
        const group = matrix[size.id];
        return `
          <div class="rice-size-group">
            <div class="rice-size-heading">
              <span>${size.labelEn}</span>
              <strong>${size.labelZh}</strong>
            </div>
            <div class="rice-basic-choices">
              ${renderRiceOptionButton(category, item, group.white, { labelEn: "White Rice", labelZh: "白饭" })}
              ${renderRiceOptionButton(category, item, group.fried, { labelEn: "Fried Rice", labelZh: "炒饭" })}
            </div>
            <div class="rice-meat-row">
              <span class="rice-meat-title">Meat Fried Rice <strong>各肉炒饭</strong></span>
              <span class="rice-meat-choices">
                ${riceMeatChoices.map((choice) => renderRiceOptionButton(category, item, group.meat[choice.id], choice)).join("")}
              </span>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
};

const renderItem = (item, category) => {
  const anchor = itemAnchorId(category.id, itemKey(item));
  const number = item.number ? `<span class="item-number">${item.number}</span>` : "";
  const spicy = item.spicy ? `<span class="spicy-mark" title="Spicy / 辣">辣 / Spicy</span>` : "";
  const note = item.note ? `<p class="item-note">${item.note}</p>` : "";
  const review = item.needsReview ? `<span class="review-badge">Review / 需校对</span>` : "";
  const nameZhLine = item.nameZh ? `<p class="item-name-zh">${item.nameZh}</p>` : "";

  const isWingPriced = Boolean(item.wingPricing);
  const isRiceOptionItem = riceOptionCategoryIds.has(category.id) && Boolean(getRiceOptionMatrix(item));
  const isOptions = optionHeavyCategoryIds.has(category.id) && item.prices.length >= 3;
  const priceList = isWingPriced
    ? `<div class="price-list price-list--wing" aria-label="Wing quantity pricing for ${item.nameEn}">
        ${renderWingOrder(category, item, "menu")}
      </div>`
    : isRiceOptionItem
    ? renderRiceOptionMatrix(category, item)
    : isOptions
    ? `<div class="option-summary">
        <span>From <strong>$${getLowestPriceAmount(item)}</strong></span>
        <button type="button" class="option-toggle" data-option-toggle aria-expanded="false">Options</button>
      </div>
      <div class="price-list price-options" aria-label="Side options and prices for ${item.nameEn}">
        ${renderOptionTable(category, item)}
      </div>`
    : `<div class="price-list" aria-label="Prices for ${item.nameEn}">
        ${item.prices.map((price, idx) => formatPrice(category, item, idx, price)).join("")}
      </div>`;

  return `
    <article class="menu-item${isOptions ? " menu-item--options" : ""}${isRiceOptionItem ? " menu-item--rice-options" : ""}${isWingPriced ? " menu-item--wing-pricing" : ""}${item.number ? "" : " menu-item--unnumbered"}" id="${anchor}">
      <div class="item-main">
        <div class="item-line">
          ${number}
          <span class="item-name-en">${item.nameEn}</span>
          ${spicy}
        </div>
        ${nameZhLine}
        ${note}
        ${review}
      </div>
      ${priceList}
    </article>
  `;
};

/** @type {Array<{ categoryId: string, number: string, priceIndex: number, sideChoice?: string, wingCount?: number, qty: number, unitNotes: string[] }>} */
let priceLines = [];

const lineKey = (categoryId, number, priceIndex, sideChoice = "", wingCount = "") =>
  `${categoryId}__${number}__${priceIndex}__${sideChoice || "base"}__${wingCount ? `wings-${wingCount}` : "standard"}`;

const getLineKey = (line) =>
  lineKey(line.categoryId, line.number, line.priceIndex, line.sideChoice, line.wingCount);

const syncLineNotes = (line) => {
  if (!Array.isArray(line.unitNotes)) line.unitNotes = [];
  while (line.unitNotes.length < line.qty) line.unitNotes.push("");
  if (line.unitNotes.length > line.qty) line.unitNotes.length = line.qty;
  return line.unitNotes;
};

const findLastEmptyNoteIndex = (notes) => {
  for (let i = notes.length - 1; i >= 0; i -= 1) {
    if (!String(notes[i] || "").trim()) return i;
  }
  return -1;
};

const getQuickNoteParts = (value) =>
  String(value || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

const hasQuickNoteText = (current, option) => {
  const note = String(option || "").trim();
  if (!note) return false;
  return getQuickNoteParts(current).some((part) => normalize(part) === normalize(note));
};

const toggleQuickNoteText = (current, option) => {
  const note = String(option || "").trim();
  if (!note) return String(current || "").trim();
  const parts = getQuickNoteParts(current);
  const selected = parts.some((part) => normalize(part) === normalize(note));
  if (selected) {
    return parts.filter((part) => normalize(part) !== normalize(note)).join(", ");
  }
  return [...parts, note].join(", ");
};

const syncQuickNoteChipsForRow = (row) => {
  const input = row?.querySelector?.("[data-note-input]");
  if (!input) return;
  row.querySelectorAll("[data-note-quick]").forEach((chip) => {
    const selected = hasQuickNoteText(input.value, chip.dataset.noteText);
    chip.classList.toggle("price-list-note-chip--selected", selected);
    chip.setAttribute("aria-pressed", selected ? "true" : "false");
  });
};

const resolveLine = (line) => {
  const category = window.menuData?.find((c) => c.id === line.categoryId);
  if (!category) return null;
  const item = category.items.find((it) => itemKey(it) === String(line.number));
  if (!item) return null;
  const price = item.prices?.[line.priceIndex] || item.prices?.[0] || null;
  if (item.wingPricing) return { category, item, price: price || { amount: "0.00" } };
  if (!price) return null;
  return { category, item, price };
};

const parsePriceToCents = (amount) => {
  const n = Number.parseFloat(String(amount ?? "").replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
};

const formatMoney = (cents) => `$${(cents / 100).toFixed(2)}`;

const getLineUnitCents = (line, resolved) => {
  if (resolved?.item?.wingPricing && line.wingCount) {
    const count = clampWingCount(resolved.item, line.wingCount);
    const pricing = getWingPricing(resolved.item);
    if (count && pricing) return pricing.unitCents * count;
  }
  return parsePriceToCents(resolved?.price?.amount);
};

const getLineSurchargeCents = (line) =>
  syncLineNotes(line).reduce((sum, note) => sum + getUnitNoteSurchargeCents(note), 0);

const getLineTotalCents = (line, resolved) =>
  getLineUnitCents(line, resolved) * line.qty + getLineSurchargeCents(line);

const getTotalCents = () =>
  priceLines.reduce((sum, line) => {
    const r = resolveLine(line);
    if (!r) return sum;
    return sum + getLineTotalCents(line, r);
  }, 0);

const getTotalQty = () => priceLines.reduce((s, l) => s + l.qty, 0);

const priceLineLabel = (price, line = null) => {
  if (line?.wingCount) return wingCountLabel(line.wingCount);
  if (line?.sideChoice) return sideChoiceLabel(line.sideChoice);
  if (price.labelEn && price.labelZh) return `${price.labelEn} / ${price.labelZh}`;
  if (price.labelEn) return price.labelEn;
  if (price.labelZh) return price.labelZh;
  return "Price / 价格";
};

const priceLineTitle = (item, line) => {
  const num = item.number ? `#${item.number} ` : "";
  const title = `${num}${item.nameEn}`.trim();
  return line?.wingCount ? `${title} (${line.wingCount} pcs)` : title;
};

const addPriceLine = (categoryId, number, priceIndex, sideChoice = "", wingCount = "") => {
  const normalizedWingCount = wingCount ? Number.parseInt(wingCount, 10) : "";
  const key = lineKey(categoryId, number, priceIndex, sideChoice, normalizedWingCount);
  const existing = priceLines.find((l) => getLineKey(l) === key);
  if (existing) {
    existing.qty += 1;
    syncLineNotes(existing);
  } else {
    const nextLine = { categoryId, number: String(number), priceIndex, sideChoice, qty: 1, unitNotes: [""] };
    if (normalizedWingCount) nextLine.wingCount = normalizedWingCount;
    priceLines.push(nextLine);
  }
  updatePriceListChrome();
};

const changeLineQty = (key, delta) => {
  const i = priceLines.findIndex((l) => getLineKey(l) === key);
  if (i < 0) return;
  const line = priceLines[i];
  syncLineNotes(line);
  if (delta > 0) {
    line.qty += delta;
    syncLineNotes(line);
  } else if (delta < 0) {
    const steps = Math.min(Math.abs(delta), line.qty);
    for (let step = 0; step < steps; step += 1) {
      const emptyIndex = findLastEmptyNoteIndex(line.unitNotes);
      if (emptyIndex >= 0) line.unitNotes.splice(emptyIndex, 1);
      else line.unitNotes.pop();
      line.qty -= 1;
    }
  }
  if (line.qty <= 0) priceLines.splice(i, 1);
  else syncLineNotes(line);
  updatePriceListChrome();
};

const updateLineNote = (key, noteIndex, value) => {
  const i = priceLines.findIndex((l) => getLineKey(l) === key);
  if (i < 0) return;
  const index = Number.parseInt(noteIndex, 10);
  const line = priceLines[i];
  syncLineNotes(line);
  if (!Number.isInteger(index) || index < 0 || index >= line.qty) return;
  line.unitNotes[index] = value;
};

const removeLine = (key) => {
  priceLines = priceLines.filter((l) => getLineKey(l) !== key);
  updatePriceListChrome();
};

const clearPriceLines = () => {
  priceLines = [];
  updatePriceListChrome();
};

const formatSummaryText = () => {
  const lines = [];
  for (const line of priceLines) {
    const r = resolveLine(line);
    if (!r) continue;
    const title = priceLineTitle(r.item, line);
    const label = priceLineLabel(r.price, line);
    const lineTotal = getLineTotalCents(line, r) / 100;
    lines.push(`${title} · ${label} × ${line.qty}  $${lineTotal.toFixed(2)}`);
    syncLineNotes(line).forEach((note, index) => {
      const text = String(note || "").trim();
      if (!text) return;
      const surcharge = getUnitNoteSurchargeCents(note);
      const extra = surcharge ? `  (+${formatMoney(surcharge)} add-on / 加料)` : "";
      lines.push(`  Note ${index + 1} / 备注 ${index + 1}: ${text}${extra}`);
    });
  }
  lines.push("");
  lines.push(`Subtotal / 合计  ${formatMoney(getTotalCents())}`);
  return lines.join("\n");
};

const renderPricePanelLines = () => {
  if (!priceListLines) return;
  if (!priceLines.length) {
    priceListLines.innerHTML =
      '<p class="price-list-empty">Tap + next to a price on the menu to build a list. / 点击菜单价格旁的 + 建立清单。</p>';
    return;
  }
  priceListLines.innerHTML = priceLines
    .map((line) => {
      const r = resolveLine(line);
      if (!r) return "";
      const rawKey = getLineKey(line);
      const key = escapeHtml(rawKey);
      const title = escapeHtml(priceLineTitle(r.item, line));
      const detail = escapeHtml(priceLineLabel(r.price, line));
      const surchargeCents = getLineSurchargeCents(line);
      const sub = escapeHtml(formatMoney(getLineTotalCents(line, r)));
      const quickNoteButtonsForNote = (note) => quickNoteGroups.map((group) => {
        const chips = group.options.map((option) => {
          const selected = hasQuickNoteText(note, option.text);
          const priceTag = option.cents
            ? `<em class="price-list-note-chip-price">+${escapeHtml(formatMoney(option.cents))}</em>`
            : "";
          return `
            <button
              type="button"
              class="price-list-note-chip${option.cents ? " price-list-note-chip--paid" : ""}${selected ? " price-list-note-chip--selected" : ""}"
              data-note-quick
              data-note-text="${escapeHtml(option.text)}"
              aria-pressed="${selected ? "true" : "false"}"
            >${escapeHtml(option.text)}${priceTag}</button>
          `;
        }).join("");
        return `
          <div class="price-list-note-group">
            <span class="price-list-note-group-title">${escapeHtml(group.labelEn)} / ${escapeHtml(group.labelZh)}</span>
            <span class="price-list-note-quick" aria-label="Quick notes / 快捷备注">
              ${chips}
            </span>
          </div>
        `;
      }).join("");
      const noteRows = syncLineNotes(line).map((note, index) => `
        <div class="price-list-note-row">
          <span class="price-list-note-label">Note ${index + 1} / 备注 ${index + 1}</span>
          ${quickNoteButtonsForNote(note)}
          <textarea
            class="price-list-note-input"
            data-note-input
            data-line-key="${key}"
            data-note-index="${index}"
            rows="2"
            placeholder="Sauce on side / 酱另放；no onion / 不要洋葱"
          >${escapeHtml(note)}</textarea>
        </div>
      `).join("");
      return `
        <div class="price-list-line" data-line-key="${key}">
          <div class="price-list-line-info">
            <span class="price-list-line-title">${title}</span>
            <span class="price-list-line-detail">${detail}</span>
          </div>
          <div class="price-list-line-controls">
            <button type="button" class="price-list-qty-btn" data-qty-down data-line-key="${key}" aria-label="Decrease quantity / 减少">−</button>
            <span class="price-list-line-qty" aria-label="Quantity / 数量">× ${line.qty}</span>
            <button type="button" class="price-list-qty-btn" data-qty-up data-line-key="${key}" aria-label="Increase quantity / 增加">+</button>
            <span class="price-list-line-money">
              <span class="price-list-line-sub" data-line-sub>${sub}</span>
              <span class="price-list-line-addon" data-line-addon${surchargeCents ? "" : " hidden"}>incl. add-ons +${escapeHtml(formatMoney(surchargeCents))} / 含加料</span>
            </span>
            <button type="button" class="price-list-remove" data-line-remove data-line-key="${key}" aria-label="Remove / 删除">×</button>
          </div>
          <div class="price-list-notes">
            ${noteRows}
          </div>
        </div>
      `;
    })
    .join("");
};

/* Refresh money readouts without re-rendering the panel (keeps textarea focus). */
const refreshLineMoney = (key) => {
  const line = priceLines.find((l) => getLineKey(l) === key);
  const row = priceListLines?.querySelector(`.price-list-line[data-line-key="${CSS.escape(key)}"]`);
  if (line && row) {
    const r = resolveLine(line);
    if (r) {
      const sub = row.querySelector("[data-line-sub]");
      const addon = row.querySelector("[data-line-addon]");
      const surchargeCents = getLineSurchargeCents(line);
      if (sub) sub.textContent = formatMoney(getLineTotalCents(line, r));
      if (addon) {
        addon.hidden = !surchargeCents;
        addon.textContent = `incl. add-ons +${formatMoney(surchargeCents)} / 含加料`;
      }
    }
  }
  renderPriceSummaryLines();
  updatePriceListBadge();
  updatePriceListTotal();
};

const renderPriceSummaryLines = () => {
  if (!priceSummaryLines) return;
  if (!priceLines.length) {
    priceSummaryLines.innerHTML = `
      <p class="price-summary-empty">Tap + beside a price to build a quick estimate. / 点 + 加入算价。</p>
    `;
    return;
  }
  priceSummaryLines.innerHTML = priceLines.slice(0, 4).map((line) => {
    const r = resolveLine(line);
    if (!r) return "";
    const title = escapeHtml(priceLineTitle(r.item, line));
    const surchargeCents = getLineSurchargeCents(line);
    const detailText = surchargeCents
      ? `${priceLineLabel(r.price, line)} · +加料 ${formatMoney(surchargeCents)}`
      : priceLineLabel(r.price, line);
    const detail = escapeHtml(detailText);
    const sub = escapeHtml(formatMoney(getLineTotalCents(line, r)));
    return `
      <div class="price-summary-line">
        <span class="price-summary-qty">${line.qty}</span>
        <span class="price-summary-item">
          <strong>${title}</strong>
          <span>${detail}</span>
        </span>
        <span class="price-summary-price">${sub}</span>
      </div>
    `;
  }).join("") + (priceLines.length > 4
    ? `<p class="price-summary-more">+ ${priceLines.length - 4} more / 还有 ${priceLines.length - 4} 项</p>`
    : "");
};

const updatePriceListBadge = () => {
  const n = getTotalQty();
  const cents = getTotalCents();
  const text = `${formatMoney(cents)} · ${n}`;
  if (n === 0) {
    if (priceListBadge) priceListBadge.hidden = true;
    if (priceListFabBadge) priceListFabBadge.hidden = true;
    return;
  }
  if (priceListBadge) {
    priceListBadge.hidden = false;
    priceListBadge.textContent = text;
  }
  if (priceListFabBadge) {
    priceListFabBadge.hidden = false;
    priceListFabBadge.textContent = text;
  }
};

const updatePriceListTotal = () => {
  if (priceListTotal) priceListTotal.textContent = formatMoney(getTotalCents());
  if (priceSummaryTotal) priceSummaryTotal.textContent = formatMoney(getTotalCents());
};

const updatePriceListChrome = () => {
  renderPricePanelLines();
  renderPriceSummaryLines();
  updatePriceListBadge();
  updatePriceListTotal();
};

let priceListOpen = false;

const setPriceListOpen = (open) => {
  priceListOpen = open;
  priceListToggle?.setAttribute("aria-expanded", open ? "true" : "false");
  priceListFab?.setAttribute("aria-expanded", open ? "true" : "false");
  if (priceListBackdrop) {
    priceListBackdrop.hidden = !open;
    priceListBackdrop.setAttribute("aria-hidden", open ? "false" : "true");
  }
  if (priceListPanel) {
    priceListPanel.hidden = !open;
    if (open) {
      document.body.style.overflow = "hidden";
      updatePriceListChrome();
      window.requestAnimationFrame(() => priceListClose?.focus());
    } else {
      document.body.style.overflow = "";
      const trigger = priceListToggle?.offsetParent ? priceListToggle : priceListFab;
      trigger?.focus();
    }
  }
};

const flashMenuItemForButton = (btn) => {
  const item = btn?.closest?.(".menu-item, .quick-search-result");
  if (!item) return;
  item.classList.add("menu-item--add-flash");
  window.setTimeout(() => item.classList.remove("menu-item--add-flash"), 220);
};

const flashOrderSurfaceForButton = (btn) => {
  const surface = btn?.closest?.(".menu-item, .featured-card");
  if (!surface) return;
  surface.classList.add("menu-item--add-flash");
  window.setTimeout(() => surface.classList.remove("menu-item--add-flash"), 220);
};

const findMenuItemById = (categoryId, number) => {
  const category = window.menuData?.find((entry) => entry.id === categoryId);
  if (!category) return null;
  const key = String(number ?? "");
  const item = category.items.find((entry) => itemKey(entry) === key || (key && String(entry.number) === key));
  return item ? { category, item } : null;
};

const parseWingInputValue = (value) => {
  const text = String(value ?? "").trim();
  if (!/^\d+$/.test(text)) return NaN;
  return Number.parseInt(text, 10);
};

const setWingStepperInputValidity = (stepper, valid) => {
  const input = stepper?.querySelector?.("[data-wing-count-input]");
  const addButton = stepper?.querySelector?.("[data-add-wing]");
  if (input) input.setAttribute("aria-invalid", valid ? "false" : "true");
  if (addButton) addButton.disabled = !valid;
};

const setWingStepperCount = (stepper, value) => {
  if (!stepper) return;
  const minQty = Number.parseInt(stepper.dataset.minQty, 10);
  const maxQty = Number.parseInt(stepper.dataset.maxQty, 10);
  const unitCents = Number.parseInt(stepper.dataset.unitCents, 10);
  const rawCount = parseWingInputValue(value);
  if (!Number.isFinite(minQty) || !Number.isFinite(maxQty) || !Number.isFinite(unitCents)) return;
  const count = Math.min(maxQty, Math.max(minQty, Number.isFinite(rawCount) ? rawCount : minQty));
  stepper.dataset.wingCount = String(count);
  const countInput = stepper.querySelector("[data-wing-count-input]");
  const totalText = stepper.querySelector("[data-wing-total]");
  const addButton = stepper.querySelector("[data-add-wing]");
  const minus = stepper.querySelector("[data-wing-minus]");
  const plus = stepper.querySelector("[data-wing-plus]");
  if (countInput) countInput.value = String(count);
  if (totalText) totalText.textContent = formatMoney(unitCents * count);
  if (addButton) {
    addButton.dataset.wingCountValue = String(count);
    addButton.setAttribute("aria-label", `Add ${count} fried chicken wings to price list / 加入${count}只炸鸡翅`);
  }
  if (minus) minus.disabled = count <= minQty;
  if (plus) plus.disabled = count >= maxQty;
  setWingStepperInputValidity(stepper, true);
};

const updateWingStepperFromInput = (input) => {
  const stepper = input?.closest?.("[data-wing-stepper]");
  if (!stepper) return false;
  const minQty = Number.parseInt(stepper.dataset.minQty, 10);
  const maxQty = Number.parseInt(stepper.dataset.maxQty, 10);
  const count = parseWingInputValue(input.value);
  if (!Number.isFinite(count) || count < minQty) {
    setWingStepperInputValidity(stepper, false);
    return true;
  }
  setWingStepperCount(stepper, Math.min(count, maxQty));
  return true;
};

const commitWingStepperInput = (input) => {
  const stepper = input?.closest?.("[data-wing-stepper]");
  if (!stepper) return false;
  const count = parseWingInputValue(input.value);
  setWingStepperCount(stepper, Number.isFinite(count) ? count : stepper.dataset.minQty);
  return true;
};

const handleWingStepperClick = (event) => {
  const adjust = event.target.closest("[data-wing-minus], [data-wing-plus]");
  if (adjust) {
    event.preventDefault();
    const stepper = adjust.closest("[data-wing-stepper]");
    const current = Number.parseInt(stepper?.dataset.wingCount, 10);
    const delta = adjust.matches("[data-wing-plus]") ? 1 : -1;
    setWingStepperCount(stepper, current + delta);
    return true;
  }

  const addWing = event.target.closest("[data-add-wing]");
  if (!addWing) return false;
  event.preventDefault();
  const stepper = addWing.closest("[data-wing-stepper]");
  const input = stepper?.querySelector("[data-wing-count-input]");
  if (input) commitWingStepperInput(input);
  const categoryId = stepper?.dataset.categoryId;
  const number = stepper?.dataset.itemNumber;
  const found = findMenuItemById(categoryId, number);
  if (!found) return true;
  const count = clampWingCount(found.item, addWing.dataset.wingCountValue || stepper.dataset.wingCount);
  if (!count) return true;
  addPriceLine(categoryId, number, 0, "", count);
  flashOrderSurfaceForButton(addWing);
  return true;
};

const renderItemsWithGroupHeadings = (items, category) => {
  let lastGroup = null;
  const chunks = [];
  for (const item of items) {
    const g = item.groupEn;
    if (g && g !== lastGroup) {
      chunks.push(
        `<div class="item-group" role="presentation"><h3 class="item-group-title">${escapeHtml(g)}</h3></div>`
      );
      lastGroup = g;
    }
    chunks.push(renderItem(item, category));
  }
  return chunks.join("");
};

const renderFeaturedPhoto = ({ imageSrc, imageFallback, imageAlt }) =>
  imageFallback
    ? `<picture>
        <source srcset="${imageSrc}?v=1" type="image/webp">
        <img src="${imageFallback}" alt="${imageAlt}" width="640" height="480" loading="lazy" decoding="async">
      </picture>`
    : `<img src="${imageSrc}" alt="${imageAlt}" width="640" height="480" loading="lazy" decoding="async">`;

const renderFeaturedWingItem = ({ item, category, imageSrc, imageFallback, imageAlt }) => {
  const photo = renderFeaturedPhoto({ imageSrc, imageFallback, imageAlt });
  const pricing = getWingPricing(item);
  const total = pricing ? formatMoney(pricing.unitCents * pricing.minQty) : "$0.00";
  return `
    <article class="featured-card featured-card--wing-order" data-featured-category="${category.id}" data-featured-number="${item.number}">
      <div class="featured-photo">
        ${photo}
      </div>
      <div class="featured-body">
        <div class="featured-copy">
          <div class="featured-name-line">
            <h3>${item.nameEn}</h3>
          </div>
          <p>${item.nameZh}</p>
          <div class="featured-rule" aria-hidden="true"></div>
        </div>
        <div class="featured-wing-mini">
          <span>${pricing ? `${pricing.minQty} pcs min / 三只起` : ""}</span>
          <strong>${pricing ? `${formatMoney(pricing.unitCents)} each / 每只` : total}</strong>
          <button
            type="button"
            class="price-add-btn"
            data-add-wing-quick
            data-category-id="${escapeHtml(category.id)}"
            data-item-number="${escapeHtml(itemKey(item))}"
            data-wing-count="${pricing ? pricing.minQty : 0}"
            aria-label="Add featured wings to price list / 加入炸鸡翅"
          ><span aria-hidden="true">+</span></button>
        </div>
      </div>
    </article>
  `;
};

const renderFeaturedItem = ({ item, category, imageSrc, imageFallback, imageAlt }) => {
  if (item.wingPricing) return renderFeaturedWingItem({ item, category, imageSrc, imageFallback, imageAlt });
  const spicy = item.spicy ? `<span class="spicy-mark" title="Spicy / 辣">辣 / Spicy</span>` : "";
  const href = `#${itemAnchorId(category.id, itemKey(item))}`;
  const photo = renderFeaturedPhoto({ imageSrc, imageFallback, imageAlt });
  const preferredIndex = item.prices.length > 4
    ? item.prices.findIndex((price) => normalize(price.labelEn).includes("white rice"))
    : 0;
  const priceIndex = preferredIndex >= 0 ? preferredIndex : 0;
  const featuredPrice = item.prices[priceIndex];

  return `
    <article class="featured-card" data-featured-category="${category.id}" data-featured-number="${item.number}">
      <div class="featured-photo">
        ${photo}
      </div>
      <div class="featured-body">
        <div class="featured-copy">
          <div class="featured-name-line">
            <h3>${item.nameEn}</h3>
            ${spicy}
          </div>
          <p>${item.nameZh}</p>
          <div class="featured-rule" aria-hidden="true"></div>
        </div>
        <div class="featured-prices" aria-label="Featured prices for ${item.nameEn}">
          ${formatFeaturedPrice(featuredPrice)}
          ${priceAddButtonHtml(category.id, itemKey(item), priceIndex)}
          <a class="featured-card-link" href="${href}" aria-label="View ${escapeHtml(item.nameEn)} in menu">View</a>
        </div>
      </div>
    </article>
  `;
};

const renderFeaturedSpecials = () => {
  if (!featuredRoot) return;
  const items = featuredSpecials.map(findMenuItem).filter(Boolean);
  featuredRoot.innerHTML = items.map(renderFeaturedItem).join("");
};

const categoryRailNumber = (index) => String(index + 1).padStart(2, "0");

const renderCategories = () => {
  const tabs = [
    { id: "all", categoryEn: "All", categoryZh: "全部" },
    ...window.menuData
  ];

  categoryTabs.innerHTML = tabs.map((category) => {
    const selected = category.id === activeCategory;
    const panelId = category.id === "all" ? "menu-root" : category.id;
    const tabLabel = category.categoryZh
      ? `${category.categoryEn} / ${category.categoryZh}`
      : category.categoryEn;
    return `
    <button
      class="category-tab"
      type="button"
      role="tab"
      tabindex="${selected ? "0" : "-1"}"
      id="tab-${category.id}"
      data-category="${category.id}"
      aria-selected="${selected}"
      aria-controls="${panelId}"
    >
      ${tabLabel}
    </button>
  `;
  }).join("");

  categoryTabs.setAttribute("role", "tablist");
  if (categoryRail) {
    categoryRail.innerHTML = tabs.map((category, index) => {
      const selected = category.id === activeCategory;
      const zh = category.categoryZh ? `<span>${category.categoryZh}</span>` : "";
      return `
        <button
          type="button"
          class="category-rail-btn"
          data-category="${category.id}"
          aria-current="${selected ? "true" : "false"}"
        >
          <span class="category-rail-no">${category.id === "all" ? "★" : categoryRailNumber(index - 1)}</span>
          <span class="category-rail-text">
            <strong>${category.categoryEn}</strong>
            ${zh}
          </span>
        </button>
      `;
    }).join("");
  }
  if (categoryPickerList) {
    categoryPickerList.innerHTML = tabs.map((category) => {
      const selected = category.id === activeCategory;
      const label = category.categoryZh
        ? `${category.categoryEn} / ${category.categoryZh}`
        : category.categoryEn;
      return `
        <button
          type="button"
          class="category-picker-btn"
          data-category-picker="${escapeHtml(category.id)}"
          aria-current="${selected ? "true" : "false"}"
        >${escapeHtml(label)}</button>
      `;
    }).join("");
  }
  if (categoryPickerCurrent) {
    const current = tabs.find((category) => category.id === activeCategory) || tabs[0];
    categoryPickerCurrent.textContent = current.categoryZh
      ? `${current.categoryEn} / ${current.categoryZh}`
      : current.categoryEn;
  }
  categoryTabs.setAttribute("aria-label", "Menu categories / 菜单分类");
};

const setCategoryPickerOpen = (open) => {
  categoryPickerOpen = open;
  if (categoryPickerBackdrop) categoryPickerBackdrop.hidden = !open;
  if (categoryPickerPanel) categoryPickerPanel.hidden = !open;
  categoryPickerToggle?.setAttribute("aria-expanded", open ? "true" : "false");
  if (open) {
    window.requestAnimationFrame(() => categoryPickerClose?.focus());
  } else {
    categoryPickerToggle?.focus();
  }
};

const renderQuickSearchResult = ({ category, item }) => {
  const anchor = itemAnchorId(category.id, itemKey(item));
  const optionId = `${anchor}-options`;
  const number = item.number ? `<span class="quick-search-number">#${escapeHtml(item.number)}</span>` : "";
  const zh = item.nameZh ? `<span class="quick-search-zh">${escapeHtml(item.nameZh)}</span>` : "";
  const spicy = item.spicy ? `<span class="spicy-mark" title="Spicy / 辣">辣 / Spicy</span>` : "";
  const categoryLabel = category.categoryZh
    ? `${category.categoryEn} / ${category.categoryZh}`
    : category.categoryEn;
  const isWingPriced = Boolean(item.wingPricing);
  const isRiceOptionItem = riceOptionCategoryIds.has(category.id) && Boolean(getRiceOptionMatrix(item));
  const canAddDirectly = !isWingPriced && item.prices.length === 1;
  const firstPrice = item.prices[0];
  const optionContent = isWingPriced
    ? renderWingOrder(category, item, "search")
    : isRiceOptionItem
    ? renderRiceOptionMatrix(category, item)
    : renderOptionTable(category, item);
  const action = canAddDirectly
    ? `<span class="quick-search-price">$${escapeHtml(firstPrice.amount)}</span>${priceAddButtonHtml(category.id, itemKey(item), 0)}`
    : `<span class="quick-search-price">From $${escapeHtml(getLowestPriceAmount(item))}</span>
      <button type="button" class="quick-search-options-toggle" data-search-result-toggle aria-expanded="false" aria-controls="${optionId}">Options / 选价格</button>`;

  return `
    <article class="quick-search-result" id="quick-${anchor}">
      <div class="quick-search-result-main">
        <div class="quick-search-name-line">
          ${number}
          <strong>${escapeHtml(item.nameEn)}</strong>
          ${spicy}
        </div>
        ${zh}
        <span class="quick-search-category">${escapeHtml(categoryLabel)}</span>
      </div>
      <div class="quick-search-action">${action}</div>
      ${canAddDirectly ? "" : `<div id="${optionId}" class="quick-search-result-options" hidden>${optionContent}</div>`}
    </article>
  `;
};

const renderMenu = () => {
  const query = normalize(searchInput.value);
  if (query) {
    const results = menuSearch.searchMenu(window.menuData, query);
    menuRoot.innerHTML = results.length
      ? `<div class="quick-search-results">${results.map(renderQuickSearchResult).join("")}</div>`
      : `<div class="no-results"><strong>No matching menu items / 没有找到匹配菜品</strong></div>`;
    resultCount.textContent = `${results.length} quick results across all categories / 全菜单找到 ${results.length} 道菜`;
    clearSearch.hidden = false;
    return;
  }

  let visibleCount = 0;

  const sections = window.menuData.map((category) => {
    if (activeCategory !== "all" && category.id !== activeCategory) return "";

    const items = category.items;
    if (!items.length) return "";

    visibleCount += items.length;

    const subtitle = category.categoryZh
      ? `${category.categoryZh}${category.note ? ` · ${category.note}` : ""}`
      : category.note || "";

    const subtitleHtml = subtitle
      ? `<p class="section-subtitle">${subtitle}</p>`
      : "";
    const sectionClass = `menu-section${riceOptionCategoryIds.has(category.id) ? " menu-section--rice-options" : ""}${optionHeavyCategoryIds.has(category.id) ? " menu-section--option-heavy" : ""}`;

    return `
      <section class="${sectionClass}" id="${category.id}" role="region" aria-labelledby="tab-${category.id}">
        <div class="section-header">
          <div>
            <h2 class="section-title">${category.categoryEn}</h2>
            ${subtitleHtml}
          </div>
          <span class="section-count">${items.length}</span>
        </div>
        <div class="item-list">
          ${renderItemsWithGroupHeadings(items, category)}
        </div>
      </section>
    `;
  }).join("");

  menuRoot.innerHTML = sections || `
    <div class="no-results">
      <strong>No matching menu items / 没有找到匹配菜品</strong>
    </div>
  `;

  const total = getAllItems().length;
  resultCount.textContent = query || activeCategory !== "all"
    ? `${visibleCount} of ${total} items shown / 显示 ${visibleCount} / ${total} 项`
    : `${total} menu items / 共 ${total} 项`;
  clearSearch.hidden = !query && activeCategory === "all";
};

const selectCategory = (categoryId) => {
  const next = menuSearch.stateForCategory(categoryId);
  activeCategory = next.activeCategory;
  searchInput.value = next.query;
  if (categoryPickerOpen) setCategoryPickerOpen(false);
  renderCategories();
  renderMenu();
  syncUrlHashFromFilter();
  scrollToCategory(activeCategory);
};

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectCategory(button.dataset.category);
});

categoryRail?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectCategory(button.dataset.category);
});

categoryPickerToggle?.addEventListener("click", () => setCategoryPickerOpen(!categoryPickerOpen));
categoryPickerClose?.addEventListener("click", () => setCategoryPickerOpen(false));
categoryPickerBackdrop?.addEventListener("click", () => setCategoryPickerOpen(false));
categoryPickerList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category-picker]");
  if (!button) return;
  selectCategory(button.dataset.categoryPicker);
});

categoryTabs.addEventListener("keydown", (event) => {
  const tabs = [...categoryTabs.querySelectorAll(".category-tab")];
  const i = tabs.indexOf(document.activeElement);
  if (i < 0) return;
  let next = i;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    next = (i + 1) % tabs.length;
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    next = (i - 1 + tabs.length) % tabs.length;
  } else if (event.key === "Home") {
    event.preventDefault();
    next = 0;
  } else if (event.key === "End") {
    event.preventDefault();
    next = tabs.length - 1;
  } else {
    return;
  }
  const nextTab = tabs[next];
  nextTab.focus();
  nextTab.scrollIntoView({ block: "nearest", inline: "nearest" });
});

categoryTabs.addEventListener("focusin", (event) => {
  const tab = event.target.closest(".category-tab");
  if (!tab || !categoryTabs.contains(tab)) return;
  tab.scrollIntoView({ block: "nearest", inline: "nearest" });
});

menuRoot?.addEventListener("click", (event) => {
  if (handleWingStepperClick(event)) return;

  const searchToggle = event.target.closest("[data-search-result-toggle]");
  if (searchToggle) {
    const result = searchToggle.closest(".quick-search-result");
    const options = result?.querySelector(".quick-search-result-options");
    if (!options) return;
    const open = options.hidden;
    options.hidden = !open;
    result.classList.toggle("quick-search-result--open", open);
    searchToggle.setAttribute("aria-expanded", open ? "true" : "false");
    searchToggle.textContent = open ? "Hide options / 收起" : "Options / 选价格";
    return;
  }

  const optionToggle = event.target.closest("[data-option-toggle]");
  if (optionToggle) {
    event.preventDefault();
    const item = optionToggle.closest(".menu-item--options");
    const open = !item?.classList?.contains("menu-item--options-open");
    item?.classList?.toggle("menu-item--options-open", open);
    optionToggle.setAttribute("aria-expanded", open ? "true" : "false");
    optionToggle.textContent = open ? "Hide" : "Options";
    return;
  }

  const addBtn = event.target.closest("[data-add-price]");
  if (addBtn) {
    event.preventDefault();
    const categoryId = addBtn.dataset.categoryId;
    const number = addBtn.dataset.itemNumber;
    const priceIndex = Number.parseInt(addBtn.dataset.priceIndex ?? "0", 10);
    const sideChoice = addBtn.dataset.sideChoice || "";
    if (!categoryId || number == null || Number.isNaN(priceIndex)) return;
    addPriceLine(categoryId, number, priceIndex, sideChoice);
    flashMenuItemForButton(addBtn);
    return;
  }
  const header = event.target.closest(".section-header");
  if (!header) return;
  const section = header.closest(".menu-section");
  if (!section) return;
  updateScrollMargin();
  const behavior = scrollMotionBehavior();
  section.scrollIntoView({ behavior, block: "start" });
});

menuRoot?.addEventListener("input", (event) => {
  const wingInput = event.target.closest("[data-wing-count-input]");
  if (wingInput) updateWingStepperFromInput(wingInput);
});

menuRoot?.addEventListener("focusout", (event) => {
  const wingInput = event.target.closest("[data-wing-count-input]");
  if (wingInput) commitWingStepperInput(wingInput);
});

featuredRoot?.addEventListener("click", (event) => {
  if (handleWingStepperClick(event)) return;

  const wingQuick = event.target.closest("[data-add-wing-quick]");
  if (wingQuick) {
    event.preventDefault();
    const categoryId = wingQuick.dataset.categoryId;
    const number = wingQuick.dataset.itemNumber;
    const found = findMenuItemById(categoryId, number);
    if (!found) return;
    const count = clampWingCount(found.item, wingQuick.dataset.wingCount);
    if (!count) return;
    addPriceLine(categoryId, number, 0, "", count);
    flashOrderSurfaceForButton(wingQuick);
    return;
  }

  const addBtn = event.target.closest("[data-add-price]");
  if (addBtn) {
    event.preventDefault();
    const categoryId = addBtn.dataset.categoryId;
    const number = addBtn.dataset.itemNumber;
    const priceIndex = Number.parseInt(addBtn.dataset.priceIndex ?? "0", 10);
    const sideChoice = addBtn.dataset.sideChoice || "";
    if (!categoryId || number == null || Number.isNaN(priceIndex)) return;
    addPriceLine(categoryId, number, priceIndex, sideChoice);
    flashOrderSurfaceForButton(addBtn);
    return;
  }

  const a = event.target.closest("a.featured-card");
  const link = event.target.closest("a.featured-card-link");
  if (link?.hash) {
    event.preventDefault();
    history.pushState(null, "", link.hash);
    handleRouteFromHash();
    return;
  }
  if (!a?.hash) return;
  event.preventDefault();
  history.pushState(null, "", a.hash);
  handleRouteFromHash();
});

featuredRoot?.addEventListener("input", (event) => {
  const wingInput = event.target.closest("[data-wing-count-input]");
  if (wingInput) updateWingStepperFromInput(wingInput);
});

featuredRoot?.addEventListener("focusout", (event) => {
  const wingInput = event.target.closest("[data-wing-count-input]");
  if (wingInput) commitWingStepperInput(wingInput);
});

searchInput.addEventListener("input", () => {
  const next = menuSearch.stateForSearch(activeCategory, searchInput.value);
  if (next.activeCategory !== activeCategory) {
    activeCategory = next.activeCategory;
    syncUrlHashFromFilter();
    renderCategories();
  }
  renderMenu();
});

clearSearch.addEventListener("click", () => {
  activeCategory = "all";
  searchInput.value = "";
  const base = `${location.pathname}${location.search}`;
  history.replaceState(null, "", `${base}#all`);
  renderCategories();
  renderMenu();
  updateScrollMargin();
  searchInput.focus();
});

window.addEventListener("hashchange", handleRouteFromHash);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && categoryPickerOpen) {
    event.preventDefault();
    setCategoryPickerOpen(false);
  }
});

window.addEventListener("resize", () => {
  updateScrollMargin();
  updateScrollChrome();
});

const getHeroScrollThreshold = () => Math.max(0, (menuHero?.offsetHeight ?? 0) - 80);

const updateScrolledHeader = () => {
  if (!siteHeader || !menuHero) return;
  siteHeader.classList.toggle("site-header--scrolled", window.scrollY > getHeroScrollThreshold());
};

const updateBackTop = () => {
  if (!backTop) return;
  backTop.hidden = window.scrollY <= 600;
};

const updateScrollChrome = () => {
  updateScrolledHeader();
  updateBackTop();
};

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: scrollMotionBehavior() });
});

priceListToggle?.addEventListener("click", () => {
  setPriceListOpen(!priceListOpen);
});

priceListFab?.addEventListener("click", () => {
  setPriceListOpen(!priceListOpen);
});

priceListClose?.addEventListener("click", () => setPriceListOpen(false));

priceListBackdrop?.addEventListener("click", () => setPriceListOpen(false));

priceListPanel?.addEventListener("click", (e) => {
  const quick = e.target.closest("[data-note-quick]");
  if (quick) {
    e.preventDefault();
    const row = quick.closest(".price-list-note-row");
    const input = row?.querySelector("[data-note-input]");
    if (!input) return;
    input.value = toggleQuickNoteText(input.value, quick.dataset.noteText);
    updateLineNote(input.dataset.lineKey, input.dataset.noteIndex, input.value);
    syncQuickNoteChipsForRow(row);
    refreshLineMoney(input.dataset.lineKey);
    input.focus();
    return;
  }

  const up = e.target.closest("[data-qty-up]");
  const down = e.target.closest("[data-qty-down]");
  const rm = e.target.closest("[data-line-remove]");
  const btn = up || down || rm;
  const key = btn?.dataset.lineKey;
  if (!key) return;
  e.preventDefault();
  if (up) changeLineQty(key, 1);
  else if (down) changeLineQty(key, -1);
  else if (rm) removeLine(key);
});

priceListPanel?.addEventListener("input", (e) => {
  const note = e.target.closest("[data-note-input]");
  if (!note) return;
  updateLineNote(note.dataset.lineKey, note.dataset.noteIndex, note.value);
  syncQuickNoteChipsForRow(note.closest(".price-list-note-row"));
  refreshLineMoney(note.dataset.lineKey);
});

priceListClear?.addEventListener("click", () => clearPriceLines());

priceListCopy?.addEventListener("click", () => {
  const text = formatSummaryText();
  if (!text.trim()) return;
  navigator.clipboard.writeText(text).catch(() => {
    window.prompt("Copy this text / 复制以下文本:", text);
  });
});

priceSummaryOpenButtons.forEach((button) => {
  button.addEventListener("click", () => setPriceListOpen(true));
});

priceSummaryClear?.addEventListener("click", () => clearPriceLines());

priceSummaryCopy?.addEventListener("click", () => {
  const text = formatSummaryText();
  if (!text.trim()) return;
  navigator.clipboard.writeText(text).catch(() => {
    window.prompt("Copy this text / 复制以下文本:", text);
  });
});

document.addEventListener("keydown", (e) => {
  if (!priceListOpen) return;
  if (e.key === "Escape") {
    e.preventDefault();
    setPriceListOpen(false);
  }
});

window.addEventListener("scroll", updateScrollChrome, { passive: true });

handleRouteFromHash();
updateScrollChrome();
updatePriceListChrome();
