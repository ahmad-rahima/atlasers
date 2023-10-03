import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostsActions } from 'src/app/state/actions/posts.actions';

interface File {
  content: ArrayBuffer | null | string;
  filename: string;
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  form = this.fb.group({
    // tags: this.fb.array([]),
    // files: this.fb.array([]),
    file: [null as unknown as File],
    content: [''],
  });

  fileDataUrl = '#';
  onFileInput(event: any) {
    console.log(event.target.files);

    let fr = new FileReader();
    fr.onload = (_data) => {
      console.log(fr.result);
      this.fileDataUrl = fr.result as string;
    }
    fr.readAsDataURL(event.target.files[0]);

    this.form.patchValue({ file: event.target.files[0] });
  }

  onSubmit_() {
    const value = {
      content: this.form.value.content || '',
    };

    this.store.dispatch(PostsActions.addPost(value));
    this.router.navigate(['..']);
  }

  onSubmit() {
    const { value } = this.form;
    const fd = new FormData();
    fd.append('content', value.content as string);
    if (value.file)
      fd.append('file', value.file as any, (value.file as any).name);
    this.store.dispatch(PostsActions.addPost({ fd }));
  }
}
