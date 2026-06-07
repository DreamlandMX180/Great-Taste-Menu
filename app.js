const menuRoot = document.querySelector("#menu-root");
const categoryTabs = document.querySelector("#category-tabs");
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

let activeCategory = "all";

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

const itemAnchorId = (categoryId, number) => {
  const safe = String(number ?? "").replace(/[^a-zA-Z0-9_-]/g, "_");
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
      const number = raw.slice(i + sep.length);
      const cat = window.menuData.find((c) => c.id === categoryId);
      if (cat && cat.items.some((it) => String(it.number) === number)) {
        return { mode: "item", categoryId, number };
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
    return { scrollTargetId: itemAnchorId(p.categoryId, p.number), kind: "dish" };
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
  }
];

const normalize = (value) => String(value || "").trim().toLowerCase();

const getAllItems = () => window.menuData.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id }))
);

const findMenuItem = ({ categoryId, number, imageSrc, imageFallback, imageAlt }) => {
  const category = window.menuData.find((entry) => entry.id === categoryId);
  if (!category) return null;
  const item = category.items.find((entry) => entry.number === number);
  return item ? { item, category, imageSrc, imageFallback, imageAlt } : null;
};

const matchesSearch = (item, category, query) => {
  if (!query) return true;
  const searchable = [
    item.number,
    item.nameEn,
    item.nameZh,
    item.note,
    item.groupEn || "",
    category.categoryEn,
    category.categoryZh,
    ...item.prices.map((price) => `${price.labelEn || ""} ${price.labelZh || ""} ${price.amount}`)
  ].join(" ");
  return normalize(searchable).includes(query);
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const priceAddButtonHtml = (categoryId, number, priceIndex) => {
  const cat = escapeHtml(categoryId);
  const num = escapeHtml(String(number));
  const idx = String(priceIndex);
  return `<button type="button" class="price-add-btn" data-add-price data-category-id="${cat}" data-item-number="${num}" data-price-index="${idx}" aria-label="Add to price list / 加入算价"><span aria-hidden="true">+</span></button>`;
};

const formatPrice = (category, item, priceIndex, price) => {
  const label = price.labelEn ? `<span class="price-label">${price.labelEn}${price.labelZh ? ` / ${price.labelZh}` : ""}</span>` : "";
  const addBtn = priceAddButtonHtml(category.id, item.number, priceIndex);
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

const formatOption = (category, item, priceIndex, price) => {
  const zh = price.labelZh ? `<span class="opt-zh">${price.labelZh}</span>` : "";
  const label = price.labelEn || "Price / 价格";
  const addBtn = priceAddButtonHtml(category.id, item.number, priceIndex);
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

const renderItem = (item, category) => {
  const anchor = itemAnchorId(category.id, item.number);
  const number = item.number ? `<span class="item-number">${item.number}</span>` : "";
  const spicy = item.spicy ? `<span class="spicy-mark" title="Spicy / 辣">辣 / Spicy</span>` : "";
  const note = item.note ? `<p class="item-note">${item.note}</p>` : "";
  const review = item.needsReview ? `<span class="review-badge">Review / 需校对</span>` : "";
  const nameZhLine = item.nameZh ? `<p class="item-name-zh">${item.nameZh}</p>` : "";

  const isOptions = ["specialties", "platters"].includes(category.id) && item.prices.length >= 3;
  const priceList = isOptions
    ? `<div class="price-list price-options" aria-label="Side options and prices for ${item.nameEn}">
        ${item.prices.map((price, idx) => formatOption(category, item, idx, price)).join("")}
      </div>`
    : `<div class="price-list" aria-label="Prices for ${item.nameEn}">
        ${item.prices.map((price, idx) => formatPrice(category, item, idx, price)).join("")}
      </div>`;

  return `
    <article class="menu-item${isOptions ? " menu-item--options" : ""}" id="${anchor}">
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

/** @type {Array<{ categoryId: string, number: string, priceIndex: number, qty: number }>} */
let priceLines = [];

const lineKey = (categoryId, number, priceIndex) => `${categoryId}__${number}__${priceIndex}`;

const resolveLine = (line) => {
  const category = window.menuData?.find((c) => c.id === line.categoryId);
  if (!category) return null;
  const item = category.items.find((it) => String(it.number) === String(line.number));
  if (!item) return null;
  const price = item.prices[line.priceIndex];
  if (!price) return null;
  return { category, item, price };
};

const parsePriceToCents = (amount) => {
  const n = Number.parseFloat(String(amount ?? "").replace(/[^\d.]/g, ""));
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
};

const formatMoney = (cents) => `$${(cents / 100).toFixed(2)}`;

const getTotalCents = () =>
  priceLines.reduce((sum, line) => {
    const r = resolveLine(line);
    if (!r) return sum;
    const unit = parsePriceToCents(r.price.amount);
    return sum + unit * line.qty;
  }, 0);

const getTotalQty = () => priceLines.reduce((s, l) => s + l.qty, 0);

const priceLineLabel = (price) => {
  if (price.labelEn && price.labelZh) return `${price.labelEn} / ${price.labelZh}`;
  if (price.labelEn) return price.labelEn;
  if (price.labelZh) return price.labelZh;
  return "Price / 价格";
};

const addPriceLine = (categoryId, number, priceIndex) => {
  const key = lineKey(categoryId, number, priceIndex);
  const existing = priceLines.find((l) => lineKey(l.categoryId, l.number, l.priceIndex) === key);
  if (existing) existing.qty += 1;
  else priceLines.push({ categoryId, number: String(number), priceIndex, qty: 1 });
  updatePriceListChrome();
};

const changeLineQty = (key, delta) => {
  const i = priceLines.findIndex((l) => lineKey(l.categoryId, l.number, l.priceIndex) === key);
  if (i < 0) return;
  priceLines[i].qty += delta;
  if (priceLines[i].qty <= 0) priceLines.splice(i, 1);
  updatePriceListChrome();
};

const removeLine = (key) => {
  priceLines = priceLines.filter((l) => lineKey(l.categoryId, l.number, l.priceIndex) !== key);
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
    const num = r.item.number ? `#${r.item.number} ` : "";
    const title = `${num}${r.item.nameEn}`.trim();
    const label = priceLineLabel(r.price);
    const unit = parsePriceToCents(r.price.amount) / 100;
    const lineTotal = unit * line.qty;
    lines.push(`${title} · ${label} × ${line.qty}  $${lineTotal.toFixed(2)}`);
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
      const rawKey = lineKey(line.categoryId, line.number, line.priceIndex);
      const num = r.item.number ? `#${escapeHtml(String(r.item.number))} ` : "";
      const title = `${num}${escapeHtml(r.item.nameEn)}`;
      const detail = escapeHtml(priceLineLabel(r.price));
      const unitCents = parsePriceToCents(r.price.amount);
      const subCents = unitCents * line.qty;
      const sub = escapeHtml(formatMoney(subCents));
      return `
        <div class="price-list-line" data-line-key="${rawKey}">
          <div class="price-list-line-info">
            <span class="price-list-line-title">${title}</span>
            <span class="price-list-line-detail">${detail}</span>
          </div>
          <div class="price-list-line-controls">
            <button type="button" class="price-list-qty-btn" data-qty-down data-line-key="${rawKey}" aria-label="Decrease quantity / 减少">−</button>
            <span class="price-list-line-qty" aria-label="Quantity / 数量">× ${line.qty}</span>
            <button type="button" class="price-list-qty-btn" data-qty-up data-line-key="${rawKey}" aria-label="Increase quantity / 增加">+</button>
            <span class="price-list-line-sub">${sub}</span>
            <button type="button" class="price-list-remove" data-line-remove data-line-key="${rawKey}" aria-label="Remove / 删除">×</button>
          </div>
        </div>
      `;
    })
    .join("");
};

const updatePriceListBadge = () => {
  if (!priceListBadge) return;
  const n = getTotalQty();
  const cents = getTotalCents();
  if (n === 0) {
    priceListBadge.hidden = true;
    return;
  }
  priceListBadge.hidden = false;
  priceListBadge.textContent = `${formatMoney(cents)} · ${n}`;
};

const updatePriceListTotal = () => {
  if (priceListTotal) priceListTotal.textContent = formatMoney(getTotalCents());
};

const updatePriceListChrome = () => {
  renderPricePanelLines();
  updatePriceListBadge();
  updatePriceListTotal();
};

let priceListOpen = false;

const setPriceListOpen = (open) => {
  priceListOpen = open;
  priceListToggle?.setAttribute("aria-expanded", open ? "true" : "false");
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
      priceListToggle?.focus();
    }
  }
};

