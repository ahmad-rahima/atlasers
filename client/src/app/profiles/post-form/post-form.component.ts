import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostsActionsDispatcherService } from 'src/app/posts/posts-actions-dispatcher.service';
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
  private router = inject(Router);
  private actionsDispatcher = inject(PostsActionsDispatcherService);

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

    this.actionsDispatcher.addPost(value);
    this.router.navigate(['..']);
  }

  onSubmit() {
    const { value } = this.form;
    const fd = new FormData();
    fd.append('content', value.content as string);
    if (value.file)
      fd.append('file', value.file as any, (value.file as any).name);
    this.actionsDispatcher.addPost({ fd });
  }
}
