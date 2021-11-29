import {useQuery} from '@apollo/client';
import {useContext, useEffect, useState} from 'react';
import {
	onboardingPageGuard,
	overviewPageGuard,
	usePageGuard,
} from '~/common/hooks/usePageGuard';
import {
	getAccountSubscriptionGroupsByFilter,
	getKoroneikiAccounts,
} from '~/common/services/liferay/graphql/queries';
import SubscriptionBar from '../../components/SubscriptionBar';
import {AppContext} from '../../context';
import {actionTypes} from '../../context/reducer';
import {CUSTOM_EVENTS} from '../../utils/constants';

const Overview = ({userAccount}) => {
	const [{project}, dispatch] = useContext(AppContext);
	const {isLoading} = usePageGuard(
		userAccount,
		overviewPageGuard,
		onboardingPageGuard,
		project.accountKey
	);
	const {data, isLoading: isLoadingKoroneiki} = useQuery(
		getKoroneikiAccounts,
		{
			variables: {
				filter: `accountKey eq '${project.accountKey}'`,
			},
		}
	);
	const {
		data: accountSubscriptionsData,
		loading: isAccSubsLoading,
	} = useQuery(getAccountSubscriptionGroupsByFilter, {
		variables: {
			// add 'and hasActivation eq ${true}'

			filter: `accountKey eq '${project.accountKey}' `,
		},
	});
	const [subscriptionTags, setSubscriptionTags] = useState(() => []);

	useEffect(() => {
		if (!isLoading && data) {
			const koroneikiAccount = data.c?.koroneikiAccounts?.items[0];

			dispatch({
				payload: koroneikiAccount,
				type: actionTypes.UPDATE_PROJECT,
			});

			window.dispatchEvent(
				new CustomEvent(CUSTOM_EVENTS.PROJECT, {
					bubbles: true,
					composed: true,
					detail: koroneikiAccount,
				})
			);
		}

		if (!isAccSubsLoading && accountSubscriptionsData) {
			setSubscriptionTags(
				accountSubscriptionsData?.c?.accountSubscriptionGroups?.items ||
					[]
			);
		}
	}, [accountSubscriptionsData, data, dispatch, isAccSubsLoading, isLoading]);

	// eslint-disable-next-line no-console
	console.log(subscriptionTags);

	if (isLoading || isLoadingKoroneiki) {
		return <div>Overview Skeleton</div>;
	}

	return (
		<div>
			Overview Page
			<SubscriptionBar subscriptionTags={subscriptionTags} />
		</div>
	);
};

export default Overview;
