
"use client";

import React from 'react';

interface FormattedAiResponseProps {
  content: string | null;
}

// Regex to identify list items
const unorderedListItemRegex = /^\s*([-*+])\s+(.*)/; 
// Updated regex to include "1)" and "a)" style lists along with "1." and "a."
const orderedListItemRegex = /^\s*(\d+\.|\d+\)|[a-zA-Z]\.|[a-zA-Z]\))\s+(.*)/;


export function FormattedAiResponse({ content }: FormattedAiResponseProps) {
  if (!content) {
    return null;
  }

  const lines = content.split('\n');
  const outputElements: JSX.Element[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const renderList = () => {
    if (currentList) {
      const listKey = `${currentList.type}-${outputElements.length}`;
      const ListTag = currentList.type;
      outputElements.push(
        <ListTag 
          key={listKey} 
          className={`list-inside pl-5 space-y-1 my-2 ${ListTag === 'ul' ? 'list-disc' : 'list-decimal'}`}
        >
          {currentList.items.map((item, idx) => (
            <li key={`${listKey}-item-${idx}`} className="whitespace-pre-wrap">{item}</li>
          ))}
        </ListTag>
      );
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isUnordered = unorderedListItemRegex.exec(line);
    const isOrdered = orderedListItemRegex.exec(line);

    if (isUnordered) {
      if (currentList?.type !== 'ul') {
        renderList(); 
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(isUnordered[2]); 
    } else if (isOrdered) {
      if (currentList?.type !== 'ol') {
        renderList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(isOrdered[2]); 
    } else {
      renderList(); 
      if (line.trim() !== '') {
        outputElements.push(<p key={`p-${outputElements.length}`} className="whitespace-pre-wrap my-2">{line}</p>);
      } else if (outputElements.length > 0 && line.trim() === '') {
        // Intentionally empty line for spacing, relying on my-2 of paragraphs/lists for now.
        // Could add: outputElements.push(<div key={`br-${outputElements.length}`} className="h-4" />); for explicit breaks
      }
    }
  }

  renderList(); // Render any remaining list at the end

  // Fallback if no structured elements were generated but content exists
  if (outputElements.length === 0 && content.trim()) {
    return <p className="whitespace-pre-wrap text-sm">{content}</p>;
  }

  return <div className="text-sm">{outputElements}</div>;
}

