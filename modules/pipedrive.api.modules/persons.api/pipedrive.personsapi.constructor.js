const Pipedrive = require('pipedrive');

class PipedrivePersonsApiConstructor{

    addPersonsConstructor(user){
        debugger;
        let opts = Pipedrive.NewPerson.constructFromObject({
          'name':user.name,
          'email': [{'value': user.email, 'primary': 'true', 'label': 'main'}],
          'phone': [{'value': user.phone, 'primary': 'true', 'label': 'mobile'}]
          });

        return opts;
    }

    updatePersonsConstructor(findingUser ,user){
        let userUpdateData = {
            'email': [],
            'phone': []
          }
        if(!findingUser.emailHere){
            let item = {'value': user.email, 'primary': 'true', 'label': 'main'};
            userUpdateData.email.push(item);
          }
        for(let item of findingUser.user.item.emails){
        let itemEmail = {'value':item};
        userUpdateData.email.push(itemEmail);
        }
        if(!findingUser.phoneHere){
            let item = {'value': user.phone, 'primary': 'true', 'label': 'mobile'};
            userUpdateData.phone.push(item);
        }
        for(let item of findingUser.user.item.phones){
            let itemPhone = {'value':item};
            userUpdateData.phone.push(itemPhone);
        }
        let  opts = Pipedrive.UpdatePerson.constructFromObject({
            'email': userUpdateData.email,
            'phone': userUpdateData.phone
          });

        return opts;
    }
}

module.exports = PipedrivePersonsApiConstructor;