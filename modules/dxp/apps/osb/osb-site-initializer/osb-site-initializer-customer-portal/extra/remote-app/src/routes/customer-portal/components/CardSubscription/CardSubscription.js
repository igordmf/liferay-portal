import { useModal } from '@clayui/modal';
import { useState } from 'react';
import ModalCardSubscription from '../ModalCardSubscription';


const CardSubscription = () => {

  const [visible, setVisible] = useState(false);

  const { observer, onClose } = useModal({
    onClose: () => setVisible(false)
  });

  return (
    <>
      {visible && <ModalCardSubscription observer={observer} onClose={onClose} />}

      <div className="card-subscription" onClick={() => setVisible(true)}>
        <div className="card-body">
          {/* <div>
          <ClayCheckbox checked={value} onChange={() => setValue(val => !val)} />
        </div> */}

          {/* <div className="d-flex img justify-content-center mb-4 row">
          <img src={icon}></img>
        </div> */}

          <div className="d-flex head-text justify-content-center mb-1 row" type="text">
            Prodution
          </div>

          <div className="d-flex head-text-2 justify-content-center row" type="text">
            Instance size: 1
          </div>

          <div className="card-date d-flex justify-content-center mb-4 row" type="text">
            05/01/2021 - 05/01/2024
          </div>

          <div className="badge-card-subscription d-flex justify-content-center">
            Active
          </div>
        </div>
      </div>
    </>
  )
}


export default CardSubscription;

