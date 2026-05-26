export type Relationship =
  | "ormiston"
  | "surrounding"
  | "east-greenwich";

export type GroundId =
  | "overdevelopment"
  | "infrastructure"
  | "noise-cohesion"
  | "air-quality";

export interface LetterFormData {
  fullName: string;
  address: string;
  relationship: Relationship;
  grounds: GroundId[];
}

const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  ormiston: "I live on Ormiston Road",
  surrounding: "I live in the immediate surrounding area",
  "east-greenwich": "I am a local East Greenwich resident",
};

const INTRO_SENTENCES: string[] = [
  "I am writing to register my formal objection to planning application reference 26/0726/F for the proposed change of use at 54–56 Ormiston Road, London SE10 0LN to a 12-bed House in Multiple Occupation (HMO).",
  "I wish to object in the strongest possible terms to application 26/0726/F, which seeks to convert 54–56 Ormiston Road, London SE10 0LN, from its existing C2 use to a 12-person sui generis HMO.",
  "As a resident directly affected by this proposal, I am submitting this individual objection to planning application 26/0726/F concerning 54–56 Ormiston Road, London SE10 0LN.",
  "I write to object to the above-referenced application (26/0726/F) for a 12-bed HMO at 54–56 Ormiston Road, London SE10 0LN, which I consider materially harmful to our neighbourhood.",
  "Please accept this letter as my personal objection to planning application 26/0726/F for the intensification of use at 54–56 Ormiston Road, London SE10 0LN.",
];

const CONCLUSION_SENTENCES: string[] = [
  "For the reasons set out above, I respectfully request that the Royal Borough of Greenwich refuses planning permission for application 26/0726/F.",
  "I urge the Council to refuse this application in full. The proposed development is incompatible with the character of East Greenwich and with adopted planning policy.",
  "In light of the significant harms identified, I ask that you recommend refusal of application 26/0726/F and that the matter be determined in accordance with the development plan.",
  "I trust the Council will give due weight to this objection and refuse permission, thereby protecting the amenity and long-term sustainability of our community.",
  "I would be grateful if my comments could be taken into account by the case officer and, if the application proceeds, by members of the Planning Board.",
];

