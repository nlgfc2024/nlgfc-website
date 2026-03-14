/**
 * Central data store for all 28 Malawi districts.
 * Edit district data here — the single [district].vue page reads from this file.
 */

const defaultProjects = (districtName) => [
  {
    name: 'GESD',
    fullName: 'Governance to Enable Service Delivery',
    description: `The GESD project aims to strengthen ${districtName} District Council's institutional performance, responsiveness to citizens and management of resources for service delivery.`,
    objectives: [
      'Strengthen institutional performance tracking for service delivery',
      'Improve management of financial and human resources',
      'Enhance conversion of resources into development assets per Annual Investment Plans'
    ],
    status: 'Active'
  },
  {
    name: 'SSRLP',
    fullName: 'Social Support and Resilience Livelihoods Program',
    description: `A program designed to build community resilience and provide social support to vulnerable populations in ${districtName} District.`,
    objectives: [
      'Improve household food security and nutrition',
      'Build community resilience to shocks and stresses',
      'Strengthen local governance structures',
      'Enhance access to social services'
    ],
    status: 'Active'
  },
  {
    name: 'MASAF',
    fullName: 'Malawi Social Action Fund',
    description: 'A community-driven development program that supports infrastructure development and capacity building initiatives.',
    objectives: [
      'Improve rural infrastructure and connectivity',
      'Enhance access to basic social services',
      'Build local capacity for project management',
      'Promote community participation in development'
    ],
    status: 'Not Active'
  }
]

const defaultReports = (districtName) => [
  {
    title: `${districtName} Annual Performance Report 2024`,
    type: 'Annual Report',
    date: '2024-12-15',
    description: `Comprehensive overview of ${districtName} District Council activities and achievements for the fiscal year 2024.`
  },
  {
    title: 'District Development Plan 2023–2027',
    type: 'Strategic Plan',
    date: '2023-01-20',
    description: 'Five-year strategic development plan outlining priority areas and implementation strategies.'
  },
  {
    title: 'Revenue Collection Report Q4 2024',
    type: 'Financial Report',
    date: '2024-10-30',
    description: 'Quarterly report on revenue collection and financial performance.'
  }
]

const defaultNews = (districtName) => [
  {
    title: `${districtName} District Council Launches New Infrastructure Project`,
    date: '2024-12-10',
    summary: 'The council has initiated a new infrastructure project to improve services in rural areas.',
    category: 'Development'
  },
  {
    title: 'Community Participation in Governance Workshop',
    date: '2024-12-05',
    summary: 'A three-day workshop was conducted to enhance community participation in local governance.',
    category: 'Governance'
  },
  {
    title: 'Youth Skills Development Program Graduation',
    date: '2024-11-20',
    summary: 'Over 150 youth graduated from various skills development programs.',
    category: 'Youth'
  }
]

