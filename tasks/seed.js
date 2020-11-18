const dbConnnection = require('../config/mongoConnection');
const data = require('../data');
const reviews = data.reviews;


async function main() {
    const db = await dbConnnection();
    //console.log("hello");
    await db.dropDatabase();
    //console.log("Hello2");
    //console.log("123456789012345678901234".length)
    //const review1 = await reviews.createReview(5, "Hello", "", "11/11/2020", "123456789012345678901234", "123456789012345678901234");
    //console.log("hello3")
    //console.log(review1);
    //const review2 = await reviews.createReview(4, "Hello2", "", "12/11/2020", "123456789012345678901234", "123456789012345678901234");
    //console.log(review2)
    //console.log(await reviews.updateReview(review2._id, "Hello im a lender"))
    //console.log(await reviews.getAllReviews())

    //console.log(await reviews.removeReview(review1._id));

    //console.log(await reviews.getAllReviews())



    await db.serverConfig.close();

    console.log('Done!');
}

main().catch((e) => {
    console.log(e);
})