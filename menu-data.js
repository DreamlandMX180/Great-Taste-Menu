const chickenSeafoodRicePrices = [
  { labelEn: "Pt White Rice", labelZh: "小 白饭", amount: "10.00" },
  { labelEn: "Pt Fried Rice", labelZh: "小 炒饭", amount: "11.00" },
  { labelEn: "Pt Chicken Fried Rice", labelZh: "小 鸡炒饭", amount: "12.00" },
  { labelEn: "Pt Pork Fried Rice", labelZh: "小 猪炒饭", amount: "12.00" },
  { labelEn: "Pt Beef Fried Rice", labelZh: "小 牛炒饭", amount: "12.00" },
  { labelEn: "Pt Shrimp Fried Rice", labelZh: "小 虾炒饭", amount: "12.00" },
  { labelEn: "Qt White Rice", labelZh: "大 白饭", amount: "14.00" },
  { labelEn: "Qt Fried Rice", labelZh: "大 炒饭", amount: "16.00" },
  { labelEn: "Qt Chicken Fried Rice", labelZh: "大 鸡炒饭", amount: "18.00" },
  { labelEn: "Qt Pork Fried Rice", labelZh: "大 猪炒饭", amount: "18.00" },
  { labelEn: "Qt Beef Fried Rice", labelZh: "大 牛炒饭", amount: "18.00" },
  { labelEn: "Qt Shrimp Fried Rice", labelZh: "大 虾炒饭", amount: "18.00" }
];

const beefRicePrices = [
  { labelEn: "Pt White Rice", labelZh: "小 白饭", amount: "11.00" },
  { labelEn: "Pt Fried Rice", labelZh: "小 炒饭", amount: "12.00" },
  { labelEn: "Pt Chicken Fried Rice", labelZh: "小 鸡炒饭", amount: "13.00" },
  { labelEn: "Pt Pork Fried Rice", labelZh: "小 猪炒饭", amount: "13.00" },
  { labelEn: "Pt Beef Fried Rice", labelZh: "小 牛炒饭", amount: "13.00" },
  { labelEn: "Pt Shrimp Fried Rice", labelZh: "小 虾炒饭", amount: "13.00" },
  { labelEn: "Qt White Rice", labelZh: "大 白饭", amount: "14.00" },
  { labelEn: "Qt Fried Rice", labelZh: "大 炒饭", amount: "16.00" },
  { labelEn: "Qt Chicken Fried Rice", labelZh: "大 鸡炒饭", amount: "18.00" },
  { labelEn: "Qt Pork Fried Rice", labelZh: "大 猪炒饭", amount: "18.00" },
  { labelEn: "Qt Beef Fried Rice", labelZh: "大 牛炒饭", amount: "18.00" },
  { labelEn: "Qt Shrimp Fried Rice", labelZh: "大 虾炒饭", amount: "18.00" }
];

const buildRicePrices = ({ ptWhite, ptFried, ptMeat, qtWhite, qtFried, qtMeat }) => [
  { labelEn: "Pt White Rice", labelZh: "小 白饭", amount: ptWhite },
  { labelEn: "Pt Fried Rice", labelZh: "小 炒饭", amount: ptFried },
  { labelEn: "Pt Chicken Fried Rice", labelZh: "小 鸡炒饭", amount: ptMeat },
  { labelEn: "Pt Pork Fried Rice", labelZh: "小 猪炒饭", amount: ptMeat },
  { labelEn: "Pt Beef Fried Rice", labelZh: "小 牛炒饭", amount: ptMeat },
  { labelEn: "Pt Shrimp Fried Rice", labelZh: "小 虾炒饭", amount: ptMeat },
  { labelEn: "Qt White Rice", labelZh: "大 白饭", amount: qtWhite },
  { labelEn: "Qt Fried Rice", labelZh: "大 炒饭", amount: qtFried },
  { labelEn: "Qt Chicken Fried Rice", labelZh: "大 鸡炒饭", amount: qtMeat },
  { labelEn: "Qt Pork Fried Rice", labelZh: "大 猪炒饭", amount: qtMeat },
  { labelEn: "Qt Beef Fried Rice", labelZh: "大 牛炒饭", amount: qtMeat },
  { labelEn: "Qt Shrimp Fried Rice", labelZh: "大 虾炒饭", amount: qtMeat }
];

const buildSingleRicePrices = ({ white, fried, meat }) => [
  { labelEn: "White Rice", labelZh: "白饭", amount: white },
  { labelEn: "Fried Rice", labelZh: "炒饭", amount: fried },
  { labelEn: "Chicken Fried Rice", labelZh: "鸡炒饭", amount: meat },
  { labelEn: "Pork Fried Rice", labelZh: "猪炒饭", amount: meat },
  { labelEn: "Beef Fried Rice", labelZh: "牛炒饭", amount: meat },
  { labelEn: "Shrimp Fried Rice", labelZh: "虾炒饭", amount: meat }
];

const vegetableEggFooYoungRicePrices = buildRicePrices({
  ptWhite: "7.00",
  ptFried: "8.00",
  ptMeat: "10.00",
  qtWhite: "9.00",
  qtFried: "10.00",
  qtMeat: "12.00"
});

const eggFooYoungRicePrices = buildRicePrices({
  ptWhite: "8.00",
  ptFried: "9.00",
  ptMeat: "11.00",
  qtWhite: "11.00",
  qtFried: "12.00",
  qtMeat: "14.00"
});

const houseSpecialEggFooYoungRicePrices = buildSingleRicePrices({
  white: "11.00",
  fried: "12.00",
  meat: "14.00"
});

const vegetableRicePrices = buildRicePrices({
  ptWhite: "7.00",
  ptFried: "8.00",
  ptMeat: "9.00",
  qtWhite: "10.00",
  qtFried: "11.00",
  qtMeat: "13.00"
});

