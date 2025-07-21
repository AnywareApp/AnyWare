---
description: 'Description of the custom chat mode.'
tools: []
---
Instructions for Copilot (VS Code) - Building a Model React JS App
These instructions guide Copilot in generating a well-structured and maintainable React JS application. Focus on modern React practices, clean code, and a scalable architecture.

Note to Copilot: The prompts in each phase below are designed to be user-friendly for someone who is new to software development. Please interpret them with a focus on delivering the core functionality and architectural principles outlined in this document, even if the phrasing is less technical. Your goal is to translate these beginner-friendly requests into robust, well-structured code.

Architecture Principles

To ensure a robust, scalable, and maintainable React application, the following architectural principles should be adhered to throughout the development process:

Modularity & Reusability:

Single Responsibility Principle (SRP): Each component, hook, or utility function should have one clear, well-defined purpose.

DRY (Don't Repeat Yourself): Avoid duplicating code. Abstract common logic into reusable components, hooks, or utility functions.

Loose Coupling: Components should be as independent as possible, communicating via props or context rather than direct manipulation of other components' internals.

Unidirectional Data Flow:

Data flows down from parent components to child components via props.

State updates flow up from child components to parent components via callback functions passed as props. This makes data flow predictable and debugging easier.

Separation of Concerns:

UI Components vs. Logic: Distinguish between "presentational" (dumb) components that focus solely on rendering UI and "container" (smart) components that manage state and logic.

Data Fetching: Isolate data fetching logic in services or custom hooks.

Business Logic: Keep complex business logic out of components and encapsulate it in dedicated utility functions or services.

Immutability:

Always update state immutably. When modifying arrays or objects, create new instances rather than directly mutating the existing ones (e.g., using spread syntax ... or map, filter). This prevents unexpected side effects and optimizes React's rendering performance.

Performance Considerations:

Memoization: Use React.memo, useMemo, and useCallback where appropriate to prevent unnecessary re-renders of components and expensive computations.

Lazy Loading (Conceptual): For larger applications, consider explaining the concept of lazy loading components with React.lazy and Suspense to improve initial load times (no need to implement for this small app).

Testability:

Design components and functions to be easily testable in isolation. Pure functions and components with clear props are inherently more testable.

Accessibility (A11y):

Always consider accessibility. Use semantic HTML, provide appropriate ARIA attributes, ensure keyboard navigation, and maintain sufficient color contrast.

Visual Design & User Experience (UX):

Material Design 3 (M3) Principles: Apply Material Design 3 principles for a modern, intuitive, and adaptable user interface. This includes emphasizing dynamic color (where applicable, though full dynamic color might be beyond basic Tailwind), expressive layouts, and accessible components. Aim for a clean, spacious, and responsive design with clear visual hierarchy.

Modern Color Palette: Utilize a contemporary and cohesive color palette. Prioritize soft, muted tones combined with vibrant accents to create a pleasant and accessible user experience. Ensure good contrast for readability. Use Tailwind's default color palette effectively, or define custom colors in tailwind.config.js if a specific modern palette is desired (e.g., pastels, earth tones, or a specific brand palette).

Typography: Ensure legible and harmonious typography. Use a clean sans-serif font (like Inter, which is commonly used with Tailwind) and establish a clear typographic scale for headings, body text, and smaller elements.

Rounded Corners & Shadows: Apply subtle rounded corners to elements and use appropriate shadows to convey depth and hierarchy, consistent with modern UI trends.

Data Persistence (Cloud Firestore):

Real-time Data: Use Cloud Firestore for real-time, persistent storage of application data.

Authentication: Integrate Firebase Authentication for user management, starting with anonymous sign-in for simplicity, but ensuring the structure allows for future expansion (e.g., email/password, Google sign-in).

Data Structure: Organize data in Firestore collections and documents logically (e.g., a 'tasks' collection).

Security Rules (Conceptual): Understand that proper Firestore security rules are crucial for protecting data, especially in multi-user scenarios. For this app, store data in the public collection path /artifacts/{appId}/public/data/{your_collection_name}.

Folder Structure (Detailed)

The following detailed folder structure promotes organization, scalability, and maintainability for a React application:

MyReactApp/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── assets/             # Static assets like images, icons, fonts (if not external)
│   │   ├── images/
│   │   └── icons/
│   ├── components/         # Reusable UI components (e.g., Button, Modal, Card)
│   │   ├── Button.jsx
│   │   ├── TaskCard.jsx
│   │   └── ...
│   ├── contexts/           # React Context API providers (if used for global state)
│   │   └── AuthContext.jsx
│   ├── hooks/              # Custom React Hooks (e.g., useAuth, useTasks, useDebounce)
│   │   └── useTasks.js
│   ├── pages/              # Top-level components representing distinct views/routes (e.g., Dashboard, About, Settings)
│   │   ├── Dashboard.jsx
│   │   ├── About.jsx
│   │   └── ...
│   ├── services/           # Logic for interacting with APIs or external services (e.g., api.js, authService.js)
│   │   └── firebase.js     # Firebase initialization and common Firestore/Auth functions
│   ├── utils/              # Pure utility functions (e.g., formatters, validators, helper functions)
│   │   └── formatDate.js
│   ├── App.jsx             # Main application component, often handles routing
│   ├── main.jsx            # Entry point for React DOM rendering
│   └── index.css           # Global styles, Tailwind CSS imports
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── postcss.config.js       # Tailwind CSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite configuration

Phase 1: Project Setup and Core Structure

Prompt: "Let's start by setting up our project. Please create a new React application using Vite, and let's call it 'MyReactApp'. Inside the main 'src' folder, organize everything into separate folders for 'components' (for small reusable parts), 'pages' (for full screens), 'services' (for talking to outside systems), 'utils' (for helpful tools), and 'hooks' (for special React logic). Also, set up Tailwind CSS so we can easily style our app. Finally, let's prepare our app to connect to a database called Cloud Firestore, which will help us save our data online."

Copilot's Focus:

Vite Setup: Use npm create vite@latest or equivalent.

Directory Structure: Ensure the specified directories are present within src as detailed above.

Tailwind CSS Integration: Correctly install and configure Tailwind CSS (postcss.config.js, tailwind.config.js, and import in index.css).

Firebase Installation: Install the Firebase SDK: npm install firebase.

Firebase Initialization (Conceptual): Explain that Firebase will be initialized in src/services/firebase.js (or directly in main.jsx for simplicity, but services is preferred for larger apps). Mention the use of global variables __app_id, __firebase_config, and __initial_auth_token for setup.

Initial Files:

src/App.jsx: A basic functional component.

src/main.jsx: Entry point for React.

src/index.css: Tailwind base imports.

src/services/firebase.js: (Or equivalent) for Firebase initialization.

Phase 2: Component Architecture

Prompt: "Now, let's build the main screen of our app, which we'll call the 'Dashboard'. It should show a friendly welcome message and a list of 'Tasks' that need to be done. For this, create two reusable building blocks: a 'Button' that we can use anywhere, and a 'TaskCard' that will display each task. The 'TaskCard' should show the task's name and have a button to mark it as 'Done'. Make sure these building blocks are flexible and can receive information (like task details or what to do when clicked) from the 'Dashboard' screen. Pay attention to making them look modern and clean, using a pleasant color scheme and smooth shapes."

Copilot's Focus:

src/pages/Dashboard.jsx:

Displays a greeting.

Renders a list of TaskCard components.

Initially uses dummy data for tasks, but will later fetch from Firestore.

src/components/Button.jsx:

Functional component.

Accepts onClick, children (for text), and className props.

Basic Tailwind styling for a button, applying modern aesthetics (e.g., rounded corners, subtle shadows, pleasant background/text colors from a modern palette).

src/components/TaskCard.jsx:

Functional component.

Accepts task object (e.g., { id, title, completed }) and onComplete function as props.

Displays task title.

Includes a Button (Mark Complete).

Applies conditional Tailwind styling based on completed status, reflecting modern design principles (e.g., a card-like appearance with rounded corners, subtle background/border, and clear visual state for completed tasks).

Styling: Use Tailwind CSS for all component styling, adhering to the Material Design 3 principles and modern color palette outlined in the Architecture Principles.

Phase 3: State Management and Data Flow

Prompt: "Let's make our 'Tasks' interactive. On the 'Dashboard' screen, we need to keep track of all the tasks. When someone clicks the 'Done' button on a 'TaskCard', the app should update that specific task's status to 'completed'. Make sure the 'Dashboard' can tell the 'TaskCard' what to do when its button is clicked, and the 'TaskCard' should then tell the 'Dashboard' which task was completed."

Copilot's Focus:

src/pages/Dashboard.jsx:

useState to manage tasks array.

A function handleCompleteTask that takes a taskId and updates the tasks state immutably.

Pass handleCompleteTask down to TaskCard via props.

src/components/TaskCard.jsx:

Call onComplete(task.id) when its button is clicked.

Phase 4: Custom Hooks and Utility Functions

Prompt: "To keep our code clean, let's put all the logic for managing tasks (like getting tasks, adding new ones, or updating them) into a special reusable piece of code called a 'custom hook'. Let's name this hook useTasks. This time, useTasks should connect to our Cloud Firestore database to store and retrieve tasks in real-time. It should also handle signing in a user anonymously so they can access their tasks. Also, create a separate helpful function in a 'utils' folder called formatDate that can take a date and make it look nice and readable, like '07/21/2025'."

Copilot's Focus:

src/hooks/useTasks.js:

A custom hook that encapsulates task state and logic.

Firebase Imports: Import necessary Firebase functions: initializeApp, getFirestore, getAuth, signInAnonymously, onAuthStateChanged, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc.

Firebase Initialization & Auth:

Initialize Firebase app and Firestore database using __firebase_config.

Get the Auth instance.

Implement useEffect to handle initial authentication: signInWithCustomToken(auth, __initial_auth_token) if __initial_auth_token is defined, otherwise signInAnonymously(auth).

Use onAuthStateChanged to get the userId (from auth.currentUser?.uid or crypto.randomUUID() for unauthenticated users) and set a state variable to indicate authentication readiness.

Firestore Operations:

Use onSnapshot on the Firestore collection to listen for real-time updates to tasks. The collection path MUST be /artifacts/${appId}/public/data/tasks, where appId is derived from __app_id.

Implement addTask(title): Uses addDoc to add a new task to Firestore.

Implement toggleTaskCompletion(taskId, currentStatus): Uses updateDoc to change the completed status of a task in Firestore.

Implement deleteTask(taskId): Uses deleteDoc to remove a task from Firestore.

Returns the tasks, addTask, toggleTaskCompletion, deleteTask, and the userId.

src/utils/formatDate.js:

A pure function that takes a Date object and returns a formatted string.

Integration:

Dashboard.jsx should now use useTasks to manage its task data, including displaying the userId prominently on the UI (as required for multi-user apps).

Phase 5: Basic Routing (React Router DOM)

Prompt: "Our app needs to have different screens that users can navigate between. Let's add a way to switch between our 'Dashboard' screen and a new 'About' screen. The main App.jsx file should handle this navigation. Also, add a simple menu bar at the top of the app with links that take users to the 'Dashboard' and 'About' pages. Make sure this menu bar looks modern and fits with the overall design."

Copilot's Focus:

Installation: npm install react-router-dom.

src/App.jsx:

Use BrowserRouter, Routes, and Route.

Define routes for / (Dashboard) and /about.

Create a simple src/pages/About.jsx component.

Implement a <nav> element with Link components.

Styling: Use Tailwind for navigation bar styling, applying Material Design 3 principles and the modern color palette for a clean, intuitive navigation experience.

Phase 6: Code Quality and Best Practices

General Instructions for all phases:

Functional Components & Hooks: Always prefer functional components and React Hooks. Avoid class components.

Prop Types/TypeScript (Optional but Recommended): If not explicitly using TypeScript, consider adding prop-types for component props validation. (Copilot should suggest this if not explicitly disabled).

Immutability: Ensure all state updates are immutable (e.g., using spread operator for arrays/objects).

Meaningful Names: Use clear and descriptive names for variables, functions, and components.

Modularity: Keep components small, focused, and reusable.

Error Boundaries (Conceptual): Explain the concept of error boundaries and suggest where they might be used in a larger app (no need to implement for this small app).

Accessibility (A11y): Briefly mention accessibility considerations (e.g., semantic HTML, ARIA attributes).

Comments: Add concise, meaningful comments where logic is complex or non-obvious.

File Naming: Use PascalCase for components (MyComponent.jsx) and camelCase for hooks/utils (useMyHook.js, myUtility.js).

ESLint/Prettier: Assume ESLint and Prettier are configured for consistent code style.

Visual Consistency: Throughout the application, maintain visual consistency by applying the Material Design 3 principles, modern color palette, typography, rounded corners, and subtle shadows as defined in the Architecture Principles.

Firestore Specifics:

Real-time Updates: Always use onSnapshot() listeners for real-time data synchronization with Firestore.

Authentication Dependency: Ensure all Firestore operations are performed only after Firebase authentication has completed and the userId is available.

User ID Display: For multi-user applications, it is MANDATORY to display the complete userId string prominently on the main UI.

No orderBy(): Avoid using orderBy() in Firestore queries to prevent potential index issues; sort data in memory using JavaScript if necessary.

No alert()/confirm(): Never use browser alert() or confirm() dialogs. Implement custom modal UIs for user interactions.

Data Sanitization: Ensure string and object data being saved/loaded from Firestore is properly sanitized and formatted.

No Early Returns: Avoid early returns in critical logic paths that might prevent the app from functioning correctly; use console error messages instead.

By following these instructions, Copilot should generate a robust, well-organized, and easily extensible React application with a modern and user-friendly visual interface, backed by Cloud Firestore for data persistence.

