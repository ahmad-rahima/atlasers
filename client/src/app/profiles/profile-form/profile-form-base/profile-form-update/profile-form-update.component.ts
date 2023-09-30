import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { map, switchMap, take } from "rxjs";
import { ProfileFormBaseComponent } from "../profile-form-base.component";


@Component({
  selector: 'app-profile-form-update',
  templateUrl: '../profile-form-base.component.html',
})
export class ProfileFormUpdateComponent extends ProfileFormBaseComponent {
  override method: string = 'update';

  override onSubmit(form: NgForm): void {
    const data = form.form.value;

    this.auth$.pipe(
      take(1),
      map(data => data.userId),
      switchMap(id => this.profilesService.updateProfileById(id, data)),
    ).subscribe();
  }
}
