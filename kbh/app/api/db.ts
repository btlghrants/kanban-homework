export interface Stage {
  id: string;
  title: string;
  description: string;
}

const stages: Stage[] = [
  {
    id: "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
    title: "New",
    description: "Work to do.",
  },
  {
    id: "BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBBB",
    title: "In Progress",
    description: "Work being done.",
  },
  {
    id: "CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC",
    title: "Done",
    description: "Work that has been done.",
  }
]

export interface Task {
  id: string;
  owner: string;
  title: string;
  content: string;
  stageId: string;
  order: number;
}

const tasks: Task[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    title: "booms",
    content: "Given I have logged in\nAnd I have the \"admin\" Role\nWhen I navigate to the home page\nAnd I click the \"explode\" button\nThen the system should explode.",
    owner: "Bob",
    stageId: "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
    order: 1,
  },
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "no booms",
    content: "Given I have logged in\nAnd I have the \"user\" Role\nWhen I navigate to the home page\nThen I should see that the \"explode\" button is disabled.",
    owner: "Alice",
    stageId: "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
    order: 0,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    title: "missing booms",
    content: "Given I have not logged in\nAnd I have the \"anonymous\" Role\nWhen I navigate to the home page\nThen I should not see the \"explode\" button.",
    owner: "Charlie",
    stageId: "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
    order: 2,
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    title: "delicious",
    content: "Given I have not logged in\nAnd I have the \"anonymous\" Role\nWhen I have a donut\nThen it should taste delicious.",
    owner: "Duncan",
    stageId: "BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBBB",
    order: 0,
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    title: "so regal",
    content: "Given I have logged in\nAnd I have the \"queen\" Role\nWhen I navigate to the home page\nThen I should see that my reign over England lasted from 1236 to 1272.",
    owner: "Eleanor",
    stageId: "CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC",
    order: 0,
  },
];

export const db = { stages, tasks };