import React, { useState } from 'react';
import { generateNarrativeOptions, generateNarrative, generateRewrite } from './scoringLogic';

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  };
  const fallbackCopy = (t) => {
    const ta = document.createElement('textarea');
    ta.value = t;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

function NarrativeSection({ initialOptions, project, fear, fearScore }) {
  const [narratives, setNarratives] = useState(initialOptions);

  const handleShuffle = () => {
    const primary = generateNarrative(project, fear, fearScore);
    const newOptions = generateNarrativeOptions(project, fear, primary, fearScore);
    setNarratives(newOptions);
  };

  const { options, selected, whyItWins } = narratives;

  return (
    <div className="narrative-section">
      <h3 className="card-title">FYF NARRATIVES</h3>

      {/* Selected / strongest */}
      <div className="narrative-selected">
        <span className="narrative-selected-label">STRONGEST</span>
        <p className="narrative-selected-text">{selected.narrative}</p>
        <p className="narrative-selected-why">{whyItWins}</p>
      </div>

      {/* Alternatives */}
      <div className="narrative-alts">
        {options.filter(o => o.narrative !== selected.narrative).map((opt, i) => (
          <span className="narrative-alt-chip" key={i}>{opt.narrative}</span>
        ))}
      </div>

      <button className="narrative-shuffle-btn" onClick={handleShuffle}>
        SHUFFLE NARRATIVES
      </button>
    </div>
  );
}

function RewriteSection({ project, fear, facing, change }) {
  const [rewrite, setRewrite] = useState(null);

  const handleRewrite = () => {
    setRewrite(generateRewrite(project, fear, facing, change));
  };

  if (!rewrite) {
    return (
      <button className="rewrite-trigger-btn" onClick={handleRewrite}>
        MAKE IT STRONGER
      </button>
    );
  }

  const rewriteText = [
    `STRONGER VERSION — ${project}`,
    ``,
    `INTENT: ${rewrite.intent}`,
    ``,
    `FEAR: ${rewrite.fear}`,
    `FACING MOMENT: ${rewrite.facingMoment}`,
    `FACING SYSTEM: ${rewrite.facingSystem}`,
    ``,
    `WARRIOR:`,
    `Before: ${rewrite.warrior.before}`,
    `After: ${rewrite.warrior.after}`,
    `Proof: ${rewrite.warrior.proof}`,
    ``,
    `VERDICT: ${rewrite.verdict}`,
    `${rewrite.verdictReason}`,
  ].join('\n');

  return (
    <div className="rewrite-result">
      <div className="rewrite-result-header">
        <h3 className="card-title">STRONGER VERSION</h3>
        <CopyButton text={rewriteText} label="COPY" />
      </div>

      <div className="rewrite-block">
        <span className="rewrite-label">INTENT</span>
        <p className="rewrite-value">{rewrite.intent}</p>
      </div>

      <div className="rewrite-block">
        <span className="rewrite-label">THE FEAR</span>
        <p className="rewrite-value rewrite-highlight">{rewrite.fear}</p>
      </div>

      <div className="rewrite-block">
        <span className="rewrite-label">FACING MOMENT</span>
        <p className="rewrite-value">{rewrite.facingMoment}</p>
      </div>

      <div className="rewrite-block">
        <span className="rewrite-label">THE FACING</span>
        <p className="rewrite-value">{rewrite.facingSystem}</p>
      </div>

      <div className="rewrite-block">
        <span className="rewrite-label">THE WARRIOR</span>
        <p className="rewrite-before-after"><strong>Before:</strong> {rewrite.warrior.before}</p>
        <p className="rewrite-before-after"><strong>After:</strong> {rewrite.warrior.after}</p>
        <p className="rewrite-before-after rewrite-proof"><strong>Proof:</strong> {rewrite.warrior.proof}</p>
      </div>

      <div className={`rewrite-verdict ${rewrite.verdict === 'WORKS' ? 'works' : rewrite.verdict === 'CLOSE' ? 'close' : 'broken'}`}>
        <span className="rewrite-verdict-label">{rewrite.verdict}</span>
        <span className="rewrite-verdict-reason">{rewrite.verdictReason}</span>
      </div>
    </div>
  );
}

export default function ResultPanel({ result, onReset }) {
  if (!result) return null;

  const {
    project, narrativeOptions, decision, decisionClass, reason,
    scores, feedback, changeNote, reality, input,
  } = result;

  const fullText = [
    `FYF ANALYSIS — ${project}`,
    ``,
    `DECISION: ${decision}`,
    `${reason}`,
    ``,
    `SELECTED NARRATIVE: ${narrativeOptions.selected.narrative}`,
    `OPTIONS: ${narrativeOptions.options.map((o, i) => `${i + 1}. ${o.narrative}`).join(' | ')}`,
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

        {/* === FYF NARRATIVES === */}
        <NarrativeSection
          initialOptions={narrativeOptions}
          project={project}
          fear={input.fear}
          fearScore={scores.fear.score}
        />

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

        {/* === MAKE IT STRONGER (FIX/KILL only) === */}
        {decision !== 'PUSH' && (
          <RewriteSection project={project} fear={input.fear} facing={input.facing} change={input.change} />
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
