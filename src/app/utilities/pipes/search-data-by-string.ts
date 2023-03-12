import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDataByString'
})
export class SearchDataByStringPipe implements PipeTransform {

  transform(list: any[], ...args: any[]): any {
    var searchText = args[0];
    var searchColumn = args[1];
    if (list == undefined) {
      return
    }
    if (searchColumn == '' || searchColumn == undefined) {
      return list
    }
    let columns = searchColumn.split(",");
    let filterArray: any[] = []
    for (var val of columns) {
      val = val.trim()
      let searchedArray = list.filter(item => {
        return item.hasOwnProperty(val) && item[val] !== null && item[val] !== '' ? item[val].search(new RegExp(searchText, 'i')) > -1 : 0
      })

      filterArray = Array.from(new Set(filterArray.concat(searchedArray)))
    }
    if (filterArray.length == 0) {
      let emptyobject = {
        stringNotMatched: true
      }
      filterArray.push(emptyobject)
      return filterArray
    } else {
      return filterArray
    }
  }

}
