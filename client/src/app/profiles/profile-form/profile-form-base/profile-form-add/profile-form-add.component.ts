import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProfileFormBaseComponent } from "../profile-form-base.component";
import { Profile } from "src/app/dto";
import { ProfileActions } from "src/app/state/actions/profile.actions";
import { map, switchMap, take } from "rxjs";


@Component({
  selector: 'app-profile-form-add',
  templateUrl: '../profile-form-base.component.html',
})
export class ProfileFormAddComponent extends ProfileFormBaseComponent {
  override method: string = 'add';

  toFormData(data: Record<string, any>) {
    const fd = new FormData();
    Object.entries(data)
      .forEach(([key, value]) => fd.append(key, value));

    return fd;
  }

  override onSubmit(form: NgForm): void {
    console.log('Submitting..');
    let data: Profile | FormData = form.form.value;
    if (this.file) {
      data = this.toFormData(data);
      data.append('picture', this.file, this.file.name);
    }
    this.store.dispatch(ProfileActions.addProfile({ fd: data as FormData }));
  }
}
