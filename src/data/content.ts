import { Project, Testimonial, PlumbingService } from '../types';

import heroImg from '../assets/images/hero_luxury_bathroom_1790456799998.jpg';
import techImg from '../assets/images/technician_insured_pro_1790456813468.jpg';
import projectDrainImg from '../assets/images/project_drain_cleaning_1790456825712.jpg';
import videoCust1 from '../assets/images/testimonial_video_customer_1_1790456836435.jpg';
import videoCust2 from '../assets/images/testimonial_video_customer_2_1790456847633.jpg';
import videoCust3 from '../assets/images/testimonial_video_customer_3_1790456862370.jpg';

export const ASSETS = {
  hero: heroImg,
  technician: techImg,
  projectDrain: projectDrainImg,
  video1: videoCust1,
  video2: videoCust2,
  video3: videoCust3,
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    title: 'Restaurant Drain Cleaning – Local Café',
    category: 'Commercial',
    location: 'Downtown Metro Center',
    summary: 'Responded within 30 minutes to fix a burst pipe & severe grease blockage in a high-rise commercial kitchen. Completed full hydro-jet restoration.',
    duration: '1 hr 45 min',
    image: projectDrainImg,
    client: 'The Daily Grind Café & Roastery',
    fullDescription: 'The café experienced an unexpected backup during prime brunch service affecting both bar sinks and the commercial grease interceptor line. Aquora rapid emergency crew deployed high-pressure rotary hydro-jetters, thoroughly clearing 180 feet of mainline and eliminating structural calcification without damaging vintage copper piping.',
    metrics: [
      { label: 'Response Time', value: '28 Mins' },
      { label: 'Down-Time Prevented', value: '3 Full Days' },
      { label: 'Warranty Given', value: '24 Months' },
    ],
    tags: ['Hydro-Jetting', 'Grease Trap Cleared', 'Commercial Code Safe'],
  },
  {
    id: 'p2',
    title: 'High-Rise Penthouse Repiping & Valve Retrofit',
    category: 'Residential',
    location: 'Skyline Residences Tower B',
    summary: 'Non-invasive acoustic leak location and complete surgical replacement of pressurized hot water riser supplying 3 penthouse bathrooms.',
    duration: '4 Hours',
    image: heroImg,
    client: 'Skyline Luxury Living HOA',
    fullDescription: 'Installed medical-grade PEX-A expansion lines with motorized automatic shutoff sensors and acoustic monitoring. Zero drywall demolition required in living spaces through endoscopic wall routing.',
    metrics: [
      { label: 'Piping Upgraded', value: '320 Linear Ft' },
      { label: 'Pressure Test', value: '110 PSI Verified' },
      { label: 'Damage Cost Saved', value: '$45,000+' },
    ],
    tags: ['Acoustic Detection', 'PEX-A Expansion', 'Automatic Shutoff Valves'],
  },
  {
    id: 'p3',
    title: 'Hospitality Boiler & Tankless Cascade Installation',
    category: 'Commercial',
    location: 'Harbor Boutique Hotel',
    summary: 'Engineered an ultra-efficient 6-unit commercial tankless water heating system delivering continuous 99.4°F hot water across 48 guest suites.',
    duration: '2 Days',
    image: projectDrainImg,
    client: 'The Grand Harbor Suites',
    fullDescription: 'Removed aging 500-gallon atmospheric storage boiler and engineered a modular cascade matrix with intelligent load-balancing circulation pumps. Cut monthly gas expenditure by 34%.',
    metrics: [
      { label: 'Energy Reduction', value: '34% Less Gas' },
      { label: 'Hot Water Capacity', value: 'Infinite GPM' },
      { label: 'Payback Period', value: '14 Months' },
    ],
    tags: ['Navien Certified', 'Circulation Loop', 'High Efficiency'],
  },
  {
    id: 'p4',
    title: 'Emergency Mainline Trenchless Relining',
    category: 'Drain & Pipe',
    location: 'Oakridge Residential District',
    summary: 'Root-intruded 4-inch clay sewer pipe rehabilitated beneath mature hardwood trees using epoxy cured-in-place pipe (CIPP) lining.',
    duration: '3.5 Hours',
    image: projectDrainImg,
    client: 'Private Residence',
    fullDescription: 'Saved the homeowner from a $15,000 excavation across their driveway and garden. Utilized high-tensile epoxy felt inversion lining under robotic camera observation.',
    metrics: [
      { label: 'Lining Thickness', value: '4.5 mm Structural' },
      { label: 'Landscape Saved', value: '100% Intact' },
      { label: 'Certified Lifespan', value: '50+ Years' },
    ],
    tags: ['Trenchless CIPP', 'Zero Dig', 'Root Proof'],
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Thompson',
    role: 'Homeowner',
    type: 'text',
    rating: 5,
    comment: 'We had a major leak at midnight, and their team arrived within 30 minutes. They fixed everything quickly and explained the problem clearly. Truly lifesavers!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    date: '3 days ago',
    serviceUsed: 'Emergency Slab Leak Repair',
  },
  {
    id: 't2',
    name: 'Julian Vance',
    role: 'Architect & Property Owner',
    type: 'video',
    rating: 5,
    image: videoCust1,
    videoDuration: '1:14 min',
    videoSnippet: 'Aquora transformed how we handle plumbing across all our luxury architectural rentals. When an issue strikes, they dispatch instantly with video endoscopy and fixed-price transparency.',
    date: '1 week ago',
    serviceUsed: 'Whole-Home Copper to PEX Retrofit',
  },
  {
    id: 't3',
    name: 'Michael Carter',
    role: 'Restaurant Owner',
    type: 'text',
    rating: 5,
    comment: 'Our kitchen drains kept clogging and interrupting service. Their experts solved the issue and gave us tips to prevent future problems. Professional and dependable!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: '2 weeks ago',
    serviceUsed: 'Hydro-Jetting & Interceptor Maintenance',
  },
  {
    id: 't4',
    name: 'Marcus Sterling',
    role: 'Commercial Facility Director',
    type: 'video',
    rating: 5,
    image: videoCust2,
    videoDuration: '0:52 min',
    videoSnippet: 'Managing a 12-story medical office requires zero tolerance for downtime. Aquoras scheduled preventative pipe inspections and certified backflow audits have kept us 100% compliant for 3 consecutive years.',
    date: '3 weeks ago',
    serviceUsed: 'Commercial Backflow & Valve Overhaul',
  },
  {
    id: 't5',
    name: 'Emily Johnson',
    role: 'Office Manager',
    type: 'text',
    rating: 5,
    comment: 'We hired them for a full water heater replacement in our office building. The crew was quiet, respectful of our work environment, and left the utility room spotless.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    date: '1 month ago',
    serviceUsed: 'Dual Commercial Tankless Setup',
  },
  {
    id: 't6',
    name: 'David Reynolds',
    role: 'Real Estate Developer',
    type: 'video',
    rating: 5,
    image: videoCust3,
    videoDuration: '1:45 min',
    videoSnippet: 'In luxury residential developments, fixtures and water pressure make the first impression. Aquora executes pristine rough-ins and master-level gold and brass finishings without a single scratch.',
    date: '1 month ago',
    serviceUsed: 'Custom Luxury Fixture Installation',
  },
];

