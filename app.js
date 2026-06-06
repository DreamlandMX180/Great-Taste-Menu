const menuRoot = document.querySelector("#menu-root");
const categoryTabs = document.querySelector("#category-tabs");
const searchInput = document.querySelector("#menu-search");
const resultCount = document.querySelector("#result-count");
const clearSearch = document.querySelector("#clear-search");
const featuredRoot = document.querySelector("#featured-specials-root");

let activeCategory = "all";

const scrollMotionBehavior = () =>
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

const getStickyOverlapPx = () => {
  const header = document.querySelector(".site-header");
  const tools = document.querySelector(".menu-tools");
  return (header?.offsetHeight ?? 72) + (tools?.offsetHeight ?? 120) + 8;
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
    imageSrc: "assets/general-tso-shrimp.jpg",
    imageAlt: "General Tso's shrimp over rice"
  },
  {
    categoryId: "chicken",
    number: "89",
    imageSrc: "assets/general-tso-chicken.jpg",
    imageAlt: "General Tso's chicken plate"
  }
];

const normalize = (value) => String(value || "").trim().toLowerCase();

const getAllItems = () => window.menuData.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id }))
);

const findMenuItem = ({ categoryId, number, imageSrc, imageAlt }) => {
  const category = window.menuData.find((entry) => entry.id === categoryId);
  if (!category) return null;
  const item = category.items.find((entry) => entry.number === number);
  return item ? { item, category, imageSrc, imageAlt } : null;
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

const formatPrice = (price) => {
  const label = price.labelEn ? `<span class="price-label">${price.labelEn}${price.labelZh ? ` / ${price.labelZh}` : ""}</span>` : "";
  return `
    <span class="price-chip">
      ${label}
      <span class="price-value">$${price.amount}</span>
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

const renderItem = (item, category) => {
  const anchor = itemAnchorId(category.id, item.number);
  const number = item.number ? `<span class="item-number">${item.number}</span>` : "";
  const spicy = item.spicy ? `<span class="spicy-mark" title="Spicy / 辣">辣 / Spicy</span>` : "";
  const note = item.note ? `<p class="item-note">${item.note}</p>` : "";
  const review = item.needsReview ? `<span class="review-badge">Review / 需校对</span>` : "";
  const nameZhLine = item.nameZh ? `<p class="item-name-zh">${item.nameZh}</p>` : "";

  return `
    <article class="menu-item" id="${anchor}">
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
      <div class="price-list" aria-label="Prices for ${item.nameEn}">
        ${item.prices.map(formatPrice).join("")}
      </div>
    </article>
  `;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

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

const renderFeaturedItem = ({ item, category, imageSrc, imageAlt }) => {
  const spicy = item.spicy ? `<span class="spicy-mark" title="Spicy / 辣">辣 / Spicy</span>` : "";
  const href = `#${itemAnchorId(category.id, item.number)}`;

  return `
    <a class="featured-card" href="${href}">
      <div class="featured-photo">
        <img src="${imageSrc}" alt="${imageAlt}" width="640" height="480" loading="lazy" decoding="async">
      </div>
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
});

handleRouteFromHash();
