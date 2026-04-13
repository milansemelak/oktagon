// ============================================================
// FACE YOUR FEAR — FYF Brand Strategist Engine
// Framework: FEAR × FACING MECHANISM × CHANGE = FYF ALIGNED
// Decisions: PUSH / FIX / KILL
// ============================================================

// --- FEAR keyword banks ---

const FEAR_STRONG = [
  'humiliation', 'humiliated', 'exposed', 'judged', 'rejected', 'alone',
  'not enough', 'not good enough', 'weak', 'weakest', 'fraud', 'fake',
  'shame', 'ashamed', 'failure', 'failing', 'losing', 'lost',
  'public', 'publicly', 'in front of', 'everyone watching',
  'being seen', 'being found out', 'being called out',
  'no excuse', 'nowhere to hide', 'can\'t hide', 'no way out',
  'pain', 'hurt', 'broken', 'breaking', 'quitting', 'giving up',
  'proving wrong', 'letting down', 'disappointing',
  'irrelevant', 'forgotten', 'invisible', 'ordinary',
  'silent', 'silence', 'confronting', 'admitting',
  'truth', 'the truth', 'reality', 'mirror',
  'lazy', 'excuses', 'comfort', 'soft', 'coward',
  'imposter', 'not belonging', 'out of place',
];

const FEAR_WEAK = [
  'challenge', 'opportunity', 'competition', 'market', 'trend',
  'brand', 'audience', 'content', 'engagement', 'reach',
  'motivation', 'inspiration', 'energy', 'vibe', 'greatness',
  'success', 'excellence', 'potential', 'power', 'glory',
  'style', 'aesthetic', 'design', 'cool', 'hype',
];

// --- FACING keyword banks ---

const FACING_STRONG = [
  'walk in', 'step in', 'step into', 'stand in front', 'show up',
  'train', 'fight', 'box', 'spar', 'compete', 'perform',
  'lock', 'commit', 'put your name', 'sign up', 'register',
  'say it', 'admit', 'tell', 'confess', 'confront',
  'come back', 'return', 'try again', 'start over',
  'on camera', 'in public', 'live', 'in the ring', 'in the cage',
  'no shortcut', 'no hiding', 'no way around',
  'endure', 'push through', 'keep going', 'stay in',
  'drag yourself', 'force yourself', 'make yourself',
  'pick up', 'get up', 'wake up', 'go back',
];

const FACING_WEAK = [
  'think about', 'consider', 'reflect', 'feel', 'believe',
  'scroll', 'watch', 'browse', 'like', 'share', 'post',
  'buy', 'wear', 'consume', 'subscribe', 'follow',
  'dream', 'hope', 'wish', 'plan', 'intend',
  'support', 'celebrate', 'enjoy', 'experience',
  'engage', 'connect', 'attend', 'join',
];

// --- CHANGE keyword banks ---

const CHANGE_STRONG = [
  'stop', 'stops', 'start', 'starts', 'no longer', 'now',
  'become', 'becomes', 'turned into', 'transformed',
  'before', 'after', 'used to', 'now does',
  'action', 'behavior', 'habit', 'routine', 'identity',
  'visible', 'observable', 'measurable', 'concrete',
  'shows up', 'speaks up', 'stands up', 'steps up',
  'doesn\'t quit', 'doesn\'t run', 'doesn\'t hide',
  'puts name', 'takes responsibility', 'owns',
  'trains', 'fights', 'competes', 'performs', 'delivers',
  'accountable', 'disciplined', 'consistent',
  'from talk to action', 'from hiding to showing',
  'from avoiding to facing', 'from watching to doing',
];

const CHANGE_WEAK = [
  'feels', 'feeling', 'awareness', 'mindset', 'perspective',
  'inspired', 'motivated', 'empowered', 'confident',
  'cool', 'trendy', 'stylish', 'looks', 'image',
  'vibes', 'energy', 'mood', 'attitude',
  'internal', 'inside', 'emotional', 'spiritual',
  'appreciation', 'gratitude', 'understanding',
];

