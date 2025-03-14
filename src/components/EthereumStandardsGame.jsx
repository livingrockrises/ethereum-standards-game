import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, X, Award, RefreshCcw } from 'lucide-react';

const EthereumStandardsGame = () => {
  // Database of ERC/EIP standards with descriptions, keywords, and categories
  const standardsDatabase = [
    {
      number: "4337",
      type: "EIP",
      title: "Account Abstraction via Entry Point Contract",
      description: "Introduces account abstraction to Ethereum without requiring consensus-layer changes, using a special entry point contract.",
      keywords: ["account abstraction", "smart contract wallets", "entry point", "user operation", "bundler"],
      category: "Account Abstraction"
    },
    {
      number: "2771",
      type: "ERC",
      title: "Secure Protocol for Native Meta Transactions",
      description: "Standardizes a way for contracts to accept meta-transactions through trusted forwarders.",
      keywords: ["meta transactions", "gas station network", "forwarder", "gasless transactions"],
      category: "Account Abstraction"
    },
    {
      number: "1271",
      type: "ERC",
      title: "Standard Signature Validation Method for Contracts",
      description: "Allows smart contracts to verify signatures on behalf of themselves.",
      keywords: ["signature validation", "contract signatures", "is valid signature"],
      category: "Account Abstraction"
    },
    {
      number: "7642",
      type: "EIP",
      title: "Account Abstraction using Alt Mempools",
      description: "An alternative approach to account abstraction using a separate mempool for user operations.",
      keywords: ["alt mempool", "account abstraction", "user operation", "bundler"],
      category: "Account Abstraction"
    },
    {
      number: "6963",
      type: "ERC",
      title: "Multi-Owner Contract Account Standard",
      description: "A standard for smart contract wallets that can have multiple owners and defines a common interface.",
      keywords: ["multi-owner", "smart account", "wallet", "contract account"],
      category: "Account Abstraction"
    },
    {
      number: "6900",
      type: "EIP",
      title: "Modular Account Standard",
      description: "A standard for modular smart contract accounts that can be extended with plugins.",
      keywords: ["modular", "account", "plugin", "validator", "executor"],
      category: "Account Abstraction"
    },
    {
      number: "20",
      type: "ERC",
      title: "Token Standard",
      description: "The standard interface for fungible tokens, like voting tokens, staking tokens or virtual currencies.",
      keywords: ["fungible token", "token", "transfer", "balance", "allowance"],
      category: "Token Standards"
    },
    {
      number: "721",
      type: "ERC",
      title: "Non-Fungible Token Standard",
      description: "A standard interface for non-fungible tokens, like a deed for artwork or a song.",
      keywords: ["non-fungible token", "NFT", "unique", "collectible", "ownership"],
      category: "Token Standards"
    },
    {
      number: "1155",
      type: "ERC",
      title: "Multi Token Standard",
      description: "A standard interface for contracts that manage multiple token types, both fungible and non-fungible.",
      keywords: ["multi token", "batch transfer", "fungible", "non-fungible", "semi-fungible"],
      category: "Token Standards"
    },
    {
      number: "4626",
      type: "ERC",
      title: "Tokenized Vault Standard",
      description: "A standard for yield-bearing vaults that issue shares as ERC-20 tokens.",
      keywords: ["vault", "yield", "deposit", "withdraw", "tokenized position"],
      category: "DeFi Standards"
    },
    {
      number: "165",
      type: "ERC",
      title: "Standard Interface Detection",
      description: "Creates a standard method to publish and detect what interfaces a smart contract implements.",
      keywords: ["interface", "detection", "supports interface", "contract capabilities"],
      category: "Contract Standards"
    },
    {
      number: "6551",
      type: "ERC",
      title: "Non-fungible Token Bound Accounts",
      description: "A standard for giving NFTs their own smart contract accounts, allowing them to own assets and interact with applications.",
      keywords: ["token bound account", "NFT", "account", "smart wallet", "TBA"],
      category: "Account Abstraction"
    },
    {
      number: "2612",
      type: "ERC",
      title: "Permit Extension for ERC-20",
      description: "Extends ERC-20 with a permit function for gasless approvals using signatures.",
      keywords: ["permit", "gasless approval", "signature", "ERC-20 extension"],
      category: "Token Standards"
    },
    {
      number: "5564",
      type: "EIP",
      title: "Stealth Addresses for ERC-721 NFTs",
      description: "Enables stealth transfers for NFTs to enhance privacy.",
      keywords: ["stealth address", "privacy", "NFT", "anonymous"],
      category: "Privacy"
    },
    {
      number: "3074",
      type: "EIP",
      title: "Auth and Sponsoring Transactions",
      description: "Introduces a new opcode to enable sponsored transactions and account abstraction.",
      keywords: ["AUTH", "AUTHCALL", "sponsored transaction", "sponsorship", "relayer"],
      category: "Account Abstraction"
    },
    {
      number: "5792",
      type: "EIP",
      title: "Wallet Connection Standard",
      description: "Standardizes the way wallets connect to dApps, enhancing interoperability and user experience.",
      keywords: ["wallet connect", "dApp", "connection", "interface"],
      category: "Wallet Standards"
    }
  ];

  // Game state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [gameMode, setGameMode] = useState('description'); // 'description', 'keywords', or 'reverse'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [remainingStandards, setRemainingStandards] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // Extract unique categories from the database
  const categories = ['All', ...Array.from(new Set(standardsDatabase.map(item => item.category)))];

  // Initialize or reset the game
  const initializeGame = () => {
    const filtered = categoryFilter === 'All' 
      ? [...standardsDatabase] 
      : standardsDatabase.filter(std => std.category === categoryFilter);
    
    setRemainingStandards(filtered);
    setQuestionsAsked(0);
    setScore(0);
    setGameResult(null);
    setShowAnswer(false);
    nextQuestion();
  };

  // Get the next question
  const nextQuestion = () => {
    if (remainingStandards.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingStandards.length);
    const selected = remainingStandards[randomIndex];
    
    // Remove the selected standard from remaining pool
    setRemainingStandards(prev => prev.filter((_, idx) => idx !== randomIndex));
    
    setCurrentQuestion(selected);
    setUserAnswer('');
    setGameResult(null);
    setShowAnswer(false);
  };

  // Check the user's answer
  const checkAnswer = () => {
    if (!currentQuestion) return;
    
    const isCorrect = userAnswer.trim() === currentQuestion.number;
    setGameResult(isCorrect);
    setQuestionsAsked(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowAnswer(true);
  };

  // Skip the current question
  const skipQuestion = () => {
    setGameResult(false);
    setQuestionsAsked(prev => prev + 1);
    setShowAnswer(true);
  };

  // Handle the next question or finish the game
  const handleNextQuestion = () => {
    if (remainingStandards.length === 0) {
      setCurrentQuestion(null);
    } else {
      nextQuestion();
    }
  };

  // Initialize the game when component mounts or when filters change
  useEffect(() => {
    initializeGame();
  }, [gameMode, categoryFilter]);

  // Format the question based on the game mode
  const formatQuestion = () => {
    if (!currentQuestion) return '';

    switch (gameMode) {
      case 'description':
        return `"${currentQuestion.title}": ${currentQuestion.description}`;
      case 'keywords':
        return currentQuestion.keywords.join(', ');
      case 'reverse':
        return `${currentQuestion.type}-${currentQuestion.number}`;
      default:
        return '';
    }
  };

  // Format the expected answer based on the game mode
  const formatExpectedAnswer = () => {
    if (!currentQuestion) return '';

    switch (gameMode) {
      case 'description':
      case 'keywords':
        return `${currentQuestion.type}-${currentQuestion.number}`;
      case 'reverse':
        return `${currentQuestion.title}`;
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Ethereum Standards Guessing Game</h1>
        <p className="text-gray-600">Test your knowledge of ERCs and EIPs in the Ethereum ecosystem!</p>
      </header>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">Game Mode</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
          >
            <option value="description">Guess the ERC/EIP number from description</option>
            <option value="keywords">Guess the ERC/EIP number from keywords</option>
            <option value="reverse">Guess the title from ERC/EIP number</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Filter</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md flex-1 mb-6">
        {currentQuestion ? (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {gameMode === 'reverse' ? 'What is this standard about?' : 'Which ERC/EIP standard is this?'}
              </h2>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-gray-700">{formatQuestion()}</p>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                {gameMode === 'reverse' ? 'Enter the title of this standard:' : 'Enter the number (digits only):'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="answer"
                  className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={gameMode === 'reverse' ? "e.g. Token Standard" : "e.g. 721"}
                  disabled={showAnswer}
                />
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim() || showAnswer}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  <Check size={20} />
                </button>
              </div>
            </div>

            {showAnswer && (
              <div className={`p-4 rounded-md mb-6 ${gameResult ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p className="font-medium">
                  {gameResult ? 'Correct!' : 'Incorrect!'} The answer is: {formatExpectedAnswer()}
                </p>
                <p className="mt-2">
                  <strong>{currentQuestion.type}-{currentQuestion.number}:</strong> {currentQuestion.title}
                </p>
                <p className="mt-1">
                  {currentQuestion.description}
                </p>
                <p className="mt-1">
                  <strong>Keywords:</strong> {currentQuestion.keywords.join(', ')}
                </p>
                <p className="mt-1">
                  <strong>Category:</strong> {currentQuestion.category}
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={skipQuestion}
                disabled={showAnswer}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400"
              >
                Skip Question
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={!showAnswer}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 flex items-center gap-2"
              >
                Next Question <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <p className="text-xl mb-6">Your score: {score} / {questionsAsked}</p>
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2 mx-auto"
            >
              <RefreshCcw size={20} /> Play Again
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Award size={24} className="text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">Your Score</h2>
        </div>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-gray-600">Correct</p>
            <p className="text-2xl font-bold text-green-600">{score}</p>
          </div>
          <div>
            <p className="text-gray-600">Answered</p>
            <p className="text-2xl font-bold text-indigo-600">{questionsAsked}</p>
          </div>
          <div>
            <p className="text-gray-600">Remaining</p>
            <p className="text-2xl font-bold text-gray-600">{remainingStandards.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthereumStandardsGame;