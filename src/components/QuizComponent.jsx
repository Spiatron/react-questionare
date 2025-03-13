import React, { useState, useEffect } from 'react';
import questions from './questions.json';
import ProgressBar from './ProgressBar'; 
import ScoreComponent from './ScoreComponent'; 

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    // Shuffle the options only once when the question changes
    const options = [
      ...questions[currentQuestion].incorrect_answers,
      questions[currentQuestion].correct_answer,
    ];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
  }, [currentQuestion]);

  const handleAnswerOptionClick = (answerOption) => {
    const correct = answerOption === questions[currentQuestion].correct_answer;
    setSelectedOption(answerOption);
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const decodeUrlEncodedString = (str) => {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  };

  const renderStars = (difficulty) => {
    let stars = [];
    let starCount = 1; // Default for easy
    if (difficulty === 'medium') starCount = 2;
    if (difficulty === 'hard') starCount = 3;

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < starCount ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Calculate scores
  const totalAnswered = correctAnswers + incorrectAnswers;
  const currentScore = totalAnswered === 0 ? 0 : (correctAnswers / totalAnswered) * 100;
  const lowestPossibleScore = (correctAnswers / questions.length) * 100;
  const maximumPossibleScore = ((correctAnswers + (questions.length - totalAnswered)) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-6">
          <ProgressBar progress={progress} />
        </div>
        <div className="text-gray-700 font-semibold mb-2">
          Question {currentQuestion + 1}/{questions.length}
        </div>
        <div className="text-gray-500 text-sm mb-2">
          {decodeUrlEncodedString(questions[currentQuestion].category)}
        </div>
        <div className="text-yellow-400 text-sm mb-4">
          {renderStars(questions[currentQuestion].difficulty)}
        </div>
        <div className="text-xl font-bold mb-6">
          {decodeUrlEncodedString(questions[currentQuestion].question)}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {shuffledOptions.map((answerOption, index) => (
            <button
              key={index}
              onClick={() => handleAnswerOptionClick(answerOption)}
              className={`p-4 rounded-lg text-white font-semibold ${
                selectedOption === answerOption
                  ? 'bg-black'
                  : 'bg-blue-500 hover:bg-blue-600'
              } transition duration-300`}
              disabled={selectedOption !== null}
            >
              {decodeUrlEncodedString(answerOption)}
            </button>
          ))}
        </div>
        {selectedOption !== null && (
          <div className="text-center">
            <div className={`text-lg font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </div>
            <button
              onClick={handleNextQuestion}
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Next Question
            </button>
          </div>
        )}
        <ScoreComponent
          currentScore={currentScore}
          lowestPossibleScore={lowestPossibleScore}
          maximumPossibleScore={maximumPossibleScore}
        />
      </div>
    </div>
  );
};

export default QuizComponent;