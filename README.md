## How to ##

### Workstation expectations ###

- Ubuntu
- docker (with compose)
- VS Code, with following extensions:
  - Dev Containers (ms-vscode-remote.remote-containers)
  - Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- jq
- k3d


&nbsp;

### Develop ###

1. Navigate to project root.

1. Run the [Dev Container](https://code.visualstudio.com/docs/devcontainers/containers):
    - Press F1 to open the Command Palette
    - Select the option "Dev Containers: (Re-)build and (Re-)open in Container"
    - Wait while the dev container builds & starts
    - Watch for the IDE to close the "local" project and (re-)open it inside the new dev container

1. From the conneted IDE's terminal (the one showing a prompt like `kbh@dev:/code$`):
    ```
    cd kbh        # to enter the app directory
    npm ci        # to install NPM dependencies
    npm run dev   # to run the app in dev mode

    <Ctrl+C>      # to stop the running app
    ```

1. Navigate a browser to `http://localhost:3000` (or whatever [.env.development](./kbh/.env.development) defines) to see a hot-reloading, dev version of the app!

1. When you're done, stop the [Dev Container](https://code.visualstudio.com/docs/devcontainers/containers):
    - Press F1 to open the Command Palette
    - Select the option "Dev Containers: Reopen Folder Locally"
    - Watch for the IDE to close the in-container project and reopen locally


&nbsp;

### Build the app images ###

1. From the project root, run:
    ```
    deployables/build.sh
    ```


&nbsp;

### Run the app images (in k3d) ###

1. From the project root, run:
    ```
    deployables/up_k3d.sh
    ```

1. See the running app by navigating a browser to: `TBD`

1. Cleanup the k3d cluster with:
    ```
    deployables/down_k3d.sh
    ```

&nbsp;

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

- ⚠️ Use a mock backend (use whatever is easiest) with the following endpoints to interact with cards:
  - ✅ GET /tasks – Get all tasks.
  - ✅ POST /tasks – Add a task.
  - ✅ PUT /tasks/:id – Update a task.
  - ✅ DELETE /tasks/:id – Delete a task.

    - I'm using Next.js's API Routes to serve these since it's built-in / easy
    - So, to sync client-side, API-derived state with the backend I'm planning to try:
      - Next.js's server-side data proc'ing
        - I'd probably want to add stuff like an ORM + React-Query for client-side API interaction too (if I were building something more).
          https://tkdodo.eu/blog/why-you-want-react-query

- ⚠️ Bonus Points:
  - ✅ Create container builds for the frontend and backend
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