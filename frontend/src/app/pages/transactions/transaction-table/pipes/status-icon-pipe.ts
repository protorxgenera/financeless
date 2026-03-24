import { Pipe, type PipeTransform } from '@angular/core';
import {TransactionStatus} from '../services/transactions-model';

@Pipe({
    name: 'statusIcon',
})
export class StatusIconPipe implements PipeTransform {
    transform(value: TransactionStatus | undefined): string {
        switch (value) {
            case 'UPCOMING':
                return 'lucideCircleDashed';
            case 'COMPLETED':
                return 'lucideCircleCheckBig';
            default:
                return 'lucideCirclePlus'; // Default icon if not recognized
        }
    }
}
