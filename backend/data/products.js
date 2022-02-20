const products = [
  {
    name: "Harry Potter and the Philosopher's stone",
    image: "/images/HPPhilosopherStone.jpg",
    sku: [
      {
        feature: "Soft Cover",
        price: 301.01,
        quanity: 3,
      },
      {
        feature: "Hard Cover",
        price: 401.01,
        quanity: 5,
      },
    ],
    description:
      "Escape to Hogwarts with the unmissable series that has sparked a lifelong reading journey for children and families all over the world. The magic starts here. Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. The magic starts here! These editions of the classic and internationally bestselling Harry Potter series feature thrilling jacket artwork by award-winning illustrator Jonny Duddle. They are the perfect starting point for anyone who's ready to lose themselves in the greatest children's story of all time.",
    author: "J.K. Rowling",
    genre: "fantasy",
    rating: 4.5,
    numOfRatings: 35,
  },
  {
    name: "Harry Potter and the Chamber of Secrets",
    image: "/images/HPChamberOfSecrets.jpg",
    sku: [
      {
        feature: "Soft Cover",
        price: 301.01,
        quanity: 3,
      },
      {
        feature: "Hard Cover",
        price: 401.01,
        quanity: 5,
      },
    ],
    description:
      "Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as through turned to stone . Dobby's sinister predictions seem to be coming true.",
    author: "J.K. Rowling",
    genre: "fantasy",
    rating: 4.7,
    numOfRatings: 28,
  },
  {
    name: "Harry Potter and the Prisoner of Azkaban",
    image: "/images/HPPrisonOfAskaban.jpg",
    sku: [
      {
        feature: "Soft Cover",
        price: 301.01,
        quanity: 3,
      },
      {
        feature: "Hard Cover",
        price: 401.01,
        quanity: 5,
      },
    ],
    description:
      "When the Knight Bus crashes through the darkness and screeches to a halt in front of him, it's the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run - and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry's tea leaves . But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss.",
    author: "J.K. Rowling",
    genre: "fantasy",
    rating: 4.3,
    numOfRatings: 21,
  },
  {
    name: "Harry Potter and the Goblet of Fire",
    image: "/images/HPGobletOfFire.jpg",
    sku: [
      {
        feature: "Soft Cover",
        price: 301.01,
        quanity: 3,
      },
      {
        feature: "Hard Cover",
        price: 401.01,
        quanity: 5,
      },
    ],
    description:
      "The Triwizard Tournament is to be held at Hogwarts. Only wizards who are over seventeen are allowed to enter - but that doesn't stop Harry dreaming that he will win the competition. Then at Hallowe'en, when the Goblet of Fire makes its selection, Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks.",
    author: "J.K. Rowling",
    genre: "fantasy",
    rating: 4.5,
    numOfRatings: 19,
  },
  {
    name: "Harry Potter and the Order of the Phoenix",
    image: "/images/HPOrderOfPhoenix.jpg",
    sku: [
      {
        feature: "Soft Cover",
        price: 301.01,
        quanity: 3,
      },
      {
        feature: "Hard Cover",
        price: 401.01,
        quanity: 5,
      },
    ],
    description:
      "Dark times have come to Hogwarts. After the Dementors' attack on his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him. There are many who deny the Dark Lord's return, but Harry is not alone: a secret order gathers at Grimmauld Place to fight against the Dark forces. Harry must allow Professor Snape to teach him how to protect himself from Voldemort's savage assaults on his mind. But they are growing stronger by the day and Harry is running out of time.",
    author: "J.K. Rowling",
    genre: "fantasy",
    rating: 4.7,
    numOfRatings: 17,
  },
  {
    name: "Harry Potter and the Half-Blood Prince",
    image: "/images/HPHalfBloodPrince.jpg",
    sku: [
      {
        feature: "Soft Cover",
        price: 301.01,
        quanity: 3,
      },
      {
        feature: "Hard Cover",
        price: 401.01,
        quanity: 5,
      },
    ],
    description:
      "When Dumbledore arrives at Privet Drive one summer night to collect Harry Potter, his wand hand is blackened and shrivelled, but he does not reveal why. Secrets and suspicion are spreading through the wizarding world, and Hogwarts itself is not safe. Harry is convinced that Malfoy bears the Dark Mark: there is a Death Eater amongst them. Harry will need powerful magic and true friends as he explores Voldemort's darkest secrets, and Dumbledore prepares him to face his destiny.",
    author: "J.K. Rowling",
    genre: "fantasy",
    rating: 4.4,
    numOfRatings: 22,
  },
  {
    name: "Harry Potter and the Deathly Hallows",
    image: "/images/HPDeathlyHallows.jpg",
    sku: [
      {
        feature: "Soft Cover",
        price: 301.01,
        quanity: 3,
      },
      {
        feature: "Hard Cover",
        price: 401.01,
        quanity: 5,
      },
    ],
    description:
      "'Give me Harry Potter,' said Voldemort's voice, 'and none shall be harmed. Give me Harry Potter, and I shall leave the school untouched. Give me Harry Potter, and you will be rewarded.' As he climbs into the sidecar of Hagrid's motorbike and takes to the skies, leaving Privet Drive for the last time, Harry Potter knows that Lord Voldemort and the Death Eaters are not far behind. The protective charm that has kept Harry safe until now is broken, but he cannot keep hiding. The Dark Lord is breathing fear into everything Harry loves and to stop him Harry will have to find and destroy the remaining Horcruxes. The final battle must begin - Harry must stand and face his enemy...",
    author: "J.K. Rowling",
    genre: "fantasy",
    rating: 4.8,
    numOfRatings: 24,
  },
  {
    name: "Harry Potter and the Cursed Child ",
    image: "/images/HPCursedChild.jpg",
    sku: [
      {
        feature: "Soft Cover",
        price: 301.01,
        quanity: 3,
      },
      {
        feature: "Hard Cover",
        price: 401.01,
        quanity: 5,
      },
    ],
    description:
      "It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic, a husband, and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.",
    author: "J.K. Rowling",
    genre: "fantasy",
    rating: 4.4,
    numOfRatings: 23,
  },
];

export default products;
