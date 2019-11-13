import { createAction } from '@ngrx/store';


export const goOnline = createAction('[Network] App is online')
export const goOffline = createAction('[Network] App is offline')