const riceOptionNote = "White rice, fried rice, and meat fried rice options listed below. / 白饭、炒饭及各肉炒饭价格如下。";

window.menuData = [
  {
    id: "specialties",
    categoryEn: "Specialties & Sides",
    categoryZh: "特色拼盘",
    note: "Letter items A–M, priced by side. / 字母项 A–M，按配餐选项计价。",
    items: [
      { number: "A", nameEn: "Fried Crab Sticks (5)", nameZh: "炸蟹棒", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.00" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.00" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "B", nameEn: "Fried Chicken Gizzards", nameZh: "炸鸡胗", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.00" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.00" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "C", nameEn: "Chicken Wings (4)", nameZh: "鸡翅", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "D", nameEn: "Spare Ribs Tips", nameZh: "排骨尖", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "E", nameEn: "Whiting Fish (2 pcs)", nameZh: "炸鳕鱼", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "F", nameEn: "Chicken Finger (4)", nameZh: "炸鸡柳", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "G", nameEn: "Boneless Spare Ribs", nameZh: "无骨排", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "9.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "11.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "12.00" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "12.00" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "11.00" }] },
      { number: "H", nameEn: "Fried Shrimp in Basket", nameZh: "炸虾篮", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "I", nameEn: "Pork Chop (2)", nameZh: "炸猪排", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "J", nameEn: "Chicken Nuggets (10)", nameZh: "鸡米花", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "K", nameEn: "Fried Scallops (8)", nameZh: "炸干贝", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] },
      { number: "L", nameEn: "Chicken Wing with Garlic Sauce (4)", nameZh: "鱼香鸡翅", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "8.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "9.75" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "11.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "11.50" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "11.00" }], spicy: true },
      { number: "M", nameEn: "Popcorn Chicken", nameZh: "爆米花鸡", prices: [{ labelEn: "Plain", labelZh: "单点", amount: "6.00" }, { labelEn: "White Rice / Fried Rice / Fries", labelZh: "白饭/炒饭/薯条", amount: "8.00" }, { labelEn: "Chicken/Pork Fried Rice", labelZh: "鸡/叉烧炒饭", amount: "9.50" }, { labelEn: "Beef/Shrimp Fried Rice", labelZh: "牛/虾炒饭", amount: "9.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.50" }] }
    ]
  },
  {
    id: "platters",
    categoryEn: "Wing Platters",
    categoryZh: "鸡翅拼盘",
    note: "By wing count; pick one side each. / 按翅数，每项选一种配餐。",
    items: [
      { number: "WP1", nameEn: "Chicken Wings (3)", nameZh: "三只翅", prices: [{ labelEn: "Fried rice or French fries", labelZh: "炒饭或薯条", amount: "6.75" }, { labelEn: "Chicken or pork fried rice", labelZh: "鸡/叉烧炒饭", amount: "8.25" }, { labelEn: "Beef or shrimp fried rice", labelZh: "牛/虾炒饭", amount: "8.75" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "8.75" }] },
      { number: "WP2", nameEn: "Chicken Wings (4)", nameZh: "四只翅", prices: [{ labelEn: "Fried rice or French fries", labelZh: "炒饭或薯条", amount: "8.25" }, { labelEn: "Chicken or pork fried rice", labelZh: "鸡/叉烧炒饭", amount: "9.75" }, { labelEn: "Beef or shrimp fried rice", labelZh: "牛/虾炒饭", amount: "10.25" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "9.75" }] },
      { number: "WP3", nameEn: "Chicken Wings (5)", nameZh: "五只翅", prices: [{ labelEn: "Fried rice or French fries", labelZh: "炒饭或薯条", amount: "9.75" }, { labelEn: "Chicken or pork fried rice", labelZh: "鸡/叉烧炒饭", amount: "11.25" }, { labelEn: "Beef or shrimp fried rice", labelZh: "牛/虾炒饭", amount: "11.50" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "11.25" }] },
      { number: "WP4", nameEn: "Chicken Wings (6)", nameZh: "六只翅", prices: [{ labelEn: "Fried rice or French fries", labelZh: "炒饭或薯条", amount: "11.25" }, { labelEn: "Chicken or pork fried rice", labelZh: "鸡/叉烧炒饭", amount: "12.75" }, { labelEn: "Beef or shrimp fried rice", labelZh: "牛/虾炒饭", amount: "13.00" }, { labelEn: "Lo Mein", labelZh: "捞面", amount: "13.00" }] }
    ]
  },
  {
    id: "appetizers",
    categoryEn: "Appetizers",
    categoryZh: "头盘",
    items: [
      { number: "1", nameEn: "Spring Roll", nameZh: "春卷", prices: [{ amount: "2.00" }] },
      { number: "2", nameEn: "Pizza Roll", nameZh: "披萨卷", prices: [{ amount: "2.00" }] },
      { number: "3", nameEn: "Shrimp Egg Roll", nameZh: "虾蛋卷", prices: [{ amount: "2.00" }] },
      { number: "4", nameEn: "Egg Roll", nameZh: "鸡蛋卷", prices: [{ amount: "2.00" }] },
      { number: "5", nameEn: "Cheese Steak Egg Roll", nameZh: "乳酪牛排蛋卷", prices: [{ amount: "2.00" }] },
      { number: "6", nameEn: "Chinese Donuts (10)", nameZh: "甜甜圈", prices: [{ amount: "4.00" }] },
      { number: "7", nameEn: "French Fries", nameZh: "炸薯条", prices: [{ labelEn: "Sm", labelZh: "小", amount: "2.25" }, { labelEn: "Lg", labelZh: "大", amount: "4.50" }] },
      { number: "8", nameEn: "Fried Scallops (10)", nameZh: "炸干贝", prices: [{ amount: "6.00" }] },
      { number: "9", nameEn: "Onion Rings (10)", nameZh: "洋葱圈", prices: [{ amount: "3.00" }] },
      { number: "10", nameEn: "Steamed or Fried Dumplings (8)", nameZh: "蒸或煎饺子", prices: [{ amount: "7.00" }] },
      { number: "11", nameEn: "Teriyaki Chicken", nameZh: "照烧鸡", prices: [{ amount: "2.00" }] },
      { number: "12", nameEn: "Buffalo Wings", nameZh: "辣味鸡翅", prices: [{ amount: "8.00" }], spicy: true },
      { number: "13", nameEn: "Steamed Shrimp (20)", nameZh: "蒸虾", prices: [{ amount: "7.00" }] },
      {
        number: "14",
        nameEn: "Salt and Pepper Wings",
        nameZh: "椒盐鸡翅",
        note: "$1 per wing. Minimum 3 wings. / 每只$1，三只起售。",
        prices: [
          { labelEn: "3 pcs min", labelZh: "三只起", amount: "3.00" },
          { labelEn: "Per wing", labelZh: "每只", amount: "1.00" }
        ]
      },
      {
        number: "FCW",
        nameEn: "Fried Chicken Wings",
        nameZh: "炸鸡翅",
        note: "$1.50 per wing. Minimum 3 wings; maximum 66 wings. / 每只$1.50，三只起售，最多66只。",
        wingPricing: { unitPrice: 1.5, minQty: 3, maxQty: 66 },
        prices: [
          { labelEn: "3 pcs min", labelZh: "三只起", amount: "4.50" },
          { labelEn: "Per wing", labelZh: "每只", amount: "1.50" }
        ]
      },
      { number: "15", nameEn: "Shrimp on the Stick (5)", nameZh: "串烧虾", prices: [{ amount: "2.00" }] },
      { number: "16", nameEn: "Jumbo Shrimp on the Stick (5)", nameZh: "串烧大虾", prices: [{ amount: "5.00" }] }
    ]
  },
  {
    id: "soup",
    categoryEn: "Soup",
    categoryZh: "汤",
    note: "Served with crispy noodles.",
    items: [
      { number: "17", nameEn: "Wonton Soup", nameZh: "云吞汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.00" }, { labelEn: "Qt", labelZh: "大", amount: "6.00" }] },
      { number: "18", nameEn: "Wonton Egg Drop Soup", nameZh: "云吞蛋花汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.00" }, { labelEn: "Qt", labelZh: "大", amount: "6.00" }] },
      { number: "19", nameEn: "Subgum Wonton Soup", nameZh: "杂菜云吞汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "5.50" }, { labelEn: "Qt", labelZh: "大", amount: "8.50" }] },
      { number: "20", nameEn: "Egg Drop Soup", nameZh: "蛋花汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.00" }, { labelEn: "Qt", labelZh: "大", amount: "6.00" }] },
      { number: "21", nameEn: "Chicken Egg Drop Soup", nameZh: "鸡肉蛋花汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.00" }, { labelEn: "Qt", labelZh: "大", amount: "6.00" }] },
      { number: "22", nameEn: "Chicken Noodle Soup", nameZh: "鸡肉面汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.00" }, { labelEn: "Qt", labelZh: "大", amount: "7.00" }] },
      { number: "23", nameEn: "Hot & Sour Soup", nameZh: "酸辣汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.00" }, { labelEn: "Qt", labelZh: "大", amount: "6.00" }], spicy: true },
      { number: "24", nameEn: "Mixed Vegetable Soup", nameZh: "什锦蔬菜汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.00" }, { labelEn: "Qt", labelZh: "大", amount: "6.00" }] },
      { number: "25", nameEn: "House Special Soup", nameZh: "本楼汤", prices: [{ labelEn: "Pt", labelZh: "小", amount: "5.50" }, { labelEn: "Qt", labelZh: "大", amount: "8.50" }] },
      { number: "26", nameEn: "Seafood Soup", nameZh: "海鲜汤", note: "Shrimp, crabmeat, scallop", prices: [{ labelEn: "Pt", labelZh: "小", amount: "5.50" }, { labelEn: "Qt", labelZh: "大", amount: "8.50" }] }
    ]
  },
  {
    id: "fried-rice",
    categoryEn: "Fried Rice",
    categoryZh: "炒饭",
    items: [
      { number: "27", nameEn: "Plain Fried Rice", nameZh: "原味炒饭", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.50" }, { labelEn: "Qt", labelZh: "大", amount: "8.00" }] },
      { number: "28", nameEn: "Vegetable Fried Rice", nameZh: "蔬菜炒饭", prices: [{ labelEn: "Pt", labelZh: "小", amount: "5.50" }, { labelEn: "Qt", labelZh: "大", amount: "9.00" }] },
      { number: "29", nameEn: "Roast Pork Fried Rice", nameZh: "叉烧炒饭", prices: [{ labelEn: "Pt", labelZh: "小", amount: "6.25" }, { labelEn: "Qt", labelZh: "大", amount: "11.00" }] },
      { number: "31", nameEn: "Shrimp Fried Rice", nameZh: "虾炒饭", prices: [{ labelEn: "Pt", labelZh: "小", amount: "6.00" }, { labelEn: "Qt", labelZh: "大", amount: "11.00" }] },
      { number: "32", nameEn: "Chicken Fried Rice", nameZh: "鸡肉炒饭", prices: [{ labelEn: "Pt", labelZh: "小", amount: "6.00" }, { labelEn: "Qt", labelZh: "大", amount: "11.00" }] },
      { number: "33", nameEn: "Beef Fried Rice", nameZh: "牛肉炒饭", prices: [{ labelEn: "Pt", labelZh: "小", amount: "6.50" }, { labelEn: "Qt", labelZh: "大", amount: "11.00" }] },
      { number: "34", nameEn: "House Special Fried Rice", nameZh: "本楼炒饭", prices: [{ labelEn: "Pt", labelZh: "小", amount: "6.50" }, { labelEn: "Qt", labelZh: "大", amount: "10.50" }] },
      { number: "36", nameEn: "White Rice", nameZh: "白饭", prices: [{ labelEn: "Pt", labelZh: "小", amount: "3.00" }, { labelEn: "Qt", labelZh: "大", amount: "5.00" }] },
      { number: "37", nameEn: "White Rice with Gravy", nameZh: "白饭加卤汁", prices: [{ labelEn: "Pt", labelZh: "小", amount: "4.00" }, { labelEn: "Qt", labelZh: "大", amount: "6.00" }] }
    ]
  },
  {
    id: "chow-mein",
    categoryEn: "Chow Mein",
    categoryZh: "炒面",
    note: "Served with crispy noodles.",
    items: [
      { number: "38", nameEn: "Vegetable Chow Mein", nameZh: "蔬菜炒面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "7.00" }, { labelEn: "Qt", labelZh: "大", amount: "10.00" }] },
      { number: "39", nameEn: "Chicken Chow Mein", nameZh: "鸡肉炒面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "7.50" }, { labelEn: "Qt", labelZh: "大", amount: "10.00" }] },
      { number: "40", nameEn: "Roast Pork Chow Mein", nameZh: "叉烧炒面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "7.50" }, { labelEn: "Qt", labelZh: "大", amount: "10.00" }] },
      { number: "41", nameEn: "Shrimp Chow Mein", nameZh: "虾炒面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "7.50" }, { labelEn: "Qt", labelZh: "大", amount: "11.00" }] },
      { number: "42", nameEn: "Beef Chow Mein", nameZh: "牛肉炒面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "7.50" }, { labelEn: "Qt", labelZh: "大", amount: "11.00" }] }
    ]
  },
  {
    id: "chow-mei-fun",
    categoryEn: "Chow Mei Fun",
    categoryZh: "炒米粉",
    items: [
      { number: "43", nameEn: "Chicken Chow Mei Fun", nameZh: "鸡肉炒米粉", prices: [{ amount: "10.00" }] },
      { number: "44", nameEn: "Shrimp Chow Mei Fun", nameZh: "虾炒米粉", prices: [{ amount: "11.00" }] },
      { number: "45", nameEn: "Beef Chow Mei Fun", nameZh: "牛肉炒米粉", prices: [{ amount: "12.00" }] },
      { number: "46", nameEn: "House Special Chow Mei Fun", nameZh: "本楼炒米粉", prices: [{ amount: "12.00" }] },
      { number: "47", nameEn: "Singapore Chow Mei Fun", nameZh: "星洲炒米粉", prices: [{ amount: "11.00" }], spicy: true }
    ]
  },
  {
    id: "lo-mein",
    categoryEn: "Lo Mein",
    categoryZh: "捞面",
    note: "Soft egg noodles.",
    items: [
      { number: "48", nameEn: "Vegetable Lo Mein", nameZh: "蔬菜捞面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "6.50" }, { labelEn: "Qt", labelZh: "大", amount: "10.00" }] },
      { number: "49", nameEn: "Roast Pork Lo Mein", nameZh: "叉烧捞面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "8.00" }, { labelEn: "Qt", labelZh: "大", amount: "10.00" }] },
      { number: "50", nameEn: "Chicken Lo Mein", nameZh: "鸡肉捞面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "8.00" }, { labelEn: "Qt", labelZh: "大", amount: "10.00" }] },
      { number: "51", nameEn: "Shrimp Lo Mein", nameZh: "虾捞面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "8.00" }, { labelEn: "Qt", labelZh: "大", amount: "11.00" }] },
      { number: "52", nameEn: "Beef Lo Mein", nameZh: "牛肉捞面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "8.00" }, { labelEn: "Qt", labelZh: "大", amount: "11.00" }] },
      { number: "53", nameEn: "House Special Lo Mein", nameZh: "本楼捞面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "9.00" }, { labelEn: "Qt", labelZh: "大", amount: "12.00" }] }
    ]
  },
  {
    id: "yat-mein",
    categoryEn: "Yat Mein",
    categoryZh: "伊面",
    note: "Thick noodles with gravy and onions.",
    items: [
      { number: "54", nameEn: "Plain Yat", nameZh: "原味伊面", prices: [{ amount: "7.00" }] },
      { number: "55", nameEn: "Pork Yat", nameZh: "叉烧伊面", prices: [{ amount: "8.00" }] },
      { number: "56", nameEn: "Chicken Yat", nameZh: "鸡肉伊面", prices: [{ amount: "8.00" }] },
      { number: "57", nameEn: "Shrimp Yat", nameZh: "鲜虾伊面", prices: [{ amount: "9.00" }] },
      { number: "58", nameEn: "Beef Yat", nameZh: "牛肉伊面", prices: [{ amount: "9.00" }] }
    ]
  },
  {
    id: "egg-foo-young",
    categoryEn: "Egg Foo Young",
    categoryZh: "芙蓉蛋",
    note: riceOptionNote,
    items: [
      { number: "59", nameEn: "Vegetable Egg Foo Young", nameZh: "蔬菜芙蓉蛋", prices: vegetableEggFooYoungRicePrices },
      { number: "61", nameEn: "Roast Pork Egg Foo Young", nameZh: "叉烧芙蓉蛋", prices: eggFooYoungRicePrices },
      { number: "62", nameEn: "Chicken Egg Foo Young", nameZh: "鸡肉芙蓉蛋", prices: eggFooYoungRicePrices },
      { number: "63", nameEn: "Shrimp Egg Foo Young", nameZh: "虾芙蓉蛋", prices: eggFooYoungRicePrices },
      { number: "64", nameEn: "Beef Egg Foo Young", nameZh: "牛肉芙蓉蛋", prices: eggFooYoungRicePrices },
      { number: "65", nameEn: "House Special Egg Foo Young", nameZh: "本楼芙蓉蛋", prices: houseSpecialEggFooYoungRicePrices }
    ]
  },
  {
    id: "sweet-sour",
    categoryEn: "Sweet & Sour",
    categoryZh: "甜酸",
    note: riceOptionNote,
    items: [
      { number: "66", nameEn: "Sweet & Sour Pork", nameZh: "甜酸肉", prices: chickenSeafoodRicePrices },
      { number: "67", nameEn: "Sweet & Sour Shrimp", nameZh: "甜酸虾", prices: chickenSeafoodRicePrices },
      { number: "68", nameEn: "Sweet & Sour Chicken", nameZh: "甜酸鸡", prices: chickenSeafoodRicePrices },
      { number: "69", nameEn: "Triple Sweet & Sour", nameZh: "三拼甜酸", prices: chickenSeafoodRicePrices },
      { number: "70", nameEn: "Sweet & Sour Spare Rib Tips", nameZh: "甜酸排骨尖", prices: chickenSeafoodRicePrices }
    ]
  },
  {
    id: "vegetables",
    categoryEn: "House Special Vegetables",
    categoryZh: "本楼蔬菜",
    note: riceOptionNote,
    items: [
      { number: "71", nameEn: "Mixed Vegetables", nameZh: "什锦蔬菜", prices: vegetableRicePrices },
      { number: "72", nameEn: "Bean Curd with Mixed Vegetables", nameZh: "豆腐什锦蔬菜", prices: vegetableRicePrices },
      { number: "73", nameEn: "Sauteed Broccoli", nameZh: "炒西兰花", prices: vegetableRicePrices },
      { number: "74", nameEn: "Broccoli with Garlic Sauce", nameZh: "鱼香西兰花", prices: vegetableRicePrices, spicy: true },
      { number: "75", nameEn: "Bean Curd Szechuan Style", nameZh: "四川豆腐", prices: vegetableRicePrices, spicy: true }
    ]
  },
  {
    id: "diet",
    categoryEn: "Diet Menu",
    categoryZh: "健康餐",
    note: "Served without salt, sugar, corn starch.",
    items: [
      { number: "D1", nameEn: "Steamed Mixed Vegetables", nameZh: "清蒸什锦蔬菜", prices: [{ amount: "10.00" }] },
      { number: "D2", nameEn: "Steamed Chicken with Broccoli", nameZh: "清蒸鸡肉配西兰花", prices: [{ amount: "11.00" }] },
      { number: "D3", nameEn: "Steamed Shrimp with Broccoli", nameZh: "清蒸虾仁西兰花", prices: [{ amount: "11.00" }] }
    ]
  },
  {
    id: "pork",
    categoryEn: "Pork",
    categoryZh: "猪肉",
    note: riceOptionNote,
    items: [
      { number: "76", nameEn: "Roast Pork with Mixed Vegetables", nameZh: "叉烧什锦蔬菜", prices: chickenSeafoodRicePrices },
      { number: "77", nameEn: "Roast Pork with Broccoli", nameZh: "叉烧西兰花", prices: chickenSeafoodRicePrices }
    ]
  },
  {
    id: "sandwiches",
    categoryEn: "Sandwiches",
    categoryZh: "三明治",
    items: [
      { number: "", nameEn: "Fried Whiting Fish (2 pcs)", nameZh: "炸鳕鱼三明治", prices: [{ amount: "6.00" }] },
      { number: "", nameEn: "Pork Chop (1 pc)", nameZh: "炸猪排三明治", prices: [{ amount: "6.00" }] }
    ]
  },
  {
    id: "steaks-burgers",
    categoryEn: "Steaks & Burgers",
    categoryZh: "牛排与汉堡",
    items: [
      { number: "", nameEn: "Plain Steak", nameZh: "原味牛排", prices: [{ amount: "6.00" }] },
      { number: "", nameEn: "Cheese Steak", nameZh: "乳酪牛排", prices: [{ amount: "6.50" }] },
      { number: "", nameEn: "Hamburger", nameZh: "汉堡", prices: [{ amount: "4.50" }] },
      { number: "", nameEn: "Cheeseburger", nameZh: "乳酪汉堡", prices: [{ amount: "5.00" }, { labelEn: "With Fries", labelZh: "配薯条", amount: "6.50" }] },
      { number: "", nameEn: "Cheese Fries", nameZh: "乳酪薯条", prices: [{ labelEn: "Sm", labelZh: "小", amount: "3.50" }, { labelEn: "Lg", labelZh: "大", amount: "6.00" }] }
    ]
  },
  {
    id: "chicken",
    categoryEn: "Chicken",
    categoryZh: "鸡肉",
    note: riceOptionNote,
    items: [
      { number: "78", nameEn: "Chicken with Mixed Vegetables", nameZh: "鸡肉什锦蔬菜", prices: chickenSeafoodRicePrices },
      { number: "79", nameEn: "Pepper Chicken with Onion", nameZh: "青椒洋葱鸡", prices: chickenSeafoodRicePrices },
      { number: "80", nameEn: "Chicken with Black Bean Sauce", nameZh: "豆豉鸡", prices: chickenSeafoodRicePrices },
      { number: "81", nameEn: "Chicken with Broccoli", nameZh: "鸡肉西兰花", prices: chickenSeafoodRicePrices },
      { number: "82", nameEn: "Moo Goo Gai Pan", nameZh: "蘑菇鸡片", prices: chickenSeafoodRicePrices },
      { number: "83", nameEn: "Curry Chicken with Onion", nameZh: "咖喱鸡", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "84", nameEn: "Chicken in Garlic Sauce", nameZh: "鱼香鸡", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "85", nameEn: "Szechuan Chicken", nameZh: "四川鸡", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "86", nameEn: "Hunan Chicken", nameZh: "湖南鸡", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "87", nameEn: "Kung Po Chicken", nameZh: "宫保鸡丁", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "88", nameEn: "Hot Spicy Chicken", nameZh: "香辣鸡", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "89", nameEn: "General Tso's Chicken", nameZh: "左宗鸡", prices: chickenSeafoodRicePrices, spicy: true }
    ]
  },
  {
    id: "beef",
    categoryEn: "Beef",
    categoryZh: "牛肉",
    note: riceOptionNote,
    items: [
      { number: "90", nameEn: "Beef with Mixed Vegetables", nameZh: "牛肉什锦蔬菜", prices: beefRicePrices },
      { number: "91", nameEn: "Beef with Scallion", nameZh: "葱爆牛肉", prices: beefRicePrices },
      { number: "92", nameEn: "Pepper Steak with Onion", nameZh: "青椒洋葱牛肉", prices: beefRicePrices },
      { number: "93", nameEn: "Beef with Mushrooms", nameZh: "蘑菇牛肉", prices: beefRicePrices },
      { number: "94", nameEn: "Beef with Broccoli", nameZh: "牛肉西兰花", prices: beefRicePrices },
      { number: "95", nameEn: "Beef with Black Bean Sauce", nameZh: "豆豉牛肉", prices: beefRicePrices },
      { number: "96", nameEn: "Beef in Garlic Sauce", nameZh: "鱼香牛肉", prices: beefRicePrices, spicy: true },
      { number: "97", nameEn: "Szechuan Beef", nameZh: "四川牛肉", prices: beefRicePrices, spicy: true },
      { number: "98", nameEn: "Hunan Beef", nameZh: "湖南牛肉", prices: beefRicePrices, spicy: true }
    ]
  },
  {
    id: "seafood",
    categoryEn: "Seafood",
    categoryZh: "海鲜",
    note: riceOptionNote,
    items: [
      { number: "99", nameEn: "Shrimp with Mixed Vegetables", nameZh: "虾什锦蔬菜", prices: chickenSeafoodRicePrices },
      { number: "100", nameEn: "Shrimp with Lobster Sauce", nameZh: "龙虾酱虾", prices: chickenSeafoodRicePrices },
      { number: "101", nameEn: "Shrimp with Pepper, Tomato & Onion", nameZh: "青椒番茄洋葱虾", prices: chickenSeafoodRicePrices },
      { number: "102", nameEn: "Shrimp with Broccoli", nameZh: "虾西兰花", prices: chickenSeafoodRicePrices },
      { number: "103", nameEn: "Shrimp with Black Bean Sauce", nameZh: "豆豉虾", prices: chickenSeafoodRicePrices },
      { number: "104", nameEn: "Shrimp with Mushrooms", nameZh: "蘑菇虾", prices: chickenSeafoodRicePrices },
      { number: "105", nameEn: "Shrimp with Black Bean Sauce", nameZh: "豆豉虾", prices: chickenSeafoodRicePrices },
      { number: "106", nameEn: "Curry Shrimp with Onion", nameZh: "咖喱虾", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "107", nameEn: "Shrimp in Garlic Sauce", nameZh: "鱼香虾", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "108", nameEn: "Szechuan Shrimp", nameZh: "四川虾", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "109", nameEn: "Hunan Shrimp", nameZh: "湖南虾", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "110", nameEn: "Hot & Spicy Shrimp", nameZh: "香辣虾", prices: chickenSeafoodRicePrices, spicy: true },
      { number: "111", nameEn: "General Tso's Shrimp", nameZh: "左宗虾", prices: chickenSeafoodRicePrices, spicy: true }
    ]
  },
  {
    id: "combination",
    categoryEn: "Combination Platters",
    categoryZh: "套餐拼盘",
    note: "With chicken or pork fried rice and egg roll or shrimp egg roll.",
    items: [
      { number: "C1", nameEn: "Chicken, Beef, Pork or Shrimp Chow Mein", nameZh: "鸡肉、牛肉、叉烧或虾炒面", prices: [{ amount: "12.00" }] },
      { number: "C2", nameEn: "Roast Pork Egg Foo Young", nameZh: "叉烧芙蓉蛋", prices: [{ amount: "12.00" }] },
      { number: "C3", nameEn: "Pepper Steak with Onion", nameZh: "青椒牛肉", prices: [{ amount: "12.00" }] },
      { number: "C4", nameEn: "Shrimp with Lobster Sauce", nameZh: "龙虾酱虾", prices: [{ amount: "12.00" }] },
      { number: "C5", nameEn: "Bar-B-Q Spare Ribs", nameZh: "烤排骨", prices: [{ amount: "12.00" }] },
      { number: "C6", nameEn: "Moo Goo Gai Pan", nameZh: "蘑菇鸡片", prices: [{ amount: "12.00" }] },
      { number: "C7", nameEn: "Sweet & Sour Pork or Chicken", nameZh: "甜酸肉或甜酸鸡", prices: [{ amount: "12.00" }] },
      { number: "C8", nameEn: "Roast Pork Lo Mein", nameZh: "叉烧捞面", prices: [{ amount: "12.00" }] },
      { number: "C9", nameEn: "Beef or Shrimp with Broccoli", nameZh: "牛肉或虾西兰花", prices: [{ amount: "12.00" }] },
      { number: "C10", nameEn: "Chicken or Roast Pork with Broccoli", nameZh: "鸡肉或叉烧西兰花", prices: [{ amount: "12.00" }] },
      { number: "C11", nameEn: "Sweet Spare Rib Tips", nameZh: "甜酸排骨尖", prices: [{ amount: "12.00" }] },
      { number: "C12", nameEn: "Chicken with Garlic Sauce", nameZh: "鱼香鸡", prices: [{ amount: "12.00" }], spicy: true },
      { number: "C13", nameEn: "Kung Po Chicken", nameZh: "宫保鸡丁", prices: [{ amount: "12.00" }], spicy: true },
      { number: "C14", nameEn: "General Tso's Chicken", nameZh: "左宗鸡", prices: [{ amount: "12.00" }], spicy: true }
    ]
  },
  {
    id: "chef-specialties",
    categoryEn: "Chef's Specialties",
    categoryZh: "厨师精选",
    note: "Served with white rice. Fried rice +$1. / 配白饭，炒饭加 $1.",
    items: [
      { number: "1", nameEn: "Happy Family", nameZh: "全家福", note: "Shrimp, chicken, beef, scallops, pork & lobster meat with mixed vegetables.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "2", nameEn: "Hawaii Five \"O\"", nameZh: "五鲜会", note: "Chunks of crab meat, jumbo shrimp, steak, roast pork & chicken with mixed vegetables.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "3", nameEn: "Four Happiness", nameZh: "大四喜", note: "Shrimp, chicken, pork & lobster meat with mixed vegetables.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "4", nameEn: "Triple Delight", nameZh: "大三元", note: "Shrimp, beef & chicken with mixed vegetables.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "5", nameEn: "Double Delight", nameZh: "炒双鲜", note: "Jumbo shrimp, chicken & broccoli with Chinese vegetables.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "6", nameEn: "Four Seasons", nameZh: "炒四季", note: "Crab meat, shrimp, chicken & pork.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "7", nameEn: "Mandarin Combination", nameZh: "三及第", note: "Jumbo shrimp, chicken, roast pork with vegetables.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "8", nameEn: "Sesame Chicken", nameZh: "芝麻鸡", note: "Spring chicken in large chunks, marinated, fried crispy, sauteed with red peppers & sesame seeds in tangy sauce.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "9", nameEn: "Beef & Scallops", nameZh: "干贝牛", note: "Tender beef with fresh scallops & vegetables in mild brown sauce, served sizzling.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "10", nameEn: "Seafood Delight", nameZh: "海鲜大会", note: "Lobster, jumbo shrimp, scallops, crab meat with Chinese vegetables.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "11", nameEn: "Sesame Shrimp", nameZh: "芝麻虾", note: "Jumbo shrimp in large chunks, marinated, fried crispy, sauteed with red peppers & sesame seeds in tangy sauce.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "12", nameEn: "Kamphon Delight", nameZh: "炒三鲜", note: "Beef, chicken, roast pork with vegetables in hot pepper sauce.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true },
      { number: "13", nameEn: "Hunan Triple Crown", nameZh: "湖南三样", note: "Jumbo shrimp, beef, chicken with vegetables in hot garlic sauce.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true },
      { number: "14", nameEn: "Orange Chicken", nameZh: "陈皮鸡", note: "Sliced chicken dry-sauteed with orange peel in chef's special hot sauce.", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true }
    ]
  },
  {
    id: "lunch-special",
    categoryEn: "Lunch Special",
    categoryZh: "午餐特价",
    note: "Served with white rice. Fried rice +$1. / 配白饭，炒饭加 $1.",
    items: [
      { number: "L1", nameEn: "Chow Mein (Pork, Chicken, Beef or Shrimp)", nameZh: "炒面（叉烧、鸡、牛或虾）", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L2", nameEn: "Chicken or Pork with Broccoli", nameZh: "鸡肉或叉烧西兰花", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L3", nameEn: "Shrimp with Lobster Sauce", nameZh: "龙虾酱虾", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L4", nameEn: "Beef or Shrimp with Broccoli", nameZh: "牛肉或虾西兰花", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L5", nameEn: "Curry Chicken, Beef or Shrimp", nameZh: "咖喱鸡、牛或虾", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true },
      { number: "L6", nameEn: "Beef with Bean Curd", nameZh: "豆腐牛肉", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L7", nameEn: "Pepper Steak with Onion", nameZh: "青椒牛肉", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L8", nameEn: "Sweet & Sour Pork or Chicken", nameZh: "甜酸肉或甜酸鸡", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L9", nameEn: "Roast Pork, Chicken, Shrimp or Beef Lo Mein", nameZh: "叉烧、鸡、虾或牛捞面", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L10", nameEn: "BBQ Spare Rib Tips", nameZh: "烤排骨尖", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L11", nameEn: "Chicken or Pork with Garlic Sauce", nameZh: "鱼香鸡或叉烧", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true },
      { number: "L12", nameEn: "Hot & Spicy Beef or Shrimp", nameZh: "香辣牛肉或虾", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true },
      { number: "L13", nameEn: "Hunan Chicken", nameZh: "湖南鸡", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true },
      { number: "L14", nameEn: "General Tso's Chicken", nameZh: "左宗鸡", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true },
      { number: "L15", nameEn: "Sesame Chicken", nameZh: "芝麻鸡", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L16", nameEn: "Roast Pork, Beef, Chicken or Shrimp Egg Foo Young", nameZh: "叉烧、牛、鸡或虾芙蓉蛋", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L17", nameEn: "Roast Pork with Mixed Vegetables", nameZh: "叉烧什锦蔬菜", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L18", nameEn: "Shrimp with Black Bean Sauce", nameZh: "豆豉虾", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }] },
      { number: "L19", nameEn: "Hunan Beef or Shrimp", nameZh: "湖南牛肉或虾", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true },
      { number: "L20", nameEn: "Szechuan Shrimp", nameZh: "四川虾", prices: [{ labelEn: "Pt", labelZh: "小", amount: "10.00" }, { labelEn: "Qt", labelZh: "大", amount: "15.00" }], spicy: true }
    ]
  },
  {
    id: "drinks",
    categoryEn: "Drinks",
    categoryZh: "",
    note: "Bottles and flavors may vary.",
    items: [
      { number: "DR1", groupEn: "Everfresh juice (bottle)", nameEn: "Everfresh Orange Juice", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR2", groupEn: "Everfresh juice (bottle)", nameEn: "Everfresh Cranberry Juice", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR3", groupEn: "Everfresh juice (bottle)", nameEn: "Everfresh Cranberry Apple Juice", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR4", groupEn: "Everfresh juice (bottle)", nameEn: "Everfresh Apple Juice", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR5", groupEn: "Canned soda", nameEn: "Pepsi", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR6", groupEn: "Canned soda", nameEn: "Mountain Dew", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR7", groupEn: "Canned soda", nameEn: "Sprite", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR8", groupEn: "Canned soda", nameEn: "Coke", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR9", groupEn: "Canned soda", nameEn: "Canada Dry Ginger Ale", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR10", groupEn: "Canned soda", nameEn: "Sunkist Orange", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR11", groupEn: "Homemade", nameEn: "Homemade Lemonade", nameZh: "", prices: [{ amount: "2.00" }] },
      { number: "DR12", groupEn: "Homemade", nameEn: "Homemade Fruit Punch", nameZh: "", prices: [{ amount: "2.00" }] },
      { number: "DR13", groupEn: "Homemade", nameEn: "Homemade Pink Lemonade", nameZh: "", prices: [{ amount: "2.00" }] },
      { number: "DR14", groupEn: "Homemade", nameEn: "Homemade Iced Tea", nameZh: "", prices: [{ amount: "2.00" }] },
      { number: "DR15", groupEn: "Homemade", nameEn: "Homemade Blue Lemonade", nameZh: "", prices: [{ amount: "2.00" }] },
      { number: "DR16", groupEn: "Water", nameEn: "Small Water Bottle", nameZh: "", prices: [{ amount: "0.75" }] },
      { number: "DR17", groupEn: "Water", nameEn: "Large Water Bottle", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR18", groupEn: "2-liter soda", nameEn: "Pepsi", nameZh: "", prices: [{ amount: "4.00" }] },
      { number: "DR19", groupEn: "2-liter soda", nameEn: "Canada Dry Ginger Ale", nameZh: "", prices: [{ amount: "4.00" }] },
      { number: "DR20", groupEn: "2-liter soda", nameEn: "Sunkist Orange", nameZh: "", prices: [{ amount: "4.00" }] },
      { number: "DR21", groupEn: "Bottle soda ($2.25)", nameEn: "Pepsi", nameZh: "", prices: [{ amount: "2.25" }] },
      { number: "DR22", groupEn: "Bottle soda ($2.25)", nameEn: "Pepsi Cherry", nameZh: "", prices: [{ amount: "2.25" }] },
      { number: "DR23", groupEn: "Bottle soda ($2.25)", nameEn: "Diet Pepsi", nameZh: "", prices: [{ amount: "2.25" }] },
      { number: "DR24", groupEn: "Bottle soda ($2.25)", nameEn: "Tahitian Treat", nameZh: "", prices: [{ amount: "2.25" }] },
      { number: "DR25", groupEn: "Bottle soda ($2.25)", nameEn: "Mountain Dew", nameZh: "", prices: [{ amount: "2.25" }] },
      { number: "DR26", groupEn: "Bottle soda ($2.25)", nameEn: "Canada Dry Ginger Ale", nameZh: "", prices: [{ amount: "2.25" }] },
      { number: "DR27", groupEn: "Bottle soda ($2.25)", nameEn: "Canada Dry Pineapple", nameZh: "", prices: [{ amount: "2.25" }] },
      { number: "DR28", groupEn: "Arizona", nameEn: "Arizona Green Tea", nameZh: "", prices: [{ amount: "1.50" }] },
      { number: "DR29", groupEn: "Arizona", nameEn: "Arizona Iced Tea", nameZh: "", prices: [{ amount: "1.50" }] },
      { number: "DR30", groupEn: "Arizona", nameEn: "Arizona Mango", nameZh: "", prices: [{ amount: "1.50" }] },
      { number: "DR31", groupEn: "Hug", nameEn: "Hug", nameZh: "", note: "Fruit punch flavor.", prices: [{ amount: "1.25" }] },
      { number: "DR32", groupEn: "Red Bull", nameEn: "Red Bull", nameZh: "", prices: [{ amount: "3.00" }] },
      { number: "DR33", groupEn: "Gatorade", nameEn: "Gatorade bottle Cool Blue", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR34", groupEn: "Gatorade", nameEn: "Gatorade bottle Lime", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR35", groupEn: "Gatorade", nameEn: "Gatorade bottle Fruit Punch", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR36", groupEn: "Bottle soda ($2.50)", nameEn: "Coke", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR37", groupEn: "Bottle soda ($2.50)", nameEn: "Sprite", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR38", groupEn: "Bottle soda ($2.50)", nameEn: "Sunkist Orange", nameZh: "", prices: [{ amount: "2.50" }] },
      { number: "DR39", groupEn: "Bottle soda ($1.25)", nameEn: "Day Ginger Ale", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR40", groupEn: "Bottle soda ($1.25)", nameEn: "Day Pineapple", nameZh: "", prices: [{ amount: "1.25" }] },
      { number: "DR41", groupEn: "Bottle soda ($1.25)", nameEn: "Day Fruit Punch", nameZh: "", prices: [{ amount: "1.25" }] }
    ]
  }
];
