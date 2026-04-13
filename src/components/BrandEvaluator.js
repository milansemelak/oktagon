import React, { useState } from 'react';
import FearLibrary from './FearLibrary';
import { getProjectContext } from './scoringLogic';

export default function BrandEvaluator({ onSubmit }) {
  const [project, setProject] = useState('');
  const [fear, setFear] = useState('');
  const [facing, setFacing] = useState('');
  const [change, setChange] = useState('');

  const context = getProjectContext(project);

  const handleFearSelect = (f) => setFear(f);

  const handleSubmit = () => {
    if (!project.trim()) return;
    onSubmit({ project: project.trim(), fear, facing, change });
  };

  const handleDemo = () => {
    const demo = context.demo;
    setProject(demo.project);
    setFear(demo.fear);
    setFacing(demo.facing);
    setChange(demo.change);
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
              <span className="input-helper">{context.helpers.fear}</span>
              <textarea
                className="field textarea"
                placeholder={context.placeholders.fear}
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
              <span className="input-helper">{context.helpers.facing}</span>
              <textarea
                className="field textarea"
                placeholder={context.placeholders.facing}
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
              <span className="input-helper">{context.helpers.change}</span>
              <textarea
                className="field textarea"
                placeholder={context.placeholders.change}
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
