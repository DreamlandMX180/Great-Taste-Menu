(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.menuSearch = api;
})(typeof window !== "undefined" ? window : globalThis, () => {
  const normalize = (value) => String(value || "").trim().toLowerCase();

  const searchableText = (item, category) => [
    item.number,
    item.nameEn,
    item.nameZh,
    item.note,
    item.groupEn || "",
    category.categoryEn,
    category.categoryZh,
    category.note,
    item.wingPricing
      ? `${item.wingPricing.minQty} pcs min ${item.wingPricing.maxQty} max ${item.wingPricing.unitPrice} per wing`
      : "",
    ...(item.prices || []).map((price) => `${price.labelEn || ""} ${price.labelZh || ""} ${price.amount}`)
  ].join(" ");

  const matchRank = (item, category, query) => {
    const number = normalize(item.number);
    const nameEn = normalize(item.nameEn);
    const nameZh = normalize(item.nameZh);
    const categoryEn = normalize(category.categoryEn);
    const categoryZh = normalize(category.categoryZh);

    if (number === query) return 0;
    if (nameEn === query || nameZh === query) return 1;
    if (nameEn.startsWith(query) || nameZh.startsWith(query)) return 2;
    if (categoryEn === query || categoryZh === query) return 3;
    return normalize(searchableText(item, category)).includes(query) ? 4 : null;
  };

  const searchMenu = (menuData, rawQuery) => {
    const query = normalize(rawQuery);
    if (!query) return [];

    return menuData
      .flatMap((category, categoryIndex) => category.items.map((item, itemIndex) => ({
        category,
        item,
        categoryIndex,
        itemIndex,
        rank: matchRank(item, category, query)
      })))
      .filter((result) => result.rank !== null)
      .sort((a, b) =>
        a.rank - b.rank ||
        a.categoryIndex - b.categoryIndex ||
        a.itemIndex - b.itemIndex
      )
      .map(({ category, item }) => ({ category, item }));
  };

  const stateForSearch = (activeCategory, rawQuery) => {
    const query = String(rawQuery || "");
    return {
      activeCategory: normalize(query) ? "all" : activeCategory,
      query
    };
  };

  const stateForCategory = (categoryId) => ({
    activeCategory: categoryId,
    query: ""
  });

  return { normalize, searchMenu, stateForSearch, stateForCategory };
});
