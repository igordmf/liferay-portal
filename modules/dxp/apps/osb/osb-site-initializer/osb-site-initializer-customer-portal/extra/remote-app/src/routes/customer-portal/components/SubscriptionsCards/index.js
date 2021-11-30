import { useQuery } from '@apollo/client';
import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import {useState} from 'react';
import {getAccountSubscriptions} from '~/common/services/liferay/graphql/queries';

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
      <Component key={index} name={s.name}/>
    ))}</>
  )
}

const Component = ({name}) => {
  const [visible, setVisible] = useState(false);
  const { observer, onClose } = useModal({
    onClose: () => setVisible(false)
  });

  return (
    <>
      {visible && (
        <ClayModal
          observer={observer}
          size="lg"
          status="info"
        >
          <ClayModal.Header>Title</ClayModal.Header>

          <ClayModal.Body>
            <h1>Hello world!</h1>
          </ClayModal.Body>

          <ClayModal.Footer
            first={
              <ClayButton.Group spaced>
                <ClayButton displayType="secondary">Secondary</ClayButton>

                <ClayButton displayType="secondary">Secondary</ClayButton>
              </ClayButton.Group>
            }
            last={<ClayButton onClick={onClose}>Primary</ClayButton>}
          />
        </ClayModal>
      )}
      <ClayButton displayType="primary" onClick={() => setVisible(true)}>
        {name}
      </ClayButton>
    </>
  );
};

export default SubscriptionsCards;