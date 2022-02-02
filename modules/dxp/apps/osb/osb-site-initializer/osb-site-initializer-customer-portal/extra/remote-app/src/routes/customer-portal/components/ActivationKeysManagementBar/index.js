/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import ActivationKeysActionsButton from '../ActivationKeysActionsButton';

const ActivationKeysManagementBar = ({accountKey, sessionId}) => {
	return (
		<div className="align-items-center bg-neutral-1 d-flex justify-content-between px-3 py-3 rounded">
			<div>
				<ActivationKeysActionsButton
					accountKey={accountKey}
					sessionId={sessionId}
				/>
			</div>
		</div>
	);
};

export default ActivationKeysManagementBar;
