import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import jwt_decode from "jwt-decode";
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  token;
  decoded;
  AllNotes;
  loaded=false;
  NoteID;
  constructor(private _Router:Router,private _NoteService:NotesService,private _AuthService:AuthService) {
    
    //to handel if the user put any token
    try {
      this.token = localStorage.getItem("TOKEN");
      this.decoded = jwt_decode(this.token);
      //console.log(this.decoded);
    }
    catch (error) {
      localStorage.clear();
      this._Router.navigate(['/signin']);
      //this._AuthService.isLoggedIn();
    }

    if(!localStorage.getItem("TOKEN")){

      this._Router.navigate(['/signin'])
    }

    this.getAllNotes();
  }

  getAllNotes(){
    let data={
      token:this.token,
      userID:this.decoded._id
    }
    this._NoteService.getAllNotes(data).subscribe(response=>{

      if(response.message="success"){ 
      this.loaded=true;
      this.AllNotes=response.Notes;
    }
    else{
      localStorage.clear();
      this._Router.navigate(['/signin']);
    }
      //console.log(response)
    });
  }

/************************************************AddNote********************* */
  addNoteForm=new FormGroup({
    title:new FormControl('',Validators.required),
    desc:new FormControl('',Validators.required)
  });

  addNote(){
    let data={
      title:this.addNoteForm.value.title,
      desc:this.addNoteForm.value.desc,
      token:this.token,
      citizenID:this.decoded._id
    }

    this._NoteService.addNote(data).subscribe(response=>{
      if(response.message="success"){
        $('#addnote').modal('hide');
        this.getAllNotes();
        this.addNoteForm.reset();
      }
      //console.log(response)
    });
    console.log(this.addNoteForm.value);
  }

/***************************************EditNote********************* */
EditNoteForm=new FormGroup({
  title:new FormControl('',Validators.required),
  desc:new FormControl('',Validators.required)
});

//set the value in the edit form
setValue(){
  for(let i=0;i<this.AllNotes.length;i++){
    if(this.AllNotes[i]._id==this.NoteID){
      //console.log(this.AllNotes[i]);
      this.EditNoteForm.controls.title.setValue(this.AllNotes[i].title);
      this.EditNoteForm.controls.desc.setValue(this.AllNotes[i].desc);
    }
  }
}

  editNote(){
      let data={
        title:this.EditNoteForm.value.title,
        desc:this.EditNoteForm.value.desc,
        NoteID:this.NoteID,
        token:this.token
      }
      //console.log(data);
      this._NoteService.updateNote(data).subscribe(response=>{
          //console.log(response);
          if(response.message=='updated')
        {
          $("#Editnote").modal("hide");
          this.getAllNotes();
          this.EditNoteForm.reset();
        }
        
      });

  }

/******************************************DeleteNote********************* */
  getNoteID(id){
    //console.log(id);
    this.NoteID=id;
  }
  deleteNote(){
    let data={
      token: this.token,
      NoteID: this.NoteID,
    }
    this._NoteService.deleteNote(data).subscribe(response=>{

      if(response.message=="deleted"){ 
        $('#Deletenote').modal('hide');
        this.getAllNotes();
      }
      //console.log(response)
    });
  }

  ngOnInit(): void {

  }

}
