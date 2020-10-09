import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    console.log(value)
    return null;
  }

}