const DISTRICT_DATA = {
  // ─────────────── NORTHERN REGION ───────────────

  chitipa: {
    name: 'Chitipa District Council',
    region: 'Northern',
    profile: {
      about: 'Chitipa is located in the far north of Malawi, bordering Tanzania and Zambia. The district is one of the most remote in Malawi and has a rich cultural heritage.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote economic development and sustainable use of resources',
        'Maintain law and order at the local level',
        'Ensure equitable development across all areas of the district'
      ],
      vision: 'A prosperous and self-sustaining Chitipa District with equitable access to quality services for all.',
      mission: 'To promote socio-economic development through efficient and effective delivery of quality services to the people of Chitipa District.',
      strategicObjectives: [
        'Improve service delivery to all residents',
        'Strengthen financial management and resource mobilisation',
        'Promote good governance and accountability',
        'Enhance environmental sustainability'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Development planning and implementation',
        'Revenue collection and financial management',
        'Environmental management'
      ],
      majorAchievements: 'Construction of new health facilities and improvement of road networks in rural areas.',
      jurisdiction: 'Located in the Northern Region, bordering Tanzania to the north and Zambia to the west.',
      population: '234,927',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Chitipa'),
    reports: defaultReports('Chitipa'),
    news: defaultNews('Chitipa')
  },

  karonga: {
    name: 'Karonga District Council',
    region: 'Northern',
    profile: {
      about: 'Karonga District is known for its rich archaeological sites and borders Lake Malawi. The district has significant historical importance as a site of early human fossil discoveries.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote economic development and sustainable use of resources',
        'Maintain law and order at the local level',
        'Ensure equitable development across all areas of the district'
      ],
      vision: 'A prosperous and self-sustaining Karonga District with equitable access to quality services for all.',
      mission: 'To promote socio-economic development through efficient and effective delivery of quality services to the people of Karonga District.',
      strategicObjectives: [
        'Improve service delivery to all residents',
        'Strengthen financial management and resource mobilisation',
        'Promote good governance and accountability',
        'Enhance tourism potential'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Development planning and implementation',
        'Revenue collection and financial management',
        'Tourism and heritage site management'
      ],
      majorAchievements: 'Development of eco-tourism initiatives around the Karonga Museum and Lake Malawi.',
      jurisdiction: 'Located in the Northern Region, bordering Tanzania to the north and Lake Malawi to the east.',
      population: '365,028',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Karonga'),
    reports: defaultReports('Karonga'),
    news: defaultNews('Karonga')
  },

  likoma: {
    name: 'Likoma District Council',
    region: 'Northern',
    profile: {
      about: 'Likoma is a unique island district in Lake Malawi, known for its impressive St. Peter\'s Cathedral and beautiful beaches. It is one of the smallest districts in Malawi.',
      mandate: [
        'Provide and manage public services within the island district',
        'Promote sustainable fishing and tourism',
        'Ensure equitable development for island communities',
        'Maintain environmental sustainability of the island ecosystem'
      ],
      vision: 'A thriving island district with sustainable livelihoods and quality services for all residents.',
      mission: 'To promote sustainable socio-economic development through effective service delivery on Likoma Island.',
      strategicObjectives: [
        'Improve transport connectivity to the mainland',
        'Promote sustainable fishing practices',
        'Develop tourism infrastructure',
        'Improve healthcare and education services'
      ],
      keyFunctions: [
        'Local governance and island administration',
        'Tourism and heritage management',
        'Fisheries oversight',
        'Community development'
      ],
      majorAchievements: 'Renovation of the historic St. Peter\'s Cathedral and improved ferry services.',
      jurisdiction: 'An island district located in Lake Malawi, part of the Northern Region.',
      population: '14,527',
      structure: 'Comprised of elected councillors, Members of Parliament, and appointed technical staff.'
    },
    projects: defaultProjects('Likoma'),
    reports: defaultReports('Likoma'),
    news: defaultNews('Likoma')
  },

  mmbelwa: {
    name: 'Mmbelwa District Council',
    region: 'Northern',
    profile: {
      about: 'Mzimba (Mmbelwa) is the largest district in the Northern Region, home to the Ngoni people with their rich cultural traditions. It encompasses Mzuzu city, the commercial hub of northern Malawi.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote economic development and sustainable use of resources',
        'Preserve and promote Ngoni cultural heritage',
        'Ensure equitable development across all areas of the district'
      ],
      vision: 'A prosperous Mmbelwa District with a strong cultural identity and modern service delivery.',
      mission: 'To promote socio-economic development while preserving cultural heritage through efficient service delivery.',
      strategicObjectives: [
        'Improve service delivery to all residents',
        'Strengthen financial management',
        'Promote cultural tourism',
        'Enhance agricultural productivity'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Development planning and implementation',
        'Revenue collection and financial management',
        'Cultural heritage preservation'
      ],
      majorAchievements: 'Establishment of agricultural extension services reaching over 50,000 farmers.',
      jurisdiction: 'The largest district in the Northern Region, spanning 10,430 km².',
      population: '700,806',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Mmbelwa'),
    reports: defaultReports('Mmbelwa'),
    news: defaultNews('Mmbelwa')
  },

  nkhatabay: {
    name: 'Nkhata Bay District Council',
    region: 'Northern',
    profile: {
      about: 'Nkhata Bay is famous for its scenic lakeshore, vibrant tourism, and as a key hub for ferry transport on Lake Malawi. The district is known for its friendly communities and natural beauty.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote sustainable tourism and fisheries',
        'Ensure equitable development across all areas',
        'Maintain environmental sustainability of Lake Malawi shoreline'
      ],
      vision: 'A leading tourist destination with prosperous communities enjoying quality services.',
      mission: 'To promote sustainable socio-economic development through quality service delivery and responsible tourism.',
      strategicObjectives: [
        'Develop tourism infrastructure',
        'Promote sustainable fishing',
        'Improve lakeshore community livelihoods',
        'Enhance environmental conservation'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Tourism management',
        'Fisheries management',
        'Environmental conservation'
      ],
      majorAchievements: 'Development of community-based tourism lodges and improved fishing cooperatives.',
      jurisdiction: 'Located in the Northern Region along the western shore of Lake Malawi.',
      population: '164,761',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Nkhata Bay'),
    reports: defaultReports('Nkhata Bay'),
    news: defaultNews('Nkhata Bay')
  },

  rumphi: {
    name: 'Rumphi District Council',
    region: 'Northern',
    profile: {
      about: 'Rumphi is known for its mountainous terrain, the Nyika National Park (Malawi\'s largest), and the Vwaza Marsh Wildlife Reserve. The district is a premier eco-tourism destination.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote eco-tourism and wildlife conservation',
        'Ensure equitable development for mountain communities',
        'Oversee sustainable use of natural resources'
      ],
      vision: 'A leading eco-tourism destination with sustainable livelihoods for all residents.',
      mission: 'To promote socio-economic development through effective service delivery and sustainable use of natural resources.',
      strategicObjectives: [
        'Develop eco-tourism infrastructure',
        'Improve access to mountain communities',
        'Strengthen wildlife conservation partnerships',
        'Enhance agricultural value chains'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Eco-tourism management',
        'Environmental and wildlife oversight',
        'Development planning'
      ],
      majorAchievements: 'Partnership with national parks to boost community-based natural resource management.',
      jurisdiction: 'Located in the Northern Region, home to Nyika National Park.',
      population: '169,112',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Rumphi'),
    reports: defaultReports('Rumphi'),
    news: defaultNews('Rumphi')
  },

  // ─────────────── CENTRAL REGION ───────────────

  dedza: {
    name: 'Dedza District Council',
    region: 'Central',
    profile: {
      about: 'Dedza is known for its pottery industry, beautiful highland landscapes, and borders Mozambique. The Dedza pottery industry is nationally famous.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote cottage industries and small enterprises',
        'Ensure equitable development across all areas',
        'Facilitate cross-border trade with Mozambique'
      ],
      vision: 'A prosperous Dedza District where residents enjoy quality services and sustainable livelihoods.',
      mission: 'To promote socio-economic development through efficient and effective service delivery.',
      strategicObjectives: [
        'Develop pottery and cottage industries',
        'Improve cross-border trade facilitation',
        'Strengthen revenue collection',
        'Enhance rural connectivity'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Development planning and implementation',
        'Revenue collection and financial management',
        'Small enterprise development'
      ],
      majorAchievements: 'Establishment of Dedza Pottery as a nationally recognised brand and tourist attraction.',
      jurisdiction: 'Located in the Central Region, bordering Mozambique to the east.',
      population: '830,512',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Dedza'),
    reports: defaultReports('Dedza'),
    news: defaultNews('Dedza')
  },

  dowa: {
    name: 'Dowa District Council',
    region: 'Central',
    profile: {
      about: 'Dowa is an important agricultural district known for tobacco farming, the main cash crop of Malawi. The district plays a significant role in the national economy.',
      mandate: [
        'Provide and manage public services within the district',
        'Support agricultural development and value addition',
        'Ensure equitable development across all areas',
        'Manage and regulate local markets'
      ],
      vision: 'A prosperous agricultural hub with diversified livelihoods and quality services for all residents.',
      mission: 'To promote socio-economic development through effective service delivery and support for agriculture.',
      strategicObjectives: [
        'Diversify agriculture beyond tobacco',
        'Improve market infrastructure',
        'Strengthen financial management',
        'Enhance rural road networks'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Agricultural support services',
        'Revenue collection and financial management',
        'Market management'
      ],
      majorAchievements: 'Introduction of conservation farming practices across 30,000 farming households.',
      jurisdiction: 'Located in the Central Region, covering 3,041 km².',
      population: '411,387',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Dowa'),
    reports: defaultReports('Dowa'),
    news: defaultNews('Dowa')
  },

  kasungu: {
    name: 'Kasungu District Council',
    region: 'Central',
    profile: {
      about: 'Kasungu District Council is a statutory body established under the Local Government Act of 1998 cap. 22.02 of the Laws of Malawi. The District Council is composed of elected councillors, Members of Parliament, Traditional Authorities, and appointed members from interest groups. The District Commissioner (DC) heads the Council Secretariat supported by professional heads of government departments.',
      mandate: [
        'To plan and execute development programmes in the district',
        'To provide and maintain public services including health, education, roads, and water',
        'To promote economic development and environmental management',
        'To collect revenue and manage resources for service delivery'
      ],
      vision: 'A prosperous, self-sustaining Kasungu District with equitable access to quality services for all residents.',
      mission: 'To promote socio-economic development through efficient and effective delivery of quality services to the people of Kasungu District.',
      strategicObjectives: [
        'Strengthen institutional capacity for service delivery',
        'Improve infrastructure and access to basic services',
        'Promote economic development and poverty reduction',
        'Enhance environmental sustainability and natural resource management',
        'Strengthen accountability and transparency in governance',
        'Promote gender equality and social inclusion',
        'Mobilise and manage resources effectively'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Development planning and implementation',
        'Service delivery and infrastructure development',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Successful implementation of GESD and SSRLP projects improving livelihoods for thousands of households. Expansion of Kasungu National Park-adjacent community conservation initiatives.',
      jurisdiction: 'Located in the Central Region, home to Kasungu National Park. Covers 7,878 km².',
      population: '842,953',
      structure: 'Comprised of elected councillors, five Members of Parliament, six Traditional Authorities, and five appointed members from interest groups.'
    },
    projects: [
      {
        name: 'GESD',
        fullName: 'Governance to Enable Service Delivery',
        description: 'Governance to Enable Service Delivery (GESD) project development objective is to strengthen Local Authorities\' institutional performance, responsiveness to citizens and management of resources for service delivery.',
        objectives: [
          'Strengthened institutional performance tracking of improvements in Local Authorities (LAs) institutional performance for service delivery',
          'Strengthened management of resources tracking of improvements in LAs management of financial and human resources in terms of their conversion into development assets in accordance with Annual Investment Plans',
          'Improved responsiveness to citizens through enhanced community participation in decision-making'
        ],
        status: 'Active'
      },
      {
        name: 'SSRLP',
        fullName: 'Social Support and Resilience Livelihoods Program',
        description: 'A program designed to build community resilience and provide social support to vulnerable populations in Kasungu District.',
        objectives: [
          'Improve household food security and nutrition',
          'Build community resilience to shocks and stresses',
          'Strengthen local governance structures',
          'Enhance access to social services'
        ],
        status: 'Active'
      },
      {
        name: 'MASAF',
        fullName: 'Malawi Social Action Fund',
        description: 'A community-driven development program that supports infrastructure development and capacity building initiatives.',
        objectives: [
          'Improve rural infrastructure and connectivity',
          'Enhance access to basic social services',
          'Build local capacity for project management',
          'Promote community participation in development'
        ],
        status: 'Not Active'
      }
    ],
    reports: [
      {
        title: 'Annual Performance Report 2024',
        type: 'Annual Report',
        date: '2024-12-15',
        description: 'Comprehensive overview of council activities and achievements for the fiscal year 2024.'
      },
      {
        title: 'District Development Plan 2023–2027',
        type: 'Strategic Plan',
        date: '2023-01-20',
        description: 'Five-year strategic development plan outlining priority areas and implementation strategies.'
      },
      {
        title: 'Revenue Collection Report Q4 2024',
        type: 'Financial Report',
        date: '2024-10-30',
        description: 'Quarterly report on revenue collection and financial performance.'
      },
      {
        title: 'Infrastructure Development Progress Report',
        type: 'Progress Report',
        date: '2024-11-15',
        description: 'Status update on ongoing infrastructure projects across the district.'
      }
    ],
    news: [
      {
        title: 'Kasungu District Council Launches New Water Project',
        date: '2024-12-10',
        summary: 'The council has initiated a new water infrastructure project to improve access to clean water in rural areas.',
        category: 'Development'
      },
      {
        title: 'Community Participation in Governance Workshop',
        date: '2024-12-05',
        summary: 'A three-day workshop was conducted to enhance community participation in local governance and decision-making processes.',
        category: 'Governance'
      },
      {
        title: 'Agricultural Extension Services Expanded',
        date: '2024-11-28',
        summary: 'The district has expanded its agricultural extension services to reach more farmers in remote areas.',
        category: 'Agriculture'
      },
      {
        title: 'Youth Skills Development Program Graduation',
        date: '2024-11-20',
        summary: 'Over 200 youth graduated from various skills development programs including carpentry, tailoring, and entrepreneurship.',
        category: 'Youth'
      }
    ]
  },

  lilongwecity: {
    name: 'Lilongwe City Council',
    region: 'Central',
    profile: {
      about: 'Lilongwe City Council governs Malawi\'s capital city, the largest urban centre in the country. Established in 1974 as the national capital, Lilongwe is the seat of government and a major commercial hub.',
      mandate: [
        'Provide urban services including water, waste management, and public transport',
        'Plan and regulate urban development and infrastructure',
        'Promote economic growth and investment in the city',
        'Ensure equitable service delivery across all city wards'
      ],
      vision: 'A modern, inclusive, and sustainable capital city that provides quality services to all its residents.',
      mission: 'To plan, develop, and manage Lilongwe City in a sustainable manner that improves the quality of life for all residents.',
      strategicObjectives: [
        'Improve urban infrastructure and transport',
        'Strengthen revenue collection and financial sustainability',
        'Promote inclusive urban development',
        'Enhance waste management and environmental cleanliness',
        'Attract investment and create employment opportunities'
      ],
      keyFunctions: [
        'Urban planning and development control',
        'Water supply and sanitation',
        'Solid waste management',
        'Public transport management',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Development of the city master plan 2035 and expansion of water supply infrastructure reaching additional 200,000 households.',
      jurisdiction: 'Malawi\'s capital city, covering 6,159 km² in the Central Region.',
      population: '2,395,454',
      structure: 'Comprised of elected city councillors, Members of Parliament, and a professional city management team.'
    },
    projects: defaultProjects('Lilongwe City'),
    reports: defaultReports('Lilongwe City'),
    news: defaultNews('Lilongwe City')
  },

  lilongwe: {
    name: 'Lilongwe District Council',
    region: 'Central',
    profile: {
      about: 'Lilongwe District surrounds the capital city and is one of the most populous districts in Malawi. The district covers both peri-urban and rural areas around the city.',
      mandate: [
        'Provide and manage public services within the rural district',
        'Coordinate with Lilongwe City Council on peri-urban issues',
        'Ensure equitable development across all areas of the district',
        'Promote agricultural development in rural areas'
      ],
      vision: 'A prosperous district with strong urban-rural linkages and quality services for all.',
      mission: 'To promote socio-economic development through efficient service delivery in both rural and peri-urban areas.',
      strategicObjectives: [
        'Strengthen peri-urban service delivery',
        'Improve rural agricultural support',
        'Enhance financial management',
        'Promote inclusive development'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Agricultural development support',
        'Revenue collection and financial management',
        'Peri-urban area management'
      ],
      majorAchievements: 'Improved access to clean water in 80% of rural communities.',
      jurisdiction: 'Surrounds Lilongwe City in the Central Region, covering 6,159 km².',
      population: '2,395,454',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Lilongwe'),
    reports: defaultReports('Lilongwe'),
    news: defaultNews('Lilongwe')
  },

  mchinji: {
    name: 'Mchinji District Council',
    region: 'Central',
    profile: {
      about: 'Mchinji borders Zambia and is a major cross-border trade centre. The district plays an important role in regional trade and has a vibrant informal economy.',
      mandate: [
        'Provide and manage public services within the district',
        'Facilitate and regulate cross-border trade',
        'Ensure equitable development across all areas',
        'Promote agricultural development in border communities'
      ],
      vision: 'A thriving border district with diversified trade and quality services for all residents.',
      mission: 'To promote socio-economic development through effective service delivery and facilitation of cross-border commerce.',
      strategicObjectives: [
        'Develop cross-border trade infrastructure',
        'Improve market facilities',
        'Strengthen revenue collection',
        'Enhance agricultural productivity'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Trade facilitation',
        'Revenue collection and financial management',
        'Agricultural development support'
      ],
      majorAchievements: 'Development of Mchinji border market, boosting local trade and tax revenues.',
      jurisdiction: 'Located in the Central Region, bordering Zambia to the west.',
      population: '602,305',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Mchinji'),
    reports: defaultReports('Mchinji'),
    news: defaultNews('Mchinji')
  },

  nkhotakota: {
    name: 'Nkhotakota District Council',
    region: 'Central',
    profile: {
      about: 'Nkhotakota is located on Lake Malawi and has a rich historical heritage as one of the oldest Arab slave trade centres on the lake. The district is also home to Nkhotakota Wildlife Reserve.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote conservation of the Nkhotakota Wildlife Reserve',
        'Ensure equitable development for lakeshore communities',
        'Manage and regulate fishing activities'
      ],
      vision: 'A thriving lakeshore district with rich heritage, vibrant tourism, and quality services.',
      mission: 'To promote socio-economic development through conservation, tourism, and effective service delivery.',
      strategicObjectives: [
        'Develop wildlife and heritage tourism',
        'Promote sustainable fishing practices',
        'Improve lakeshore infrastructure',
        'Strengthen conservation partnerships'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Wildlife reserve oversight',
        'Fisheries management',
        'Heritage tourism management'
      ],
      majorAchievements: 'Successful elephant translocation project in partnership with African Parks, boosting conservation.',
      jurisdiction: 'Located in the Central Region along Lake Malawi, covering 4,259 km².',
      population: '395,897',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Nkhotakota'),
    reports: defaultReports('Nkhotakota'),
    news: defaultNews('Nkhotakota')
  },

  ntcheu: {
    name: 'Ntcheu District Council',
    region: 'Central',
    profile: {
      about: 'Ntcheu is known for its mountainous landscape and borders Mozambique. The district has significant agricultural potential and is known for its highland tea and coffee production.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote agricultural productivity and value chains',
        'Facilitate cross-border economic activities',
        'Ensure equitable development across all areas'
      ],
      vision: 'A prosperous highland district with diverse agricultural production and quality services.',
      mission: 'To promote socio-economic development through effective service delivery and agricultural support.',
      strategicObjectives: [
        'Develop highland agriculture value chains',
        'Improve infrastructure in mountainous areas',
        'Strengthen cross-border trade',
        'Enhance environmental conservation'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Agricultural development support',
        'Revenue collection and financial management',
        'Environmental management'
      ],
      majorAchievements: 'Establishment of community irrigation schemes benefiting 5,000 farming households.',
      jurisdiction: 'Located in the Central Region, bordering Mozambique to the east.',
      population: '659,608',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Ntcheu'),
    reports: defaultReports('Ntcheu'),
    news: defaultNews('Ntcheu')
  },

  ntchisi: {
    name: 'Ntchisi District Council',
    region: 'Central',
    profile: {
      about: 'Ntchisi is one of the smaller districts in the Central Region, known for its Ntchisi Forest Reserve, which is one of the last remaining mountain forests in central Malawi.',
      mandate: [
        'Provide and manage public services within the district',
        'Protect and manage Ntchisi Forest Reserve',
        'Ensure equitable development across all areas',
        'Promote sustainable land use'
      ],
      vision: 'A green district with thriving communities and sustainable natural resources.',
      mission: 'To promote socio-economic development through effective service delivery and environmental stewardship.',
      strategicObjectives: [
        'Conserve Ntchisi Forest Reserve',
        'Promote eco-tourism',
        'Improve agricultural productivity',
        'Enhance community livelihoods'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Forest conservation management',
        'Agricultural support',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Establishment of community forest management groups protecting over 5,000 hectares of forest.',
      jurisdiction: 'Located in the Central Region, covering 1,655 km².',
      population: '321,568',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Ntchisi'),
    reports: defaultReports('Ntchisi'),
    news: defaultNews('Ntchisi')
  },

  salima: {
    name: 'Salima District Council',
    region: 'Central',
    profile: {
      about: 'Salima is located on Lake Malawi and is known for its beaches, fishing industry, and tourism. The district is a major supplier of fresh fish to central Malawi.',
      mandate: [
        'Provide and manage public services within the district',
        'Manage and develop lakeshore tourism',
        'Regulate fishing activities on Lake Malawi',
        'Ensure equitable development for lakeshore and inland communities'
      ],
      vision: 'A premier lakeshore destination with prosperous fishing communities and quality services.',
      mission: 'To promote sustainable socio-economic development through tourism, fisheries management, and effective service delivery.',
      strategicObjectives: [
        'Develop lakeshore tourism infrastructure',
        'Promote sustainable fishing practices',
        'Improve market and trade facilities',
        'Enhance livelihoods for fishing communities'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Fisheries management and oversight',
        'Tourism development',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Development of Senga Bay tourist facilities generating significant local revenue.',
      jurisdiction: 'Located in the Central Region along the western shore of Lake Malawi.',
      population: '478,346',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Salima'),
    reports: defaultReports('Salima'),
    news: defaultNews('Salima')
  },

  // ─────────────── SOUTHERN REGION ───────────────

  balaka: {
    name: 'Balaka District Council',
    region: 'Southern',
    profile: {
      about: 'Balaka is known for its sugar production and borders Lake Malawi. The district is a transport hub in the Southern Region where major roads converge.',
      mandate: [
        'Provide and manage public services within the district',
        'Promote agricultural and agro-industrial development',
        'Manage and develop transport infrastructure',
        'Ensure equitable development across all areas'
      ],
      vision: 'A prosperous transport and agro-industrial hub with quality services for all residents.',
      mission: 'To promote socio-economic development through effective service delivery and support for agriculture and trade.',
      strategicObjectives: [
        'Support sugar and agricultural value chains',
        'Improve road and transport infrastructure',
        'Strengthen revenue collection',
        'Promote industrial development'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Agricultural and agro-industrial support',
        'Revenue collection and financial management',
        'Transport infrastructure management'
      ],
      majorAchievements: 'Improvement of Balaka town market infrastructure boosting local trade.',
      jurisdiction: 'Located in the Southern Region, a key transport junction in Malawi.',
      population: '316,748',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Balaka'),
    reports: defaultReports('Balaka'),
    news: defaultNews('Balaka')
  },

  blantyre: {
    name: 'Blantyre District Council',
    region: 'Southern',
    profile: {
      about: 'Blantyre is the commercial capital of Malawi and the second-largest city. As Malawi\'s economic hub, it hosts the headquarters of most major businesses, banks, and industries in the country.',
      mandate: [
        'Provide urban services including water, waste management, and public transport',
        'Plan and regulate urban development and infrastructure',
        'Promote economic growth and attract investment',
        'Ensure equitable service delivery across all city wards'
      ],
      vision: 'A vibrant commercial city with world-class services and inclusive economic opportunities for all.',
      mission: 'To plan, develop, and manage Blantyre in a sustainable manner that improves the quality of life and promotes economic growth.',
      strategicObjectives: [
        'Improve urban infrastructure and transport networks',
        'Attract and retain business investment',
        'Strengthen revenue collection and financial sustainability',
        'Promote inclusive urban development',
        'Enhance waste management and environmental sustainability'
      ],
      keyFunctions: [
        'Urban planning and development control',
        'Water supply and sanitation',
        'Solid waste management',
        'Business licensing and market management',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Rehabilitation of Limbe market and development of Blantyre City Master Plan 2030.',
      jurisdiction: 'Malawi\'s commercial capital in the Southern Region, covering 2,012 km².',
      population: '1,316,250',
      structure: 'Comprised of elected city councillors, Members of Parliament, and a professional city management team.'
    },
    projects: defaultProjects('Blantyre'),
    reports: defaultReports('Blantyre'),
    news: defaultNews('Blantyre')
  },

  chikwawa: {
    name: 'Chikwawa District Council',
    region: 'Southern',
    profile: {
      about: 'Chikwawa is known for its vast sugar estates and is located in the lower Shire River valley. The district has some of the lowest elevations in Malawi and is prone to flooding but is also highly productive agriculturally.',
      mandate: [
        'Provide and manage public services within the district',
        'Coordinate disaster risk reduction for flood-prone areas',
        'Support agricultural development including sugar production',
        'Ensure equitable development across all areas'
      ],
      vision: 'A resilient agricultural district with effective disaster management and quality services for all.',
      mission: 'To promote socio-economic development through effective service delivery and agricultural support.',
      strategicObjectives: [
        'Strengthen flood disaster preparedness',
        'Support sugar and rice agricultural value chains',
        'Improve infrastructure in the Shire Valley',
        'Enhance climate change adaptation'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Disaster risk management',
        'Agricultural development support',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Construction of flood-resilient infrastructure and community disaster preparedness programmes.',
      jurisdiction: 'Located in the Southern Region in the lower Shire Valley, covering 4,755 km².',
      population: '564,684',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Chikwawa'),
    reports: defaultReports('Chikwawa'),
    news: defaultNews('Chikwawa')
  },

  chiradzulu: {
    name: 'Chiradzulu District Council',
    region: 'Southern',
    profile: {
      about: 'Chiradzulu is one of the smallest districts in Malawi, known for tea production on the slopes of Chiradzulu Mountain. Despite its small size, it is densely populated.',
      mandate: [
        'Provide and manage public services within the district',
        'Support the tea industry and smallholder agriculture',
        'Ensure equitable development for a densely populated area',
        'Protect the Chiradzulu Mountain Forest Reserve'
      ],
      vision: 'A prosperous small district with a thriving tea industry and quality services for all residents.',
      mission: 'To promote socio-economic development through effective service delivery and support for tea and agricultural value chains.',
      strategicObjectives: [
        'Develop tea industry support services',
        'Improve rural infrastructure',
        'Strengthen environmental conservation',
        'Enhance social service delivery'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Agricultural and tea industry support',
        'Environmental management',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Support for smallholder tea farmers through cooperative development programmes.',
      jurisdiction: 'Located in the Southern Region, one of Malawi\'s smallest districts at 767 km².',
      population: '356,875',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Chiradzulu'),
    reports: defaultReports('Chiradzulu'),
    news: defaultNews('Chiradzulu')
  },

  machinga: {
    name: 'Machinga District Council',
    region: 'Southern',
    profile: {
      about: 'Machinga is home to Liwonde National Park, one of Malawi\'s premier wildlife destinations, and borders Lake Malawi. Liwonde is famous for its elephant and hippo populations along the Shire River.',
      mandate: [
        'Provide and manage public services within the district',
        'Co-manage and promote Liwonde National Park tourism',
        'Ensure equitable development for all communities',
        'Manage and regulate activities on Lake Malawi shoreline'
      ],
      vision: 'A leading wildlife tourism destination with prosperous communities and quality services.',
      mission: 'To promote sustainable socio-economic development through conservation, tourism, and effective service delivery.',
      strategicObjectives: [
        'Develop wildlife tourism infrastructure',
        'Improve community-conservation relations',
        'Enhance lakeshore community livelihoods',
        'Strengthen environmental management'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Wildlife and tourism management',
        'Fisheries oversight',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Successful community-based tourism programmes around Liwonde National Park.',
      jurisdiction: 'Located in the Southern Region, bordering Lake Malawi to the east.',
      population: '602,272',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Machinga'),
    reports: defaultReports('Machinga'),
    news: defaultNews('Machinga')
  },

  mangochi: {
    name: 'Mangochi District Council',
    region: 'Southern',
    profile: {
      about: 'Mangochi is located on Lake Malawi and is known for tourism, fishing, and its large Muslim community. The district is a premier tourist destination with beautiful beaches and clear lake waters.',
      mandate: [
        'Provide and manage public services within the district',
        'Develop and manage lakeshore tourism',
        'Regulate and promote sustainable fishing',
        'Ensure equitable development across all communities'
      ],
      vision: 'A premier lake tourism destination with thriving fishing communities and quality services for all.',
      mission: 'To promote sustainable socio-economic development through tourism, fisheries management, and effective service delivery.',
      strategicObjectives: [
        'Develop lakeshore tourism infrastructure',
        'Promote sustainable fishing',
        'Improve road and transport access',
        'Enhance social service delivery'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Fisheries management',
        'Tourism regulation and development',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Development of Cape Maclear area as a world-class lake tourism destination.',
      jurisdiction: 'Located in the Southern Region at the southern tip of Lake Malawi, covering 6,273 km².',
      population: '1,148,635',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Mangochi'),
    reports: defaultReports('Mangochi'),
    news: defaultNews('Mangochi')
  },

  mwanza: {
    name: 'Mwanza District Council',
    region: 'Southern',
    profile: {
      about: 'Mwanza borders Mozambique and is known for its cross-border trade. The district has significant agricultural potential and plays an important trade role in the region.',
      mandate: [
        'Provide and manage public services within the district',
        'Facilitate and regulate cross-border trade',
        'Support agricultural development',
        'Ensure equitable development across all areas'
      ],
      vision: 'A thriving border district with vibrant trade and quality services for all residents.',
      mission: 'To promote socio-economic development through effective service delivery and cross-border trade facilitation.',
      strategicObjectives: [
        'Improve border trade infrastructure',
        'Support agricultural value chains',
        'Strengthen revenue collection',
        'Enhance road connectivity'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Trade facilitation',
        'Agricultural support',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Establishment of new border market facilities boosting local commerce.',
      jurisdiction: 'Located in the Southern Region, bordering Mozambique to the west.',
      population: '138,015',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Mwanza'),
    reports: defaultReports('Mwanza'),
    news: defaultNews('Mwanza')
  },

  nsanje: {
    name: 'Nsanje District Council',
    region: 'Southern',
    profile: {
      about: 'Nsanje is the southernmost district in Malawi, located at the tip of the nation where the Shire River meets Mozambique. Combined with the Shire Highlands and lower Shire plains, it has unique ecological diversity.',
      mandate: [
        'Provide and manage public services within the district',
        'Coordinate international trade at the Nsanje Inland Port',
        'Manage flood disaster risk in the lower Shire',
        'Ensure equitable development for border communities'
      ],
      vision: 'A strategic border and port district with prosperous communities and quality services.',
      mission: 'To promote socio-economic development through effective service delivery and utilisation of Nsanje\'s strategic location.',
      strategicObjectives: [
        'Develop Nsanje Inland Port potential',
        'Strengthen flood disaster management',
        'Improve agricultural productivity in low-lying areas',
        'Enhance basic service delivery'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Disaster risk management',
        'Inland port and trade facilitation',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Development of Nsanje Inland Port to facilitate international freight.',
      jurisdiction: 'Malawi\'s southernmost district, located at the country\'s southern tip.',
      population: '297,257',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Nsanje'),
    reports: defaultReports('Nsanje'),
    news: defaultNews('Nsanje')
  },

  neno: {
    name: 'Neno District Council',
    region: 'Southern',
    profile: {
      about: 'Neno is one of the newest districts in Malawi, created in 2003. It is known for its mountainous terrain and has been the focus of significant development projects, including a renowned partnership with Partners in Health.',
      mandate: [
        'Provide and manage public services within the district',
        'Support healthcare development in partnership with NGOs',
        'Ensure equitable development for remote mountain communities',
        'Promote agricultural productivity'
      ],
      vision: 'A model district for community health and development with quality services for all.',
      mission: 'To promote socio-economic development through effective service delivery and strong community partnerships.',
      strategicObjectives: [
        'Strengthen healthcare delivery',
        'Improve road access to remote areas',
        'Develop agricultural support systems',
        'Build community capacity'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Health sector coordination',
        'Agricultural development support',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Transformation of community health outcomes in partnership with Partners in Health, becoming a model for rural healthcare delivery.',
      jurisdiction: 'Located in the Southern Region, one of Malawi\'s newest districts covering 1,535 km².',
      population: '138,289',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Neno'),
    reports: defaultReports('Neno'),
    news: defaultNews('Neno')
  },

  phalombe: {
    name: 'Phalombe District Council',
    region: 'Southern',
    profile: {
      about: 'Phalombe is known for its agricultural activities, tea estates on the Mulanje Massif foothills, and is also prone to flooding from the Phalombe River. The district neighbours the iconic Mulanje Mountain.',
      mandate: [
        'Provide and manage public services within the district',
        'Support tea and agricultural development',
        'Manage flood disaster risk',
        'Ensure equitable development across all areas'
      ],
      vision: 'A resilient agricultural district with thriving tea and crop production and quality services.',
      mission: 'To promote socio-economic development through effective service delivery and agricultural support.',
      strategicObjectives: [
        'Support tea and smallholder agriculture',
        'Improve flood disaster preparedness',
        'Develop agro-tourism potential near Mulanje Mountain',
        'Enhance infrastructure in flood-prone areas'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Agricultural development support',
        'Disaster risk management',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Community-based flood early warning systems protecting livelihoods of thousands of families.',
      jurisdiction: 'Located in the Southern Region, covering 1,394 km².',
      population: '431,593',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Phalombe'),
    reports: defaultReports('Phalombe'),
    news: defaultNews('Phalombe')
  },

  thyolo: {
    name: 'Thyolo District Council',
    region: 'Southern',
    profile: {
      about: 'Thyolo is famous for its tea and coffee plantations, which carpet the rolling highlands. It is one of the main tea-producing districts in Malawi and produces some of the finest tea in Africa.',
      mandate: [
        'Provide and manage public services within the district',
        'Support the tea and coffee industry and smallholder farmers',
        'Ensure equitable development across all areas',
        'Protect the highland environment'
      ],
      vision: 'A leading tea and coffee producing district with thriving communities and quality services.',
      mission: 'To promote socio-economic development through effective service delivery and support for the tea and coffee value chains.',
      strategicObjectives: [
        'Develop tea industry support services',
        'Support smallholder farmers in the tea sector',
        'Improve rural infrastructure',
        'Enhance social service delivery'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Tea and agricultural industry support',
        'Environmental management',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Support for smallholder tea cooperatives increasing farm-gate prices for thousands of farmers.',
      jurisdiction: 'Located in the Southern Region, covering 1,715 km².',
      population: '721,456',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Thyolo'),
    reports: defaultReports('Thyolo'),
    news: defaultNews('Thyolo')
  },

  mulanje: {
    name: 'Mulanje District Council',
    region: 'Southern',
    profile: {
      about: 'Mulanje is dominated by the iconic Mulanje Massif, the highest mountain in Central Africa and a UNESCO Biosphere Reserve candidate. The district is known for its tea estates, cedar forests, and trekking tourism.',
      mandate: [
        'Provide and manage public services within the district',
        'Protect and promote Mulanje Mountain as a natural heritage site',
        'Support the tea industry and mountain tourism',
        'Ensure equitable development across all areas'
      ],
      vision: 'A premier mountain tourism destination with prosperous communities and quality services.',
      mission: 'To promote sustainable socio-economic development through conservation of Mulanje Mountain and effective service delivery.',
      strategicObjectives: [
        'Develop mountain tourism infrastructure',
        'Protect Mulanje Mountain Forest Reserve',
        'Support tea and agricultural value chains',
        'Improve transport infrastructure'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Mountain tourism management',
        'Environmental and forest conservation',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Development of trekking huts on Mulanje Mountain supporting over 10,000 tourists annually.',
      jurisdiction: 'Located in the Southern Region, home to Mulanje Mountain (3,002m), the highest peak in Central Africa.',
      population: '721,456',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Mulanje'),
    reports: defaultReports('Mulanje'),
    news: defaultNews('Mulanje')
  },

  zomba: {
    name: 'Zomba District Council',
    region: 'Southern',
    profile: {
      about: 'Zomba is the former capital of Malawi and home to Chancellor College (University of Malawi), making it an important educational centre. The Zomba Plateau is a major attraction for both local and international visitors.',
      mandate: [
        'Provide and manage public services within the district',
        'Support the education sector and the university',
        'Promote Zomba Plateau as a tourist destination',
        'Ensure equitable development across all areas'
      ],
      vision: 'A leading educational and cultural centre with quality services and sustainable tourism.',
      mission: 'To promote socio-economic development through effective service delivery, support for education, and promotion of tourism.',
      strategicObjectives: [
        'Support the university city economy',
        'Develop Zomba Plateau tourism',
        'Improve urban infrastructure',
        'Enhance educational support services'
      ],
      keyFunctions: [
        'Local governance and administration',
        'Education sector support',
        'Tourism management',
        'Revenue collection and financial management'
      ],
      majorAchievements: 'Restoration of historic colonial buildings in Zomba town, boosting heritage tourism.',
      jurisdiction: 'Located in the Southern Region, Malawi\'s former colonial capital, covering 2,580 km².',
      population: '745,790',
      structure: 'Comprised of elected councillors, Members of Parliament, Traditional Authorities, and appointed technical staff.'
    },
    projects: defaultProjects('Zomba'),
    reports: defaultReports('Zomba'),
    news: defaultNews('Zomba')
  }
}

export const useDistrictContent = () => {
  const getDistrict = (slug) => {
    if (!slug) return null
    return DISTRICT_DATA[slug.toLowerCase()] || null
  }

  const getAllSlugs = () => Object.keys(DISTRICT_DATA)

  return { getDistrict, getAllSlugs, DISTRICT_DATA }
}