const GROUND_PARAGRAPHS: Record<GroundId, string[]> = {
  overdevelopment: [
    "The proposal represents significant overdevelopment and excessive density. The loss of the existing C2 (residential institution) use in favour of a 12-person sui generis HMO substantially intensifies occupation on a constrained site. Such a scale of HMO use is out of character with the predominantly low-density residential street scene on Ormiston Road and conflicts with Policy H13 and related housing standards in the London Plan (2021), which seek to resist harmful concentrations of HMOs and to protect local character. The Borough’s own evidence base identifies areas where further HMO provision would undermine housing mix and neighbourhood balance; this site falls squarely within that concern.",
    "Converting 54–56 Ormiston Road to a 12-bed HMO would represent a fundamental change in scale and intensity of use. The application fails to demonstrate that the quantum of development is appropriate to the site or the surrounding area. Under the Greenwich Local Plan, development must respect local character and not result in undue harm to residential amenity. A 12-person HMO on this plot is, in my view, excessive and contrary to the plan-led approach to managing HMO growth across the Borough.",
  ],
  infrastructure: [
    "The proposed development will place undue strain on local infrastructure. Ormiston Road and adjoining streets already experience pressure on waste collection, highway capacity, and on-street parking. A 12-bed HMO will generate refuse volumes far in excess of a typical household, yet the application provides insufficient detail on bin storage, collection arrangements, and refuse management plans required under the London Plan and local waste policies. Servicing and visitor trips will add to congestion on routes that are already heavily used by residents, school traffic, and commercial vehicles.",
    "I am concerned that the Council has not been provided with adequate evidence that existing infrastructure can absorb the additional demands of a 12-person HMO. Refuse storage and collection frequency, highway impacts, and pressure on local services (including GP surgeries and schools) have not been satisfactorily addressed. Policy T2, T4, and T5 of the London Plan require development to reduce car dependency and mitigate transport impacts; the intensification proposed here works against those objectives.",
  ],
  "noise-cohesion": [
    "The nature of HMO occupation—often transient, with high turnover and disparate household groups—gives rise to a material risk of noise disturbance and antisocial behaviour, particularly in the evenings and at weekends. This undermines the cohesion of a stable residential neighbourhood where families and long-term residents currently live. The loss of a single institutional or residential use in favour of a large HMO erodes the social fabric that planning policy is intended to protect under Policies HC1 and D6 of the London Plan.",
    "Large HMOs are associated with patterns of occupation that differ markedly from family homes: irregular hours, higher visitor numbers, and limited stewardship of the property. I have witnessed similar uses elsewhere in the Borough causing persistent noise and disturbance. The proposed use is therefore likely to harm the living conditions of adjoining and nearby residents, contrary to the test in the NPPF and to local policies protecting amenity.",
  ],
  "air-quality": [
    "East Greenwich already suffers from elevated traffic congestion and air quality pressures associated with the A102, local distributor roads, and servicing traffic to nearby commercial uses. The proposed HMO will generate additional vehicle movements from residents, visitors, deliveries, and waste collection, thereby worsening emissions and particulate matter in an area where public health is a material consideration. Policies SI1 and T4 of the London Plan require air quality impacts to be assessed and mitigated; the application does not adequately demonstrate that harm will be avoided.",
    "Increased servicing and trip generation from a 12-bed HMO will add to traffic in an already congested locality. I am concerned that cumulative impacts on air quality have not been properly assessed, particularly for vulnerable residents including children and older people. Development that increases car and van movements without robust mitigation is contrary to the Mayor’s Transport Strategy and the Borough’s climate commitments.",
  ],
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateObjectionLetter(data: LetterFormData): string {
  const intro = pickRandom(INTRO_SENTENCES);
  const conclusion = pickRandom(CONCLUSION_SENTENCES);
  const relationshipText = RELATIONSHIP_LABELS[data.relationship];

  const groundSections = data.grounds.map((groundId) => {
    const variants = GROUND_PARAGRAPHS[groundId];
    return pickRandom(variants);
  });

  const bodyParagraphs = [
    `${intro} ${relationshipText}, and I have reviewed the submitted plans and supporting documents.`,
    `My full name is ${data.fullName.trim()}. I reside at:\n\n${data.address.trim()}`,
    ...groundSections,
    conclusion,
  ];

  return [
    data.fullName.trim(),
    data.address.trim().split("\n").join(", "),
    formatDate(),
    "",
    "Sam Malis",
    "Development Management",
    "Royal Borough of Greenwich",
    "Woolwich Centre",
    "35 Wellington Street",
    "London SE18 6HQ",
    "",
    `Dear Mr Malis,`,
    "",
    "Re: Objection to Planning Application 26/0726/F – 54–56 Ormiston Road, London SE10 0LN",
    "",
    ...bodyParagraphs,
    "",
    "Yours faithfully,",
    "",
    data.fullName.trim(),
  ].join("\n");
}

export const GROUND_OPTIONS: {
  id: GroundId;
  label: string;
}[] = [
  {
    id: "overdevelopment",
    label:
      "Overdevelopment and excessive density (loss of C2 status to a 12-person sui generis HMO)",
  },
  {
    id: "infrastructure",
    label:
      "Strain on local infrastructure and inadequate refuse management",
  },
  {
    id: "noise-cohesion",
    label:
      "Noise disturbance, transient occupation, and loss of neighbourhood cohesion",
  },
  {
    id: "air-quality",
    label:
      "Air quality concerns and increased servicing traffic in an already congested area",
  },
];

export const RELATIONSHIP_OPTIONS: {
  value: Relationship;
  label: string;
}[] = [
  { value: "ormiston", label: "I live on Ormiston Road" },
  {
    value: "surrounding",
    label: "I live in the immediate surrounding area",
  },
  {
    value: "east-greenwich",
    label: "I am a local East Greenwich resident",
  },
];

export const MIN_GROUNDS = 2;

export const EMAIL_TO = "sam.malis@royalgreenwich.gov.uk";
export const EMAIL_SUBJECT =
  "Objection to Planning Application 26/0726/F - 54-56 Ormiston Road";

export const PLANNING_APPS_EMAIL = "planningapps@royalgreenwich.gov.uk";

export const PLANNING_OFFICER = {
  name: "Sam Malis",
  role: "Development Management",
  authority: "Royal Borough of Greenwich",
  lines: [
    "Woolwich Centre",
    "35 Wellington Street",
    "London SE18 6HQ",
  ],
  email: EMAIL_TO,
} as const;
