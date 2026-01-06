// ========= НАСТРОЙКИ =========
const TELEGRAM_USERNAME = "your_username_here"; // <-- замени на свой юзернейм (без @)

// ========= КАТАЛОГ =========
const PRODUCTS = [
  {
    id: "h1",
    category: "hamon",
    badge: "Хит",
    name: "Jamón Serrano 24 мес — нарезка",
    desc: "Классический Serrano. Сбалансированный вкус, тонкая нарезка. Отлично к сырам и закускам.",
    price: "1 490 ₽",
    meta: "100–120 г • 24 мес",
    img: "https://www.jamonarium.com/3428-large_default/gran-reserva-seleccion-shoulder-15-months-whole.jpg",
  },
  {
    id: "h2",
    category: "hamon",
    badge: "Premium",
    name: "Jamón Ibérico — нарезка",
    desc: "Насыщенный вкус и мягкая текстура. Часто берут на подарок или “лучшее на попробовать”.",
    price: "2 490 ₽",
    meta: "100–120 г • ibérico",
    img: "https://www.jamonarium.com/8512-latest_purchase/alpujarra-ham-without-additives-20-months-whole.jpg",
  },
  {
    id: "h3",
    category: "hamon",
    badge: "Набор",
    name: "Сет “Хамон микс” (Serrano + Ibérico)",
    desc: "Два вкуса для сравнения. Идеально на дегустацию: красиво, удобно, понятно.",
    price: "3 790 ₽",
    meta: "2×100 г • микс",
    img: "https://www.jamonarium.com/2510-large_default/gran-reserva-seleccion-shoulder-15-months-sliced-100g.jpg",
  },
  {
    id: "c1",
    category: "cheese",
    badge: "Хит",
    name: "Manchego (овечий) — порция",
    desc: "Твёрдый овечий сыр. Отлично для сырной тарелки и закусок. Подберём под вкус.",
    price: "1 390 ₽",
    meta: "200 г • овечий",
    img: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "c2",
    category: "cheese",
    badge: "Premium",
    name: "Сыр с трюфелем — порция",
    desc: "Ароматный “праздничный” сыр. Часто берут на подарок. Дает вау-эффект.",
    price: "1 690 ₽",
    meta: "200 г • трюфель",
    img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "k1",
    category: "canned",
    badge: "Хит",
    name: "Тунец в оливковом масле (премиум)",
    desc: "Нежный тунец: салаты, паста, брускетта. Одна из самых понятных позиций.",
    price: "690 ₽",
    meta: "банка • 120–160 г",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "k2",
    category: "canned",
    badge: "Новинка",
    name: "Анчоусы / филе — закуска",
    desc: "Яркий вкус. Отлично к бутербродам и закускам. Часто берут как “вау-добавку”.",
    price: "590 ₽",
    meta: "банка",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "s1",
    category: "sets",
    badge: "Набор",
    name: "Подарочный набор “Classic”",
    desc: "Serrano + Manchego + тунец. Универсально для подарка и для дома.",
    price: "4 990 ₽",
    meta: "3 позиции",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "s2",
    category: "sets",
    badge: "Premium",
    name: "Подарочный набор “Premium”",
    desc: "Ibérico + сыр с ярким вкусом + закуска. Аккуратная упаковка, выглядит дорого.",
    price: "6 990 ₽",
    meta: "3 позиции • premium",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
  },
];
const CATEGORY_LABELS = { all: "Все", hamon: "Хамон", cheese: "Сыры", canned: "Консервы", sets: "Наборы" };

