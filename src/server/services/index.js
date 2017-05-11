import people from './people'
import products from './products'
import showcases from './showcases'

export default function() {

  const app = this

  app.configure(people)
  app.configure(products)
  app.configure(showcases)

}
