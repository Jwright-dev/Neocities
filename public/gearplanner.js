// script.js
const characters = [
    { name: 'Warrior', icon: 'fas fa-shield-alt', color: '#C79C6E' },
    { name: 'Paladin', icon: 'fas fa-cross', color: '#F58CBA' },
    { name: 'Hunter', icon: 'fas fa-bow-arrow', color: '#ABD473' },
    { name: 'Rogue', icon: 'fas fa-dagger', color: '#FFF569' },
    { name: 'Priest', icon: 'fas fa-star', color: '#FFFFFF' },
    { name: 'Shaman', icon: 'fas fa-bolt', color: '#0070DE' },
    { name: 'Mage', icon: 'fas fa-magic', color: '#69CCF0' },
    { name: 'Warlock', icon: 'fas fa-fire', color: '#9482C9' },
    { name: 'Druid', icon: 'fas fa-leaf', color: '#FF7D0A' }
];

const sampleItems = [
    
    //Helm
    {
        id: 2,
        name: "Crown of Ten Storms",
        quality: "epic",
        slot: "head",
        stats: { stamina: 20, strength: 15, armor: 392, agility: 9, intellect: 13, critChance: 2, hitChance: 1 },
        icon: "fas fa-helmet-battle",
        requiredLevel: 60
    },
    {
        id: 1,
        name: "Skyfury Helm",
        quality: "epic",
        slot: "head",
        stats: { strength: 13, stamina: 14, intellect: 12, critChance: 2},
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    {
        id: 11,
        name: "Earthfury Crown",
        quality: "epic",
        slot: "head",
        stats: { strength: 12, stamina: 20, agility: 20, intellect: 11, critChance: 1, hitChance: 1 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    {
        id: 12,
        name: "Crown of Destruction",
        quality: "epic",
        slot: "head",
        stats: { stamina: 23, intellect: 9, spirit: 9, critChance: 2, attackPower: 44 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    //Neck
    {
        id: 3,
        name: "Dragonstalker's Helm",
        quality: "epic",
        slot: "head",
        stats: { agility: 30, stamina: 20, intellect: 10, armor: 450 },
        icon: "fas fa-helmet-battle",
        requiredLevel: 60
    },
    //Shoulders
    {
        id: 4,
        name: "Netherwind Crown",
        quality: "epic",
        slot: "head",
        stats: { intellect: 35, stamina: 15, spellPower: 40, armor: 300 },
        icon: "fas fa-hat-wizard",
        requiredLevel: 60
    },
    //Back
    {
        id: 5,
        name: "Crown of Prophecy",
        quality: "epic",
        slot: "head",
        stats: { intellect: 30, spirit: 20, spellPower: 35, armor: 280 },
        icon: "fas fa-hat-wizard",
        requiredLevel: 60
    },
    //Chest
    {
        id: 6,
        name: "Bloodfang Hood",
        quality: "epic",
        slot: "head",
        stats: { agility: 25, stamina: 20, attackPower: 50, armor: 350 },
        icon: "fas fa-helmet-battle",
        requiredLevel: 60
    },
    //Shirt
    {
        id: 7,
        name: "Judgment Crown",
        quality: "epic",
        slot: "head",
        stats: { intellect: 20, stamina: 25, spellPower: 30, armor: 400 },
        icon: "fas fa-hat-wizard",
        requiredLevel: 60
    },
    //Wrists
    {
        id: 1,
        name: "Earthfury Bracelets",
        quality: "epic",
        slot: "wrists",
        stats: { strength: 11, stamina: 12, agility: 12, intellect: 8 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    {
        id: 8,
        name: "Stormrage Crown",
        quality: "epic",
        slot: "head",
        stats: { intellect: 28, spirit: 18, armor: 290 },
        icon: "fas fa-hat-wizard",
        requiredLevel: 60
    },
    //Hands
    {
        id: 1,
        name: "Earthfury Bracelets",
        quality: "epic",
        slot: "wrists",
        stats: { strength: 11, stamina: 12, agility: 12, intellect: 8 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    //Waist
    {
        id: 1,
        name: "Earthfury Bracelets",
        quality: "epic",
        slot: "wrists",
        stats: { strength: 11, stamina: 12, agility: 12, intellect: 8 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    //Legs
    {
        id: 1,
        name: "Earthfury Bracelets",
        quality: "epic",
        slot: "wrists",
        stats: { strength: 11, stamina: 12, agility: 12, intellect: 8 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    //Feet
    {
        id: 1,
        name: "Earthfury Bracelets",
        quality: "epic",
        slot: "wrists",
        stats: { strength: 11, stamina: 12, agility: 12, intellect: 8 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    //Ring
    {
        id: 1,
        name: "Earthfury Bracelets",
        quality: "epic",
        slot: "wrists",
        stats: { strength: 11, stamina: 12, agility: 12, intellect: 8 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    //Trinket
    {
        id: 1,
        name: "Earthfury Bracelets",
        quality: "epic",
        slot: "wrists",
        stats: { strength: 11, stamina: 12, agility: 12, intellect: 8 },
        icon: "fas fa-sword",
        requiredLevel: 60
    },
    //Main Hand
    {
        id: 1,
        name: "Earthfury Bracelets",
        quality: "epic",
        slot: "wrists",
        stats: { strength: 11, stamina: 12, agility: 12, intellect: 8 },
        icon: "fas fa-sword",
        requiredLevel: 60
    }
    //Ranged
];

let currentCharacter = 0;
let currentSlot = '';
let equippedItems = {};
let currentFilter = 'all';

function selectCharacter(index) {
    currentCharacter = index;
    document.querySelectorAll('.char-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    updateCharacterDisplay();
    updateStats();
}

function selectSlot(slot) {
    currentSlot = slot;
    document.querySelectorAll('.equipment-slot').forEach(slotEl => {
        slotEl.classList.toggle('selected', slotEl.dataset.slot === slot);
    });
    filterItemsForCurrentSlot();
}

function updateCharacterDisplay() {
    const character = characters[currentCharacter];
    document.querySelector('.character-sheet').style.borderColor = character.color;
}

function filterItemsForCurrentSlot() {
    const filteredItems = sampleItems.filter(item => {
        if (currentSlot === 'ring1' || currentSlot === 'ring2') return item.slot === 'ring';
        if (currentSlot === 'trinket1' || currentSlot === 'trinket2') return item.slot === 'trinket';
        return item.slot === currentSlot;
    });
    displayItems(filteredItems);
}

function displayItems(items) {
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = '';
    
    items.forEach(item => {
        if (currentFilter !== 'all' && item.quality !== currentFilter) return;
        
        const itemEl = document.createElement('div');
        itemEl.className = `item-card quality-${item.quality}`;
        itemEl.innerHTML = `
            <div class="item-icon">
                <i class="${item.icon}"></i>
            </div>
            <div class="item-info">
                <h4 class="item-name">${item.name}</h4>
                <div class="item-stats">
                    ${Object.entries(item.stats).map(([stat, value]) => 
                        `<span class="stat-bonus">+${value} ${stat}</span>`
                    ).join('')}
                </div>
                <div class="item-level">Requires Level ${item.requiredLevel}</div>
            </div>
            <button class="equip-btn" onclick="equipItem(${item.id})">
                <i class="fas fa-plus"></i> Equip
            </button>
        `;
        grid.appendChild(itemEl);
    });
}

function equipItem(itemId) {
    const item = sampleItems.find(i => i.id === itemId);
    if (!item) return;
    
    equippedItems[currentSlot] = item;
    updateEquipmentDisplay();
    updateStats();
}

function updateEquipmentDisplay() {
    Object.entries(equippedItems).forEach(([slot, item]) => {
        const slotEl = document.querySelector(`[data-slot="${slot}"]`);
        if (slotEl) {
            slotEl.innerHTML = `
                <div class="slot-label">${getSlotLabel(slot)}</div>
                <div class="item-name" style="color: ${getQualityColor(item.quality)}">${item.name}</div>
            `;
        }
    });
}

function getSlotLabel(slot) {
    const labels = {
        head: 'Head', neck: 'Neck', shoulders: 'Shoulders', back: 'Back',
        chest: 'Chest', shirt: 'Shirt', tabard: 'Tabard', wrists: 'Wrists',
        hands: 'Hands', waist: 'Waist', legs: 'Legs', feet: 'Feet',
        ring1: 'Ring 1', ring2: 'Ring 2', trinket1: 'Trinket 1', trinket2: 'Trinket 2',
        mainhand: 'Main Hand', offhand: 'Off Hand', ranged: 'Ranged'
    };
    return labels[slot] || slot;
}

function getQualityColor(quality) {
    const colors = {
        poor: '#9d9d9d',
        common: '#ffffff',
        uncommon: '#1eff00',
        rare: '#0070dd',
        epic: '#a335ee',
        legendary: '#ff8000'
    };
    return colors[quality] || '#ffffff';
}

function updateStats() {
    const stats = calculateStats();
    
    Object.entries(stats).forEach(([stat, value]) => {
        const element = document.getElementById(stat);
        if (element) {
            element.textContent = value;
        }
    });
}

function calculateStats() {
    let stats = {
        strength: 0, agility: 0, stamina: 0, intellect: 0, spirit: 0,
        attackPower: 0, spellPower: 0, critChance: 0, hitChance: 0,
        health: 1000, mana: 1000, armor: 0, dodge: 0, parry: 0, block: 0
    };
    
    Object.values(equippedItems).forEach(item => {
        Object.entries(item.stats).forEach(([stat, value]) => {
            if (stats.hasOwnProperty(stat)) {
                stats[stat] += value;
            }
        });
    });
    
    // Calculate derived stats
    stats.health += stats.stamina * 10;
    stats.mana += stats.intellect * 15;
    
    const character = characters[currentCharacter];
    if (character.name === 'Warrior' || character.name === 'Paladin') {
        stats.attackPower += stats.strength * 2;
    } else if (character.name === 'Rogue' || character.name === 'Hunter') {
        stats.attackPower += stats.agility * 1;
        stats.critChance += stats.agility * 0.05;
    }
    
    return stats;
}

function searchItems() {
    const searchTerm = document.getElementById('itemSearch').value.toLowerCase();
    const filteredItems = sampleItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) &&
        ((currentSlot === 'ring1' || currentSlot === 'ring2') ? item.slot === 'ring' :
         (currentSlot === 'trinket1' || currentSlot === 'trinket2') ? item.slot === 'trinket' :
         item.slot === currentSlot)
    );
    displayItems(filteredItems);
}

function filterItems(quality) {
    currentFilter = quality;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === quality);
    });
    filterItemsForCurrentSlot();
}

function saveBuild() {
    const buildData = {
        character: currentCharacter,
        equippedItems: equippedItems,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('turtleWowBuild', JSON.stringify(buildData));
    alert('Build saved successfully!');
}

function shareBuild() {
    const buildData = {
        character: currentCharacter,
        equippedItems: equippedItems
    };
    const shareUrl = `${window.location.origin}${window.location.pathname}?build=${btoa(JSON.stringify(buildData))}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Build URL copied to clipboard!');
    });
}

// Initialize the application
function init() {
    selectCharacter(0);
    selectSlot('head');
    
    // Load saved build or shared build
    const urlParams = new URLSearchParams(window.location.search);
    const buildParam = urlParams.get('build');
    if (buildParam) {
        try {
            const buildData = JSON.parse(atob(buildParam));
            currentCharacter = buildData.character;
            equippedItems = buildData.equippedItems;
            selectCharacter(currentCharacter);
            updateEquipmentDisplay();
            updateStats();
        } catch (e) {
            console.error('Failed to load shared build');
        }
    } else {
        const savedBuild = localStorage.getItem('turtleWowBuild');
        if (savedBuild) {
            try {
                const buildData = JSON.parse(savedBuild);
                currentCharacter = buildData.character;
                equippedItems = buildData.equippedItems;
                selectCharacter(currentCharacter);
                updateEquipmentDisplay();
                updateStats();
            } catch (e) {
                console.error('Failed to load saved build');
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);