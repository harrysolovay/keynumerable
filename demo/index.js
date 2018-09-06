const Keynumerable = require('../lib/keynumerable.cjs').default

console.log('\n\n')
console.log('constructing tests')
console.log('\n')

const withElement = new Keynumerable('a single element')
console.log('should be [[a single element]]: ', withElement.get())

const with1DArray = new Keynumerable(['I', 'am', 'a', '1D', 'array'])
console.log(`should be [['I', 'am', 'a', '1D', 'array']]: `, with1DArray.get())

const with2DArray = new Keynumerable([
  ['one', '2', 3],
  ['ex', 'y', 2],
  ['bam', false, 6],
])
console.log(
  `should be [['one', '2', 3], ['ex', 'y', 2], ['bam', false, 6]]: `,
  with2DArray.get()
)

const withAnotherKeynumerableInstance = new Keynumerable(with1DArray)
console.log(
  `should be [['I', 'am', 'a', '1D', 'array']]: `,
  withAnotherKeynumerableInstance.get()
)

console.log('\n\n')
console.log('setter tests')
console.log('\n')

const keynumerable = new Keynumerable([
  ['one', '2', 3, 'mooo'],
  ['ex', 'y', 2],
  ['bam', false, 6, 111],
  ['haha', { somekey: 'somevalue'}, '8080'],
])

console.log(
  'set without a conflicting value – before: ',
  keynumerable.get()
)
keynumerable.set([ 'unconflicting', '8081', true ])
console.log(
  'set without a conflicting value – after: ',
  keynumerable.get()
)

console.log('\n')

console.log(
  'set with one  conflicting value – before: ',
  keynumerable.get()
)
keynumerable.set([ 'one', 'two', 'munch' ])
console.log(
  'set with one conflicting value – after: ',
  keynumerable.get()
)

console.log('\n')

console.log(
  'set with two conflicting values – before: ',
  keynumerable.get()
)
keynumerable.set([ 'bam', '8081' ])
console.log(
  'set with two conflicting values – after: ',
  keynumerable.get()
)

console.log('\n')

console.log(
  'set with conflicting object as values – before: ',
  keynumerable.get()
)
keynumerable.set([ { somekey: 'somevalue'}, 'this also works' ])
console.log(
  'set with conflicting object as values – after: ',
  keynumerable.get()
)

console.log('\n\n')
console.log('remove test')
console.log('\n')

console.log(
  'remove – before: ',
  keynumerable.get()
)
keynumerable.remove('this also works')
console.log(
  'remove – after: ',
  keynumerable.get()
)