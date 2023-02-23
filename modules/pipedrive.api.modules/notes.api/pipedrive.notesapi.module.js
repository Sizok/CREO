const PipedriveConfig = require('../pipedrive.config.module');
const Pipedrive = require('pipedrive');
const NotesApiConstructor = require('./pipedrive.notesapi.constructor');

class PipedriveNotesApi{
    constructor(){
        this.pipedriveConfig = new PipedriveConfig();
        this.appClient = this.pipedriveConfig.getAppClient();
        this.apiInstance = new Pipedrive.NotesApi(this.appClient);
        this.NotesApiConstructor = new NotesApiConstructor();
    }

    addNote(data){
        let opts = this.NotesApiConstructor.addNotesConstructor(data);
        this.apiInstance.addNote(opts).then((data) => {
            console.log('Notes added successfully');
        },(error) => {
            console.log('Error adding notes');
            console.log(error);
        });
    }
}

module.exports = PipedriveNotesApi;