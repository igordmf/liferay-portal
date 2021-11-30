import { useQuery } from '@apollo/client';
import {getAccountSubscriptions} from '~/common/services/liferay/graphql/queries';
import CardSubscription from '../CardSubscription/CardSubscription';

const SubscriptionsCards = ({accountKey, selectedTag}) => {
  const parseAccountSubscriptionGroupERC = (tagName) => {
    return tagName.toLowerCase().replace(' ', '-');
  };

  const {
    data: subscriptionsByTag,
    loading: isSubscriptionsByTagLoading,
  } = useQuery(getAccountSubscriptions, {
    variables: {
      filter: `accountSubscriptionGroupERC eq '${accountKey}_${parseAccountSubscriptionGroupERC(selectedTag)}' `,
    },
  });

  const {items} = subscriptionsByTag?.c?.accountSubscriptions || []

  return(
    <>{!isSubscriptionsByTagLoading && items.map((s, index) => (
      <CardSubscription key={index}/>
    ))}</>
  )
}

export default SubscriptionsCards;