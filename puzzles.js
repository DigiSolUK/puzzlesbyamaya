// Each prompt has a matching local clip in assets/audio.
export const games = {
  "number-garden": {
    easy: [
      { prompt: "How many flowers can you count?", count: [3], options: [2, 3, 4], answer: 3 },
      { prompt: "How many flowers can you count?", count: [1], options: [1, 2, 3], answer: 1 },
      { prompt: "How many flowers can you count?", count: [5], options: [3, 4, 5], answer: 5 },
      { prompt: "How many flowers can you count?", count: [2], options: [1, 2, 3], answer: 2 },
      { prompt: "How many flowers can you count?", count: [4], options: [3, 4, 5], answer: 4 }
    ],
    trickier: [
      { prompt: "How many flowers altogether?", count: [3, 4], options: [6, 7, 8], answer: 7 },
      { prompt: "How many flowers altogether?", count: [6, 3], options: [8, 9, 10], answer: 9 },
      { prompt: "How many flowers altogether?", count: [5, 7], options: [11, 12, 13], answer: 12 },
      { prompt: "How many flowers altogether?", count: [8, 9], options: [16, 17, 18], answer: 17 },
      { prompt: "How many flowers altogether?", count: [10, 10], options: [18, 19, 20], answer: 20 }
    ]
  },
  "water-wonders": {
    easy: [
      { prompt: "Is the water in a cup a liquid or a solid?", icons: ["drop"], options: ["Liquid", "Solid"], answer: "Liquid", hint: "A liquid can pour. Think about pouring water into a cup.", fact: "Water can pour. It is a liquid." },
      { prompt: "Is an ice cube a liquid or a solid?", icons: ["ice"], options: ["Liquid", "Solid"], answer: "Solid", hint: "An ice cube keeps its shape until it melts.", fact: "Ice is solid water." },
      { prompt: "A raindrop falls. Is it a liquid or a solid?", icons: ["drop"], options: ["Liquid", "Solid"], answer: "Liquid", hint: "A raindrop is a drop of water.", fact: "Raindrops are liquid water." },
      { prompt: "An icicle hangs from a roof. Is it a liquid or a solid?", icons: ["icicle"], options: ["Liquid", "Solid"], answer: "Solid", hint: "An icicle is made of ice, just like an ice cube.", fact: "An icicle is solid water." }
    ],
    trickier: [
      { prompt: "Water goes in a freezer. Will it freeze or melt?", icons: ["drop", "freezer"], options: ["Freeze", "Melt"], answer: "Freeze", hint: "A freezer makes water very cold.", fact: "Liquid water freezes into solid ice." },
      { prompt: "Ice sits in the warm sun. Will it freeze or melt?", icons: ["ice", "sun"], options: ["Freeze", "Melt"], answer: "Melt", hint: "The sun warms up the ice.", fact: "Solid ice melts into liquid water." },
      { prompt: "A puddle gets cold enough to turn to ice. Does it freeze or melt?", icons: ["drop", "ice"], options: ["Freeze", "Melt"], answer: "Freeze", hint: "What happens when liquid water gets cold enough?", fact: "The puddle freezes as water turns to ice." },
      { prompt: "Ice in your warm hand turns to water. Does it freeze or melt?", icons: ["ice", "drop"], options: ["Freeze", "Melt"], answer: "Melt", hint: "Your warm hand warms up the ice.", fact: "The ice melts as it warms up." }
    ]
  },
  "creature-homes": {
    easy: [
      { prompt: "Where could this frog live?", icons: ["frog"], options: ["Pond", "Desert", "Ocean"], answer: "Pond", hint: "This frog likes fresh water and plants.", fact: "A pond has water and plants for a frog." },
      { prompt: "Where could this clownfish live?", icons: ["clownfish"], options: ["Forest", "Pond", "Ocean"], answer: "Ocean", hint: "A clownfish needs salty water.", fact: "The ocean has the salty water clownfish need." },
      { prompt: "Where could this owl live?", icons: ["owl"], options: ["Forest", "Ocean", "Pond"], answer: "Forest", hint: "Look for tall trees where an owl could perch.", fact: "A forest has plenty of trees to perch in." },
      { prompt: "Where could this fox live?", icons: ["fox"], options: ["Pond", "Forest", "Ocean"], answer: "Forest", hint: "This fox hunts on land and can hide under trees.", fact: "A forest gives a fox places to hide and find food." }
    ],
    trickier: [
      { prompt: "This camel walks on hot sand. Where could it live?", icons: ["camel"], options: ["Desert", "Pond", "Ocean"], answer: "Desert", hint: "Look for a hot, dry place with sand.", fact: "A camel’s wide feet help it walk on desert sand." },
      { prompt: "This seal swims in the sea and rests on rocks. Where could it live?", icons: ["seal"], options: ["Forest", "Rocky coast", "Desert"], answer: "Rocky coast", hint: "Look for a place with sea and rocks together.", fact: "A rocky coast has both water to swim in and rocks to rest on." },
      { prompt: "This sea turtle swims far out in salty water. Where could it live?", icons: ["turtle"], options: ["Pond", "Desert", "Ocean"], answer: "Ocean", hint: "Look for the biggest stretch of salty water.", fact: "Sea turtles can swim long distances in the ocean." },
      { prompt: "This tree frog climbs tall trees in a rainy place. Where could it live?", icons: ["frog"], options: ["Desert", "Rainforest", "Ocean"], answer: "Rainforest", hint: "Look for a place with lots of trees and rain.", fact: "A rainforest has tall trees and plenty of rain." }
    ]
  },
  "push-and-pull": {
    easy: [
      { prompt: "Is the child pushing or pulling the toy?", scene: ["push", "right"], options: ["Push", "Pull"], answer: "Push", hint: "A push moves the toy away from the child.", fact: "The child’s hand pushes the toy away." },
      { prompt: "Is the child pushing or pulling the toy?", scene: ["pull", "right"], options: ["Push", "Pull"], answer: "Pull", hint: "Look at how the child tugs the string.", fact: "The string pulls the toy towards the child." },
      { prompt: "Is the child pushing or pulling the toy?", scene: ["push", "left"], options: ["Push", "Pull"], answer: "Push", hint: "The hand presses against the toy to move it away.", fact: "The child is pushing the toy." },
      { prompt: "Is the child pushing or pulling the toy?", scene: ["pull", "left"], options: ["Push", "Pull"], answer: "Pull", hint: "The string moves the toy towards the child.", fact: "The child is pulling the toy." }
    ],
    trickier: [
      { prompt: "The child pushes the toy. Which way will it roll?", scene: ["push", "right"], options: ["Left", "Right"], answer: "Right", hint: "The toy rolls away from the hand.", fact: "The hand is on the left, so the toy rolls right." },
      { prompt: "The child pulls the string. Which way will the toy roll?", scene: ["pull", "left"], options: ["Left", "Right"], answer: "Left", hint: "The toy rolls towards the child holding the string.", fact: "The child is on the left, so the toy rolls left." },
      { prompt: "The child pushes the toy. Which way will it roll?", scene: ["push", "left"], options: ["Left", "Right"], answer: "Left", hint: "The toy rolls away from the hand.", fact: "The hand is on the right, so the toy rolls left." },
      { prompt: "The child pulls the string. Which way will the toy roll?", scene: ["pull", "right"], options: ["Left", "Right"], answer: "Right", hint: "The toy rolls towards the child holding the string.", fact: "The child is on the right, so the toy rolls right." }
    ]
  }
};

export const boardPrompts = {
  "picture-jigsaw": "Tap a piece, then tap its space.",
  "memory-match": "Flip two cards to find a pair."
};

export const answerIcons = {
  Pond: "pond", Desert: "desert", Ocean: "ocean", Forest: "forest", Rainforest: "forest",
  "Rocky coast": "coast", Left: "left", Right: "right", Liquid: "drop", Solid: "ice",
  Freeze: "ice", Melt: "drop"
};

export const memoryPictures = ["star", "heart", "flower", "moon", "fish", "leaf"];
