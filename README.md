### Criteria ###

- ✅ Create a React app with Tailwind that simulates a very basic Kanban board
  - Next.js is a recommended "React app" framework
    https://react.dev/learn/creating-a-react-app
    - it IS React
    - it supports tailwind
    - it provides the wiring to rough-in a lightweight / "mock" / back-end API
      (API Routes: https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

- ✅ Implement drag-and-drop functionality using react-beautiful-dnd or dnd-kit.
  - will NOT be using react-beautiful-dnd since it's GitHub page says it is deprecated / unsupported and will be archived on GH on 30 April 2025, so..
  - this project uses dnd-kit!

- ✅ Form validation using zod for adding/editing tasks.
  - Planning to use shadcn/ui as UI component library
    - gives basic UI components (so I don't have to re-implement them) (including graphs!)
    - supports light/dark mode theming
    - works with Next.js & supports react-hook-form w/ Zod validation
      https://ui.shadcn.com/docs/components/form
    - the Dialog component is broken, updates are source-only (ugh) & it's too new for me to properly troubleshoot it
  - Moving over to using MUI instead!
    - works with react-hooks-form & zod too: https://www.youtube.com/watch?v=7anLE_RoDwU

- ✅ React Context API or Redux Toolkit (RTK)
  - Using "BoardContext" to propagate API-data (i.e. "tasks") throughout client-side
    component hierarchies _without_ having to resort to prop drilling

- ⚠️ -Use a mock backend (use whatever is easiest) with the following endpoints to interact with cards:
  - ✅ GET /tasks – Get all tasks.
  - [ ] POST /tasks – Add a task.
  - [ ] PUT /tasks/:id – Update a task.
  - [ ] DELETE /tasks/:id – Delete a task.

  - \* I'm using Next.js's API Routes to serve these since it's built-in / easy

- ⚠️ Bonus Points:
  - [ ] Create container builds for the frontend and backend
    - https://nextjs.org/docs/pages/api-reference/config/next-config-js/output#automatically-copying-traced-files
      (have to copy some files to make an "optimized" docker container!)
    - these should both _technically_ be servable from the same Next.js app, just using 
      separate instantiations (i.e. containers / pods)
  - [ ] Create a deployment for a generic K8s cluster (Kind or Docker Desktop for example)
    - planning to use K3d!
  
- ✅ Publish code to GitHub

&nbsp;

### Domain Model ###

#### v0 ####

- Board &mdash; The top-level container.

- Column &mdash; A sub-section of the Board representing the "stages" of a work process.

- Card &mdash; Represents a single work item; moves through the "stages" of a work process.


#### vNext (a.k.a. out-of-scope (for now)) ####

- Limit &mdash; Short for "work in progress (WIP) Limit", it represents the maximum number of Cards allowed in a given Column at any one time.

- Lane &mdash; (a.k.a. "Swim lane") A named, sub-grouping of the Cards on a Board; used to distinguish a selection of cards from the rest of the board (e.g. by team, class of service, urgency).