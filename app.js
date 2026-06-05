const menuRoot = document.querySelector("#menu-root");
const categoryTabs = document.querySelector("#category-tabs");
const searchInput = document.querySelector("#menu-search");
const resultCount = document.querySelector("#result-count");
const clearSearch = document.querySelector("#clear-search");

let activeCategory = "all";

const normalize = (value) => String(value || "").trim().toLowerCase();

const getAllItems = () => window.menuData.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id }))
);

const matchesSearch = (item, category, query) => {
  if (!query) return true;
  const searchable = [
    item.number,
    item.nameEn,
    item.nameZh,
    item.note,
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

const renderItem = (item) => {
  const number = item.number ? `<span class="item-number">${item.number}</span>` : "";
  const spicy = item.spicy ? `<span class="spicy-mark" title="Spicy / 辣">辣</span>` : "";
  const note = item.note ? `<p class="item-note">${item.note}</p>` : "";
  const review = item.needsReview ? `<span class="review-badge">Review / 需校对</span>` : "";

  return `
    <article class="menu-item">
      <div class="item-main">
        <div class="item-line">
          ${number}
          <span class="item-name-en">${item.nameEn}</span>
          ${spicy}
        </div>
        <p class="item-name-zh">${item.nameZh}</p>
        ${note}
        ${review}
      </div>
      <div class="price-list" aria-label="Prices for ${item.nameEn}">
        ${item.prices.map(formatPrice).join("")}
      </div>
    </article>
  `;
};

const renderCategories = () => {
  const tabs = [
    { id: "all", categoryEn: "All", categoryZh: "全部" },
    ...window.menuData
  ];

  categoryTabs.innerHTML = tabs.map((category) => `
    <button
      class="category-tab"
      type="button"
      data-category="${category.id}"
      aria-selected="${category.id === activeCategory}"
    >
      ${category.categoryEn} / ${category.categoryZh}
    </button>
  `).join("");
};

const renderMenu = () => {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  const sections = window.menuData.map((category) => {
    if (activeCategory !== "all" && category.id !== activeCategory) return "";

    const items = category.items.filter((item) => matchesSearch(item, category, query));
    if (!items.length) return "";

    visibleCount += items.length;

    return `
      <section class="menu-section" id="${category.id}">
        <div class="section-header">
          <div>
            <h2 class="section-title">${category.categoryEn}</h2>
            <p class="section-subtitle">${category.categoryZh}${category.note ? ` · ${category.note}` : ""}</p>
          </div>
          <span class="section-count">${items.length}</span>
        </div>
        <div class="item-list">
          ${items.map(renderItem).join("")}
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
});

searchInput.addEventListener("input", renderMenu);

clearSearch.addEventListener("click", () => {
  activeCategory = "all";
  searchInput.value = "";
  renderCategories();
  renderMenu();
  searchInput.focus();
});

renderCategories();
renderMenu();
