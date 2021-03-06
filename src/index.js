// @flow


type elementType = any
type entryType = elementType[]
type containerType = entryType[]


const aIncludesE = (a: entryType, e: elementType): boolean => {
  for(let i = 0; i < a.length; i++) {
    if(JSON.stringify(a[i]) === JSON.stringify(e)) {
      return true
    }
  }
  return false
}


export default class Keynumerable {

  container: containerType

  constructor(args: any) {

    this.container = (() => {

      if(!args) {
        return []
      }
    
      if(args instanceof Array && !(args[0] instanceof Array)) {
        return [ args ]
      }

      else if(args[0] && args[0] instanceof Array) {
        return args
      }

      else if(args instanceof Keynumerable) {
        return args.container
      }

      else {
        return [[ args ]]
      }
    
    })()

  }

  get(e: elementType): entryType | containerType {
    // if element argument
    return e
      // return the row containing the element
      ? this.container.filter((row) => aIncludesE(row, e))[0]
      // othrewise, return the entire container
      : this.container
  }

  set(newEntry: entryType): containerType | null {
    let round = 1
    // save entries to beremoved from container (the return)
    let replaced = []
    // reduce container into into itself
    this.container = this.container.reduce((accumulator, entry) => {
      // whether entry should be in the reduced container
      // determined by whether the two have items in common
      let entryReplaced = false
      // if keys shared between newEntry and the given entry
      for(let i = 0; i < newEntry.length; i++) {
        if(aIncludesE(entry, newEntry[i])) {
          // save entry (excluded from the reduced array)
          replaced.push(entry)
          // flag entry for replacement
          entryReplaced = true
          break
        }
      }

      // if marked for replacement
      return entryReplaced
        // don't include it in the next round's accumulator
        ? accumulator
        // otherwise, do
        : [ ...accumulator, entry ]

    }, [ newEntry ])

    // return container of entries that didn't make it to new this.container
    return replaced

  }

  remove(key: elementType): entryType | void {
    // check for a matching element in this.container
    for(let i = 0; i < this.container.length; i++) {
      // if match found
      if(aIncludesE(this.container[i], key)) {
        // splice it out, and return the removed element
        return this.container.splice(i, 1)
      }
    }
  }

}