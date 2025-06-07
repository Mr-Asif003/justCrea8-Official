// components/FAQAccordion.jsx
import React from 'react';

export default function FAQAccordion({ question, answer }) {
  return (
    <details className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl cursor-pointer">
      <summary className="font-medium">{question}</summary>
      <p className="mt-2 text-sm">{answer}</p>
    </details>
  );
}
