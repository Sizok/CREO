const Pipedrive = require('pipedrive');

class PipedriveNotesApiConstructor{
    addNotesConstructor(user){
        debugger;
        let rowContent = this.buildContent(user.person_id);
        let opts = Pipedrive.AddNoteRequest.constructFromObject({
            dealId: user.id,
            pinnedToDealFlag: 1,
            content: rowContent
          });

        return opts;
    }

    buildContent(userData){
        debugger;
        let currentUserData = {
            name: userData.name,
            email: '',
            phone: ''
        };
        for(let item of userData.email){
            if(item.primary){
                currentUserData.email = item.value;
            }
        }
        for(let item of userData.phone){
            if(item.primary){
                currentUserData.phone = item.value;
            }
        }
        let result = '<h4>Вміст зявки:</h4><br> <p>Імя: ' + currentUserData.name + '<br> Телефон: ' + currentUserData.phone + '<br> Email: ' + currentUserData.email + '</p>' +'<br><br>'+ '<h4>Деталі зявки:</h4><br> <p>Імя форми: '+ undefined + '<br> URL адреса сторінки: ' + undefined + '<br> utm_source: ' + undefined +'<br> utm_medium: ' + undefined +'<br> utm_campaign: ' + undefined +'</p>'
        return result;
    }
}

module.exports = PipedriveNotesApiConstructor;