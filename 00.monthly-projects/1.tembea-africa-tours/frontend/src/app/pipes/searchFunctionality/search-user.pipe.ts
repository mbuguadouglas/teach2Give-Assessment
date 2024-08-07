import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/users';

@Pipe({
  name: 'searchUser',
  standalone: true
})
export class SearchUserPipe implements PipeTransform {

  transform(users: Array<User>, searchItem:string): Array<User> {
    if (searchItem === '' || users.length ===0){
      return users
    }

    let filteredArray = []
    for(let user of users){
      // search the user baased on either email or username
     if(user.u_name.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()) || user.u_email.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase())){
      filteredArray.push(user)
     }
    }
    return filteredArray
  }

}
