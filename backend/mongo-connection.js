const mongoose = require('mongoose')

mongoose.connect('mongodb://192.168.99.100:32770/become-a-legend', { useNewUrlParser: true })
.then(()=> {
     console.log('You did it! Your MongoDB is running.')
}).catch(err => {
    // console.error('Something went wrong!')
    console.error(err)
    process.exit(1)
})
