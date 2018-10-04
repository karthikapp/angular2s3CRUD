import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import {} from 'rxjs/add/observable/of';
import { FileUpload } from '../model/fileupload';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

	FOLDER = ' ';
  BUCKET = 'webpackdemo';
  fileUploads: Observable<Array<FileUpload>>;

 //Observable<Array<FileUpload>>;

 constructor() { }
 
 uploadFile(file) {

const bucket = new S3(
      {
        accessKeyId: 'AKIAIWXWNYOKGUNGZHKA',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );


 const params = {
      Bucket: 'webpackdemo',
      Key: this.FOLDER + file.name,
      Body: file
    };
 
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
 
      console.log('Successfully uploaded file.', data);
      return true;
    });
  

   }

getS3Bucket(){
	
	const fileUploads = new Array<FileUpload>();
 
	const params = {
	      Bucket: this.BUCKET
	     // Prefix: this.FOLDER
	     //Key: this.filename

	    };

	var s3 = new S3({
		accessKeyId: 'AKIAIWXWNYOKGUNGZHKA',
        secretAccessKey: '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',
        region: 'us-east-1'}
        );

	
	
	s3.listObjects(params, function (err, data) {
		//console.log(params);
		if (err) {
         console.log('There was an error getting your files: ' + err);
         return;
	}

 
      console.log('Successfully get files.', data);
 
      const fileDatas = data.Contents;
      fileDatas.forEach(function (file) {
      fileUploads.push(new FileUpload(file.Key, 'https://s3.amazonaws.com/' + params.Bucket + '/' + file.Key));
     console.log(fileUploads);
      });
    });
 
 	console.log(fileUploads);
    return fileUploads;
  }

  deletefile(filename){
  	 const params = {
      Bucket: this.BUCKET,
      Key: filename
    };
 
 var s3 = new S3({
 		accessKeyId: 'AKIAIWXWNYOKGUNGZHKA',
        secretAccessKey: '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',
        region: 'us-east-1'});

    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log('There was an error deleting your file: ', err.message);
        return;
      }
      console.log('Successfully deleted file.');
    });
  }

  }

 

