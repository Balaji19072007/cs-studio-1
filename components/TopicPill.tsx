import React from 'react';

interface TopicPillProps {
  tag: string;
}

const TopicPill: React.FC<TopicPillProps> = ({ tag }) => {
  return (
    <span className="inline-block bg-sky-900/50 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">
      {tag}
    </span>
  );
};

export default TopicPill;