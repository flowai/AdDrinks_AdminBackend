import { Injectable } from "@angular/core";

@Injectable()
export class InputValidator {
    constructor(){}
	
  isValidType(type : string) {
    if(!type) {
        console.log("Type must not be null!");
        alert("Bitte einen Typ eingeben");
        return false;
    }
    return true;
  }

  
}