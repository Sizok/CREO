const Pipedrive = require('pipedrive');

class PipedriveDealsApiConstructor{
    addDealsConstructor(data){
        let opts = Pipedrive.NewDeal.constructFromObject({
            title: 'TEST',
            person_id: data.id,
            pipeline_id: 4
        });

          return opts;
    }
}

module.exports = PipedriveDealsApiConstructor;