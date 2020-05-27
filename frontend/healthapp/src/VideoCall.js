import React, { Component } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

class VideoCall extends Component {
	componentWillMount() {
		var rtc = {
			client: null,
			joined: false,
			published: false,
			localStream: null,
			remoteStreams: [],
			params: {},
		};

		// Options for joining a channel
		var option = {
			appID: '29dd93949644448795f27787786ed299',
			channel: 'Channel name',
			uid: null,
			token: 'Your token',
		};

		// creates a client
		rtc.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });

		// Initialize the client
		rtc.client.init(
			option.appID,
			function() {
				// Join a channel
				rtc.client.join(
					option.token,
					option.channel,
					option.uid,
					function(uid) {
						// Create a local stream
						rtc.localStream = AgoraRTC.createStream({
							streamID: rtc.params.uid,
							audio: true,
							video: true,
							screen: false,
						});
						// Initialize the local stream
						rtc.localStream.init(
							function() {
								// Publish the local stream
								rtc.client.publish(rtc.localStream, function(
									err
								) {
									console.log('publish failed');
									console.error(err);
								});
								console.log('init local stream success');
								// play stream with html element id "local_stream"
								rtc.localStream.play('local_stream');
							},
							function(err) {
								console.error('init local stream failed ', err);
							}
						);
						console.log(
							'join channel: ' +
								option.channel +
								' success, uid: ' +
								uid
						);
						rtc.params.uid = uid;
					},
					function(err) {
						console.error('client join failed', err);
					}
				);
				console.log('init success');
			},
			(err) => {
				console.error(err);
			}
		);
		rtc.client.on('stream-added', function(evt) {
			var remoteStream = evt.stream;
			var id = remoteStream.getId();
			if (id !== rtc.params.uid) {
				rtc.client.subscribe(remoteStream, function(err) {
					console.log('stream subscribe failed', err);
				});
			}
			console.log('stream-added remote-uid: ', id);
		});
		rtc.client.on('stream-subscribed', function(evt) {
			var remoteStream = evt.stream;
			var id = remoteStream.getId();
			// Add a view for the remote stream.
			addView(id);
			// Play the remote stream.
			remoteStream.play('remote_video_' + id);
			console.log('stream-subscribed remote-uid: ', id);
		});
		rtc.client.on('stream-removed', function(evt) {
			var remoteStream = evt.stream;
			var id = remoteStream.getId();
			// Stop playing the remote stream.
			remoteStream.stop('remote_video_' + id);
			// Remove the view of the remote stream.
			removeView(id);
			console.log('stream-removed remote-uid: ', id);
		});
		rtc.client.leave(
			function() {
				// Stop playing the local stream
				rtc.localStream.stop();
				// Close the local stream
				rtc.localStream.close();
				// Stop playing the remote streams and remove the views
				while (rtc.remoteStreams.length > 0) {
					var stream = rtc.remoteStreams.shift();
					var id = stream.getId();
					stream.stop();
					removeView(id);
				}
				console.log('client leaves channel success');
			},
			function(err) {
				console.log('channel leave failed');
				console.error(err);
			}
		);
	}
	render() {}
}

export default PatientPortal;
