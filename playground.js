class Foo {

  state = 'idle'

  bar() {
    console.log(this.state)
  }

}

const f = new Foo
f.bar()

function useState() {

  this.state = 'working'
  const { bar } = this

  bar()

}


f.useState = useState.bind(f)

f.useState()
