import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { CookieService } from "angular2-cookie/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile:File=null;
  //constructor(private http: HttpClient) {};
  constructor(private _cookieService: CookieService, private http: HttpClient) {};
  ngOnInit(): void {
    this._cookieService.set("session_id", "417aa191-9a6d-11ea-8bbe-823ea82cdb18-77");
    console.log("Set session_id Cookie as session_id");
  }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }


  onFileSelected(event){
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(){
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('fileName',this.selectedFile.name);
    fd.append('userId','praween');
    fd.append('session_id','417aa191-9a6d-11ea-8bbe-823ea82cdb18-77');
    this.http.post("http://localhost:8063/dms/api/v1/emrImage",fd)
          .subscribe(res => {
            console.log(res);
          });
  }
}
