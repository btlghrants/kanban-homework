export interface Task {
  id: string;
  owner: string;
  content: string;
  column: number;
}

const tasks: Task[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    owner: "Alice",
    content: "Given I have logged in\nAnd I have the \"admin\" Role\nWhen I navigate to the home page\nAnd I click the \"explode\" button\nThen the system should explode.",
    column: 0,
  },
  {
    id: "11111111-1111-1111-1111-111111111111",
    owner: "Bob",
    content: "Given I have logged in\nAnd I have the \"user\" Role\nWhen I navigate to the home page\nThen I should see that the \"explode\" button is disabled.",
    column: 1,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    owner: "Charlie",
    content: "Given I have not logged in\nAnd I have the \"anonymous\" Role\nWhen I navigate to the home page\nThen I should not see the \"explode\" button.",
    column: 2,
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    owner: "Duncan",
    content: "Given I have not logged in\nAnd I have the \"anonymous\" Role\nWhen I have a donut\nThen it should taste delicious.",
    column: 2,
  },
];

export default tasks;