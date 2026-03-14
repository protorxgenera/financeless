import {inject, Injectable} from '@angular/core';
import {HlmDialogService} from '@spartan-ng/helm/dialog';
import {ConfirmDialog} from './confirm-dialog';
import {firstValueFrom} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {

    private _hlmDialogService = inject(HlmDialogService);

    async confirm(title: string, message: string): Promise<boolean> {
        const dialogRef = this._hlmDialogService.open(ConfirmDialog, {
            context: { title, message }
        });

        const result = await firstValueFrom(dialogRef.closed$);
        return !!result
    }
}
