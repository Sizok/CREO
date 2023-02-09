const Pipedrive = require('pipedrive');


class PipeDriveApi {
    constructor(user){
        this.user = user;
        this.userList = [];
        this.currentUser ={};
        this.currentUrl = '';
    }
    compareUser(){
        let dataUser = {
            userId: '',
            emailHere: false,
            phoneHere: false,
            user: {}
        }
        for(let user of this.userList){
            dataUser.phoneHere = this.comparePhones(user);
            dataUser.emailHere = this.compareEmails(user);
            if(dataUser.phoneHere || dataUser.emailHere){
                dataUser.userId = user.item.id;
                dataUser.user = user;
                 return dataUser;
            }
        }

        
    }
    comparePhones(user){
        if(this.user.phone){
            for(let phone of user.item.phones){
                let regExpr = new RegExp(/[^\+0-9]/g);
                phone = phone.replace(regExpr,'');
                if(this.user.phone == phone){
                    return true;
                } else{
                    return false;
                }  
            }
        }
    }
    compareEmails(user){
        if(this.user.email){
            for(let email of user.item.emails){
                if(this.user.email == email){
                    return true;
                } else{
                    return false;
                }
            }
        }
    }
    
    setUserData(user){
        this.user = user;
    }
    setCurrentUser(user){
        this.currentUser = user;
    }
    setUserList(userList){
        this.userList = userList;
        let user = this.compareUser();
        this.setCurrentUser(user);
    }
    setCurrentUrl(url){
        this.currentUrl = url;
    }
}

module.exports = PipeDriveApi;