const flashMenuItemForButton = (btn) => {
  const item = btn?.closest?.(".menu-item");
  if (!item) return;
  item.classList.add("menu-item--add-flash");
  window.setTimeout(() => item.classList.remove("menu-item--add-flash"), 220);
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

const renderFeaturedItem = ({ item, category, imageSrc, imageFallback, imageAlt }) => {
  const spicy = item.spicy ? `<span class="spicy-mark" title="Spicy / 辣">辣 / Spicy</span>` : "";
  const href = `#${itemAnchorId(category.id, item.number)}`;
  const photo = imageFallback
    ? `<picture>
        <source srcset="${imageSrc}?v=1" type="image/webp">
        <img src="${imageFallback}" alt="${imageAlt}" width="640" height="480" loading="lazy" decoding="async">
      </picture>`
    : `<img src="${imageSrc}" alt="${imageAlt}" width="640" height="480" loading="lazy" decoding="async">`;

  return `
    <a class="featured-card" href="${href}" data-featured-category="${category.id}" data-featured-number="${item.number}">
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
          ${item.prices.map(formatFeaturedPrice).join("")}
        </div>
      </div>
    </a>
  `;
};

const renderFeaturedSpecials = () => {
  if (!featuredRoot) return;
  const items = featuredSpecials.map(findMenuItem).filter(Boolean);
  featuredRoot.innerHTML = items.map(renderFeaturedItem).join("");
};

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
  categoryTabs.setAttribute("aria-label", "Menu categories / 菜单分类");
};

