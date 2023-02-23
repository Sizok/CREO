const PipedriveConfig = require('../pipedrive.config.module');
const Pipedrive = require('pipedrive');
const DealsApiConstructor = require('../deals.api/pipedrive.dealsapi.constructor');
const NotesApi = require('../notes.api/pipedrive.notesapi.module');

class PipedriveDealsApi{
    constructor(){
        this.pipedriveConfig = new PipedriveConfig();
        this.appClient = this.pipedriveConfig.getAppClient();
        this.apiInstance = new Pipedrive.DealsApi(this.appClient);
        this.dealsConstructor = new DealsApiConstructor();
        this.notesApi = new NotesApi();
    }

    addDeal(data){
        let opts = this.dealsConstructor.addDealsConstructor(data);
        this.apiInstance.addDeal(opts).then((data) => {
            console.log('Deals added successfully');
            this.notesApi.addNote(data.data);
        },(error) => {
            console.log('Error adding deals');
            console.log(error);
        });
    }
}

module.exports = PipedriveDealsApi;