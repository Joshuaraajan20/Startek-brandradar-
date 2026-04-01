import React from 'react';
import { ExternalLink } from 'lucide-react';
import { COMPANIES, COMPANY_ORDER } from '../data/weeksData';

export const DeckLinks = ({ decks, companyFilter }) => {
  if (!decks) return null;

  // Filter companies if needed
  const visibleCompanies = companyFilter === 'all' 
    ? COMPANY_ORDER 
    : [companyFilter];

  const availableDecks = visibleCompanies.filter(key => decks[key]);

  if (availableDecks.length === 0) return null;

  return (
    <div 
      className="bg-[#121212] border border-white/10 rounded-lg p-5"
      data-testid="deck-links"
    >
      <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
        Slide Decks
      </h3>
      <div className="flex flex-wrap gap-3">
        {availableDecks.map((companyKey) => {
          const company = COMPANIES[companyKey];
          return (
            <a
              key={companyKey}
              href={decks[companyKey]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                backgroundColor: `${company.color}15`,
                borderColor: `${company.color}40`,
                color: company.color
              }}
              data-testid={`deck-link-${companyKey}`}
            >
              <span className="text-sm font-medium">{company.shortName} deck</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          );
        })}
      </div>
    </div>
  );
};