export const SERVICES_DATA: PlumbingService[] = [
  {
    id: 's1',
    title: '24/7 Emergency Leak Resolution',
    description: 'Acoustic leak detection and urgent pipe repair. GPS-tracked master plumbers dispatched within 30 minutes anywhere in the metro area.',
    features: ['30-minute rapid response guarantee', 'Non-invasive acoustic wall sensors', 'Immediate water shutoff isolation'],
    startingPrice: '$189',
    estimatedTime: '45-90 min',
    iconName: 'AlertCircle',
    badge: '24/7 Available',
  },
  {
    id: 's2',
    title: 'High-Pressure Hydro-Jet Drain Clearing',
    description: '4,000 PSI commercial rotary water jetting removes tree roots, heavy grease, and mineral scale to restore pipes to like-new diameter.',
    features: ['High-definition CCTV pipe scan included', 'Eco-friendly, chemical-free technology', '12-month zero-clog warranty'],
    startingPrice: '$249',
    estimatedTime: '1-2 hours',
    iconName: 'Droplets',
  },
  {
    id: 's3',
    title: 'Trenchless Pipe Relining (CIPP)',
    description: 'Restore broken underground sewer lines without digging up your yard, driveway, or landscaping using structural epoxy lining.',
    features: ['Zero landscape or driveway destruction', '50-year structural life expectancy', 'Completed in a single day'],
    startingPrice: '$1,250',
    estimatedTime: 'Same day',
    iconName: 'Pipette',
    badge: 'No Digging',
  },
  {
    id: 's4',
    title: 'High-Efficiency Tankless Water Heaters',
    description: 'Endless continuous hot water and up to 40% reduction in utility bills with certified Navien and Rinnai installations.',
    features: ['Space-saving wall-mounted units', 'Rebate-eligible high efficiency', 'Digital temperature control valves'],
    startingPrice: '$890',
    estimatedTime: '3-4 hours',
    iconName: 'Flame',
  },
  {
    id: 's5',
    title: 'High-End Bathroom & Fixture Trim',
    description: 'Master plumber installation of freestanding tubs, thermostatic shower systems, custom gold/brass faucets, and wall-hung toilets.',
    features: ['Scratch-free white glove installation', 'Pressure-balanced thermostatic valves', 'Architectural specification review'],
    startingPrice: '$320',
    estimatedTime: '2-5 hours',
    iconName: 'Bath',
  },
  {
    id: 's6',
    title: 'Backflow Certification & Commercial Code',
    description: 'Annual municipal compliance testing, backflow preventer rebuilds, and automated filing with city water authorities.',
    features: ['Certified backflow testers', 'Official city compliance submission', 'Commercial maintenance contracts'],
    startingPrice: '$149',
    estimatedTime: '45 min',
    iconName: 'ShieldCheck',
  },
];

export const TRUST_STATS = [
  { label: 'Satisfied Customers', value: '50K+' },
  { label: 'Rapid Response Average', value: '28 Mins' },
  { label: 'Master Plumber Experience', value: '18+ Yrs' },
  { label: 'Verified 5-Star Reviews', value: '99.4%' },
];

export const FAQS = [
  {
    q: 'How fast can an Aquora emergency plumber arrive at my property?',
    a: 'Our average metro response time is 28 minutes. We operate a GPS-coordinated fleet of fully stocked mobile service vans on standby 24 hours a day, 7 days a week, including holidays.',
  },
  {
    q: 'Are your estimates truly upfront and free of hidden fees?',
    a: 'Yes. Before any wrench touches a pipe, our licensed technician inspects the issue with diagnostic tools and delivers a written, itemized fixed quote. The price we quote is the exact price you pay.',
  },
  {
    q: 'What warranties do you provide on plumbing work?',
    a: 'All workmanship is backed by our 100% Satisfaction Guarantee. Drain clearings carry a 12-month free warranty, while pipe replacements and trenchless relining include up to a 10-year parts and labor warranty.',
  },
  {
    q: 'Do you work on both residential homes and commercial establishments?',
    a: 'Absolutely. We service single-family estates, multi-unit luxury condominiums, restaurants, hotels, hospitals, and corporate facilities with dedicated commercial-grade equipment.',
  },
];
