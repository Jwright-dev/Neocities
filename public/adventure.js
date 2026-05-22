// Simple text adventure engine with a small object database
const objects = {
    potion: { name: "Potion", description: "A medical spray used to heal 20hp" },
    bulbasaur: { name: "Bulbasaur", description: "A small green frog Pokemon." },
    squirtle: { name: "Squirtle", description: "A small blue turtle Pokemon." },
    charmander: { name: "Charmander", description: "A small orange lizard Pokemon." }
};

const nodes = {
    start: {
        text: "You wake up and look at the clock, it's 10:00 AM and you have a feeling you are already late for something.",
        options: [
            { text: "Get on your PC", next: "pc" },
            { text: "Go talk to your mom.", next: "mom" },
            { text: "Head back to bed", next: "wrongAnswerStart" },
            { text: "Go outside", next: "palletTown" }
        ]
    },
    wrongAnswerStart: {
        text: "Something tells you that this isnt the right choice. You decide to try something else.",
        options: [
            { text: "Go back to the start", next: "start" }
        ]
    },
    pc: {
        text: "You boot up the PC. What is next?",
        options: [
            { text: "Item Storage", next: "foundPotion", gives: "potion" },
            { text: "Pokemon Storage", next: "pokemonStorage" },
            { text: "Turn off PC", next: "start" }
        ]
    },
    foundPotion: {
        text: "You find a Potion in the Item Storage. You take it with you.",
        options: [
            { text: "Back to PC Menu", next: "pc" },
            { text: "Turn off PC", next: "start" }
        ]
    },
    pokemonStorage: {
        text: "You access the Pokemon Storage. But it's empty.",
        options: [
            { text: "Back to PC Menu", next: "pc" },
            { text: "Turn off PC", next: "start" }
        ]
    },
    mom: {
        text: "Hi honey, I thought you had already left to meet the professor. You should go talk to him.",
        options: [
            { text: "Go outside", next: "palletTown" },
            { text: "Go back to your room.", next: "start" }
        ]
    },
    palletTown: {
        text: "Walking outside, you see the sun is shining. Where to next?",
        options: [
            { text: "Head up the path to Route 1", next: "palletTownExit" },
            { text: "Check the neighbors house.", next: "bluesHouse" },
            { text: "Head to the Pokemon Lab.", next: "pokemonLab" }
        ]
    },
    bluesHouse: {
        text: "You walk into the neighbors house and see that it's empty. Blue must be out.",
        options: [
            { text: "Go outside", next: "palletTown" }
        ]
    },
    palletTownExit: {
        text: "You walk to the edge of the grass before being stopped. \"Hey, you can't go there yet! The professor is waiting for you at the lab.\"",
        options: [
            { text: "Check the neighbors house.", next: "bluesHouse" },
            { text: "Head to the Pokemon Lab.", next: "pokemonLab" }
        ]
    },
    pokemonLab: {
        text: "You walk in and see Professor Oak and Blue. Oak: \"Welcome Red, we have been waiting for you. Please select your starter Pokemon.\"",
        options: [
            { text: "Bulbasaur the Grass type.", next: "pickedBulbasaur", catch: "bulbasaur"  },
            { text: "Squirtle the Water type.", next: "pickedSquirtle", catch: "squirtle" },
            { text: "Charmander the Fire type.", next: "pickedCharmander", catch: "charmander" },
            { text: "Leave", next: "wronganswerLab" }
        ]
    },
    wronganswerLab: {
        text: "Stop it Red, this is your chance to start your Pokemon journey.",
        options: [
            { text: "Focus up", next: "pokemonLab" }
        ]
    },
    wronganswerLab2: {
        text: "Proffessor Oak: \"Red, where are you going? I have a task for you.\"",
        options: [
            { text: "Talk to Oak again", next: "dexQuest1" },
        ]
    },
    pickedBulbasaur: {
        text: "You chose Bulbasaur. Professor Oak: \"Great choice, Bulbasaur is a strong Pokemon with a lot of potential.\"",
        options: [
            { text: "Talk to Oak again", next: "dexQuest1" },
            { text: "Leave", next: "wronganswerLab2" }

        ]
    },
    pickedSquirtle: {
        text: "You chose Squirtle. Professor Oak: \"Great choice, Squirtle is a strong Pokemon with a lot of potential.\"",
        options: [
            { text: "Talk to Oak again", next: "dexQuest1" },
            { text: "Leave", next: "wronganswerLab2" }

        ]
    },
    pickedCharmander: {
        text: "You chose Charmander. Professor Oak: \"Great choice, Charmander is a strong Pokemon with a lot of potential.\"",
        options: [
            { text: "Talk to Oak again", next: "dexQuest1" },
            { text: "Leave", next: "wronganswerLab2" }

        ]
    },
    dexQuest1: {
        text: "Proffessor Oak: \"Red, I want you to go up to the Viridian City Mart and get a my parcel for me.\"",
        options: [
            { text: "Leave the Lab", next: "palletTown2" }
        ]
    },
    palletTown2: {
        text: "Walking outside, you see the sun is shining. Where to next?",
        options: [
            { text: "Head up the path to Route 1", next: "palletTownExit2" },
            { text: "Check Blue's house.", next: "bluesHouse2" },
            { text: "Go talk to Mom.", next: "mom2" }
        ]
    },
    bluesHouse2: {
        text: "You walk into the Blue's house and see that it's empty. Blue is still at the Pokemon Lab.",
        options: [
            { text: "Go outside", next: "palletTown2" }
        ]
    },
    mom2: {
        text: "Hi honey, I'm so proud of you for starting on your Pokemon Journey. Dont forget to come back and visit me sometimes.",
        options: [
            { text: "Go outside", next: "palletTown2" }
        ]
    },
};

let history = [];
let inventory = [];
let party = [];

const storyEl = document.getElementById('story');
const optionsEl = document.getElementById('options');
const invListEl = document.getElementById('invList');
const partyListEl = document.getElementById('partyList');
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
            // add items to inventory if present
            if (opt.gives && !inventory.includes(opt.gives)) {
                inventory.push(opt.gives);
            }
            // add pokemon to party if present
            if (opt.catch && !party.includes(opt.catch)) {
                party.push(opt.catch);
            }
            updateInventory();
            updateParty();
            // immediately move to the next node
            if (opt.next) {
                renderNode(opt.next);
            }
        });
        optionsEl.appendChild(btn);
    });
    updateInventory();
    updateParty();
}

function updateInventory() {
    if (inventory.length === 0) invListEl.textContent = '(empty)';
    else invListEl.textContent = inventory.map(id => objects[id]?.name || id).join(', ');
}

function updateParty() {
    if (party.length === 0) partyListEl.textContent = '(empty)';
    else partyListEl.textContent = party.map(id => objects[id]?.name || id).join(', ');
}

restartBtn.addEventListener('click', () => {
    inventory = [];
    party = [];
    history = [];
    renderNode('start');
});

// start game
renderNode('start');
