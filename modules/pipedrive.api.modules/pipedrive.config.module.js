const Pipedrive = require('pipedrive');

class PipedriveConfig {
    constructor() {
        this.appClient = new Pipedrive.ApiClient();
        this.token = 'beba25e8efa27bb2615091ed0ebfa0885c2bf891';
        this.api_key = this.appClient.authentications['api_key'];
    }
    getToken(){
        return this.token;
    }
    getAppClient(){
        this.api_key.apiKey = this.getToken();
        return this.appClient;
    }
}

module.exports = PipedriveConfig;