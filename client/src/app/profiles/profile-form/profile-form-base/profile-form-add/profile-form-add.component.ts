import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProfileFormBaseComponent } from "../profile-form-base.component";


@Component({
  selector: 'app-profile-form-add',
  templateUrl: '../profile-form-base.component.html',
})
export class ProfileFormAddComponent extends ProfileFormBaseComponent {
  override method: string = 'add';

  override onSubmit(form: NgForm): void {
    console.log('Hello, from the add side!');
  }
}
