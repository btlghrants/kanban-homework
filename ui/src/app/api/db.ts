const tasks = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    owner: "Alice",
    content: "Given I have logged in\nAnd I have the \"admin\" Role\nWhen I navigate to the home page\nAnd I click the \"explode\" button\nThen the system should explode."
  },
  {
    id: "11111111-1111-1111-1111-111111111111",
    owner: "Bob",
    content: "Given I have logged in\nAnd I have the \"user\" Role\nWhen I navigate to the home page\nThen I should see that the \"explode\" button is disabled."
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    owner: "Charlie",
    content: "Given I have not logged in\nAnd I have the \"anonymous\" Role\nWhen I navigate to the home page\nThen I should not see the \"explode\" button."
  },
];

export default tasks;