const Pipedrive = require('pipedrive');
const PipedriveConfig = require('../pipedrive.config.module');
const PipedrivePersonsConstructor = require('./pipedrive.personsapi.constructor');
const FindCurrentUser = require('../../appServices/findCurrentUser');
const PipedriveDealsApi = require('../deals.api/pipedrive.dealsapi.module');


class PipedrivePersonsApi{
    constructor(store){
        this.store = store;
        this.pipedriveConfig = new PipedriveConfig();
        this.appClient = this.pipedriveConfig.getAppClient();
        this.apiInstance = new Pipedrive.PersonsApi(this.appClient);
        this.constructor = new PipedrivePersonsConstructor();
        this.DealsApi = new PipedriveDealsApi();
    }

    addPerson(user){
        let opts = this.constructor.addPersonsConstructor(user);
        this.apiInstance.addPerson(opts).then((data) => {
            console.log('Person added successfully');
            this.DealsApi.addDeal(data.data);
        },(error) => {
            console.log('Error adding person');
            console.log(error);
        });
    }

    searchPersons(user){
        let term = user.name;
        this.apiInstance.searchPersons(term).then((data) => {
            console.log('persons is finding');
            if(data.data.items.length > 0) {
                let findUser = new FindCurrentUser(user, data.data.items)
                let findingUser = findUser.compareUser();
                if(findingUser){
                    this.updatePerson(findingUser);
                }else{
                    this.addPerson(this.store);
                }
            }else{
                this.addPerson(this.store);
            }
        },(error) =>{
            console.log("Error, persons can`t be finding");
            console.log(error);
        })
    }

    updatePerson(data){
        let opts = this.constructor.updatePersonsConstructor(data, this.store);
        this.apiInstance.updatePerson(data.userId, opts).then((data) =>{
            console.log('Person updated successfully');
            this.DealsApi.addDeal(data.data);
        },(error) =>{
            console.log('Error updating person');
            console.log(error);
        })
    }
}

module.exports = PipedrivePersonsApi;