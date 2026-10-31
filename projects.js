const PROJECTS = [
  {
    id: "nightrip",
    title: "NIGHTRIP",
    summary: "Short and weird roguelike deckbuilder made for the GMTK 2026 jam.",
    year: "2026",
    role: "Solo project",
    tags: [".NET", "Unity", "C#", "Aseprite", "Audacity"],
    media: [
      { src: "assets/nightrip-1.gif", type: "gif", caption: "Planning Phase" },
      { src: "assets/nightrip-2.gif", type: "gif",   caption: "Action Phase" },
      { src: "assets/nightrip-3.gif", type: "gif", caption: "Reward Screen" }
    ],
    details: [
      { p: "Nightrip is an atmospheric deckbuilder made for the GMTK 2026 jam. It placed in the top 17.36% for creativity out of ~10.5k entries." },
      { h: "HIGHLIGHTS" },
      { list: ["Nightrip features a complex battle system split into planning and action phases.",
        "During the planning phase, the player draws a hand from their deck of cards. They can then plan the order and timing in which their cards are played.",
        "During the action phase, the player and the enemies play their cards in the previously determined order, creating wild interactions."] },
      { h: "WHAT I LEARNED" },
      { p: "I loved developing Nightrip, especially because of the uniqueness of the project and the complexity of its systems. One of my biggest challenges was designing the underlying battle system to remain simple, scalable and modular despite the complexity of its interactions. This pushed me to think hard about system architecture and how different mechanics could work together without making the code difficult to maintain." }
    ],
    links: [
      { label: "ITCH.IO PAGE", url: "https://m4laise.itch.io/nightrip" }
    ]
  },
  {
    id: "lichslantern",
    title: "LICH'S LANTERN",
    summary: "Large dungeon-crawler game in development for ~4 years.",
    year: "2021-2026",
    role: "Solo project",
    tags: [".NET", "Unity", "C#", "Aseprite", "Audacity", "FL Studio"],
    media: [
      { src: "assets/demo1.mp4", caption: "Older Gameplay Footage" },
      { src: "assets/demo2.mp4", caption: "Older Gameplay Footage" }
    ],
    details: [
      { p: "Lich's Lantern is a work-in-progress roguelike dungeon-crawler that I have been developing for approximately 4 years. The game features a complex back-end designed with scalability and modularity in mind to support its large scale. Every asset, from pixel-art sprites to music and sound effects, is designed and made by me." },
      { h: "HIGHLIGHTS" },
      { list: ["Lich's Lantern is set in a multitude of worlds, each with their own unique rules, assets and atmosphere.",
        "The game's most unique mechanic is the ability to play as two characters simultaneously. The player is encouraged to position each character strategically and switch between them in order to maneuver between the enemies.",
        "Lich's Lantern contains a variety of weapons and upgrades that the player can combine in many different ways. The game's systems are intelligently designed with OOP principles in mind, ensuring that every interaction works as intended."] },
      { h: "WHAT I LEARNED" },
      { p: "Developing Lich's Lantern taught me a lot about working on large-scale projects. I learned about scaling a codebase, scope management and tooling. For designing the underlying systems of Lich's Lantern, I used industry-standard practices and tools such as state machines, ScriptableObjects and an event system." }
  ],
    links: [
      { label: "Steam page coming soon!", url: "", disabled: true }
    ]
  }
];
