import {Pipe, type PipeTransform} from '@angular/core';
import {TransactionType} from '../services/transactions-model';

@Pipe({
    name: 'typeIcon',
})
export class TypeIconPipe implements PipeTransform {
    transform(type: TransactionType | undefined): string {
        switch (type) {
            case 'income':
                return 'lucideCircleFadingPlus';
            case 'expense':
                return 'lucideCircleMinus';
            default:
                return 'lucideCirclePlus'; // Default icon for the action button
        }
    }
}