// ========= TELEGRAM =========
function buildTelegramLink(messageText) {
  const text = encodeURIComponent(messageText);
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`;
}
function openTelegram(messageText) {
  if (!TELEGRAM_USERNAME || TELEGRAM_USERNAME === "your_username_here") {
    alert("Замените TELEGRAM_USERNAME на ваш Telegram-юзернейм 🙂");
    return;
  }
  window.open(buildTelegramLink(messageText), "_blank", "noopener,noreferrer");
}

// ========= UTILS =========
const priceToNumber = (s) => {
  const digits = String(s).replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};
const rub = (n) => n.toLocaleString("ru-RU") + " ₽";

// ========= YEAR =========
document.getElementById("year").textContent = new Date().getFullYear();

// ========= TOAST =========
const toastEl = document.getElementById("toast");
let toastTimer = null;
function showToast(text) {
  if (!toastEl) return;
  toastEl.textContent = text;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
}

// ========= MOBILE MENU =========
const mobileMenu = document.getElementById("mobileMenu");
document.getElementById("btnBurger").addEventListener("click", () => {
  const isHidden = mobileMenu.hasAttribute("hidden");
  if (isHidden) mobileMenu.removeAttribute("hidden");
  else mobileMenu.setAttribute("hidden", "");
});
document.querySelectorAll("[data-close-mobile]").forEach((a) => a.addEventListener("click", () => mobileMenu.setAttribute("hidden", "")));

// ========= BUTTONS TO TG =========
const tgHello = () => openTelegram("Здравствуйте! Хочу сделать заказ. Подскажите наличие и ближайшую отправку.");
document.getElementById("btnTelegramTop").addEventListener("click", tgHello);
document.getElementById("btnTelegramHero").addEventListener("click", tgHello);
document.getElementById("btnTelegramMobile").addEventListener("click", tgHello);
document.getElementById("btnTelegramFooter").addEventListener("click", tgHello);
document.getElementById("floatTG").addEventListener("click", tgHello);

document.getElementById("btnAskPresence").addEventListener("click", () => openTelegram("Здравствуйте! Можно актуальное наличие и ближайшую отправку? Интересует хамон/сыры/наборы."));
document.getElementById("btnAskPhoto").addEventListener("click", () => openTelegram("Здравствуйте! Можно фото текущего наличия и примеры упаковки перед отправкой?"));
document.getElementById("btnAskVideo").addEventListener("click", () => openTelegram("Здравствуйте! Можно короткие видео/обзоры текущего наличия (30–60 сек)?"));
document.getElementById("btnAskReviews").addEventListener("click", () => openTelegram("Здравствуйте! Можно примеры отзывов/скринов из Telegram? Хочу посмотреть."));
document.getElementById("btnDeliveryAsk").addEventListener("click", () => openTelegram("Здравствуйте! Подскажите, пожалуйста, варианты доставки в мой город и сроки. Город: ____"));
document.getElementById("btnAboutAsk").addEventListener("click", () => openTelegram("Здравствуйте! Есть вопрос по товарам/заказу. Подскажите, пожалуйста."));
document.getElementById("btnPick").addEventListener("click", () => openTelegram("Здравствуйте! Нужен подбор под вкус/бюджет. Бюджет: __ ₽. На сколько людей: __. Вкус: мягче/ярче/без острого."));

// ========= GALLERY SLIDER =========
const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideCount = slidesEl.children.length;
let slideIndex = 0;
let sliderTimer = null;

function renderDots() {
  dotsEl.innerHTML = Array.from({ length: slideCount })
    .map((_, i) => `<div class="dotNav ${i === slideIndex ? "active" : ""}" data-dot="${i}"></div>`)
    .join("");
}
function goToSlide(i) {
  slideIndex = (i + slideCount) % slideCount;
  slidesEl.style.transform = `translateX(-${slideIndex * 100}%)`;
  renderDots();
  restartAuto();
}
function restartAuto() {
  if (sliderTimer) clearInterval(sliderTimer);
  sliderTimer = setInterval(() => goToSlide(slideIndex + 1), 5500);
}
prevBtn.addEventListener("click", () => goToSlide(slideIndex - 1));
nextBtn.addEventListener("click", () => goToSlide(slideIndex + 1));
dotsEl.addEventListener("click", (e) => {
  const d = e.target.closest("[data-dot]");
  if (!d) return;
  goToSlide(parseInt(d.dataset.dot, 10));
});

// swipe
let startX = null;
slidesEl.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true }
);
slidesEl.addEventListener(
  "touchend",
  (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goToSlide(slideIndex + 1);
      else goToSlide(slideIndex - 1);
    }
    startX = null;
  },
  { passive: true }
);

renderDots();
restartAuto();

// ========= CATALOG FILTER/SEARCH =========
const productsEl = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
let activeFilter = "all";
let activeQuery = "";

function renderProducts() {
  const q = activeQuery.trim().toLowerCase();
  const list = PRODUCTS.filter((p) => {
    const inCat = activeFilter === "all" || p.category === activeFilter;
    const inSearch = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || (p.meta || "").toLowerCase().includes(q) || (p.badge || "").toLowerCase().includes(q);
    return inCat && inSearch;
  });

  productsEl.innerHTML = list
    .map(
      (p) => `
        <article class="card">
          <div class="thumb">
            <img src="${p.img}" alt="${p.name}">
            <div class="badge ${p.badge === "Premium" ? "accent" : ""}">${p.badge}</div>
          </div>
          <div class="cbody">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="row">
              <div class="price">${p.price}</div>
              <div class="meta">${p.meta || CATEGORY_LABELS[p.category]}</div>
            </div>
            <div class="btnrow">
              <button class="btn btn-accent" data-add="${p.id}">В корзину</button>
              <button class="btn" data-one="${p.id}">В Telegram</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

document.querySelectorAll(".pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProducts();
  });
});
searchInput.addEventListener("input", (e) => {
  activeQuery = e.target.value;
  renderProducts();
});

// ========= CART (localStorage) =========
const CART_KEY = "delicates_cart_full_strict_v1";
const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const backdrop = document.getElementById("backdrop");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

const cartClose = document.getElementById("cartClose");
const cartClear = document.getElementById("cartClear");
const cartCheckout = document.getElementById("cartCheckout");
const cartContinue = document.getElementById("cartContinue");

const btnCartMobile = document.getElementById("btnCartMobile");
const btnOpenCartHero = document.getElementById("btnOpenCartHero");
const btnOpenCartTop = document.getElementById("btnOpenCartTop");
const btnFooterCart = document.getElementById("btnFooterCart");

