var express = require('express');
var router = express.Router();
const path = require('path');
const Pipedrive = require('pipedrive');
const PipedriveApi = require('../modules/pipedrive.module');

// new code for post methods
const PipedrivePersonsApi = require('../modules/pipedrive.api.modules/persons.api/pipedrive.personsapi.module');
const UserStorage = require('../modules/appStorage/userStorage');

const appClient = new Pipedrive.ApiClient();
const _token = 'beba25e8efa27bb2615091ed0ebfa0885c2bf891';

let api_key = appClient.authentications['api_key'];
api_key.apiKey = _token;

let apiInstance = new Pipedrive.PersonsApi(appClient);
let apiDealsInstance = new Pipedrive.DealsApi(appClient);
let apiNotesInstance = new Pipedrive.NotesApi(appClient);

let pipeDriveClass = new PipedriveApi();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next){
  let userData = req.body;

  const term = userData.name;
  apiInstance.searchPersons(term).then((data) => {
    pipeDriveClass.setUserList(data.data.items);
  }, (error) => {
    console.error(error);
  });
});
router.get('/freelancergraphicdesigner', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/freelancerfraphicdesigner.html'));
});
router.get('/marathon', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/marathon.html'));
});
router.post('/marathon', function(req, res, next) {
  debugger;
  let User = new UserStorage(req.body);
  let PersonsApi = new PipedrivePersonsApi(User.getUser());
  PersonsApi.searchPersons(User.user);
  
});
router.get('/uiux', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/uiux.html'));
});
router.post('/uiux', function(req, res, next) {
  debugger;
  let userData = req.body;
  let currentUrl = req.rawHeaders[29];
  const term = userData.name;
  // let PersonsApi = new PipedrivePersonsApi();
  // let obj = PersonsApi.searchPersons(term);
  pipeDriveClass.setUserData(userData);
  pipeDriveClass.setCurrentUrl(currentUrl);
  apiInstance.searchPersons(term).then((data) => {
    if(data.data.items.length > 0){
    pipeDriveClass.setUserList(data.data.items);
    if(pipeDriveClass.currentUser){
      let id = pipeDriveClass.currentUser.userId;
    let userUpdateData = {
      'email': [],
      'phone': []
    } // Number | The ID of the person
    if(!pipeDriveClass.currentUser.emailHere){
      let itemEmail = {'value': pipeDriveClass.user.email, 'primary': 'true', 'label': 'main'};
       userUpdateData.email.push(itemEmail);
    }
    for(let item of pipeDriveClass.currentUser.user.item.emails){
      let itemEmail = {'value':item};
      userUpdateData.email.push(itemEmail);
    }
    if(!pipeDriveClass.currentUser.phoneHere){
      let itemPhone = {'value': pipeDriveClass.user.phone, 'primary': 'true', 'label': 'mobile'};
        userUpdateData.phone.push(itemPhone);
      }
    for(let item of pipeDriveClass.currentUser.user.item.phones){
      let itemPhone = {'value':item};
      userUpdateData.phone.push(itemPhone);
    }
    let opts = Pipedrive.UpdatePerson.constructFromObject(
      {'email': userUpdateData.email,
       'phone': userUpdateData.phone}
    );
    debugger;
    apiInstance.updatePerson(id, opts).then((data) => {
      let opts = Pipedrive.NewDeal.constructFromObject({
      title: 'UIUX',
      person_id: data.data.id,
      pipeline_id: 4
      });
      apiDealsInstance.addDeal(opts).then((data) => {
        let opts = Pipedrive.AddNoteRequest.constructFromObject({
          dealId: data.data.id,
          pinnedToDealFlag: 1,
          content: '<h4>Вміст зявки:</h4><br> <p>Імя: ' + pipeDriveClass.user.name + '<br> Телефон: ' + pipeDriveClass.user.phone + '<br> Email: ' + pipeDriveClass.user.email + '</p>' +'<br><br>'+ '<h4>Деталі зявки:</h4><br> <p>Імя форми: '+ pipeDriveClass.user.formName + '<br> URL адреса сторінки: ' + pipeDriveClass.currentUrl + '<br> utm_source: ' + pipeDriveClass.user.utmSource +'<br> utm_medium: ' + pipeDriveClass.user.utmMedium +'<br> utm_campaign: ' + pipeDriveClass.user.utmCampaign +'</p>'
        });

        apiNotesInstance.addNote(opts).then((data) => {
          console.log('API called successfully. Returned data: ' + data);
          res.sendStatus(200);
        }, (error) => {
          console.error(error);
        });
      }, (error) => {
        console.error(error);
      });
    }, (error) => {
      console.error(error);
    }); 
    }else{
      let opts = Pipedrive.NewPerson.constructFromObject({
        'name': pipeDriveClass.user.name,
        'email': [{'value': pipeDriveClass.user.email, 'primary': 'true', 'label': 'main'}],
        'phone': [{'value': pipeDriveClass.user.phone, 'primary': 'true', 'label': 'mobile'}]
      });
      apiInstance.addPerson(opts).then((data) => {
        let opts = Pipedrive.NewDeal.constructFromObject({
          title: 'UIUX',
          pipeline_id: 4,
          person_id: data.data.id
          });
          apiDealsInstance.addDeal(opts).then((data) => {
            let opts = Pipedrive.AddNoteRequest.constructFromObject({
              dealId: data.data.id,
              pinnedToDealFlag: 1,
              content: '<h4>Вміст зявки:</h4><br> <p>Імя: ' + pipeDriveClass.user.name + '<br> Телефон: ' + pipeDriveClass.user.phone + '<br> Email: ' + pipeDriveClass.user.email + '</p>' +'<br><br>'+ '<h4>Деталі зявки:</h4><br> <p>Імя форми: '+ pipeDriveClass.user.formName + '<br> URL адреса сторінки: ' + pipeDriveClass.currentUrl + '<br> utm_source: ' + pipeDriveClass.user.utmSource +'<br> utm_medium: ' + pipeDriveClass.user.utmMedium +'<br> utm_campaign: ' + pipeDriveClass.user.utmCampaign +'</p>'
            });
    
            apiNotesInstance.addNote(opts).then((data) => {
              console.log('API called successfully. Returned data: ' + data);
              res.sendStatus(200);
            }, (error) => {
              console.error(error);
            });
          }, (error) => {
            console.error(error);
          });

      }, (error) => {
        console.error(error);
      });
    }
  }else{
    let opts = Pipedrive.NewPerson.constructFromObject({
      'name': pipeDriveClass.user.name,
      'email': [{'value': pipeDriveClass.user.email, 'primary': 'true', 'label': 'main'}],
      'phone': [{'value': pipeDriveClass.user.phone, 'primary': 'true', 'label': 'mobile'}]
    });
    apiInstance.addPerson(opts).then((data) => {
        let opts = Pipedrive.NewDeal.constructFromObject({
          title: 'UIUX',
          pipeline_id: 4,
          person_id: data.data.id
          });
          apiDealsInstance.addDeal(opts).then((data) => {
            let opts = Pipedrive.AddNoteRequest.constructFromObject({
              dealId: data.data.id,
              pinnedToDealFlag: 1,
              content: '<h4>Вміст зявки:</h4><br> <p>Імя: ' + pipeDriveClass.user.name + '<br> Телефон: ' + pipeDriveClass.user.phone + '<br> Email: ' + pipeDriveClass.user.email + '</p>' +'<br><br>'+ '<h4>Деталі зявки:</h4><br> <p>Імя форми: '+ pipeDriveClass.user.formName + '<br> URL адреса сторінки: ' + pipeDriveClass.currentUrl + '<br> utm_source: ' + pipeDriveClass.user.utmSource +'<br> utm_medium: ' + pipeDriveClass.user.utmMedium +'<br> utm_campaign: ' + pipeDriveClass.user.utmCampaign +'</p>'
            });
    
            apiNotesInstance.addNote(opts).then((data) => {
              console.log('API called successfully. Returned data: ' + data);
              res.sendStatus(200);
            }, (error) => {
              console.error(error);
            });
          }, (error) => {
            console.error(error);
          });
    }, (error) => {
      console.error(error);
    });
  }
  }, (error) => {
    console.error(error);
  });
})
router.get('/welcomeuiux', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/welcomeuiux.html'));
});

module.exports = router;
