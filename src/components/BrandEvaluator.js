import React, { useState } from 'react';
import FearLibrary from './FearLibrary';

const DEMO = {
  project: 'OKTAGON GYM',
  fear: 'being the weakest person in the room and having no excuse left',
  facing: 'you walk into a real gym, stand in front of a bag, and box for 90 minutes — no hiding, no shortcuts',
  change: 'you stop negotiating with your own excuses and start showing up',
};

export default function BrandEvaluator({ onSubmit }) {
  const [project, setProject] = useState('');
  const [fear, setFear] = useState('');
  const [facing, setFacing] = useState('');
  const [change, setChange] = useState('');

  const handleFearSelect = (f) => setFear(f);

  const handleSubmit = () => {
    if (!project.trim()) return;
    onSubmit({ project: project.trim(), fear, facing, change });
  };

  const handleDemo = () => {
    setProject(DEMO.project);
    setFear(DEMO.fear);
    setFacing(DEMO.facing);
    setChange(DEMO.change);
  };

  return (
    <section className="evaluator" id="evaluator">
      <div className="cage-container">
        <div className="cage-border">
          <div className="cage-inner">
            <div className="cage-label">
              <img src="/okt-logo-yellow.png" alt="OKTAGON" className="cage-logo" />
              THE BRAND CAGE
            </div>

            <div className="input-group idea-input">
              <label className="input-label">PROJECT</label>
              <input
                type="text"
                className="field"
                placeholder="OKTAGON GYM, merch drop, documentary..."
                value={project}
                onChange={e => setProject(e.target.value)}
              />
              <button className="demo-btn" onClick={handleDemo} type="button">
                SEE EXAMPLE
              </button>
            </div>

            {/* 01 — FEAR */}
            <div className="input-group">
              <label className="input-label">
                <span className="q-number">01</span>
                FIND THE FEAR
              </label>
              <span className="input-helper">What is the real fear people would avoid?</span>
              <textarea
                className="field textarea"
                placeholder="being the weakest in the room..."
                value={fear}
                onChange={e => setFear(e.target.value)}
                rows={2}
              />
              <FearLibrary onSelect={handleFearSelect} />
            </div>

            {/* 02 — FACING MECHANISM */}
            <div className="input-group">
              <label className="input-label">
                <span className="q-number">02</span>
                MAKE THEM FACE IT
              </label>
              <span className="input-helper">How does the project force confrontation?</span>
              <textarea
                className="field textarea"
                placeholder="walk in and box for 90 minutes..."
                value={facing}
                onChange={e => setFacing(e.target.value)}
                rows={2}
              />
            </div>

            {/* 03 — CHANGE */}
            <div className="input-group">
              <label className="input-label">
                <span className="q-number">03</span>
                UNLEASH THE WARRIOR
              </label>
              <span className="input-helper">Who do they become? Before → After.</span>
              <textarea
                className="field textarea"
                placeholder="stops making excuses, starts showing up..."
                value={change}
                onChange={e => setChange(e.target.value)}
                rows={2}
              />
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={!project.trim()}
            >
              ENTER THE CAGE
            </button>
            {(project || fear || facing || change) && (
              <button
                className="clear-btn"
                onClick={() => { setProject(''); setFear(''); setFacing(''); setChange(''); }}
                type="button"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
