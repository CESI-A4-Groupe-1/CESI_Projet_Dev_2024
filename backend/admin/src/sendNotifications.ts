import axios from 'axios';

interface Notification {
    title: string;
    body: string;
}

async function sendNotification(userId: number, notification: Notification) {
    const url = `http://notifications:3006/notifications/send/${userId}`; // FIXME

    try {
        const response = await axios.post(url, {
            notification,
        });

        console.log('Notification sent successfully:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error sending notification:', error.response?.data || error.message);
        } else {
            console.error('Error sending notification:', error);
        }
    }
}

export default sendNotification;
