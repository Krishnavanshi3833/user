import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { add_user_model } from './users.model';
import {AddUserService} from 'src/app/add-user.service';
import { User } from 'src/app/app.module';
import { UsersServiceService } from 'src/app/users-service.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  [x: string]: any;
  formvalue !: FormGroup;
  add_userobj: add_user_model = new add_user_model();
  add_user_data !: any;
  img_url : string='';
  show_submit !: boolean;
  show_update !: boolean;
  y: any;


  //image upload
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
        this.img_url = event.target.result;
      }
    }
  }






  constructor(private formbuilder:FormBuilder,
    private api : AddUserService,private user: UsersServiceService
    ) {
      //upload data from given api
        this.user.getData().subscribe((val: User) => {
      console.warn(val);
      this.y = val.data;
    })
    }


//defining form
  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      first_name : [''],
      last_name: [''],
      email : [''],
      image: HTMLInputElement
    })
    this.get_added_users();


  }






  //crud operations

  on_click_add_user(){
    this.formvalue.reset();
    this.show_submit =true;
    this.show_update =false;
  }


post_user_details(){
      this.add_userobj.first_name = this.formvalue.value.first_name;
      this.add_userobj.last_name = this.formvalue.value.last_name;
      this.add_userobj.email= this.formvalue.value.email;
      this.add_userobj.image= this.formvalue.value.image

      this.api.post_user(this.add_userobj)
      .subscribe(res =>{
        console.log (res);
        alert ("User added Sucessfully :)")

        let ref = document.getElementById('cancel')
        ref?.click();
        this.formvalue.reset();
        this.get_added_users();
      },
      err=>{
        alert ("Ooopss Something went Wrong :(")
      })

}
get_added_users(){
  this.api.get_user()
  .subscribe(res =>{
this.add_user_data =res;
  })
}
delete_users(row : any ){
  this.api.delete_user(row.id)
  .subscribe(res =>{
    alert("User Deleted");
    this.get_added_users();
  })
}
edit_users(row:any){
  this.add_userobj.id= row.id;

  this.formvalue.controls['first_name'].setValue(row.first_name);
  this.formvalue.controls['last_name'].setValue(row.last_name);
  this.formvalue.controls['email'].setValue(row.email);

  this.show_submit =false;
  this.show_update =true;
}
update_user_details(){
  this.add_userobj.first_name = this.formvalue.value.first_name;
  this.add_userobj.last_name = this.formvalue.value.last_name;
  this.add_userobj.email= this.formvalue.value.email;

  this.api.update_user(this.add_userobj,this.add_userobj.id)
  .subscribe(res=>{
    alert("updated sucessfully :)")

    let ref = document.getElementById('cancel')
    ref?.click();
    this.formvalue.reset();
    this.get_added_users();
  })
}
view_users(row:any){
  this.formvalue.controls['first_name'].setValue(row.first_name);
  this.formvalue.controls['last_name'].setValue(row.last_name);
  this.formvalue.controls['email'].setValue(row.email);

  this.show_submit =false;
  this.show_update =false;

  let ref = document.getElementById('cancel')
  ref?.click();
}

}




