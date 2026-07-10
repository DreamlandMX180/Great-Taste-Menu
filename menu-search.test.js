const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

global.window = {};
require("./menu-data.js");

const { searchMenu, stateForCategory, stateForSearch } = require("./menu-search.js");

test("searches every category even when the caller came from another category", () => {
  const results = searchMenu(window.menuData, "General Tso");

  assert.ok(results.some(({ category, item }) =>
    category.id === "chicken" && item.nameEn === "General Tso's Chicken"
  ));
  assert.ok(results.some(({ category, item }) =>
    category.id === "seafood" && item.nameEn === "General Tso's Shrimp"
  ));
});

test("matches Chinese dish names", () => {
  const results = searchMenu(window.menuData, "\u5de6\u5b97\u9e21");

  assert.equal(results[0].item.nameEn, "General Tso's Chicken");
  assert.equal(results[0].category.id, "chicken");
});

test("ranks an exact dish number before text matches", () => {
  const results = searchMenu(window.menuData, "C14");

  assert.equal(results[0].item.number, "C14");
});

test("matches category and option copy", () => {
  const results = searchMenu(window.menuData, "crispy noodles");

  assert.ok(results.length > 0);
  assert.ok(results.every(({ category }) => category.id === "soup" || category.id === "chow-mein"));
});

test("searching from a category switches the result scope back to all menu items", () => {
  assert.deepEqual(stateForSearch("soup", "General Tso"), {
    activeCategory: "all",
    query: "General Tso"
  });
});

test("choosing a category clears a previous quick search", () => {
  assert.deepEqual(stateForCategory("seafood"), {
    activeCategory: "seafood",
    query: ""
  });
});

test("mobile quick-search rows give dish names their own line", () => {
  const css = fs.readFileSync("./styles.css", "utf8");
  const mobileBlock = css.slice(css.lastIndexOf("@media (max-width: 640px) {"));
  const quickResultRule = mobileBlock.match(/\.quick-search-result\s*\{([^}]*)\}/);

  assert.ok(quickResultRule, "mobile quick-search rule should exist");
  assert.match(quickResultRule[1], /grid-template-columns:\s*1fr;/);
});
