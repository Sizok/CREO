class FindCurrentUser{
    constructor(user, userList){
        this.user = user;
        this.userList = userList;
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
            }else{
                return null;
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
                }
            }
        }
    }
    compareEmails(user){
        if(this.user.email){
            for(let email of user.item.emails){
                if(this.user.email == email){
                    return true;
                } 
            }
        }
    }
};

module.exports = FindCurrentUser;