const mongoose = require('mongoose')
console.log(process.env.DB_URL)
const connectionString = process.env.DB_URL || 'mongodb://localhost/become-a-legend'

mongoose.connect(connectionString, { useNewUrlParser: true })
.then(()=> {
     console.log('You did it! Your MongoDB is running.')
}).catch(err => {
    // console.error('Something went wrong!')
    console.error(err)
    process.exit(1)
})
