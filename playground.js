import fs from 'fs-promise'
import now from 'performance-now'


setTimeout(() => console.log('timeout done'), 500)
const start = now()
for (let i = 0; i < 2000000000; i++);

const end = now()


console.log(end - start)
