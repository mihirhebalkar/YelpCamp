const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewURLParser: true,
    useUnifiedTopology: true
});



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected!!");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}


const seedDB = async() => {
    await Campground.deleteMany({}); 

    for(let i=0; i<50;i++){
        const random1000= Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30)+10;
        const camp = new Campground({
            author: '677292c3ab46c383c4d08cb6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/da0gltkkh/image/upload/v1735818820/YelpCamp/v3ghpbbugifurkwz2myl.jpg',
                  filename: 'YelpCamp/v3ghpbbugifurkwz2myl',
                },
                {
                  url: 'https://res.cloudinary.com/da0gltkkh/image/upload/v1735818818/YelpCamp/v1ntderuwq9kkygisi8q.jpg',
                  filename: 'YelpCamp/v1ntderuwq9kkygisi8q',
                }
              ],
            description: 'Lorem ipsum dolor mit asem blah blahh',
            price
        })
        await camp.save();
    }
}

seedDB().then(()=> {
    mongoose.connection.close(); //as seedDB() is a promise and if its resolved close the DB connection
})