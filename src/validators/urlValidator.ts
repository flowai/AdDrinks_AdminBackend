import { FormControl } from "@angular/forms";


export class urlImageValidator {
 
    static isValid(control: FormControl): any {
 
        if(control.value == null){
            return {
                "empty Value": true
            };
        }
 
        /*if(control.value.slice(control.value.length-3, control.value.length) != 'png'
            || control.value.slice(control.value.length-3, control.value.length) != 'jpg'){
            return {
                "no valid format": true
            };
            }*/
 
        return null;
    }
}