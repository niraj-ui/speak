onSelect(event) {
		const numberOfFiles = event.addedFiles.length || 0;
		console.log(numberOfFiles)
		//.log(event);
		
		  console.log(...event.addedFiles)
		  console.log(event.addedFiles);
		  console.log(event.addedFiles.length)
		if ( event.addedFiles.length <= 2 ) {
			for (let i = 0; i < event.addedFiles.length; i++) {
				console.log(event.addedFiles[i])
                this.t.push(this.fb.group({
                    name: ['', Validators.required],
					email: ['', [Validators.required, Validators.email]],
				//	this.file = 		  
					// 	this.gallery_name.push(event.target.files[i])	
					file_image:[event.addedFiles[i]]
				}));
				
            }
			// top part dummy
		//	this.t.value.push(...event.addedFiles);
			//var finalObj = [...this.files, ...this.t.value]
			//console.log(finalObj);
			console.log(this.t)
		}else{
			this.toastr.error('Upload up to 10 images only!', 'Photo Gallery!');
		}
		// this.cdr.detectChanges();
		setTimeout(()=>{ 
			this.cdr.detectChanges()
		}, 150);
		console.log(this.files); 

	 
		 
	}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  -/*******************************************
  
  
  
   <div class="row">
			<div *ngFor="let ticket of t.controls; let i = index" class="list-group list-group-flush">
					<div class="list-group-item">
						<h5 class="card-title">Ticket {{i + 1}}</h5>
						<div [formGroup]="ticket" class="form-row">
							<div class="form-group col-6">
								<label>Name</label>
								<input type="text" formControlName="name" class="form-control" [ngClass]="{ 'is-invalid': submitted && ticket.controls.name.errors }" />
								<div *ngIf="submitted && ticket.controls.name.errors" class="invalid-feedback">
									<div *ngIf="ticket.controls.name.errors.required">Name is required</div>
								</div>
							</div>
							<div class="form-group col-6">
								<label>Email</label>
								<input type="text" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && ticket.controls.email.errors }" />
								<div *ngIf="submitted && ticket.controls.email.errors" class="invalid-feedback">
									<div *ngIf="ticket.controls.email.errors.required">Email is required</div>
									<div *ngIf="ticket.controls.email.errors.email">Email must be a valid email address</div>
								</div>
							</div>
						</div>
					</div>
				</div>

		<!-- start new code here -->
			<ngx-dropzone-image-preview ngProjectAs="ngx-dropzone-preview" *ngFor="let f of files"    [file]="f" class="container hide_img_btm" [removable]="true"
			(removed)="onRemove(f)">
					
					<ngx-dropzone-label class="container pull-right pos_relative">
						<div class="row">
								<div class="col-md-1  "> </div>
							<div class="col-md-6  ">								
										<div class="form-group mb-3">
											<label>Caption</label>
											<!-- <input name="label" [(ngModel)]="f.label"> -->
											<textarea formControlName="caption" id="" class="form-control"></textarea>
										</div>
										<div class="form-group mb-3">
											<label>Alternate Text</label>
											<input type="text" formControlName="alternate" id="" class="form-control" placeholder="logo test alternate text">
										</div>
										<div class="form-group mb-3">
											<label>Click-through Url</label>
											<input type="text" formControlName="url" id="" class="form-control" placeholder="https://www.domain.com">
										</div>
									
								</div>
							
					</div></ngx-dropzone-label>
				</ngx-dropzone-image-preview>
	  </div> 
  
  
  
