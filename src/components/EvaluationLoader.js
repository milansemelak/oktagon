import React, { useEffect, useState } from 'react';

const MESSAGES = [
  'Entering the cage...',
  'Testing your project...',
  'Running FYF analysis...',
];

export default function EvaluationLoader({ onComplete }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setMsgIndex(1), 600);
    const timer2 = setTimeout(() => setMsgIndex(2), 1200);
    const timer3 = setTimeout(() => onComplete(), 1800);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, [onComplete]);

  return (
    <section className="loader-section">
      <div className="loader-container">
        <div className="loader-ring">
          <div className="loader-ring-inner" />
        </div>
        <p className="loader-text">{MESSAGES[msgIndex]}</p>
      </div>
    </section>
  );
}