const renderMenu = () => {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  const sections = window.menuData.map((category) => {
    if (activeCategory !== "all" && category.id !== activeCategory) return "";

    const items = category.items.filter((item) => matchesSearch(item, category, query));
    if (!items.length) return "";

    visibleCount += items.length;

    const subtitle = category.categoryZh
      ? `${category.categoryZh}${category.note ? ` · ${category.note}` : ""}`
      : category.note || "";

    const subtitleHtml = subtitle
      ? `<p class="section-subtitle">${subtitle}</p>`
      : "";

    return `
      <section class="menu-section" id="${category.id}" role="region" aria-labelledby="tab-${category.id}">
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

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderMenu();
  syncUrlHashFromFilter();
  scrollToCategory(activeCategory);
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
  const addBtn = event.target.closest("[data-add-price]");
  if (addBtn) {
    event.preventDefault();
    const categoryId = addBtn.dataset.categoryId;
    const number = addBtn.dataset.itemNumber;
    const priceIndex = Number.parseInt(addBtn.dataset.priceIndex ?? "0", 10);
    if (!categoryId || number == null || Number.isNaN(priceIndex)) return;
    addPriceLine(categoryId, number, priceIndex);
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

featuredRoot?.addEventListener("click", (event) => {
  const a = event.target.closest("a.featured-card");
  if (!a?.hash) return;
  event.preventDefault();
  history.pushState(null, "", a.hash);
  handleRouteFromHash();
});

searchInput.addEventListener("input", () => {
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

priceListClose?.addEventListener("click", () => setPriceListOpen(false));

priceListBackdrop?.addEventListener("click", () => setPriceListOpen(false));

priceListPanel?.addEventListener("click", (e) => {
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

priceListClear?.addEventListener("click", () => clearPriceLines());

priceListCopy?.addEventListener("click", () => {
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
