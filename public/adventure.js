// Simple text adventure engine with a small object database
const objects = {
    rustyKey: { name: "Rusty Key", description: "An old key, looks like it fits a small chest." },
    map: { name: "Faded Map", description: "A map showing a nearby village and a cave." }
};

const nodes = {
    start: {
        text: "You wake at the edge of a small clearing. Paths lead north, east, and south. A worn path to the west looks rarely used.",
        options: [
            { text: "Go north toward the trees", next: "forest" },
            { text: "Head east to the river", next: "river" },
            { text: "Walk south to the village", next: "village" },
            { text: "Investigate the west path", next: "cabin" }
        ]
    },
    forest: {
        text: "Tall trees tower above. You see a glint on the ground.",
        options: [
            { text: "Pick up the glint", next: "foundKey", gives: "rustyKey" },
            { text: "Return to the clearing", next: "start" },
            { text: "Follow animal tracks deeper", next: "den" }
        ]
    },
    river: {
        text: "The river is calm. A small boat is tied to a post.",
        options: [
            { text: "Untie the boat and cross", next: "farSide" },
            { text: "Search the riverbank", next: "foundMap", gives: "map" },
            { text: "Return to the clearing", next: "start" }
        ]
    },
    village: {
        text: "The village is quiet. There is a locked chest in the square.",
        options: [
            { text: "Try to open the chest", next: "chestLocked", requires: "rustyKey" },
            { text: "Ask villagers for help", next: "talk" },
            { text: "Return to the clearing", next: "start" }
        ]
    },
    cabin: {
        text: "An abandoned cabin. The door hangs open.",
        options: [
            { text: "Enter the cabin", next: "insideCabin" },
            { text: "Go back", next: "start" }
        ]
    },
    foundKey: {
        text: "You found a Rusty Key on the ground.",
        options: [
            { text: "Keep going into the forest", next: "den" },
            { text: "Return to the clearing", next: "start" }
        ]
    },
    foundMap: {
        text: "You find a Faded Map tucked in some reeds.",
        options: [
            { text: "Keep the map", next: "river" },
            { text: "Return to the clearing", next: "start" }
        ]
    },
    chestLocked: {
        text: "Using the Rusty Key, you open the chest and find a small trinket. You win this short scene!",
        options: [
            { text: "Play again", next: "start" }
        ]
    },
    den: {
        text: "A fox den. Nothing else of interest. You head back.",
        options: [
            { text: "Return to clearing", next: "start" }
        ]
    },
    farSide: {
        text: "Across the river you find wildflowers and nothing else. You return.",
        options: [
            { text: "Return", next: "river" }
        ]
    },
    insideCabin: {
        text: "Inside the cabin there's an old journal but nothing to take. You leave.",
        options: [
            { text: "Leave the cabin", next: "start" }
        ]
    },
    talk: {
        text: "Villagers are friendly and point you to the chest key rumored to be in the forest.",
        options: [
            { text: "Return to clearing", next: "start" }
        ]
    }
};

let history = [];
let inventory = [];

const storyEl = document.getElementById('story');
const optionsEl = document.getElementById('options');
const invListEl = document.getElementById('invList');
const backBtn = document.getElementById('backBtn');
const restartBtn = document.getElementById('restartBtn');

function renderNode(id) {
    const node = nodes[id];
    if (!node) return;
    history.push(id);
    storyEl.textContent = node.text;
    optionsEl.innerHTML = '';

    // render up to 4 options
    (node.options || []).slice(0,4).forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt.text;
        // disable if requires an object not in inventory
        if (opt.requires && !inventory.includes(opt.requires)) {
            btn.disabled = true;
            btn.title = 'Requires: ' + (objects[opt.requires]?.name || opt.requires);
        }
        btn.addEventListener('click', () => {
            // prevent double clicks
            optionsEl.querySelectorAll('button').forEach(b => b.disabled = true);
            // show immediate 'You ...' feedback
            storyEl.textContent = 'You ' + opt.text;
            // give item immediately if present
            if (opt.gives && !inventory.includes(opt.gives)) {
                inventory.push(opt.gives);
            }
            updateInventory();
            // immediately move to the next node
            if (opt.next) {
                renderNode(opt.next);
            }
        });
        optionsEl.appendChild(btn);
    });
    updateInventory();
}

function updateInventory() {
    if (inventory.length === 0) invListEl.textContent = '(empty)';
    else invListEl.textContent = inventory.map(id => objects[id]?.name || id).join(', ');
}

backBtn.addEventListener('click', () => {
    if (history.length <= 1) return;
    history.pop();
    const prev = history.pop();
    if (prev) renderNode(prev);
});

restartBtn.addEventListener('click', () => {
    inventory = [];
    history = [];
    renderNode('start');
});

// start game
renderNode('start');