// Mobile bar
const mbar = document.getElementById("mbar");
const mbarTotalEl = document.getElementById("mbarTotal");
const mbarCheckout = document.getElementById("mbarCheckout");

let cartState = loadCart();

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cartState));
}

function openCart() {
  cart.classList.add("open");
  backdrop.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cart.classList.remove("open");
  backdrop.classList.remove("show");
  document.body.style.overflow = "";
}

function addToCart(id) {
  const found = cartState.find((i) => i.id === id);
  if (found) found.qty += 1;
  else cartState.push({ id, qty: 1 });

  saveCart();
  renderCart();

  const p = PRODUCTS.find((x) => x.id === id);
  showToast(p ? `Добавлено в корзину: ${p.name}` : "Товар добавлен в корзину");
}

function setQty(id, qty) {
  const item = cartState.find((i) => i.id === id);
  if (!item) return;
  item.qty = qty;
  if (item.qty <= 0) {
    cartState = cartState.filter((i) => i.id !== id);
  }
  saveCart();
  renderCart();
}
function removeFromCart(id) {
  cartState = cartState.filter((i) => i.id !== id);
  saveCart();
  renderCart();
}

function expanded() {
  return cartState
    .map((ci) => {
      const p = PRODUCTS.find((x) => x.id === ci.id);
      if (!p) return null;
      return { ...p, qty: ci.qty, unit: priceToNumber(p.price) };
    })
    .filter(Boolean);
}

function renderCart() {
  const items = expanded();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.unit * i.qty, 0);

  cartCountEl.textContent = count;
  cartTotalEl.textContent = rub(total);

  // Mobile bar
  if (mbar && mbarTotalEl) {
    mbarTotalEl.textContent = rub(total);
    const isMobile = window.matchMedia("(max-width: 980px)").matches;
    mbar.hidden = !(isMobile && count > 0);
  }

  if (items.length === 0) {
    cartItemsEl.innerHTML = `<div class="empty">
          Корзина пустая. Добавьте товары из каталога и оформите заказ в Telegram.
        </div>`;
    return;
  }

  cartItemsEl.innerHTML = items
    .map(
      (i) => `
        <div class="ci">
          <img src="${i.img}" alt="${i.name}">
          <div class="info">
            <div class="name">${i.name}</div>
            <div class="sub">
              <span>${i.price}</span>
              <button class="del" data-del="${i.id}" title="Удалить">✕</button>
            </div>
            <div class="toolsRow">
              <div style="font-weight:950; color: rgba(255,255,255,.88);">${rub(i.unit * i.qty)}</div>
              <div class="qty">
                <button class="qbtn" data-dec="${i.id}">−</button>
                <div class="qval">${i.qty}</div>
                <button class="qbtn" data-inc="${i.id}">+</button>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

function cartTelegramText() {
  const items = expanded();
  const total = items.reduce((s, i) => s + i.unit * i.qty, 0);

  let t = "Здравствуйте! Хочу оформить заказ:%0A%0A";
  items.forEach((i) => {
    t += `• ${i.name} × ${i.qty} — ${rub(i.unit * i.qty)}%0A`;
  });
  t += `%0AИтого: ${rub(total)}%0A%0A`;
  t += "Подскажите наличие и ближайшую отправку. Город/адрес: ____.";
  return decodeURIComponent(t);
}

cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

cartContinue.addEventListener("click", () => {
  closeCart();
  document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
});

cartClear.addEventListener("click", () => {
  cartState = [];
  saveCart();
  renderCart();
  showToast("Корзина очищена");
});

cartCheckout.addEventListener("click", () => {
  const items = expanded();
  if (items.length === 0) return alert("Корзина пустая");
  openTelegram(cartTelegramText());
});

mbarCheckout?.addEventListener("click", () => {
  const items = expanded();
  if (items.length === 0) return alert("Корзина пустая");
  openTelegram(cartTelegramText());
});

btnCartMobile.addEventListener("click", () => {
  mobileMenu.setAttribute("hidden", "");
  openCart();
});
btnOpenCartHero.addEventListener("click", openCart);
btnOpenCartTop.addEventListener("click", openCart);
btnFooterCart.addEventListener("click", openCart);

// Delegation
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const one = e.target.closest("[data-one]");
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const del = e.target.closest("[data-del]");

  if (add) addToCart(add.dataset.add);

  if (one) {
    const p = PRODUCTS.find((x) => x.id === one.dataset.one);
    if (p) openTelegram(`Здравствуйте! Хочу заказать: ${p.name} — ${p.price}. Подскажите наличие и ближайшую отправку.`);
  }

  if (inc) {
    const id = inc.dataset.inc;
    const item = cartState.find((i) => i.id === id);
    if (item) setQty(id, item.qty + 1);
  }

  if (dec) {
    const id = dec.dataset.dec;
    const item = cartState.find((i) => i.id === id);
    if (item) setQty(id, item.qty - 1);
  }

  if (del) removeFromCart(del.dataset.del);
});

// Esc close
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cart.classList.contains("open")) closeCart();
});

window.addEventListener("resize", () => renderCart());

// Init
renderProducts();
renderCart();
