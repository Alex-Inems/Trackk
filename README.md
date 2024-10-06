
# TrackMe

**TrackMe** is a simple budget-tracking application that allows users to manage their transactions and convert currencies based on their preferences. Built with Next.js, TypeScript, and Redux, TrackMe provides a seamless experience for budgeting and currency conversion using Firebase for authentication and a currency conversion API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Currency Conversion](#currency-conversion)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Sign up and log in using Firebase.
- **Budget Tracking**: Users can add and manage their transactions, including income and expenses.
- **Currency Conversion**: Convert transaction amounts into different currencies based on user preferences using a currency conversion API.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Next.js**: React framework for server-side rendering and optimized performance.
- **Redux**: State management for handling user authentication and transaction data.
- **TypeScript**: Superset of JavaScript for static typing and better code maintainability.
- **Tailwind CSS**: Utility-first CSS framework for responsive and flexible styling.
- **Firebase**: Handles user authentication and database for storing transaction data.
- **Currency Conversion API**: Fetches real-time exchange rates based on user preferences.

## Getting Started

### Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Git](https://git-scm.com/)
- A Firebase account for authentication setup.

### Installation

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/your-username/TrackMe.git
   cd TrackMe
   \`\`\`

2. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   
   Create a `.env.local` file in the root directory and configure your Firebase and Currency API credentials:

   \`\`\`bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
   NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your-exchange-rate-api-key
   \`\`\`

4. Run the development server:

   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

- **Home Page**: Displays a list of transactions.
- **Add Transactions**: Users can add new transactions for income or expenses.
- **Currency Preference**: Users can set a preferred currency, and transaction values will be converted accordingly.

## State Management

TrackMe uses **Redux** to handle state management:

- **Auth State**: Manages the user’s sign-in state using Firebase.
- **Transaction State**: Stores and updates the user’s transaction data.
- **Currency State**: Handles currency preferences and fetches exchange rates from the API.

## Authentication

TrackMe uses **Firebase Authentication** for user sign-up and sign-in. Firebase manages user sessions, and users must be logged in to add or view their transactions.

## Currency Conversion

TrackMe provides real-time currency conversion using a **Currency Conversion API**. Users can select their preferred currency, and all transactions are automatically converted based on the latest exchange rates.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

Please ensure your code follows TypeScript and ESLint rules.

## License

This project is licensed under the MIT License.
