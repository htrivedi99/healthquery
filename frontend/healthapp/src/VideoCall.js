import React, { Component } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

import AgoraVideoCall from './AgoraVideoCall';

class VideoCall extends Component {
	render() {
		return (
			<AgoraVideoCall
				channel={'Video Call'}
				transcode={'live'}
				videoProfile={'720p_1'}
				appId={'29dd93949644448795f27787786ed299'}
				uid={null}
			/>
		);
	}
}

export default VideoCall;
