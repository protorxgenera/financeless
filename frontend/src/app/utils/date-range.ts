import {FilterFn} from '@tanstack/angular-table'

declare module '@tanstack/table-core' {
    interface FilterFns {
        dateBetweenFilterFn: FilterFn<unknown>;
    }
}

export function isValidDate(d: any) {
    const parsedDate = new Date(d)
    return (parsedDate && !Number.isNaN(parsedDate))
}


export const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
    const date = new Date(row.getValue(columnId))
    let [start, end] = value
    end = new Date(end.setHours(23, 59, 59))
    if ((start || end) && !date) return false
    if (start && !end) {
        return date.getTime() >= start.getTime()
    } else if (!start && end) {
        return date.getTime() <= end.getTime()
    } else if (start && end) {
        return date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
    } else return true
};

dateBetweenFilterFn.autoRemove

export default dateBetweenFilterFn
