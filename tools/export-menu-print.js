/**
 * Export current window.menuData to CSV + XLSX in outputs/great-taste-print-menu.
 * Usage: node tools/export-menu-print.js
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "outputs", "great-taste-print-menu");
const stamp = "2026-07-20";
const csvName = `Great Taste Menu Data ${stamp}.csv`;
const xlsxName = `Great Taste Printable Menu ${stamp}.xlsx`;

global.window = {};
require(path.join(root, "menu-data.js"));
const menuData = window.menuData;
if (!Array.isArray(menuData) || menuData.length === 0) {
  console.error("menuData missing or empty");
  process.exit(1);
}

function spicyCell(item) {
  if (!item.spicy) return "";
  return "Yes / 辣";
}

function maxPriceCount(data) {
  let max = 0;
  for (const category of data) {
    for (const item of category.items || []) {
      max = Math.max(max, (item.prices || []).length);
    }
  }
  return max;
}

function buildHeader(priceSlots) {
  const base = [
    "Category EN",
    "Category ZH",
    "Category Note",
    "Number",
    "Name EN",
    "Name ZH",
    "Spicy",
    "Item Note"
  ];
  for (let i = 1; i <= priceSlots; i += 1) {
    base.push(`Price ${i} Label EN`, `Price ${i} Label ZH`, `Price ${i} Amount`);
  }
  return base;
}

function itemToRow(category, item, priceSlots) {
  const row = [
    category.categoryEn || "",
    category.categoryZh || "",
    category.note || "",
    item.number || "",
    item.nameEn || "",
    item.nameZh || "",
    spicyCell(item),
    item.note || ""
  ];
  const prices = item.prices || [];
  for (let i = 0; i < priceSlots; i += 1) {
    const price = prices[i];
    if (price) {
      row.push(price.labelEn || "", price.labelZh || "", price.amount || "");
    } else {
      row.push("", "", "");
    }
  }
  return row;
}

function escapeCsv(value) {
  const text = value == null ? "" : String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n")}\r\n`;
}

const priceSlots = maxPriceCount(menuData);
const header = buildHeader(priceSlots);
const rows = [header];

for (const category of menuData) {
  for (const item of category.items || []) {
    rows.push(itemToRow(category, item, priceSlots));
  }
}

fs.mkdirSync(outDir, { recursive: true });

const csvPath = path.join(outDir, csvName);
const xlsxPath = path.join(outDir, xlsxName);
const jsonPath = path.join(outDir, `_export-rows-${stamp}.json`);
const pyPath = path.join(outDir, `_export-xlsx-${stamp}.py`);

fs.writeFileSync(csvPath, `\uFEFF${toCsv(rows)}`, "utf8");
fs.writeFileSync(
  jsonPath,
  JSON.stringify({ header, rows: rows.slice(1), priceSlots, xlsxPath }, null, 2),
  "utf8"
);

const pyScript = [
  "import json",
  "from openpyxl import Workbook",
  "from openpyxl.styles import Font, PatternFill, Alignment, Border, Side",
  "from openpyxl.utils import get_column_letter",
  "",
  `data = json.load(open(r${JSON.stringify(jsonPath)}, encoding="utf-8"))`,
  "wb = Workbook()",
  "ws = wb.active",
  'ws.title = "Menu Data"',
  "",
  'header = data["header"]',
  "ws.append(header)",
  "",
  'header_fill = PatternFill("solid", fgColor="8A0F14")',
  'header_font = Font(bold=True, color="FFFFFF", name="Calibri", size=11)',
  "thin = Border(",
  '    left=Side(style="thin", color="D9D9D9"),',
  '    right=Side(style="thin", color="D9D9D9"),',
  '    top=Side(style="thin", color="D9D9D9"),',
  '    bottom=Side(style="thin", color="D9D9D9"),',
  ")",
  "",
  "for col, _ in enumerate(header, 1):",
  "    cell = ws.cell(1, col)",
  "    cell.fill = header_fill",
  "    cell.font = header_font",
  '    cell.alignment = Alignment(vertical="center", wrap_text=True)',
  "    cell.border = thin",
  "",
  'for row in data["rows"]:',
  "    ws.append(row)",
  "",
  "for r in range(2, ws.max_row + 1):",
  "    for c in range(1, ws.max_column + 1):",
  "        cell = ws.cell(r, c)",
  '        cell.font = Font(name="Calibri", size=11)',
  '        cell.alignment = Alignment(vertical="center", wrap_text=True)',
  "        cell.border = thin",
  "",
  'ws.freeze_panes = "A2"',
  "ws.auto_filter.ref = ws.dimensions",
  "ws.row_dimensions[1].height = 30",
  "",
  "widths = {1: 22, 2: 14, 3: 42, 4: 10, 5: 34, 6: 18, 7: 10, 8: 36}",
  "for col in range(1, ws.max_column + 1):",
  "    letter = get_column_letter(col)",
  "    if col in widths:",
  "        ws.column_dimensions[letter].width = widths[col]",
  "    elif (col - 8) % 3 == 1:",
  "        ws.column_dimensions[letter].width = 22",
  "    elif (col - 8) % 3 == 2:",
  "        ws.column_dimensions[letter].width = 14",
  "    else:",
  "        ws.column_dimensions[letter].width = 10",
  "",
  'out = data["xlsxPath"]',
  "wb.save(out)",
  "print(out)",
  'print("rows", ws.max_row - 1, "cols", ws.max_column, "price_slots", data["priceSlots"])',
  ""
].join("\n");

fs.writeFileSync(pyPath, pyScript, "utf8");
execFileSync("py", ["-3", pyPath], { stdio: "inherit" });
fs.unlinkSync(jsonPath);
fs.unlinkSync(pyPath);

console.log("Wrote", csvPath);
console.log("Wrote", xlsxPath);
console.log("Items:", rows.length - 1, "Price slots:", priceSlots);
