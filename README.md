TODOs:

- Create a React app with Tailwind that simulates a very basic Kanban board
  - Next.js is a recommended "React app" framework
    https://react.dev/learn/creating-a-react-app
    - it IS React
    - it supports tailwind
    - it provides the wiring to rough-in a lightweight / "mock" / back-end API
      (API Routes: https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

- Create small commits as you go:

- Implement drag-and-drop functionality using react-beautiful-dnd or dnd-kit.

- Form validation using zod for adding/editing tasks.

- React Context API or Redux Toolkit (RTK)
  - expect to use one of these to propagate API-data through client-side component
    hierarchies _without_ having to push props through components that don't care

- Use a mock backend (use whatever is easiest) with the following endpoints to interact with cards:
  - GET /tasks – Get all tasks.
  - POST /tasks – Add a task.
  - PUT /tasks/:id – Update a task.
  - DELETE /tasks/:id – Delete a task.
  - \* I'm planning to just use Next.js's API Routes to serve these endpoints

- Bonus Points:
  - Create container builds for the frontend and backend
    - https://nextjs.org/docs/pages/api-reference/config/next-config-js/output#automatically-copying-traced-files
      (have to copy some files to make an "optimized" docker container!)
    - these should both _technically_ be servable from the same Next.js app, just using 
      separate instantiations (i.e. containers / pods)
  - Create a deployment for a generic K8s cluster (Kind or Docker Desktop for example)
  
- Publish code to GitHub