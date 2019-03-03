import React from 'react';
import { View, Text, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo';

const LOCAL_NOTIFICATION_KEY = 'UdaciFlashcards:notifications';


export function clearLocalNotifications () {
	return AsyncStorage.removeItem(LOCAL_NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)


}


export function createLocalNotification () {
	return {
		title: "Hey, take a Quiz",
		body: "Don't forget to take a quuuuiz",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'low',
			sticky: false,
			vibrate: true
		}
	}
}

export function setLocalNotification () {
	AsyncStorage.getItem(LOCAL_NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((result) => {
			if (result === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if ( status === 'granted' ) {
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(18)
							tomorrow.setMinutes(0)

							Notifications.scheduleLocalNotificationAsync(
								createLocalNotification(),
								{
									time: tomorrow,
									repeat: 'day'
								}

							)

							AsyncStorage.setItem(LOCAL_NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}


