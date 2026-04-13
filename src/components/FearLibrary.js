import React, { useState } from 'react';

const CATEGORIES = [
  {
    name: 'PERSONAL',
    items: [
      'not being enough',
      'being judged',
      'being exposed',
      'being seen as weak',
      'being rejected',
      'being left behind',
      'disappointing yourself',
      'disappointing others',
    ],
  },
  {
    name: 'PERFORMANCE',
    items: [
      'failing publicly',
      'choking under pressure',
      'not delivering',
      'losing',
      'freezing in the big moment',
      'returning after a bad loss',
      'not living up to expectations',
    ],
  },
  {
    name: 'IDENTITY',
    items: [
      'not belonging',
      'being fake',
      'being ordinary',
      'being found out',
      'not being who you say you are',
      'losing respect',
      'not recognizing yourself',
    ],
  },
  {
    name: 'BODY / EFFORT',
    items: [
      'pain',
      'exhaustion',
      'discomfort',
      'pushing beyond your limit',
      'showing up when you don\'t want to',
      'enduring one more round',
      'being weaker than you hoped',
    ],
  },
  {
    name: 'TRUTH / REALITY',
    items: [
      'admitting the truth',
      'facing your excuses',
      'facing your laziness',
      'facing what is not working',
      'confronting reality',
      'saying what you avoid saying',
      'accepting where you really are',
    ],
  },
  {
    name: 'COMEBACK',
    items: [
      'trying again after failing',
      'coming back after humiliation',
      'stepping in again after defeat',
      'risking another loss',
      'facing the memory of what happened',
    ],
  },
];

export default function FearLibrary({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  if (!open) {
    return (
      <button className="fear-trigger" onClick={() => setOpen(true)}>
        NEED INSPIRATION?
      </button>
    );
  }

  return (
    <div className="fear-library">
      <div className="fear-header">
        <div>
          <h4 className="fear-title">FEAR LIBRARY</h4>
          <p className="fear-subtitle">Start with what people would rather avoid.</p>
        </div>
        <button className="fear-close" onClick={() => setOpen(false)}>&times;</button>
      </div>

      <div className="fear-categories">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="fear-category">
            <button
              className={`fear-cat-btn ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
            >
              {cat.name}
              <span className="fear-cat-arrow">{activeCategory === cat.name ? '−' : '+'}</span>
            </button>

            {activeCategory === cat.name && (
              <div className="fear-items">
                {cat.items.map((item) => (
                  <button
                    key={item}
                    className="fear-item"
                    onClick={() => { onSelect(item); setOpen(false); }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="fear-helper">
        Don't stop at the category. Make it specific to your idea.
      </p>
    </div>
  );
}
