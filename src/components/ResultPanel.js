import React, { useState } from 'react';

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button className="copy-btn" onClick={handleCopy}>
      {copied ? 'COPIED' : (label || 'COPY')}
    </button>
  );
}

function ScoreBar({ label, score, level, comment, note }) {
  return (
    <div className="score-row">
      <div className="score-header">
        <span className="score-label">{label}</span>
        <span className={`score-badge ${level}`}>{score}/5</span>
      </div>
      <div className="score-track">
        <div className={`score-fill ${level}`} style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      {comment && <p className="score-comment">{comment}</p>}
      {note && <p className="score-note">{note}</p>}
    </div>
  );
}

export default function ResultPanel({ result, onReset }) {
  if (!result) return null;

  const {
    project, narrativeOptions, decision, decisionClass, reason,
    scores, feedback, changeNote, reality, input,
  } = result;

  const { options, selected, whyItWins } = narrativeOptions;

  const fullText = [
    `FYF ANALYSIS — ${project}`,
    ``,
    `DECISION: ${decision}`,
    `${reason}`,
    ``,
    `SELECTED NARRATIVE: ${selected.narrative}`,
    options.length > 1 ? `OPTIONS: ${options.map((o, i) => `${i + 1}. ${o.narrative}`).join(' | ')}` : '',
    ``,
    `01 — FIND THE FEAR (${scores.fear.score}/5): ${input.fear}`,
    `02 — MAKE THEM FACE IT (${scores.facing.score}/5): ${input.facing}`,
    `03 — UNLEASH THE WARRIOR (${scores.change.score}/5): ${input.change}`,
    changeNote ? `NOTE: ${changeNote}` : '',
    ``,
    `REALITY CHECK: ${reality.verdict}`,
    `${reality.explanation}`,
  ].filter(Boolean).join('\n');

  return (
    <section className="result" id="result">
      <div className="result-container">

        {/* === DECISION === */}
        <div className={`verdict-card ${decisionClass}`}>
          <div className="verdict-idea">{project}</div>
          <div className="verdict-label">DECISION</div>
          <div className="verdict-text">{decision}</div>
        </div>

        <div className="diagnosis-card">
          <p className="diagnosis-text">{reason}</p>
        </div>

        {/* === FYF NARRATIVES (3 options) === */}
        <div className="narrative-card">
          <h3 className="card-title">04 — FYF NARRATIVES</h3>
          <div className="narrative-options">
            {options.map((opt, i) => (
              <div
                className={`narrative-option ${opt.narrative === selected.narrative ? 'selected' : ''}`}
                key={i}
              >
                <span className="narrative-option-num">0{i + 1}</span>
                <span className="narrative-option-text">{opt.narrative}</span>
                {opt.narrative === selected.narrative && (
                  <span className="narrative-option-badge">STRONGEST</span>
                )}
              </div>
            ))}
          </div>
          <div className="narrative-why">
            <span className="narrative-why-label">WHY IT WINS:</span>
            <span className="narrative-why-text">{whyItWins}</span>
          </div>
        </div>

        {/* === PILLAR SCORES === */}
        <div className="scores-card">
          <h3 className="card-title">PILLAR SCORES</h3>
          <ScoreBar label="FIND THE FEAR" score={scores.fear.score} level={scores.fear.level} comment={feedback.fear.comment} />
          <ScoreBar label="MAKE THEM FACE IT" score={scores.facing.score} level={scores.facing.level} comment={feedback.facing.comment} />
          <ScoreBar label="UNLEASH THE WARRIOR" score={scores.change.score} level={scores.change.level} comment={feedback.change.comment} note={changeNote} />
        </div>

        {/* === WHAT YOU DESCRIBED === */}
        <div className="summary-card">
          <h3 className="card-title">WHAT YOU DESCRIBED</h3>
          <div className="summary-section">
            <span className="summary-label">THE FEAR:</span>
            <p className="summary-value">{input.fear}</p>
          </div>
          <div className="summary-section">
            <span className="summary-label">THE FACING:</span>
            <p className="summary-value">{input.facing}</p>
          </div>
          <div className="summary-section">
            <span className="summary-label">THE WARRIOR:</span>
            <p className="summary-value">{input.change}</p>
          </div>
        </div>

        {/* === REALITY CHECK === */}
        <div className={`reality-card ${reality.verdictClass}`}>
          <h3 className="card-title">REALITY CHECK</h3>
          <div className="reality-verdict-row">
            <span className={`reality-verdict ${reality.verdictClass}`}>{reality.verdict}</span>
            <span className="reality-explanation">{reality.explanation}</span>
          </div>
          {reality.issues.length > 0 && reality.verdict !== 'GROUNDED' && (
            <div className="reality-issues">
              {reality.issues.map((issue, i) => (
                <div className="reality-issue" key={i}>
                  <span className="reality-issue-icon">!</span>
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === HOW TO FIX === */}
        {(feedback.fear.fix || feedback.facing.fix || feedback.change.fix) && (
          <div className="fix-card">
            <h3 className="card-title">HOW TO FIX</h3>
            {feedback.fear.fix && (
              <div className="fix-item">
                <span className="fix-pillar">FIND THE FEAR</span>
                <p className="fix-instruction">{feedback.fear.fix}</p>
              </div>
            )}
            {feedback.facing.fix && (
              <div className="fix-item">
                <span className="fix-pillar">MAKE THEM FACE IT</span>
                <p className="fix-instruction">{feedback.facing.fix}</p>
              </div>
            )}
            {feedback.change.fix && (
              <div className="fix-item">
                <span className="fix-pillar">UNLEASH THE WARRIOR</span>
                <p className="fix-instruction">{feedback.change.fix}</p>
              </div>
            )}
          </div>
        )}

        {/* === COPY + RESET === */}
        <div className="action-row">
          <CopyButton text={fullText} label="COPY FULL ANALYSIS" />
          <button className="reset-btn" onClick={onReset}>
            TEST ANOTHER PROJECT
          </button>
        </div>
      </div>
    </section>
  );
}