// --- Score a single pillar (1–5) ---

function scorePillar(text, strongWords, weakWords) {
  const t = text.toLowerCase().trim();
  if (!t) return { score: 1, level: 'weak' };

  let points = 0;
  const words = t.split(/\s+/).length;

  // Specificity / length
  if (words >= 3) points += 1;
  if (words >= 6) points += 1;
  if (words >= 10) points += 0.5;

  // Strong hits
  const strongHits = strongWords.filter(w => t.includes(w)).length;
  points += Math.min(strongHits * 1.2, 4);

  // Weak penalty
  const weakHits = weakWords.filter(w => t.includes(w)).length;
  points -= weakHits * 1.5;

  // Single vague word penalty
  if (words <= 1 && strongHits === 0) points -= 1;

  // Bonus for concrete details (numbers, specific situations)
  if (/\d/.test(t)) points += 0.5;
  if (t.length > 60) points += 0.5;

  // Emotional charge — raw, confrontational language
  const rawWords = ['ass', 'shit', 'pathetic', 'coward', 'loser', 'nobody', 'fraud', 'fake', 'joke', 'weak', 'scared'];
  const rawHits = rawWords.filter(w => t.includes(w)).length;
  points += Math.min(rawHits * 1, 2);

  let score;
  if (points >= 4.5) score = 5;
  else if (points >= 3) score = 4;
  else if (points >= 1.5) score = 3;
  else if (points >= 0.5) score = 2;
  else score = 1;

  return { score, level: score >= 4 ? 'strong' : score >= 3 ? 'mid' : 'weak' };
}

// --- Pillar-specific feedback ---

// Abstract fears that need to be converted to situations
const ABSTRACT_FEARS = [
  'being judged', 'not being enough', 'self-expression', 'not good enough',
  'failure', 'rejection', 'judgment', 'vulnerability', 'being seen',
  'being vulnerable', 'being real', 'being authentic', 'being honest',
  'letting go', 'opening up', 'being myself', 'standing out',
  'being different', 'not fitting in', 'not belonging',
];

function getFearFeedback(text, score) {
  const t = text.toLowerCase().trim();
  if (!t) return { comment: 'No fear. No FYF.', fix: 'Where exactly does this happen? Describe a moment you could film.' };

  // Check if abstract — "Can this be filmed?"
  const isAbstract = ABSTRACT_FEARS.some(af => t.includes(af)) || (t.split(/\s+/).length <= 3 && score <= 3);
  if (isAbstract && score <= 3) {
    return {
      comment: 'Too abstract. If you cannot picture the moment, it is not the fear.',
      fix: 'Where exactly does this happen? Describe a specific situation that could be filmed.',
    };
  }

  if (score >= 4) return { comment: 'Situational and real. You can picture this moment.', fix: null };
  if (FEAR_WEAK.some(w => t.includes(w))) return { comment: 'This is a category, not a fear. Where does this actually happen?', fix: 'Name a specific moment. Can this be filmed? If not, rewrite it.' };
  return { comment: 'There\'s something here, but it\'s not sharp enough to film.', fix: 'Push toward a real moment. Where exactly does someone hesitate?' };
}

function getFacingFeedback(text, score) {
  const t = text.toLowerCase().trim();
  if (!t) return { comment: 'No facing. No exposure. No FYF.', fix: 'Where are they seen, judged, or unable to hide?' };
  if (score >= 4) {
    const exposureWords = ['public', 'seen', 'watched', 'judg', 'in front', 'camera', 'live', 'cage', 'ring', 'stage'];
    const hasExposure = exposureWords.some(w => t.includes(w));
    if (hasExposure) return { comment: 'Clear exposure. Unavoidable once entered.', fix: null };
    return { comment: 'Real action, but is there exposure? Are they seen or judged?', fix: null };
  }
  if (FACING_WEAK.some(w => t.includes(w))) return { comment: 'They can avoid this. This is not facing.', fix: 'Force exposure. Where are they seen, judged, or unable to hide?' };
  return { comment: 'No exposure. No risk. This doesn\'t hold.', fix: 'Effort alone is not facing. Where are they seen, judged, or unable to hide?' };
}

