export interface Pillar {
  id: string;
  number: string;
  name: string;
  short: string;
  summary: string;
  topics: string[];
  questions: string[];
}

export const methodName = "The College ROI Method™";

export const pillars: Pillar[] = [
  {
    id: "fund-it",
    number: "01",
    name: "Fund It",
    short: "Pay for college with a plan, not panic.",
    summary:
      "Build a scholarship and grant system, understand what college actually costs you, and make money decisions you can live with — during school and after.",
    topics: [
      "Scholarships",
      "Grants",
      "College-cost strategy",
      "Budgeting",
      "Student debt reduction",
      "Working during college",
      "Financial decision-making",
    ],
    questions: [
      "Where should I actually be looking for scholarships — beyond the big national search sites?",
      "How many applications is realistic alongside classes and work?",
      "What does this school really cost me per year, and what are my trade-offs?",
    ],
  },
  {
    id: "build-it",
    number: "02",
    name: "Build It",
    short: "Turn college years into career capital.",
    summary:
      "Find internships, co-ops and jobs earlier than you think you can, position what you've already done, and build relationships that open doors.",
    topics: [
      "Internships",
      "Co-ops",
      "Jobs",
      "Resume strategy",
      "Networking",
      "Professional experience",
      "Career capital",
    ],
    questions: [
      "How do I get an internship when every posting asks for experience?",
      "Is a co-op worth delaying graduation?",
      "How do I make my campus job or activities count on a resume?",
    ],
  },
  {
    id: "experience-it",
    number: "03",
    name: "Experience It",
    short: "Make room for the experiences that shape you.",
    summary:
      "Explore study abroad, fellowships, research and campus programs — and think clearly about cost, timing and which opportunities are genuinely worth it for you.",
    topics: [
      "Study abroad",
      "Fellowships",
      "Grants",
      "International opportunities",
      "Funded and low-cost experiences",
      "Campus opportunities",
    ],
    questions: [
      "Can I afford to study abroad — and how do I evaluate the real cost?",
      "What fellowships exist for students like me, and when do they open?",
      "Which campus programs are worth my limited time?",
    ],
  },
  {
    id: "launch-it",
    number: "04",
    name: "Launch It",
    short: "Leave with direction, not just a diploma.",
    summary:
      "Choose a major and path with clearer eyes, prioritize the right opportunities, keep a life outside of work, and plan the move into your first professional chapter.",
    topics: [
      "Major and career discernment",
      "Early-career strategy",
      "Post-graduation planning",
      "Opportunity prioritization",
      "Work/life balance",
      "Transition into professional life",
    ],
    questions: [
      "I'm not sure my major fits — how do I decide without wasting time or money?",
      "There are too many opportunities. Which ones should I actually say yes to?",
      "What should my first year after graduation look like?",
    ],
  },
];
