import {IPeople} from "./interfaces";

export function compare(a: any, b: any, type: "asc"|"desc", property: keyof IPeople) {
    let comparison = 0;
    if (type === 'desc'){
        if (a[property] >= b[property]) {
            comparison = 1;
        } else if (a[property] <= b[property]) {
            comparison = -1;
        }
        return comparison;
    } else {
        if (b[property] >= a[property]) {
            comparison = 1;
        } else if (b[property] <= a[property]) {
            comparison = -1;
        }
        return comparison;
    }

}