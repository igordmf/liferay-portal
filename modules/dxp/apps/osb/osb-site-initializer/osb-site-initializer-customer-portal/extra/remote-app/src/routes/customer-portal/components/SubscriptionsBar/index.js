import React, { useEffect } from 'react';

const SubscriptionsBar = ({ setSelectedTag, subscriptionsTags }) => {
  const handleClick = (event) => {
    event.preventDefault();
    setSelectedTag(event.target.value);
  }

  useEffect(() => setSelectedTag(subscriptionsTags[0]?.name || ''), [setSelectedTag, subscriptionsTags])

	return (
		<nav>
			{subscriptionsTags && subscriptionsTags.map((tag) => (
				<button key={tag.name} onClick={handleClick} value={tag.name}>{tag.name}</button>
			))}
		</nav>
	);
};

export default SubscriptionsBar;
