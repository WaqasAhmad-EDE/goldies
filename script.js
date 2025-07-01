// Goldies Fast Food Menu Data & Rendering

const menuData = [
    {
        name: 'Burger',
        items: [
            {
                code: 1,
                title: 'Goldies Burger',
                desc: 'Saftiges Rindfleisch, frischer Salat, Tomate, Gurke, Zwiebel, Goldies-Sauce',
                price: '6,90 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
            {
                code: 2,
                title: 'Cheeseburger',
                desc: 'Rindfleisch, Cheddar, Salat, Tomate, Gurke, Zwiebel, Sauce',
                price: '7,20 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
        ],
    },
    {
        name: 'Snacks & Sides',
        items: [
            {
                code: 3,
                title: 'Pommes Frites',
                desc: 'Knusprige Kartoffelstäbchen, wahlweise mit Ketchup oder Mayo',
                price: '3,20 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
            {
                code: 4,
                title: 'Chicken Nuggets',
                desc: '6 Stück, goldbraun frittiert, mit Dip nach Wahl',
                price: '4,90 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
        ],
    },
    {
        name: 'Getränke',
        items: [
            {
                code: 5,
                title: 'Coca-Cola 0,33l',
                desc: 'Erfrischungsgetränk, eisgekühlt',
                price: '2,20 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
            {
                code: 6,
                title: 'Wasser 0,5l',
                desc: 'Still oder spritzig',
                price: '1,80 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
        ],
    },
];

// Assign optional ingredients array and imgs array
menuData.forEach(cat => {
    cat.items.forEach(item => {
        if (!item.ingredients) item.ingredients = [];
        if (!item.imgs) item.imgs = [item.img]; // For slideshow, support multiple images
    });
});

function renderMenu(menu) {
    const menuSection = document.getElementById('menu');
    if (!menuSection) return;
    // If only one category and not the default/deals page, show each item as its own card
    const isSingleCategory = menu.length === 1 && menu[0].items && menu[0].items.length > 0;
    const isDefaultOrDeals = menu.length > 1 || (menu[0] && (menu[0].name || '').toLowerCase().includes('deal'));
    if (isSingleCategory && !isDefaultOrDeals) {
        // Show each item as its own card
        menuSection.innerHTML = menu[0].items.map(item => `
            <div class="menu-category" style="width:-webkit-fill-available;max-width:400px;margin:2rem auto;">
                <h2 style="color:#ff2a2a;text-align:center;">${item.title}</h2>
                <div class="menu-item" data-item-code="${item.code}" style="display:flex;align-items:flex-start;gap:1rem;">
                    <img src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/70x70/ff2a2a/fff?text=No+Img';">
                    <div class="menu-item-details">
                        <div class="menu-item-desc">${item.desc}</div>
                        <div class="menu-item-price">${item.price}</div>
                        <div class="menu-item-code">Code: ${item.code}</div>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        // Default: grouped by category
        menuSection.innerHTML = menu.map(cat => `
            <div class="menu-category">
                <h2>${cat.name}</h2>
                ${cat.items.map(item => `
                    <div class="menu-item" data-item-code="${item.code}">
                        <img src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/70x70/ff2a2a/fff?text=No+Img';">
                        <div class="menu-item-details">
                            <div class="menu-item-title">${item.title}</div>
                            <div class="menu-item-desc">${item.desc}</div>
                            <div class="menu-item-price">${item.price}</div>
                            <div class="menu-item-code">Code: ${item.code}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
}

// Modal logic
function showItemModal(item) {
    const modal = document.getElementById('item-modal');
    if (!modal) return;
    // Slideshow
    const slideshow = modal.querySelector('.item-modal-slideshow');
    slideshow.innerHTML = item?.imgs?.map((img, idx) =>
        `<img src="${img}" class="item-modal-slide" style="display:${idx===0?'block':'none'};max-width:100%;border-radius:1rem;box-shadow:0 2px 12px #ff2a2a33;margin-bottom:1rem;" alt="${item.title}">`
    ).join('') + (item?.imgs?.length > 1 ? `
        <button class="item-modal-slide-prev">&#8592;</button>
        <button class="item-modal-slide-next">&#8594;</button>
    ` : '');
    // Details
    const details = modal.querySelector('.item-modal-details');
    details.innerHTML = `
        <h2 style="color:#ff2a2a;">${item.title}</h2>
        <div style="color:#ffb3b3;margin-bottom:0.5rem;">${item.desc}</div>
        ${item.ingredients?.length ? `<div><b>Zutaten:</b> ${item.ingredients?.join(', ')}</div>` : ''}
        <div style="margin:0.5rem 0;"><b>Preis:</b> <span style="color:#ff2a2a;">${item.price}</span></div>
        <div style="font-size:0.95rem;color:#fff8;">Code: ${item.code}</div>
    `;
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Slideshow logic
    if (item.imgs.length > 1) {
        let current = 0;
        const slides = modal.querySelectorAll('.item-modal-slide');
        const showSlide = idx => {
            slides.forEach((img, i) => img.style.display = i === idx ? 'block' : 'none');
        };
        modal.querySelector('.item-modal-slide-prev').onclick = () => {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        };
        modal.querySelector('.item-modal-slide-next').onclick = () => {
            current = (current + 1) % slides.length;
            showSlide(current);
        };
    }
    // Attach close events every time modal is shown
    const closeBtn = modal.querySelector('.item-modal-close');
    const backdrop = modal.querySelector('.item-modal-backdrop');
    const cartBtn = modal.querySelector('.item-modal-cart-btn');
    if (closeBtn) closeBtn.onclick = hideItemModal;
    if (backdrop) backdrop.onclick = hideItemModal;
    if (cartBtn) cartBtn.onclick = hideItemModal;
    // Prevent modal click from closing
    const content = modal.querySelector('.item-modal-content');
    if (content) content.onclick = e => e.stopPropagation();
}

function hideItemModal() {
    const modal = document.getElementById('item-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// --- Category bar sliding for desktop (mouse drag) and scroll buttons ---
document.addEventListener('DOMContentLoaded', function() {
    renderMenu(menuData);

    const catList = document.querySelector('.category-list');
    const btnLeft = document.getElementById('category-scroll-left');
    const btnRight = document.getElementById('category-scroll-right');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse drag to slide
    catList.addEventListener('mousedown', (e) => {
        isDown = true;
        catList.classList.add('dragging');
        startX = e.pageX - catList.offsetLeft;
        scrollLeft = catList.scrollLeft;
    });
    document.addEventListener('mouseup', () => {
        isDown = false;
        catList.classList.remove('dragging');
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - catList.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll-fast
        catList.scrollLeft = scrollLeft - walk;
    });

    // Scroll buttons
    function createHamburgerBtn(side) {
        const btn = document.createElement('button');
        btn.className = 'category-hamburger-btn';
        btn.setAttribute('aria-label', 'Alle Kategorien anzeigen');
        btn.innerHTML = '<span class="hamburger-icon">&#9776;</span>';
        btn.style.position = 'absolute';
        btn.style.top = '50%';
        btn.style.transform = 'translateY(-50%)';
        btn.style.zIndex = '3';
        btn.style.background = '#ff2a2a';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.borderRadius = '50%';
        btn.style.width = '36px';
        btn.style.height = '36px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.boxShadow = '0 2px 8px #0008';
        btn.style.opacity = '0.85';
        btn.style.fontSize = '1.5rem';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'opacity 0.2s, background 0.2s';
        if (side === 'left') btn.style.left = '0.7rem';
        if (side === 'right') btn.style.right = '0.7rem';
        return btn;
    }
    let leftHamburger = null;
    let rightHamburger = null;
    function showHamburger(side) {
        if (side === 'left' && !leftHamburger) {
            leftHamburger = createHamburgerBtn('left');
            leftHamburger.onclick = showCategoryDialog;
            btnLeft.parentNode.appendChild(leftHamburger);
        }
        if (side === 'right' && !rightHamburger) {
            rightHamburger = createHamburgerBtn('right');
            rightHamburger.onclick = showCategoryDialog;
            btnRight.parentNode.appendChild(rightHamburger);
        }
    }
    function hideHamburger(side) {
        if (side === 'left' && leftHamburger) {
            leftHamburger.remove();
            leftHamburger = null;
        }
        if (side === 'right' && rightHamburger) {
            rightHamburger.remove();
            rightHamburger = null;
        }
    }
    function showCategoryDialog() {
        let dialog = document.getElementById('category-dialog');
        if (!dialog) {
            dialog = document.createElement('div');
            dialog.id = 'category-dialog';
            dialog.innerHTML = `
                <div class="category-dialog-backdrop"></div>
                <div class="category-dialog-content">
                    <h3>Kategorien Übersicht</h3>
                    <div class="category-dialog-grid">
                        ${Array.from(catList.children).map(li => `<button class="category-dialog-item">${li.textContent}</button>`).join('')}
                    </div>
                    <button class="category-dialog-close">Schließen</button>
                </div>
            `;
            document.body.appendChild(dialog);
            dialog.querySelector('.category-dialog-close').onclick = () => dialog.remove();
            dialog.querySelector('.category-dialog-backdrop').onclick = () => dialog.remove();
            dialog.querySelectorAll('.category-dialog-item').forEach((btn, idx) => {
                btn.onclick = () => {
                    const catName = btn.textContent.trim();
                    showCategoryMenu(catName); // Load items for this category
                    catList.children[idx].scrollIntoView({ behavior: 'smooth', inline: 'center' });
                    dialog.remove();
                };
            });
        }
    }
    function updateScrollButtons() {
        if (btnLeft) {
            if (catList.scrollLeft <= 5) {
                btnLeft.style.visibility = 'hidden';
                showHamburger('left');
            } else {
                btnLeft.style.visibility = 'visible';
                hideHamburger('left');
            }
        }
        if (btnRight) {
            if (catList.scrollLeft + catList.offsetWidth >= catList.scrollWidth - 5) {
                btnRight.style.visibility = 'hidden';
                showHamburger('right');
            } else {
                btnRight.style.visibility = 'visible';
                hideHamburger('right');
            }
        }
    }
    btnLeft.addEventListener('click', () => {
        catList.scrollBy({ left: -200, behavior: 'smooth' });
    });
    btnRight.addEventListener('click', () => {
        catList.scrollBy({ left: 200, behavior: 'smooth' });
    });
    catList.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    setTimeout(updateScrollButtons, 100); // Initial state
});

// --- Category click: Show items from that category ---
const categoryList = document.querySelector('.category-list');
const allCategories = Array.from(categoryList.children).map(li => li.textContent.trim());

// Dummy deals for home page (default)
const todaysDeals = [
    {
        name: "Goldies Deals",
        items: [
            {
                title: "Deal 1: Burger + Pommes + Cola",
                desc: "Goldies Burger, Pommes Frites, 0,33l Cola",
                price: "9,90 €",
                img: "https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg",
            },
            {
                title: "Deal 2: Chicken Nuggets + Pommes + Wasser",
                desc: "6 Chicken Nuggets, Pommes Frites, 0,5l Wasser",
                price: "8,50 €",
                img: "https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg",
            },
        ],
    },
];

// Dummy menu items for all categories
const dummyCategoryItems = {
    'Mittagstisch (Mo.-Do.)': [
        { code: 101, title: 'Schnitzel mit Pommes', desc: 'Knuspriges Schnitzel, Pommes, Salat', price: '7,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 102, title: 'Mittags-Pasta', desc: 'Pasta mit Tomatensauce, Parmesan', price: '6,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Salate': [
        { code: 103, title: 'Gemischter Salat', desc: 'Frische Blattsalate, Tomaten, Gurken, Dressing', price: '5,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 104, title: 'Hähnchen Salat', desc: 'Salat mit gegrilltem Hähnchen', price: '7,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Chicken': [
        { code: 105, title: 'Chicken Wings', desc: '6 Stück, scharf gewürzt', price: '5,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 106, title: 'Chicken Filet', desc: 'Gegrilltes Hähnchenfilet, Beilage nach Wahl', price: '8,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Nudeln & Reis': [
        { code: 107, title: 'Spaghetti Bolognese', desc: 'Mit Rindfleischsauce', price: '7,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 108, title: 'Gebratener Reis', desc: 'Mit Gemüse und Ei', price: '6,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Pizza': [
        { code: 109, title: 'Pizza Margherita', desc: 'Tomate, Mozzarella, Basilikum', price: '6,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 110, title: 'Pizza Salami', desc: 'Salami, Tomate, Käse', price: '7,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Fleischgerichte': [
        { code: 111, title: 'Rindersteak', desc: 'Mit Kräuterbutter, Pommes', price: '12,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 112, title: 'Schweinebraten', desc: 'Mit Knödel und Soße', price: '11,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Vegetarisch': [
        { code: 113, title: 'Vegetarische Lasagne', desc: 'Mit Gemüse und Käse', price: '8,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 114, title: 'Falafel Wrap', desc: 'Mit Salat und Joghurtsoße', price: '6,80 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Indisch': [
        { code: 115, title: 'Chicken Curry', desc: 'Mit Reis', price: '9,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 116, title: 'Vegetarisches Tikka', desc: 'Mit Gemüse und Reis', price: '8,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Pizzabrötchen': [
        { code: 117, title: 'Pizzabrötchen Käse', desc: 'Mit Käsefüllung', price: '4,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 118, title: 'Pizzabrötchen Salami', desc: 'Mit Salami', price: '4,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Burger': [
        { code: 119, title: 'Goldies Burger', desc: 'Saftiges Rindfleisch, frischer Salat, Tomate, Gurke, Zwiebel, Goldies-Sauce', price: '6,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 120, title: 'Cheeseburger', desc: 'Rindfleisch, Cheddar, Salat, Tomate, Gurke, Zwiebel, Sauce', price: '7,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Rind': [
        { code: 121, title: 'Rindfleischpfanne', desc: 'Mit Paprika und Zwiebeln', price: '10,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 122, title: 'Beef Burger', desc: 'Rindfleisch, BBQ-Sauce', price: '8,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Extras': [
        { code: 123, title: 'Ketchup', desc: 'Portion', price: '0,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 124, title: 'Mayonnaise', desc: 'Portion', price: '0,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Pasta': [
        { code: 125, title: 'Penne Arrabiata', desc: 'Mit scharfer Tomatensauce', price: '7,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 126, title: 'Tortellini Panna', desc: 'Mit Sahnesauce', price: '7,80 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Snacks & Beilagen': [
        { code: 127, title: 'Mozzarella Sticks', desc: '6 Stück, mit Dip', price: '4,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 128, title: 'Onion Rings', desc: '8 Stück, knusprig', price: '4,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Thai': [
        { code: 129, title: 'Pad Thai', desc: 'Reisnudeln, Gemüse, Erdnüsse', price: '9,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 130, title: 'Thai Curry', desc: 'Mit Kokosmilch und Gemüse', price: '10,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Dessert & Eis': [
        { code: 131, title: 'Tiramisu', desc: 'Klassisches italienisches Dessert', price: '4,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 132, title: 'Vanilleeis', desc: 'Mit Schokosauce', price: '3,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Aufläufe': [
        { code: 133, title: 'Nudelauflauf', desc: 'Mit Käse überbacken', price: '8,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 134, title: 'Kartoffelgratin', desc: 'Mit Sahne und Käse', price: '7,80 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Suppen & Vorspeisen': [
        { code: 135, title: 'Tomatensuppe', desc: 'Mit Croutons', price: '4,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 136, title: 'Bruschetta', desc: 'Mit Tomaten und Basilikum', price: '4,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Ente': [
        { code: 137, title: 'Knusprige Ente', desc: 'Mit Gemüse und Reis', price: '12,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 138, title: 'Ente süß-sauer', desc: 'Mit Ananas und Paprika', price: '13,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Getränke': [
        { code: 139, title: 'Coca-Cola 0,33l', desc: 'Erfrischungsgetränk, eisgekühlt', price: '2,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { code: 140, title: 'Wasser 0,5l', desc: 'Still oder spritzig', price: '1,80 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
};

function showHomeDeals() {
    renderMenu(todaysDeals);
}

function showCategoryMenu(categoryName) {
    // Prefer dummyCategoryItems for all categories
    if (dummyCategoryItems[categoryName]) {
        // Add missing ingredients/imgs arrays and ensure code property exists
        const items = dummyCategoryItems[categoryName].map(item => ({
            ...item,
            ingredients: item.ingredients || [],
            imgs: item.imgs || [item.img]
        }));
        renderMenu([{ name: categoryName, items }]);
        return;
    }
    // Fallback to menuData if available
    const found = menuData.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    if (found) {
        renderMenu([found]);
    } else {
        // Show empty or dummy if not found
        renderMenu([{ name: categoryName, items: [{ title: "Noch keine Produkte", desc: "Bald verfügbar!", price: "-", img: "https://via.placeholder.com/70x70/ff2a2a/fff?text=No+Img", code: 9999, ingredients: [], imgs: ["https://via.placeholder.com/70x70/ff2a2a/fff?text=No+Img"] }] }]);
    }
}

// On page load, show home deals
showHomeDeals();

// Add click event to categories
categoryList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        const cat = e.target.textContent.trim();
        if (cat.toLowerCase() === 'angebot') {
            showHomeDeals();
        } else {
            showCategoryMenu(cat);
        }
    }
});

// --- Modal event delegation for menu items (always active) ---
document.getElementById('menu').addEventListener('click', function(e) {
    let el = e.target;
    while (el && !el.classList.contains('menu-item')) el = el.parentElement;
    if (el && el.dataset.itemCode) {
        const code = parseInt(el.dataset.itemCode);
        // Search all possible sources for the item by code
        let found;
        // Search in menuData
        menuData.some(cat => found = cat.items.find(i => i.code === code));
        // Search in dummyCategoryItems
        if (!found) {
            Object.values(dummyCategoryItems).some(arr => found = arr.find(i => i.code === code));
        }
        // Search in todaysDeals
        if (!found) {
            todaysDeals.some(cat => found = cat.items.find(i => i.code === code));
        }
        if (found) showItemModal(found);
    }
});