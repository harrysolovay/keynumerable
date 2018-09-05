// add typings!


const aIncludesE = (a, e) => {
  for(let i = 0; i < a.length; i++) {
    if(JSON.stringify(a[i]) === JSON.stringify(e)) {
      return true
    }
  }
  return false
}


export default class Keynumerable {

  constructor(args) {
    this.container = (
      // 1D array
      Array.isArray(args) && !Array.isArray(args[0])
        ? [args]
        // 2D array
        : Array.isArray(args[0])
          ? args
          // Keynumerable instance
          : args instanceof Keynumerable
            ? args.container
            // other type
            : [[args]]
    )
  }

  get(e) {
    // if element argument
    return e
      // return the row containing the element
      ? this.container.filter((row) => aIncludesE(row, e))[0]
      // othrewise, return the entire container
      : this.container
  }

  set(newEntry) {
    // save entries to beremoved from container (the return)
    let replaced = []
    // reduce container into into itself
    this.container = this.container.reduce((accumulator, entry) => {
      // whether entry should be in the reduced container
      // determined by whether the two have items in common
      let replaces = false
      // if keys shared between newEntry and the given entry
      for(let i = 0; i < newEntry.length; i++) {
        if(aIncludesE(entry, newEntry[i])) {
          // save entry (excluded from the reduced array)
          replaced.push(entry)
          // flag entry for replacement
          replaces = true
          break
        }
      }

      return replaces
        ? accumulator
        : [ ...accumulator, entry ]

    }, [ newEntry ])

    return replaced

  }

  delete(key) {
    for(let i = 0; i < this.container.length; i++) {
      if(aIncludesE(this.container[i], key)) {
        return this.container.splice(i, 1)
      }
    }
  }

}