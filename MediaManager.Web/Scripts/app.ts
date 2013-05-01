///<reference path="typings/AzureMobileServicesClient/AzureMobileServicesclient.d.ts" />

// Module
module MediaManager {

    export class App {
        private client: Microsoft.WindowsAzure.MobileServiceClient;

        constructor (public serviceUrl: string, public serviceKey: string) {
            this.client = new WindowsAzure.MobileServiceClient(serviceUrl, serviceKey);
        }

        currentUser() {
            return this.client.currentUser;
        }

        isLoggedIn() {
            return (this.client.currentUser !== null);
        }

        logIn(): Microsoft.WindowsAzure.asyncPromise {
            return this.client.login("twitter");
        }

        logOut() {
            this.client.logout();
        }

        readPolls(): Microsoft.WindowsAzure.asyncPromise {
            return this.client.getTable('MVPoll').read();
        }
    }
}