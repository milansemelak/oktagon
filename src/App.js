import React, { useState, useRef, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import BrandEvaluator from './components/BrandEvaluator';
import EvaluationLoader from './components/EvaluationLoader';
import ResultPanel from './components/ResultPanel';
import { evaluate } from './components/scoringLogic';
import './App.css';

function App() {
  const [phase, setPhase] = useState('idle'); // idle | loading | result
  const [result, setResult] = useState(null);
  const [pendingData, setPendingData] = useState(null);
  const evaluatorRef = useRef(null);
  const resultRef = useRef(null);
  const loaderRef = useRef(null);

  const scrollToEvaluator = () => {
    evaluatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (data) => {
    setPendingData(data);
    setPhase('loading');
    setTimeout(() => {
      loaderRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleLoaderComplete = useCallback(() => {
    if (pendingData) {
      const res = evaluate(pendingData);
      setResult(res);
      setPhase('result');
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [pendingData]);

  const handleReset = () => {
    setResult(null);
    setPhase('idle');
    setTimeout(() => {
      evaluatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="app">
      <HeroSection onStart={scrollToEvaluator} />
      <div ref={evaluatorRef}>
        <BrandEvaluator onSubmit={handleSubmit} />
      </div>
      {phase === 'loading' && (
        <div ref={loaderRef}>
          <EvaluationLoader onComplete={handleLoaderComplete} />
        </div>
      )}
      {phase === 'result' && (
        <div ref={resultRef}>
          <ResultPanel result={result} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}

export default App;
