export type { BlogPost, BlogContentSection, PostAuthor } from "@/lib/types";
import type { BlogPost } from "@/lib/types";

export const blogPostsData: BlogPost[] = [
  {
    id: "choose-tile-adhesive",
    slug: "how-to-choose-the-right-tile-adhesive-for-your-project",
    title: "How to Choose the Right Tile Adhesive for Your Project",
    category: "Tile Adhesives",
    date: "Oct 10, 2026",
    readTime: "5 min read",
    summary:
      "Selecting the appropriate tile adhesive depends on tile porosity, tile size, substrate movement, and whether the installation is internal or external.",
    image: "/assets/blog/blog_tile_adhesive.jpg",
    content: [
      {
        sectionHeading: "The Importance of Matching Adhesive to Tile Type",
        paragraphs: [
          "Not all tiles behave the same way under load and moisture. Traditional ceramic tiles possess high porosity, allowing cement paste from standard adhesives like Grip Master or Simba Grip 555 to mechanically key into their microscopic pores.",
          "Porcelain tiles, vitrified stone, and large-format slabs feature extremely low absorption rates (often below 0.5%). For these dense materials, mechanical bonding alone is insufficient; synthetic polymer-modified adhesives like Simba Grip 777 or Simba Grip 818 are required to achieve chemical and shear adhesion.",
        ],
      },
      {
        sectionHeading: "Assessing the Substrate and Environmental Exposure",
        paragraphs: [
          "Consider the exposure conditions: interior floors with light residential traffic have vastly different stress requirements compared to outdoor balconies, public commercial hallways, or swimming pools.",
          "Substrates subjected to vibration, direct sunlight, thermal expansion, or continuous water submersion necessitate flexible adhesives with certified classifications such as C2TES1 to prevent delamination and hollow sounding tiles over time.",
        ],
      },
      {
        sectionHeading: "Key Selection Checklist",
        paragraphs: [
          "1. Tile Composition: Ceramic (Grip Master / Simba Grip 555) vs. Porcelain (Grip Master Plus / Simba Grip 777 / 818).",
          "2. Tile Dimensions: Standard formats vs. large-format tiles exceeding 600x600mm requiring high-bond C2 or C2TES1 formulations.",
          "3. Exposure: Dry interior rooms versus wet bathrooms, kitchens, and exterior verandas.",
        ],
      },
    ],
    keyTakeaways: [
      "Low-porosity porcelain tiles require polymer-modified adhesives, not basic mortar.",
      "Large-format tiles require deformable adhesives with extended open time.",
      "Always inspect substrate flatness, cure time, and moisture level before spreading adhesive.",
    ],
  },
  {
    id: "waterproofing-before-tiling",
    slug: "why-waterproofing-matters-before-tiling",
    title: "Why Waterproofing Matters Before Tiling",
    category: "Waterproofing",
    date: "Oct 5, 2026",
    readTime: "4 min read",
    summary:
      "Tile and grout are water-resistant, not waterproof. Understanding why a continuous waterproof barrier beneath tiles protects the building structure.",
    image: "/assets/blog/blog_waterproofing.jpg",
    content: [
      {
        sectionHeading: "The Myth of the Waterproof Tile Surface",
        paragraphs: [
          "One of the most persistent misconceptions on construction sites is that finished tiling forms a completely waterproof barrier. In reality, grout joints are porous cementitious channels that allow micro-moisture and vapor transmission.",
          "Over time, hairline fractures in joints, thermal expansion, and normal structural movement allow water to seep behind tiles. Without an underlying waterproof barrier such as Ultraguard 2K, this water accumulates in the subfloor.",
        ],
      },
      {
        sectionHeading: "Preventing Catastrophic Substructure Damage",
        paragraphs: [
          "When water penetrates beneath un-waterproofed tiles, it migrates horizontally through screeds and into adjoining walls, causing paint blistering, mould outbreaks, and plaster degradation. In multi-story buildings, it eventually drips into ceiling fixtures below.",
          "Applying a two-component cementitious waterproofing membrane like Ultraguard creates a seamless, flexible barrier directly beneath the adhesive bed, protecting both the building structure and surrounding finishes.",
        ],
      },
    ],
    keyTakeaways: [
      "Tiles and grout alone do not prevent water seepage into subfloors.",
      "Sub-tile waterproofing prevents chronic leakages into adjoining rooms and lower levels.",
      "A 2K cementitious barrier like Ultraguard offers the ideal bonding foundation for polymer-modified tile adhesives.",
    ],
  },
  {
    id: "understanding-c1-c2-grades",
    slug: "understanding-c1-and-c2-tile-adhesive-grades",
    title: "Understanding C1 and C2 Tile Adhesive Grades",
    category: "Product Education",
    date: "Sep 28, 2026",
    readTime: "6 min read",
    summary:
      "A clear guide to international cementitious tile adhesive classifications and what C1, C2, T, E, and S1 designations actually mean on the job site.",
    image: "/assets/blog/blog_c1_c2_grades.jpg",
    content: [
      {
        sectionHeading: "What Does 'C' Stand For?",
        paragraphs: [
          "Under standard international classification systems for tile adhesives, the letter 'C' designates a cementitious adhesive — a factory-blended mixture of hydraulic binders, graded aggregates, and chemical admixtures.",
          "The numeral following 'C' signifies the tensile adhesion strength class:",
          "• C1 (Standard Adhesive): Demonstrates tensile adhesion strength of at least 0.5 N/mm² under standard test conditions. Example: Simba Grip 555.",
          "• C2 (Improved Adhesive): Demonstrates enhanced tensile adhesion strength of at least 1.0 N/mm², fortified with specialized polymer modifiers. Example: Simba Grip 777.",
        ],
      },
      {
        sectionHeading: "Understanding Additional Classifications: T, E, and S1",
        paragraphs: [
          "Flagship adhesives such as Simba Grip 818 carry the comprehensive rating 'C2TES1'. Here is what each letter represents:",
          "• T (Reduced Slip): Less than 0.5mm vertical slip when installing heavy tiles on vertical walls, eliminating the need for temporary batten supports.",
          "• E (Extended Open Time): At least 30 minutes of open working time after trowelling before skinning occurs, essential in warm African climates.",
          "• S1 (Deformable): Demonstrates flexural deflection between 2.5mm and 5mm without bond failure, absorbing structural movements and thermal stresses.",
        ],
      },
    ],
    keyTakeaways: [
      "C1 denotes standard 0.5 N/mm² bond strength, suitable for standard ceramic tiles.",
      "C2 provides double the minimum bond strength (1.0 N/mm²), essential for porcelain.",
      "T = Slip resistance, E = Extended open time, S1 = Deformability under movement.",
    ],
  },
  {
    id: "common-waterproofing-problems",
    slug: "common-waterproofing-problems-in-buildings",
    title: "Common Waterproofing Problems in Buildings",
    category: "Construction Tips",
    date: "Sep 20, 2026",
    readTime: "5 min read",
    summary:
      "Explore the root causes of waterproofing failures, including improper surface preparation, incompatible primers, and missed corner detailing.",
    image: "/assets/blog/blog_common_problems.jpg",
    content: [
      {
        sectionHeading: "Why Most Waterproofing Failures Occur",
        paragraphs: [
          "Studies across commercial and residential developments reveal that more than 80% of waterproofing failures stem not from material inadequacy, but from installation oversights and deficient substrate preparation.",
          "Applying high-grade waterproofing membranes over dusty, un-cured, or honeycombed concrete compromises the mechanical bond, leaving weak paths through which pressurized water eventually forces its way.",
        ],
      },
      {
        sectionHeading: "Critical Problem Areas",
        paragraphs: [
          "1. Substrate Cleanliness: Dust, oils, curing compounds, and loose debris must be mechanically abraded or cleaned prior to application.",
          "2. Absence of Fillets (Coving): 90-degree internal corners between floors and walls concentrate shear stress. Coved cementitious fillets must be installed before membrane application.",
          "3. Pipe Penetrations: Plumbing pipes and floor drains require specialized elastomeric detailing and reinforced mesh collars.",
          "4. Inadequate Curing: Rushing tile installation before the waterproofing membrane has achieved full cure can disrupt the waterproof film.",
        ],
      },
    ],
    keyTakeaways: [
      "Surface preparation is the foundation of 100% watertight protection.",
      "All internal corners require chamfered or rounded fillets prior to coating.",
      "Always respect recommended recoat intervals and cure durations before flood testing.",
    ],
  },
  {
    id: "protecting-basements",
    slug: "how-to-protect-basements-from-water-ingress",
    title: "How to Protect Basements from Water Ingress",
    category: "Waterproofing",
    date: "Sep 12, 2026",
    readTime: "6 min read",
    summary:
      "Deep foundations and underground parking structures face relentless ground moisture. Here is how modern construction chemicals seal basements permanently.",
    image: "/assets/projects/project_basement.jpg",
    content: [
      {
        sectionHeading: "Understanding Hydrostatic Pressure",
        paragraphs: [
          "Basements are subterranean structures surrounded by soil that holds varying volumes of groundwater. During heavy rains, the water table rises, exerting positive hydrostatic pressure against external walls and upward pressure against the basement floor slab.",
          "Without dedicated barrier tanking, water finds even microscopic capillary voids in the concrete, manifesting as efflorescence, salt weeping, damp patches, or active pooling inside the basement.",
        ],
      },
      {
        sectionHeading: "External vs. Internal Tanking Solutions",
        paragraphs: [
          "The ideal time to protect a basement is during construction via external tanking using heavy-duty torch-applied membranes such as APP Membrane.",
          "For existing structures or areas where external excavation is prohibited, internal cementitious waterproofing with Ultraguard 2K creates a crystalline-assisted barrier capable of resisting negative-side water pressure.",
        ],
      },
    ],
    keyTakeaways: [
      "Subterranean hydrostatic pressure requires engineered heavy-duty barriers.",
      "External tanking using APP membranes stops water before it touches the structural wall.",
      "Ultraguard 2K provides reliable negative-side protection when exterior access is limited.",
    ],
  },
  {
    id: "tile-grout-builders-guide",
    slug: "tile-grout-what-builders-should-know",
    title: "Tile Grout: What Builders Should Know",
    category: "Construction Tips",
    date: "Sep 05, 2026",
    readTime: "4 min read",
    summary:
      "Why grout is much more than a cosmetic line: joint flexibility, moisture barrier protection, and correct mixing ratios for lasting finishes.",
    image: "/assets/products/cat_grout.jpg",
    content: [
      {
        sectionHeading: "The Functional Role of Tile Grout",
        paragraphs: [
          "While many view grout as merely an aesthetic choice to match tile colours, tile grout performs vital structural and protective duties. It absorbs subtle thermal expansion between tiles, cushions edge chipping, and seals gaps against dirt and fluid penetration.",
          "Using substandard, un-formulated site sand-cement for joint filling results in porous, crumbling joints that harbor mould, crack under slight deflection, and wash out during routine cleaning.",
        ],
      },
      {
        sectionHeading: "Advantages of Waterproof Formulations like Tile Lit",
        paragraphs: [
          "Formulated with hydrophobic polymers, Tile Lit delivers tight particle packing and significantly reduced water absorption. This prevents moisture from migrating beneath the tile edges, keeping shower recesses and kitchen floors clean and structurally secure.",
        ],
      },
    ],
    keyTakeaways: [
      "Grout cushions thermal expansion and protects tile edges from chipping.",
      "Waterproof grout formulations like Tile Lit prevent mould growth and deep water seepage.",
      "Never add excess water during mixing, as it weakens cement hydration and causes colour fading.",
    ],
  },
  {
    id: "surface-preparation-tiling",
    slug: "preparing-surfaces-for-tile-installation",
    title: "Preparing Surfaces for Tile Installation",
    category: "Construction Tips",
    date: "Aug 28, 2026",
    readTime: "5 min read",
    summary:
      "A flat, sound, clean surface ensures long-lasting adhesion. Essential rules for curing times, moisture testing, and substrate levelling.",
    image: "/assets/products/cat_tile_adhesives.jpg",
    content: [
      {
        sectionHeading: "The Golden Rule: The Bond is Only as Strong as the Substrate",
        paragraphs: [
          "Even the highest grade C2TES1 tile adhesive cannot hold a tile if applied over a crumbly screed or oily concrete surface. Professional surface preparation is the single greatest determinant of tiling longevity.",
          "Before applying adhesive, the substrate must be mechanically sound, fully cured (minimum 28 days for new concrete slabs; minimum 7 days per 10mm thickness for sand-cement screeds), and free of laitance, form-release oils, or curing membranes.",
        ],
      },
      {
        sectionHeading: "Checking Levelness and Surface Flatness",
        paragraphs: [
          "For large-format porcelain tiles, surface flatness tolerances must not exceed 3mm over a 2-meter straightedge. Excessive dips result in tile lippage, requiring excessive adhesive build-up that leads to shrinkage stresses.",
        ],
      },
    ],
    keyTakeaways: [
      "Substrates must be fully cured and cleared of dust, oils, and loose particles.",
      "Maximum tolerance for modern tiling is 3mm over a 2-meter straightedge.",
      "Pre-wetting or priming highly absorbent screeds prevents early water suction from adhesive.",
    ],
  },
  {
    id: "microcement-flooring-architecture",
    slug: "microcement-flooring-in-modern-architecture",
    title: "Microcement Flooring in Modern Architecture",
    category: "Flooring",
    date: "Aug 15, 2026",
    readTime: "6 min read",
    summary:
      "The rise of seamless architectural finishes: how Cemora microcement transforms residential and commercial spaces with minimalist elegance.",
    image: "/assets/products/cat_flooring.jpg",
    content: [
      {
        sectionHeading: "The Allure of Seamless Architectural Concrete",
        paragraphs: [
          "Contemporary architecture increasingly favors continuous, minimalist planes that eliminate distracting grout lines and visual interruptions. Microcement has emerged as the premier medium to achieve this sleek aesthetic without pouring heavy concrete slabs.",
          "Cemora microcement is applied in thin, hand-trowelled layers (typically 2–3mm), offering tactile warmth, subtle tonal mottling, and an authentic mineral texture that complements modern wood, steel, and glass elements.",
        ],
      },
      {
        sectionHeading: "Versatility Across Surfaces and Spaces",
        paragraphs: [
          "Unlike standard poured concrete, Cemora can be applied over existing screeds, concrete stairs, and even bathroom walls, creating continuous fluid transitions between floors and vertical surfaces in luxury residential and commercial settings.",
        ],
      },
    ],
    keyTakeaways: [
      "Delivers continuous, grout-free architectural aesthetics with low structural weight.",
      "Hand-trowelled application creates unique, bespoke tactile mineral depth.",
      "Ideal for modern showrooms, open-concept residences, and contemporary feature walls.",
    ],
  },
];