function getChangeFeedback(text, score) {
  const t = text.toLowerCase().trim();
  if (!t) return { comment: 'No warrior. Nothing visibly changes.', fix: 'What do they DO differently after? Not feel — do.' };
  if (score >= 4) return { comment: 'Visible change. You can see the warrior from the outside.', fix: null };
  if (CHANGE_WEAK.some(w => t.includes(w))) return { comment: 'This is internal. You can\'t see "feeling confident" from the outside.', fix: 'What do they DO differently now? Visible behavior, not emotions.' };
  return { comment: 'Not concrete enough to verify. What would someone actually observe?', fix: 'Use Before → After. What did they do before? What do they do now?' };
}

// --- FYF NARRATIVE GENERATOR ---

// Common adjective → noun conversions for narrative
const NOUNIFY = {
  'weak': 'Weakness', 'weakest': 'Weakness', 'weaker': 'Weakness',
  'lazy': 'Laziness', 'lazier': 'Laziness', 'laziest': 'Laziness',
  'afraid': 'Fear', 'scared': 'Fear', 'terrified': 'Terror',
  'ashamed': 'Shame', 'shameful': 'Shame',
  'silent': 'Silence', 'quiet': 'Silence',
  'comfortable': 'Comfort', 'soft': 'Softness',
  'ordinary': 'Mediocrity', 'average': 'Mediocrity', 'mediocre': 'Mediocrity',
  'invisible': 'Invisibility', 'unseen': 'Invisibility',
  'irrelevant': 'Irrelevance', 'forgotten': 'Irrelevance',
  'fake': 'Fraud', 'phony': 'Fraud',
  'exposed': 'Exposure', 'vulnerable': 'Vulnerability',
  'wrong': 'Being Wrong', 'failed': 'Failure', 'failing': 'Failure',
  'judged': 'Judgment', 'rejected': 'Rejection',
  'alone': 'Being Alone', 'lonely': 'Loneliness',
  'broken': 'Being Broken', 'lost': 'Being Lost',
  'humiliated': 'Humiliation', 'embarrassed': 'Embarrassment',
};

