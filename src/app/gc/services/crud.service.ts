import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {error} from "util";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url = 'http://localhost:8085/';
  ref: any;
  mang: any;
  Pc: any;

  constructor(private http: HttpClient) {
  }

  getItems(type: String) {
    return this.http.get(this.url + type);
  }

  getlinkItem(type: string) {
    return this.http.get(type);
  }

  getItemsById(type: String, id: number) {
    return this.http.get(this.url + type + '/' + id);
  }

  addItem(type: String, object: any) {
    return this.http.post(this.url + type, object).subscribe(
      data => {
        console.log(data);

      }, error => {
        console.log(error);

      }
    );
  }

  addItemNoSubscribe(type: String, object: any) {
    return this.http.post(this.url + type, object);
  }

  /*  addManagerRefItem(type: String, objectRef: any, objectMan: any) {
      return this.http.post(this.url + type, objectRef).subscribe(
        (data) => {
          this.ref = data;
          console.log(data);
          this.http.post(this.url + 'managers', objectMan).subscribe(
            (data2) => {
              this.mang = data2;
              console.log(data2);
              this.http.put(this.ref._links.manager.href, this.mang._links.self.href,
                {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
                data3 => {
                  console.log(data3);
                }, error => {
                  console.log(error);
                }
              );*/
  addManagerRefItem(type: String, objectRef: any, objectMan: any, objectStruct: any) {
    return this.http.post(this.url + type, objectRef).subscribe(
      (data) => {
        this.ref = data;
        console.log(data);
        this.http.post(this.url + 'managers', objectMan).subscribe(
          (data2) => {
            this.mang = data2;
            console.log(data2);
            this.http.put(this.ref._links.manager.href, this.mang._links.self.href,
              {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
              data3 => {
                console.log(data3);
                this.http.put(this.ref._links.structure.href, objectStruct._links.self.href,
                  {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
                  data4 => {
                    console.log(data4);
                  }, error => {
                    console.log(error);
                  }
                );
              }, error => {
                console.log(error);
              }
            );
          }
        );

      }
    );
  }

  /*
    addManagerPcompRefItem(type: String, objectRef: any, objectMan: any, objectPc: any) {
      return this.http.post(this.url + type, objectRef).subscribe(
        (data) => {
          this.ref = data;
          console.log(data);
          this.http.post(this.url + 'managers', objectMan).subscribe(
            (data2) => {
              this.mang = data2;
              console.log(data2);
              this.http.post(this.url + 'parentCompanies', objectPc).subscribe(
                (data3) => {
                  this.Pc = data3;
                  console.log(data3);
                  this.http.put(this.ref._links.manager.href, this.mang._links.self.href,
                    {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
                    data4 => {
                      console.log(data4);
                      this.http.put(this.ref._links.parentCompany.href, this.Pc._links.self.href,
                        {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
                        (data5) => {
                          console.log(data5);
                        }, error => {
                          console.log(error);
                        }
                      );
                    }
                  );
                }
              );*/
  addManagerPcompRefItem(type: String, objectRef: any, objectMan: any, objectPc: any, objectStruct: any) {
    return this.http.post(this.url + type, objectRef).subscribe(
      (data) => {
        this.ref = data;
        console.log(data);
        this.http.post(this.url + 'managers', objectMan).subscribe(
          (data2) => {
            this.mang = data2;
            console.log(data2);
            this.http.post(this.url + 'parentCompanies', objectPc).subscribe(
              (data3) => {
                this.Pc = data3;
                console.log(data3);
                this.http.put(this.ref._links.manager.href, this.mang._links.self.href,
                  {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
                  data4 => {
                    console.log(data4);
                    this.http.put(this.ref._links.parentCompany.href, this.Pc._links.self.href,
                      {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
                      (data5) => {
                        console.log(data5);
                        this.http.put(this.ref._links.structure.href, objectStruct._links.self.href,
                          {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
                          data4 => {
                            console.log(data4);
                          }, error => {
                            console.log(error);
                          }
                        );
                      }, error => {
                        console.log(error);
                      }
                    );
                  }
                );
              }
            );
          }
        );

      }
    );
  }

  updateItem(object) {
    return this.http.put(object._links.self.href, object).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);

      }
    );
  }

  updateItemNoSubscribe(object) {
    return this.http.put(object._links.self.href, object);
  }

  //updatePcDelegItem(objectRef,objectPc) {
  // return this.http.put(objectRef._links.self.href,objectRef).subscribe(
  //   data =>{
  //   console.log(data);
  // this.http.post(this.url+'parentCompanies',objectPc).subscribe(
  //// data2 =>{
  //this.Pc= data2;
  //console.log(data2);
  //this.http.put(this.ref._links.parentCompany.href,this.Pc._links.self.href,
  // {headers:new HttpHeaders({'Content-Type':'text/uri-list'})}).subscribe(
  //(data3) =>{
  // console.log(data3);
  //},error => {
  // console.log(error);
  // }
  //);
  //}
  //);
  //},error => {
  //console.log(error);

  //}
  //);
  //}
  updateRefStructItem(object, objectStruct) {
    return this.http.put(object._links.self.href, object).subscribe(
      data => {
        console.log(data);
        // @ts-ignore
        this.http.put(data._links.structure.href, objectStruct._links.self.href,
          {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
          data4 => {
            console.log(data4);
          }, error => {
            console.log(error);
          }
        );
      }, error => {
        console.log(error);

      }
    );
  }

  updateContractRef(objectCont: any, objectRef: any, refType: any, documentSignedMarket: any, documentSignedContract: any) {
    return this.http.put(objectCont._links.self.href, objectCont).subscribe(
      (data: any) => {
        //console.log(data);
        if (!refType) {
          // @ts-ignore
          this.http.put(data._links.sDLReference.href, objectRef._links.self.href,
            {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
            data3 => {
              const signedMarket:string = data._links.signedMarket.href.replace('{?projection}', '');
              const signedContract:string = data._links.signedContract.href.replace('{?projection}', '');

              this.http.put(signedMarket, documentSignedMarket._links.self.href, {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
                (data4: any) => {
                  this.http.put(signedContract, documentSignedContract._links.self.href,
                    {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(data5 => {

                  }, error1 => {
                    console.log(error1);
                  })

                }, error => {
                  console.log(error);
                }
              );
            }, error => {
              console.log(error);
            }
          );
        } else {
          // @ts-ignore
          this.http.put(data._links.delegateReference.href, objectRef._links.self.href,
            {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
            data4 => {
              console.log(data4);
            }, error => {
              console.log(error);
            }
          );
        }
      }, error => {
        console.log(error);

      }
    );
  }

  addContractRefSDLItem(type: String, objectCont: any, objectRef: any, documentSignedMarket: any, documentSignedContract: any) {
    return this.http.post(this.url + type, objectCont).subscribe(
      (data: any) => {
        this.http.put(data._links.sDLReference.href, objectRef._links.self.href,
          {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
          (data3: any) => {

            const signedMarket = data._links.signedMarket.href.replace('{?projection}', '');
            const signedContract = data._links.signedContract.href.replace('{?projection}', '');

            this.http.put(signedMarket, documentSignedMarket._links.self.href, {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
              (data4: any) => {
                this.http.put(signedContract, documentSignedContract._links.self.href,
                  {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(data5 => {

                }, error1 => {
                  console.log(error1);
                })

              }, error => {
                console.log(error);
              }
            );
          }, error => {
            console.log(error);
          }
        );
      }
    );

  }

  addContractRefDelegItem(type: String, objectCont: any, objectRef: any, documentSignedMarket: any, documentSignedContract: any) {
    return this.http.post(this.url + type, objectCont).subscribe(
      (data: any) => {
        /*console.log(objectRef);
        console.log(data);*/
        this.http.put(data._links.delegateReference.href, objectRef._links.self.href,
          {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
          (data3: any) => {

            const signedMarket = data._links.signedMarket.href.replace('{?projection}', '');
            const signedContract = data._links.signedContract.href.replace('{?projection}', '');

            this.http.put(signedMarket, documentSignedMarket._links.self.href, {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(
              (data4: any) => {
                this.http.put(signedContract, documentSignedContract._links.self.href,
                  {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})}).subscribe(data5 => {

                }, error1 => {
                  console.log(error1);
                })

              }, error => {
                console.log(error);
              }
            );
          }, error => {
            console.log(error);
          }
        );
      }
    );

  }

  deleteItem(object: any) {
    return this.http.delete(object._links.self.href).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);

      }
    );
  }

  linkItems(object1Link: string, typeToLinkWith: string, id: number) {
    return this.http.put(object1Link, this.url + typeToLinkWith + '/' + id,
      {headers: new HttpHeaders({'Content-Type': 'text/uri-list'})});
  }

}
