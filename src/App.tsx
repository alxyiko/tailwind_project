import React from 'react'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          React + Tailwind is Working! 🎉
        </h1>
        <p className="text-gray-600">
          Your TypeScript React project is ready for GitHub
        </p>
      </div>
    </div>
  )
}

export default App