function generateNarrative(project, fear, fearScore) {
  const t = fear.toLowerCase().trim();

  // Strip common prefixes
  let core = t
    .replace(/^(the fear of|fear of|being afraid of|afraid of)\s+/i, '')
    .replace(/^(being|having|feeling|the fact that|that you are|that you're)\s+/i, '')
    .replace(/\s+(and|when|because|so|but|—|-)[\s\S]*$/i, '') // trim after conjunctions/dashes
    .trim();

  // Remove articles
  core = core.replace(/^(the|a|an|your|my|our)\s+/i, '').trim();

  // Try to nounify the first/main word
  const firstWord = core.split(/\s+/)[0];
  if (NOUNIFY[firstWord]) {
    core = NOUNIFY[firstWord];
  } else {
    // Extract key noun if phrase is long
    const words = core.split(/\s+/);
    if (words.length > 3) {
      const keyNouns = ['weakness', 'failure', 'shame', 'truth', 'excuses', 'silence',
        'judgment', 'doubt', 'comfort', 'mediocrity', 'laziness', 'reality',
        'exposure', 'loss', 'pain', 'defeat', 'humiliation', 'reflection',
        'fraud', 'fear', 'rejection', 'loneliness', 'vulnerability'];
      const found = keyNouns.find(n => core.includes(n));
      if (found) {
        core = found;
      } else {
        // Last resort: take first 3 words
        core = words.slice(0, 3).join(' ');
      }
    }
  }

  // Capitalize
  core = core.replace(/\b\w/g, c => c.toUpperCase());

  // Fallback if empty or score too low
  if (!core || fearScore <= 1) {
    const pl = project.toLowerCase();
    if (pl.includes('gym') || pl.includes('training')) core = 'Weakness';
    else if (pl.includes('merch') || pl.includes('drop')) core = 'Image';
    else if (pl.includes('documentary') || pl.includes('film')) core = 'Story';
    else if (pl.includes('fantasy') || pl.includes('league')) core = 'Judgment';
    else if (pl.includes('event') || pl.includes('fight')) core = 'Cage';
    else core = 'Silence';
  }

  return `Face Your ${core}`;
}

// Generate 3 distinct narrative options from different angles
function generateNarrativeOptions(project, fear, primaryNarrative, fearScore) {
  const t = fear.toLowerCase().trim();
  const pl = project.toLowerCase();
  const pool = [];

  // Angle 1: Emotion-based reframings
  if (t.includes('weak') || t.includes('lazy')) pool.push('Face Your Excuses', 'Face Your Softness');
  if (t.includes('judg') || t.includes('public')) pool.push('Face Your Audience', 'Face Your Spotlight');
  if (t.includes('fail') || t.includes('los')) pool.push('Face Your Record', 'Face Your Scoreboard');
  if (t.includes('alone') || t.includes('belong')) pool.push('Face Your Isolation', 'Face Your Empty Corner');
  if (t.includes('truth') || t.includes('reality') || t.includes('mirror')) pool.push('Face Your Reflection', 'Face Your Mirror');
  if (t.includes('shame') || t.includes('embarrass')) pool.push('Face Your Past', 'Face Your Shame');
  if (t.includes('comfort') || t.includes('soft') || t.includes('easy')) pool.push('Face Your Comfort', 'Face Your Couch');
  if (t.includes('excus')) pool.push('Face Your Mirror', 'Face Your Morning');
  if (t.includes('fraud') || t.includes('fake') || t.includes('imposter')) pool.push('Face Your Mask', 'Face Your Fraud');
  if (t.includes('quit') || t.includes('giving up')) pool.push('Face Your Exit', 'Face Your Quit');
  if (t.includes('exposed') || t.includes('seen')) pool.push('Face Your Exposure', 'Face Your Spotlight');
  if (t.includes('pain') || t.includes('hurt')) pool.push('Face Your Pain', 'Face Your Body');
  if (t.includes('doubt') || t.includes('insecure')) pool.push('Face Your Doubt', 'Face Your Inner Voice');
  if (t.includes('reject')) pool.push('Face Your Rejection', 'Face Your No');

  // Angle 2: Project-type reframings
  if (pl.includes('gym') || pl.includes('train')) pool.push('Face Your Body', 'Face Your Reps', 'Face Your Bag');
  if (pl.includes('comeback') || pl.includes('return')) pool.push('Face Your Comeback', 'Face Your Return');
  if (pl.includes('fantasy') || pl.includes('league') || pl.includes('pick')) pool.push('Face Your Picks', 'Face Your Judgment');
  if (pl.includes('merch') || pl.includes('drop')) pool.push('Face Your Image', 'Face Your Label');
  if (pl.includes('documentary') || pl.includes('film')) pool.push('Face Your Story', 'Face Your Camera');
  if (pl.includes('event') || pl.includes('fight')) pool.push('Face Your Cage', 'Face Your Walk-In');

  // Angle 3: Universal strong options
  pool.push('Face Your Silence', 'Face Your Excuses', 'Face Your Mirror');

  // Deduplicate, remove primary
  const primaryCore = primaryNarrative.replace('Face Your ', '');
  const unique = [...new Set(pool)].filter(n => n.replace('Face Your ', '') !== primaryCore);

  // Score each candidate
  const scored = unique.map(n => ({ narrative: n, ...scoreNarrative(n) }));
  scored.sort((a, b) => b.score - a.score);

  // Pick top 2 alternatives (different from primary)
  const options = [
    { narrative: primaryNarrative, ...scoreNarrative(primaryNarrative) },
  ];

  for (const s of scored) {
    if (options.length >= 3) break;
    // Avoid near-duplicates (same core word)
    const sCore = s.narrative.replace('Face Your ', '').toLowerCase();
    const isDuplicate = options.some(o => {
      const oCore = o.narrative.replace('Face Your ', '').toLowerCase();
      return oCore === sCore || oCore.includes(sCore) || sCore.includes(oCore);
    });
    if (!isDuplicate) options.push(s);
  }

  // Pad with fallbacks if needed
  const fallbacks = ['Face Your Silence', 'Face Your Excuses', 'Face Your Mirror', 'Face Your Reflection'];
  for (const fb of fallbacks) {
    if (options.length >= 3) break;
    if (!options.some(o => o.narrative === fb)) {
      options.push({ narrative: fb, ...scoreNarrative(fb) });
    }
  }

  // Find the strongest
  const best = options.reduce((a, b) => b.score > a.score ? b : a, options[0]);

  // Explain why it wins
  let whyItWins;
  if (best.quality === 'strong') whyItWins = 'Specific, concrete, and visual. Works as a standalone campaign line.';
  else if (best.quality === 'specific') whyItWins = 'More specific than the alternatives. Can be used directly.';
  else whyItWins = 'The strongest available option, though it could still be sharper.';

  return {
    options: options.slice(0, 3),
    selected: best,
    whyItWins,
  };
}

// --- Score narrative quality (1-5) ---

function scoreNarrative(narrative) {
  const core = narrative.replace('Face Your ', '').toLowerCase();

  // Generic/banned words = weak narrative
  const banned = ['fear', 'challenge', 'limits', 'comfort zone', 'yourself', 'potential', 'greatness', 'dreams'];
  if (banned.some(b => core === b)) return { score: 1, quality: 'generic' };

  // Very short single abstract word
  const vague = ['self', 'mind', 'life', 'world', 'reality', 'future', 'past'];
  if (vague.some(v => core === v)) return { score: 2, quality: 'vague' };

  // Good: specific, concrete, visual
  const strong = ['weakness', 'excuses', 'silence', 'fraud', 'laziness', 'shame',
    'exposure', 'judgment', 'failure', 'humiliation', 'mirror', 'reflection',
    'mask', 'exit', 'record', 'body', 'picks', 'comeback', 'audience',
    'isolation', 'comfort', 'past', 'being wrong', 'being alone', 'being broken'];
  if (strong.some(s => core.includes(s))) return { score: 5, quality: 'strong' };

  // Multi-word = more specific = better
  if (core.split(/\s+/).length >= 2) return { score: 4, quality: 'specific' };

  return { score: 3, quality: 'usable' };
}

// --- DECISION LOGIC: PUSH / FIX / KILL ---
// CRITICAL: narrative strength is the primary decision driver

function makeDecision(fearScore, facingScore, changeScore, fear, facing, change, narrativeScore) {
  const total = fearScore + facingScore + changeScore;
  const min = Math.min(fearScore, facingScore, changeScore);
  const hasEmpty = !fear.trim() || !facing.trim() || !change.trim();

  // Narrative-first: weak narrative = can't PUSH, regardless of pillars
  if (narrativeScore <= 2) {
    if (total <= 6 || min <= 1) {
      return {
        decision: 'KILL',
        decisionClass: 'kill',
        reason: 'No strong "Face Your ___" narrative is possible. The fear is too generic or unclear to build a campaign line around.',
      };
    }
    return {
      decision: 'FIX',
      decisionClass: 'fix',
      reason: 'The narrative is too generic to use as a campaign line. Sharpen the fear until "Face Your ___" feels specific and undeniable.',
    };
  }

  // PUSH: strong narrative + all pillars at least 3 + total >= 11
  if (narrativeScore >= 4 && total >= 11 && min >= 3 && !hasEmpty) {
    return {
      decision: 'PUSH',
      decisionClass: 'push',
      reason: 'Strong "Face Your ___" narrative backed by a real fear, clear facing mechanism, and observable change. Ready to amplify.',
    };
  }

  // KILL: multiple weak pillars, empties, or too generic
  if (total <= 6 || min <= 1 || (hasEmpty && total <= 8)) {
    const reasons = [];
    if (fearScore <= 2) reasons.push('the fear is too vague or generic');
    if (facingScore <= 2) reasons.push('there is no real facing mechanism');
    if (changeScore <= 2) reasons.push('no observable change is defined');
    if (hasEmpty) reasons.push('key sections are missing');

    return {
      decision: 'KILL',
      decisionClass: 'kill',
      reason: `Not aligned with FYF — ${reasons.join(', ')}. No strong narrative possible.`,
    };
  }

  // FIX: narrative or pillars need work
  const weakParts = [];
  if (narrativeScore <= 3) weakParts.push('the "Face Your ___" narrative needs to be sharper');
  if (fearScore <= 2) weakParts.push('FEAR needs to be more specific and real');
  if (facingScore <= 2) weakParts.push('FACING MECHANISM needs a concrete confrontation moment');
  if (changeScore <= 2) weakParts.push('CHANGE needs to be observable, not emotional');
  if (fearScore === 3) weakParts.push('FEAR has potential but isn\'t sharp enough');
  if (facingScore === 3) weakParts.push('FACING MECHANISM exists but could be more concrete');
  if (changeScore === 3) weakParts.push('CHANGE needs a clearer before/after');

  return {
    decision: 'FIX',
    decisionClass: 'fix',
    reason: `Potential is there but: ${weakParts.slice(0, 2).join('; ')}. Fix before moving forward.`,
  };
}

// --- REALITY CHECK ---

function realityCheck(project, fear, facing, change, fearScore, facingScore, changeScore) {
  const issues = [];
  const pl = project.toLowerCase();
  const fl = fear.toLowerCase().trim();
  const facl = facing.toLowerCase().trim();
  const cl = change.toLowerCase().trim();

  // Test 1: Would a person pause or avoid this?
  const fearReal = fearScore >= 3;
  if (!fearReal) issues.push('Too abstract. Where does this actually hurt?');

  // Test 2: Where can they NOT hide?
  const facingPassive = FACING_WEAK.some(w => facl.includes(w));
  const facingReal = facingScore >= 3 && !facingPassive;
  if (!facingReal) {
    if (facingPassive) issues.push('They can avoid this. This is not facing.');
    else if (facingScore < 3) issues.push('No exposure. No risk. This doesn\'t hold.');
  }

  // Test 3: Are they seen, judged, or exposed?
  const exposureWords = ['public', 'seen', 'watched', 'judg', 'in front', 'camera', 'live', 'cage', 'ring', 'stage', 'crowd', 'audience', 'name on', 'on the line', 'record'];
  const hasExposure = exposureWords.some(w => facl.includes(w));
  if (facingReal && !hasExposure) {
    issues.push('No clear exposure. Are they seen, judged, or unable to hide?');
  }

  // Test 4: What do they DO differently?
  const changeInternal = CHANGE_WEAK.some(w => cl.includes(w));
  const changeReal = changeScore >= 3 && !changeInternal;
  if (!changeReal) {
    if (changeInternal) issues.push('Nothing visibly changes. Internal feelings are not proof.');
    else if (changeScore < 3) issues.push('No warrior. What do they DO differently now?');
  }

  // Safe/private/avoidable check
  const safeWords = ['private', 'alone', 'at home', 'by yourself', 'nobody sees', 'optional', 'choose to'];
  if (safeWords.some(w => facl.includes(w))) {
    issues.push('If it\'s safe, private, or avoidable — it\'s not FYF.');
  }

  // Product check
  const productWords = ['merch', 'drop', 'hoodie', 'shirt', 'gear', 'collection', 'product'];
  if (productWords.some(w => pl.includes(w)) && fearScore >= 3) {
    issues.push('This is a product. Products don\'t force confrontation by default.');
  }

  // Disconnect
  if (changeScore >= 4 && facingScore <= 2) {
    issues.push('Big warrior claimed but no real confrontation to produce it.');
  }

  // Surface level
  if (fearScore >= 3 && facingScore >= 3 && changeScore >= 3) {
    const allShort = fl.split(/\s+/).length <= 3 && facl.split(/\s+/).length <= 3 && cl.split(/\s+/).length <= 3;
    if (allShort) issues.push('Reads like formula-filling, not real analysis. Unpack it.');
  }

  // Determine verdict: GROUNDED / WEAK / BROKEN
  let verdict, verdictClass, explanation;
  if (issues.length === 0 && fearReal && facingReal && changeReal) {
    verdict = 'GROUNDED';
    verdictClass = 'grounded';
    explanation = 'This forces confrontation. The fear is real, the exposure is unavoidable, and the warrior is visible.';
  } else if ((!fl && !facl) || (!fearReal && !facingReal) || fearScore <= 1 || facingScore <= 1) {
    verdict = 'BROKEN';
    verdictClass = 'broken';
    explanation = issues[0] || 'Abstract or avoidable. If you cannot picture the moment, it is not the fear.';
  } else {
    verdict = 'WEAK';
    verdictClass = 'weak-verdict';
    explanation = issues[0] || 'Still too abstract or avoidable. Push toward a real, filmable moment.';
  }

  return { verdict, verdictClass, explanation, issues };
}

// --- Main evaluate function ---
// CORE MODEL: FEAR × FACING = CHANGE
// Change quality is derived from FEAR and FACING strength

export function evaluate({ project, fear, facing, change }) {
  const fearResult = scorePillar(fear, FEAR_STRONG, FEAR_WEAK);
  const facingResult = scorePillar(facing, FACING_STRONG, FACING_WEAK);
  const changeResult = scorePillar(change, CHANGE_STRONG, CHANGE_WEAK);

  // CORE MODEL: CHANGE is capped by the weaker of FEAR and FACING
  // If FEAR is weak → CHANGE will be weak regardless of what's written
  // If FACING is missing → CHANGE won't happen
  // Store uncapped change score for comparison
  const uncappedChangeScore = changeResult.score;

  // CORE MODEL: CHANGE is capped by the weaker of FEAR and FACING
  const fearFacingMin = Math.min(fearResult.score, facingResult.score);
  if (changeResult.score > fearFacingMin + 1) {
    changeResult.score = Math.min(fearFacingMin + 1, 5);
    changeResult.level = changeResult.score >= 4 ? 'strong' : changeResult.score >= 3 ? 'mid' : 'weak';
  }

  const fearFeedback = getFearFeedback(fear, fearResult.score);
  const facingFeedback = getFacingFeedback(facing, facingResult.score);
  const changeFeedback = getChangeFeedback(change, changeResult.score);

  // If change was capped, explain why
  let changeNote = null;
  if (changeResult.score < uncappedChangeScore) {
    if (fearResult.score <= 2) changeNote = 'Change is capped because the fear is too weak. Stronger fear = stronger change.';
    else if (facingResult.score <= 2) changeNote = 'Change is capped because the facing mechanism is missing. No confrontation = no transformation.';
    else changeNote = 'Change is limited by the strength of fear and facing combined.';
  }

  const primaryNarrative = generateNarrative(project, fear, fearResult.score);
  const narrativeOptions = generateNarrativeOptions(project, fear, primaryNarrative, fearResult.score);
  const bestNarrativeScore = scoreNarrative(narrativeOptions.selected.narrative);

  const decision = makeDecision(fearResult.score, facingResult.score, changeResult.score, fear, facing, change, bestNarrativeScore.score);
  const reality = realityCheck(project, fear, facing, change, fearResult.score, facingResult.score, changeResult.score);

  return {
    project,
    narrativeOptions,
    ...decision,
    scores: {
      fear: fearResult,
      facing: facingResult,
      change: changeResult,
    },
    feedback: {
      fear: fearFeedback,
      facing: facingFeedback,
      change: changeFeedback,
    },
    changeNote,
    reality,
    input: {
      fear: fear.trim() || '—',
      facing: facing.trim() || '—',
      change: change.trim() || '—',
    },
  };
}

export { generateNarrativeOptions, generateNarrative, scoreNarrative };
