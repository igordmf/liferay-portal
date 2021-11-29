import React from 'react';

const SubscriptionBar = ({subscriptionTags}) => {
	return (
		<nav>
			{subscriptionTags.map((s, index) => (
				<a key={index}>{s.name}</a>
			))}
		</nav>
	);
};

export default SubscriptionBar;
