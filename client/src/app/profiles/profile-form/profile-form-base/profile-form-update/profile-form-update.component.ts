import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { map, switchMap, take } from "rxjs";
import { ProfileFormBaseComponent } from "../profile-form-base.component";
import { Profile } from "src/app/dto";
import { ProfileActions } from "src/app/state/actions/profile.actions";


@Component({
  selector: 'app-profile-form-update',
  templateUrl: '../profile-form-base.component.html',
})
export class ProfileFormUpdateComponent extends ProfileFormBaseComponent {
  override method: string = 'update';

  toFormData(data: Record<string, any>) {
    const fd = new FormData();
    Object.entries(data)
      .forEach(([key, value]) => fd.append(key, value));

    return fd;
  }

  override onSubmit(form: NgForm): void {
    let data: Profile | FormData = form.form.value;
    if (this.file) {
      data = this.toFormData(data);
      data.append('picture', this.file, this.file.name);
    }

    this.auth$.pipe(
      take(1),
      map(data => data.userId),
    ).subscribe((id: string) => {
      this.store.dispatch(ProfileActions.updateProfile({ id, profile: { fd: data as FormData } }));
    });
  }
}
