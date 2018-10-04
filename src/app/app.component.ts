import { Component,OnInit} from '@angular/core';

import {FileserviceService} from '../app/fileservice.service'
import { Observable } from 'rxjs';
import { FileUpload } from '../model/fileupload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'webp';
  FOLDER = 'jsa-s3/';
  fileUploads: Array<FileUpload>;


  constructor(public fileservice : FileserviceService){

  }

ngOnInit() {
	this.getfilelist();
  }

fileEvent($event){
	let file = $event.target.files[0];
	this.fileservice.uploadFile(file);
}

getfilelist(){
	console.log('called');
this.fileUploads = this.fileservice.getS3Bucket();
console.log(this.fileUploads);
}

deletes3files(deletefile){
	this.fileservice.deletefile(deletefile)
 console.log(deletefile);

}

  
}
