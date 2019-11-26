import { Component, OnInit } from '@angular/core';
import { mainService } from 'app/services/main.services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as swal from 'sweetalert2';;
import { NgbDateStruct  } from '@ng-bootstrap/ng-bootstrap';
 


@Component({
  selector: 'app-expert-update',
  templateUrl: './expert-update.component.html',
  styleUrls: ['./expert-update.component.scss'],
 
})
export class ExpertUpdateComponent implements OnInit {
  update_expert:FormGroup;
  expert_details:any=[];
  user_deatail:any=[];
  user_profile:any=[];
  subject_list:Array<any> = [];
  checked_subject:any=[]
  subject_list_return:any= [];

  emailFormArray:any= [];
  total_id_set:any=[]
  expert_dob;
 minDate={year: 1940, month: 12, day: 31};
 maxDate={year: 2004, month: 12, day: 31};
 
  constructor(private main_service:mainService, private fb:FormBuilder, private _route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    // get_id
    let expert_id=this._route.snapshot.params['id'];
  //  console.log(expert_id)
    // subject list fetch
    this.main_service.subject_list()
    .subscribe(data=>{
     // console.log(data);
       let res:any=data;
       if(res.status==200){
         this.subject_list=res.data
       //  console.log(this.subject_list)
         setTimeout(() =>         
         this.update_expert.patchValue({ 
          subject_new : this.subject_list, 
        }), 
        
        
        250);
       

       }
    })
    // user details fetch
    this.main_service.expert_details(expert_id)
    .subscribe(data=>{
     // console.log(data);
      let res:any=data;
      let user=res.data.user;
     this.user_deatail=res.data.user;
     this.expert_dob=user.dob;
     let user_profile=res.data.user.profile;
     let expert_subject:any=res.data.user.skill_subject;
     this.checked_subject=res.data.user.skill_subject;
    
     this.checked_subject.forEach(val => {
   //   console.log(val.id);
      this.total_id_set.push(val.subject_id)
      });
      //console.log(this.total_id_set)
      this.emailFormArray=this.total_id_set
   //  console.log(this.checked_subject)
     // console.log(user)
      if(res.status==200){
        this.update_expert.patchValue({
          name : user.name,
          gender :user.gender,
          dob : this.expert_dob,

          highest_qualification : user_profile.highest_qualification,
          passing_year :user_profile.passing_year ,
          college :user_profile.college ,
          per_page_cost : user_profile.per_page_cost,
          subject_old :expert_subject,  //    
          subject:this.total_id_set,
          
          experience :user_profile.experience ,
          working : user_profile.working,
          address :user.address,
          pincode :user.pincode 
        })
        //  set time out 
      }
    })

    //  form start
    this.update_expert=this.fb.group({
      id:expert_id,
      name :['',[Validators.required]],
      gender :['',[Validators.required]],
      dob :this.expert_dob,
      highest_qualification :['',[Validators.required]],
      passing_year :['',[Validators.required]],
      college :['',[Validators.required]],
      per_page_cost :['',[Validators.required]],
  
      subject :this.emailFormArray,
      subject_old:[],
 
      experience :['',[Validators.required]],
      working :['',[Validators.required]],
      address :['',[Validators.required]],
      pincode :['',[Validators.required]] 
      
    })
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.call_chec_box()
    }, 3000);
    
    console.log(this.checked_subject)       
  } //  end ng onit

  onSubmit(){
    let form_data=this.update_expert.value;
    console.log(form_data);
  //  console.log('sadas')
  // set date of birth format
  let formValues = this.update_expert.value;
 // console.log(formValues)
  this.update_expert.value['dob'] = this.expert_dob;


   // start services
    this.main_service.expert_update(form_data)
    .subscribe(data=>{
      console.log(data);
      let res:any=data;
      if(res.status==202){
      
        swal({
          title: "Expert Details successfully update!",
          type: 'success',
        })
        this.router.navigate(['/experts']);
      }
    })
  }

 
  //this.subject_list
 
call_chec_box(){
  let chck_subject=this.checked_subject
  let subject_lst=this.subject_list
  this.subject_list.forEach(function (val) {

    chck_subject.forEach(function(val1){
      if (val.id == val1.subject_id) {
          var add_check="status";
          var new_check="true";
          val[add_check]=new_check;        
      } // end if     
    })   

  });
  //console.log(subject_lst)

return this.subject_list_return=subject_lst
} // end

onChange(email:string, isChecked: boolean) { 
  //console.log(isChecked)
  if(isChecked) {
    this.emailFormArray.push(email);
  } else {
    let index = this.emailFormArray.indexOf(email);
    this.emailFormArray.splice(index,1);
  }
}
//  on calendar click and change date format
OnDateSelect($e){
  console.log($e)

  let ngbDate =$e
  // let myDate =new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
   // console.log(ngbDate)
  let get_yr=ngbDate.year;
  let get_mnth=ngbDate.month-1;
  let get_dy=ngbDate.day;
  let total_date= get_yr+'-'+ get_mnth+'-'+get_dy;
  // this.update_expert.patchValue({
  //   dob:total_date
  // })
  // let formValues = this.update_expert.value;
  //console.log(formValues)
  // this.update_expert.value['dob'] = total_date;
  //  console.log(formValues)
return this.expert_dob= total_date;

}


}
