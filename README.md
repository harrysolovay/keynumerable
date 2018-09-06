Keynumerable [![npm version](https://img.shields.io/npm/v/keynumerable.svg?style=flat)](keynumerable)
=============================

> a map-like data structure whose entry items are unique values, each of which can be used as getter and setter keys

## Overview

#### Why?
Have you ever run into a situation where you'd like to use a map, if not for the fact that you need to set and get entries with numerous keys per entry? This library solves the problem by allowing entry elements to be the keys to their parent (entry). Often times, it's useful to blur the line between key and value (like enums, hence the name "Keynumerable"). Maps don't enable lookups of such flexibility. Keynumerable, on the other hand, gives you a tool for setting and getting entries. Without needing a concise entry structure. And without needless data replication.

Consider the following example: I want a data structure that carries the following for each of its entries: (1) a class constructor, (2) an instance of that class, and (3) the name of that instance as a string. I also want to be able to get the entry using either the class constructor, the instance, or the instance name.

The Map representation of this would be:

```js
const example = new Map()
example.set(Constructor, [ Constructor, instance, instanceName ])
example.set(instance, [ Constructor, instance, instanceName ])
example.set(instanceName, [ Constructor, instance, instanceName ])
```

The Keynumerable representation is far simpler:

```js
const example = new Keynumerable([ Constructor, instance, instanceName ])
```

Let's say you want to get the entry using the class constructor. In both instances, you retrieve the entry like this:

```js
const retrieved = example.get(Constructor)
```

#### How?
You can set and get keynumerable entries with any of the given entry's elements. Think of the underlaying data structure as a 2D array: an array (termed "container") of arrays (termed "entries") of elements (of any type). This approach has one caveot (an intentional limitation): each element in a keynumerable entry must be unique to, not only that entry, but also all other entries (no repeat values). This makes it the perfect option for managing deep objects and avoiding element duplication.

## Installation

```sh
$ npm i keynumerable
```

## Usage

Import the class

```js
import Keynumerable from 'keynumerable'
```

Instantiate with any one of the following: null, an element, an entry, an array of entries, or another Keynumerable instance:

```js
const withNull = new Keynumerable()
console.log(withNull.get()) // []

const withElement = new Keynumerable('a single element')
console.log(withElement.get()) // [[ 'a single element' ]]

const withEntry = new Keynumerable([ 'one', 2, true ])
console.log(withEntry.get()) // [[ 'one', 2, true ]]

const withArrayOfEntries = new Keynumerable([
  [ 'ke' ],
  [ 'yn', 'nu' ],
  [ 'me', 'er', 'ab' ],
  [ 'le' ],
])
console.log(withArrayOfEntries.get())
/* [
 *   [ 'ke' ],
 *   [ 'yn', 'nu' ],
 *   [ 'me', 'er', 'ab' ],
 *   [ 'le' ],
 * ]
 */
 
const withOtherInstance = new Keynumerable(withElement)
console.log(withOtherInstance.get()) // [[ 'a single element' ]]
```

Getting one or all entries:

```js
// first, let's define an instance to work with:
const instance = new Keynumerable([
  [ 'class', 'function', 'variable' ],
  [ 'operator', 'object', 'for loop' ],
])

// now, let's get the entry containing 'variable'
const entry = instance.get('variable')
console.log(entry) // [ 'class', 'function', 'variable' ]

// lets also try out getting all entries
const allEntries = instance.get()
console.log(allEntries)
/* [
 *   [ 'class', 'function', 'variable' ],
 *   [ 'operator', 'object', 'for loop' ],
 * ]
 */
```

Setting entries (without replacing, replacing one, replacing many)

```js
// again, let's create an instance to work with
const instance = new Keynumerable([
  [ 'one', '2', 3, 'mooo' ],
  [ 'ex', 'y', 2 ],
  [ 'bam', false, 6, 111 ],
  [ 'haha', { somekey: 'somevalue'}, '8080' ],
])

// now, let's set an entry that contains no already-used elements
// (that way, setting won't replace other entries)
instance.set([ 'unconflicting', '8081', true ])
console.log(instance.get())
/* [
 *   [ 'one', '2', 3, 'mooo' ],
 *   [ 'ex', 'y', 2 ],
 *   [ 'bam', false, 6, 111 ],
 *   [ 'haha', { somekey: 'somevalue'}, '8080' ],
 *   [ 'unconflicting', '8081', true ],
 * ]
 */

// let's now replace a single entry by using an alread-used element
instance.set([ 'one', 'this', 'entry', 'replaces', `the one with 'one'` ])
console.log(instance.get())
/* [
 *   [ 'ex', 'y', 2 ],
 *   [ 'bam', false, 6, 111 ],
 *   [ 'haha', { somekey: 'somevalue'}, '8080' ],
 *   [ 'unconflicting', '8081', true ],
 *   [ 'one', 'this', 'entry', 'replaces', `the one with 'one'` ],
 * ]
 */

// we can even replace multiple fields with a single field
instance.set([ 'ex', 'bam' ])
console.log(instance.get())
/* [
 *   [ 'haha', { somekey: 'somevalue'}, '8080' ],
 *   [ 'unconflicting', '8081', true ],
 *   [ 'one', 'this', 'entry', 'replaces', `the one with 'one'` ],
 *   [ 'ex', 'bam' ],
 * ]
 */
```


#### Why is it good to disallow element repititon?
Without preventing the same element from existing in multiple entries, accidental multi-setting could occur (accidentally targeting multiple entries with their shared element). The good news is that setting and getting run deep object comparisons, meaning that Keynumerable is a great solution for managing data store instances. If you need to repeat elements, you can set a to-be repeated element within an object that contains a unique property:

```js
const instance = new Keynumerable({
  uniqueId: 'first',
  repeatedElement: 'bear grylls',
})

instance.set([{
  uniqueId: 'second',
  repeatedElement: 'bear grylls',
}])

/* evaluates to:
 *
 * [
 *   [{
 *     uniqueId: 'first',
 *     repeatedElement: 'bear grylls',
 *   }],
 *   [{
 *     uniqueId: 'second',
 *     repeatedElement: 'bear grylls',
 *   }],
 * ]
 */


```

#### Please file an issue if you come across any bugs and I'll do my best to help. Thank you!



###### This library has been released under the [MIT license](https://mit-license.org/)