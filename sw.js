// सर्व्हिस वर्कर बॅकग्राउंड स्क्रिप्ट
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// जेव्हा तुम्ही मोबाईलवरील नोटिफिकेशनवर क्लिक कराल, तेव्हा पेज ओपन होईल
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // नोटिफिकेशन बंद करा
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});