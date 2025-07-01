// Goldies Fast Food Menu Data & Rendering

const menuData = [
    {
        name: 'Burger',
        items: [
            {
                title: 'Goldies Burger',
                desc: 'Saftiges Rindfleisch, frischer Salat, Tomate, Gurke, Zwiebel, Goldies-Sauce',
                price: '6,90 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
            {
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
                title: 'Pommes Frites',
                desc: 'Knusprige Kartoffelstäbchen, wahlweise mit Ketchup oder Mayo',
                price: '3,20 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
            {
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
                title: 'Coca-Cola 0,33l',
                desc: 'Erfrischungsgetränk, eisgekühlt',
                price: '2,20 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
            {
                title: 'Wasser 0,5l',
                desc: 'Still oder spritzig',
                price: '1,80 €',
                img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg',
            },
        ],
    },
];

function renderMenu(menu) {
    const menuSection = document.getElementById('menu');
    if (!menuSection) return;
    menuSection.innerHTML = menu.map(cat => `
        <div class="menu-category">
            <h2>${cat.name}</h2>
            ${cat.items.map(item => `
                <div class="menu-item">
                    <img src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/70x70/ff2a2a/fff?text=No+Img';">
                    <div class="menu-item-details">
                        <div class="menu-item-title">${item.title}</div>
                        <div class="menu-item-desc">${item.desc}</div>
                        <div class="menu-item-price">${item.price}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
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
        { title: 'Schnitzel mit Pommes', desc: 'Knuspriges Schnitzel, Pommes, Salat', price: '7,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Mittags-Pasta', desc: 'Pasta mit Tomatensauce, Parmesan', price: '6,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Salate': [
        { title: 'Gemischter Salat', desc: 'Frische Blattsalate, Tomaten, Gurken, Dressing', price: '5,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Hähnchen Salat', desc: 'Salat mit gegrilltem Hähnchen', price: '7,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Chicken': [
        { title: 'Chicken Wings', desc: '6 Stück, scharf gewürzt', price: '5,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Chicken Filet', desc: 'Gegrilltes Hähnchenfilet, Beilage nach Wahl', price: '8,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Nudeln & Reis': [
        { title: 'Spaghetti Bolognese', desc: 'Mit Rindfleischsauce', price: '7,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Gebratener Reis', desc: 'Mit Gemüse und Ei', price: '6,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Pizza': [
        { title: 'Pizza Margherita', desc: 'Tomate, Mozzarella, Basilikum', price: '6,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Pizza Salami', desc: 'Salami, Tomate, Käse', price: '7,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Fleischgerichte': [
        { title: 'Rindersteak', desc: 'Mit Kräuterbutter, Pommes', price: '12,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Schweinebraten', desc: 'Mit Knödel und Soße', price: '11,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Vegetarisch': [
        { title: 'Vegetarische Lasagne', desc: 'Mit Gemüse und Käse', price: '8,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Falafel Wrap', desc: 'Mit Salat und Joghurtsoße', price: '6,80 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Indisch': [
        { title: 'Chicken Curry', desc: 'Mit Reis', price: '9,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Vegetarisches Tikka', desc: 'Mit Gemüse und Reis', price: '8,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Pizzabrötchen': [
        { title: 'Pizzabrötchen Käse', desc: 'Mit Käsefüllung', price: '4,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Pizzabrötchen Salami', desc: 'Mit Salami', price: '4,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Burger': [
        { title: 'Goldies Burger', desc: 'Saftiges Rindfleisch, frischer Salat, Tomate, Gurke, Zwiebel, Goldies-Sauce', price: '6,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Cheeseburger', desc: 'Rindfleisch, Cheddar, Salat, Tomate, Gurke, Zwiebel, Sauce', price: '7,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Rind': [
        { title: 'Rindfleischpfanne', desc: 'Mit Paprika und Zwiebeln', price: '10,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Beef Burger', desc: 'Rindfleisch, BBQ-Sauce', price: '8,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Extras': [
        { title: 'Ketchup', desc: 'Portion', price: '0,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Mayonnaise', desc: 'Portion', price: '0,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Pasta': [
        { title: 'Penne Arrabiata', desc: 'Mit scharfer Tomatensauce', price: '7,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Tortellini Panna', desc: 'Mit Sahnesauce', price: '7,80 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Snacks & Beilagen': [
        { title: 'Mozzarella Sticks', desc: '6 Stück, mit Dip', price: '4,90 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Onion Rings', desc: '8 Stück, knusprig', price: '4,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Thai': [
        { title: 'Pad Thai', desc: 'Reisnudeln, Gemüse, Erdnüsse', price: '9,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Thai Curry', desc: 'Mit Kokosmilch und Gemüse', price: '10,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Dessert & Eis': [
        { title: 'Tiramisu', desc: 'Klassisches italienisches Dessert', price: '4,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Vanilleeis', desc: 'Mit Schokosauce', price: '3,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Aufläufe': [
        { title: 'Nudelauflauf', desc: 'Mit Käse überbacken', price: '8,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Kartoffelgratin', desc: 'Mit Sahne und Käse', price: '7,80 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Suppen & Vorspeisen': [
        { title: 'Tomatensuppe', desc: 'Mit Croutons', price: '4,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Bruschetta', desc: 'Mit Tomaten und Basilikum', price: '4,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Ente': [
        { title: 'Knusprige Ente', desc: 'Mit Gemüse und Reis', price: '12,50 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Ente süß-sauer', desc: 'Mit Ananas und Paprika', price: '13,00 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
    'Getränke': [
        { title: 'Coca-Cola 0,33l', desc: 'Erfrischungsgetränk, eisgekühlt', price: '2,20 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
        { title: 'Wasser 0,5l', desc: 'Still oder spritzig', price: '1,80 €', img: 'https://www.lieferprofi.de/shops/goldies/images/banner-photo.jpg' },
    ],
};

function showHomeDeals() {
    renderMenu(todaysDeals);
}

function showCategoryMenu(categoryName) {
    // Prefer dummyCategoryItems for all categories
    if (dummyCategoryItems[categoryName]) {
        renderMenu([{ name: categoryName, items: dummyCategoryItems[categoryName] }]);
        return;
    }
    // Fallback to menuData if available
    const found = menuData.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    if (found) {
        renderMenu([found]);
    } else {
        // Show empty or dummy if not found
        renderMenu([{ name: categoryName, items: [{ title: "Noch keine Produkte", desc: "Bald verfügbar!", price: "-", img: "https://via.placeholder.com/70x70/ff2a2a/fff?text=No+Img" }] }]);
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