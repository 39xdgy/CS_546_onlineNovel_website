const dbConnnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.users;
const cars = data.cars;
const reviews = data.reviews;
const rentingInfo = data.rentingInfo;


async function main() {
    const db = await dbConnnection();
    
    await db.dropDatabase();
    
    let newUser1 = {
        firstName : "Kristain",
        lastName : "Parker",
        password: "mydognameistom",
        dob : "1995-11-23",
        emailID : "KristainParker@gmail.com",
        driverLicense : "A12345678900986",
        profilePicture : "",
        city : "Union City",
        state : "NJ",
        zip : "07087",

    }

    let newUser2 = {
        firstName : "Hanna",
        lastName : "Dom",
        password: "iloveyou3000",
        dob : "1988-10-01",
        emailID : "Hanna123@yahoo.com",
        driverLicense : "X99997777766666",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07037",
        
    }

    let newUser3 = {
        firstName : "Peter",
        lastName : "Parker",
        password: "spiderman2002",
        dob : "1978-05-20",
        emailID : "spiderman@gmail.com",
        driverLicense : "Z12340987654321",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07112",
       
    }

    let newUser4 = {
        firstName : "James",
        lastName : "Bond",
        password: "ikill7",
        dob : "1985-11-20",
        emailID : "iloveM@gmail.com",
        driverLicense : "J12341234512345",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07303",
        
    }

    let newUser5 = {
        firstName : "Jane",
        lastName : "Watson",
        password: "peterparker",
        dob : "1990-01-26",
        emailID : "janewatson@gmail.com",
        driverLicense : "J12341234512345",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07303",
        
    }

    let newUser6 = {
        firstName : "Tasmania",
        lastName : "Loko",
        password: "jimmy12345",
        dob : "1982-04-01",
        emailID : "tloko@gmail.com",
        driverLicense : "N12349876012345",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07108",
        
    }

    let newUser7 = {
        firstName : "James",
        lastName : "Mac",
        password: "mypc1234@#",
        dob : "1972-02-11",
        emailID : "jamesmac1234@gmail.com",
        driverLicense : "F12349876009876",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07086",
        
    }

    let newUser8 = {
        firstName : "Tylor",
        lastName : "Bailey",
        password: "holdon0997",
        dob : "1975-06-19",
        emailID : "tylorBailey789@gmail.com",
        driverLicense : "E12345432109876",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07188",
        
    }


    let newUser9 = {
        firstName : "Anthony",
        lastName : "Marchi",
        password: "boston9898",
        dob : "1985-09-29",
        emailID : "AnthonyMarchi@gmail.com",
        driverLicense : "Q45675432109876",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        
    }

    let newUser10 = {
        firstName : "Jessica",
        lastName : "Kuptchik",
        password: "lambo12345678",
        dob : "1993-10-21",
        emailID : "mynameisJessica@gmail.com",
        driverLicense : "Z45674567845678",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07806",
        
    }

    let newUser11 = {
        firstName : "Natalie",
        lastName : "Todaro",
        password: "hellothere12345",
        dob : "1991-11-05",
        emailID : "NatalieTodaro@stevens.com",
        driverLicense : "K09871098710987",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07198",
        
        
    }

    let newUser12 = {
        firstName : "Erick",
        lastName : "Cardy",
        password: "senorita56789",
        dob : "1981-01-25",
        emailID : "ErickCardy@yahoo.com",
        driverLicense : "C34561230912309",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07087",
        
    }

    let newUser13 = {
        firstName : "Roma",
        lastName : "Rothwell",
        password: "lasvegas2020",
        dob : "1985-07-27",
        emailID : "romarothwell@yahoo.com",
        driverLicense : "A94728374638274",
        profilePicture : "",
        city : "Union City",
        state : "NJ",
        zip : "07087",
        
    }

    let newUser14 = {
        firstName : "Henry",
        lastName : "Mane",
        password: "ghostrider",
        dob : "1979-06-20",
        emailID : "Henry5678@gmail.com",
        driverLicense : "O90288374682746",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07175",
        
    }
    
    let newUser15 = {
        firstName : "Todd",
        lastName : "Gilmore",
        password: "torrymyname",
        dob : "1992-07-15",
        emailID : "toddpodd1234@hotmail.com",
        driverLicense : "V29858901287395",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07030",
        
    }

    //the people who are renting the cars
    let newUser16 = {
        firstName : "Aolanie",
        lastName : "Salloum",
        password: "aolanie1234",
        dob : "1987-08-05",
        emailID : "aolanie.salloum@hotmail.com",
        driverLicense : "V29987301287395",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07307",
        
    }


    let newUser17 = {
        firstName : "Pamela",
        lastName : "Schaber",
        password: "pamela3456",
        dob : "1987-09-23",
        emailID : "pamela0987@hotmail.com",
        driverLicense : "V29858987687395",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07097",
        
    }

    let newUser18 = {
        firstName : "Eric",
        lastName : "Truong",
        password: "lambo1234",
        dob : "1982-08-20",
        emailID : "erictruong12345@gmail.com",
        driverLicense : "K73645901287395",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07107",
        
    }

    let newUser19 = {
        firstName : "Kaitlyn",
        lastName : "Murtagh",
        password: "myWorld1234",
        dob : "1987-04-20",
        emailID : "kaitlynmurtagh@yahoo.com",
        driverLicense : "G26773901287395",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07304",
        
    }

    let newUser20 = {
        firstName : "Joe",
        lastName : "Mattern",
        password: "ironman789",
        dob : "1974-05-23",
        emailID : "joe12345@gmail.com",
        driverLicense : "L29988901287395",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07175",
        
    }

    let newUser21 = {
        firstName : "Lyla",
        lastName : "Lehman",
        password: "computer@123",
        dob : "1990-10-22",
        emailID : "lyla.lehman@wemail.com",
        driverLicense : "V29858900987395",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        
    }

    let newUser22 = {
        firstName : "Sparsh",
        lastName : "Pandey",
        password: "sparch#0987",
        dob : "1996-06-01",
        emailID : "sparsh.pandey@rutgers.com",
        driverLicense : "B29858901209875",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07311",
        
    }

    let newUser23 = {
        firstName : "Lily",
        lastName : "Cupp",
        password: "iamlily12345",
        dob : "1992-07-15",
        emailID : "Lilycupp1992@gmail.com",
        driverLicense : "R29858963547395",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07030",
        
    }

    let newUser24 = {
        firstName : "Hannah",
        lastName : "Veloce",
        password: "jimmy@0987",
        dob : "1996-12-12",
        emailID : "hannahveloce112@gmail.com",
        driverLicense : "V29858901278335",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07198",
        
    }

    let newUser25 = {
        firstName : "Alexis",
        lastName : "Kates",
        password: "alexis@12345",
        dob : "1985-02-10",
        emailID : "alexiskate@nyu.com",
        driverLicense : "V29858901287395",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07198",
        
    }

    let user1 = await users.createUser(newUser1);
    let user2 = await users.createUser(newUser2);
    let user3 = await users.createUser(newUser3);
    let user4 = await users.createUser(newUser4);
    let user5 = await users.createUser(newUser5);
    let user6 = await users.createUser(newUser6);
    let user7 = await users.createUser(newUser7);
    let user8 = await users.createUser(newUser8);
    let user9 = await users.createUser(newUser9);
    let user10 = await users.createUser(newUser10);
    let user11 = await users.createUser(newUser11);
    let user12 = await users.createUser(newUser12);
    let user13 = await users.createUser(newUser13);
    let user14 = await users.createUser(newUser14);
    let user15 = await users.createUser(newUser15);
    let user16 = await users.createUser(newUser16);
    let user17 = await users.createUser(newUser17);
    let user18 = await users.createUser(newUser18);
    let user19 = await users.createUser(newUser19);
    let user20 = await users.createUser(newUser20);
    let user21 = await users.createUser(newUser21);
    let user22 = await users.createUser(newUser22);
    let user23 = await users.createUser(newUser23);
    let user24 = await users.createUser(newUser24);
    let user25 = await users.createUser(newUser25);
    
    

    let licensePlate = "H";
    let ownedBy = "userId??"

    let newCar1 = {
        ownedBy : (user1._id).toString(),
        licensePlate : "C90ELE",
        brand : "Volkeswagon",
        model : "Jetta",
        makeYear : 2013,
        type : "Medium",
        color : "Black",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", "Anti-Lock Brakes", "AM/FM Stereo"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "3715",
        street : "John F Kennedy Blvd",
        city : "Jersey City",
        state : "NJ",
        zip : 07306,
        price : 6.11,
    }

    let newCar2 = {
        ownedBy : (user1._id).toString(),
        licensePlate : "FKR3QG",
        brand : "Nissan",
        model : "Versa",
        makeYear : 2015,
        type : "Compact",
        color : "Red",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 5,
        bootSpace : 4,
        images : "",
        houseNo : "110",
        street : "1St St",
        city : "Jersey City",
        state : "NJ",
        zip : 07306,
        price : 25,
    }

    let newCar3 = {
        ownedBy : (user2._id).toString(),
        licensePlate : "CWF2RG",
        brand : "Ford",
        model : "Fiesta",
        makeYear : 2013,
        type : "Economy",
        color : "White",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 4,
        bootSpace : 1,
        images : "",
        houseNo : "49",
        street : "Mall Drive West",
        city : "Jersey City",
        state : "NJ",
        zip : 0730,
        price : 30,
    }

    let newCar4 = {
        ownedBy : (user3._id).toString(),
        licensePlate : "624HDT",
        brand : "Ford",
        model : "Focus",
        makeYear : 2010,
        type : "Compact",
        color : "Gray",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 5,
        bootSpace : 1,
        images : "",
        houseNo : "129 Montgomery Street",
        street : "Montgomery Street",
        city : "Jersey City",
        state : "NJ",
        zip : 07032,
        price : 32,
    }

    let newCar5 = {
        ownedBy : (user4._id).toString(),
        licensePlate : "ZZC209",
        brand : "Ford",
        model : "F-150",
        makeYear : 2010,
        type : "Pick up truck",
        color : "White",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "3715",
        street : "John F Kennedy Blvd",
        city : "Jersey City",
        state : "NJ",
        zip : 07307,
        price : 61,
    }

    let newCar6 = {
        ownedBy : (user4._id).toString(),
        licensePlate : "SE994G",
        brand : "Volkswagen",
        model : "Atlas",
        makeYear : 2015,
        type : "Large",
        color : "White",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth'],
        noOfPassengers : 7,
        bootSpace : 3,
        images : "",
        houseNo : "703",
        street : "Washington St",
        city : "Hoboken",
        state : "NJ",
        zip : 07037,
        price : 61,
    }

    let newCar7 = {
        ownedBy : (user5._id).toString(),
        licensePlate : "895BDE",
        brand : "Toyota",
        model : "RAV4",
        makeYear : 2017,
        type : "SUV",
        color : "White",
        features : ["Cruise Control","Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 4,
        images : "",
        houseNo : "145",
        street : "W Kinney St",
        city : "Newark",
        state : "NJ",
        zip : 07103,
        price : 62,
    }

    let newCar8 = {
        ownedBy : (user6._id).toString(),
        licensePlate : "PDE344",
        brand : "Chevrolet",
        model : "Suburban",
        makeYear : 2014,
        type : "SUV",
        color : "White",
        features : ["Cruise Control","Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 8,
        bootSpace : 2,
        images : "",
        houseNo : "2160",
        street : "Central Avenue",
        city : "Jersey City",
        state : "NJ",
        zip : 7087,
        price : 80,
    }

    let newCar9 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "PID789",
        brand : "Ford",
        model : "EcoSport",
        makeYear : 2019,
        type : "SUV",
        color : "White",
        features : ["Cruise Control","Unlimited miles",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "1496",
        street : "6th St",
        city : "North Bergen",
        state : "NJ",
        zip : 07047,
        price : 85,
    }


    let newCar10 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "E67343",
        brand : "Hyundai",
        model : "Santa Fe",
        makeYear : 2017,
        type : "SUV",
        color : "White",
        features : ["Cruise Control",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors"],
        noOfPassengers : 5,
        bootSpace : 5,
        images : "",
        houseNo : "1026",
        street : "Summit Ave",
        city : "Jersey City",
        state : "NJ",
        zip : 07307,
        price : 78,
    }


    let newCar11 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "UUS264",
        brand : "Kia",
        model : "Soul",
        makeYear : 2012,
        type : "Medium",
        color : "Blue",
        features : ["Cruise Control",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "301",
        street : "W Kinney St",
        city : "Newark",
        state : "NJ",
        zip : 07103,
        price : 68,
    }    


    let newCar12 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "DUUUUDE",
        brand : "Hyundai",
        model : "Elantra",
        makeYear : 2009,
        type : "Medium",
        color : "Orange",
        features : ["Cruise Control","Unlimited miles",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "425",
        street : "15th Ave",
        city : "Newark",
        state : "NJ",
        zip : 07103,
        price : 65,
    }

    let newCar13 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "HAPPY9",
        brand : "Chrysler",
        model : "Pacifica",
        makeYear : 2016,
        type : "Van",
        color : "White",
        features : ["Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 7,
        bootSpace : 3,
        images : "",
        houseNo : "291",
        street : "Orange St",
        city : "Newark",
        state : "NJ",
        zip : 07103,
        price : 80,
    }

    let newCar14 = {
        ownedBy : (user8._id).toString(),
        licensePlate : "NED883",
        brand : "Ford",
        model : "Transit",
        makeYear : 2015,
        type : "Van",
        color : "Black",
        features : ["Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Mirrors"],
        noOfPassengers : 7,
        bootSpace : 3,
        images : "",
        houseNo : "162",
        street : "Linden Ave",
        city : "Jersey City",
        state : "NJ",
        zip : 07305,
        price : 80,
    }

    let newCar15 = {
        ownedBy : (user9._id).toString(),
        licensePlate : "YYJ738",
        brand : "Toyota",
        model : "Sienna",
        makeYear : 2004,
        type : "Van",
        color : "Grey",
        features : ["Power Steering", "Air Conditioning", "Air Bags", "Power Mirrors"],
        noOfPassengers : 8,
        bootSpace : 5,
        images : "",
        houseNo : "5",
        street : "Delmar Rd",
        city : "Jersey City",
        state : "NJ",
        zip : 07305,
        price : 100,
    }

    let newCar16 = {
        ownedBy : (user9._id).toString(),
        licensePlate : "IIJ783",
        brand : "Ford",
        model : "Super Duty",
        makeYear : 2017,
        type : "Van",
        color : "White",
        features : ["Cruise Control","Unlimited miles",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 10,
        bootSpace : 2,
        images : "",
        houseNo : "17",
        street : "West St",
        city : "Jersey City",
        state : "NJ",
        zip : 07306,
        price : 85,
    }

    let newCar17 = {
        ownedBy : (user10._id).toString(),
        licensePlate : "HIW837",
        brand : "Nissan",
        model : "Frontier",
        makeYear : 2014,
        type : " Pickup truck",
        color : "White",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 4,
        bootSpace : 3,
        images : "",
        houseNo : "17",
        street : "West St",
        city : "Jersey City",
        state : "NJ",
        zip : 07306,
        price : 85,
    }

    let newCar18 = {
        ownedBy : (user10._id).toString(),
        licensePlate : "HHE738",
        brand : "Nissan",
        model : "Frontier",
        makeYear : 2014,
        type : "Pickup truck",
        color : "White",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 4,
        bootSpace : 3,
        images : "",
        houseNo : "102",
        street : "County Rd 643",
        city : "Jersey City",
        state : "NJ",
        zip : 07306,
        price : 45,
    }

    let newCar19 = {
        ownedBy : (user10._id).toString(),
        licensePlate : "KJB789",
        brand : "Class",
        model : "Full-size Truck",
        makeYear : 2018,
        type : "Pickup truck",
        color : "Maroon",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "592",
        street : "37th St",
        city : "Union City",
        state : "NJ",
        zip : 7087,
        price : 45,
    }

    let newCar20 = {
        ownedBy : (user11._id).toString(),
        licensePlate : "YUE679",
        brand : "Ford",
        model : "Mustang Convertible",
        makeYear : 2019,
        type : "Convertible",
        color : "Red",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", "Power Mirrors", "10-Speed Automatic", "2.3-liter Turbo Inline-4 Gas", "RWD", "Rear wheel drive", "Daytime Running Lights", "Stability Control"],
        noOfPassengers : 4,
        bootSpace : 1,
        images : "",
        houseNo : "590",
        street : "Washington St",
        city : "Hoboken",
        state : "NJ",
        zip : 07030 ,
        price : 105,
    }

    let newCar21 = {
        ownedBy : (user12._id).toString(),
        licensePlate : "YIE803",
        brand : "BMW",
        model : "X1",
        makeYear : 2015,
        type : "Convertible",
        color : "Grey",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", "Power Mirrors", "10-Speed Automatic", "2.3-liter Turbo Inline-4 Gas", "RWD", "Rear wheel drive", "Daytime Running Lights", "Stability Control"],
        noOfPassengers : 4,
        bootSpace : 1,
        images : "",
        houseNo : "140",
        street : "Madison Ave",
        city : "Hoboken",
        state : "NJ",
        zip : 7108,
        price : 80,
    }

    let newCar22 = {
        ownedBy : (user13._id).toString(),
        licensePlate : "BHJ783",
        brand : "Chevrolet",
        model : "Spark",
        makeYear : 2013,
        type : "Compact",
        color : "White",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 4,
        bootSpace : 2,
        images : "",
        houseNo : "112",
        street : "River St",
        city : "Hoboken",
        state : "NJ",
        zip : 07037,
        price : 61,
    }

    let newCar23 = {
        ownedBy : (user14._id).toString(),
        licensePlate : "HKJ098",
        brand : "Cadillac",
        model : "XTS",
        makeYear : 2013,
        type : "Luxury",
        color : "Black",
        features : ["Cruise Control","Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 4,
        images : "",
        houseNo : "400",
        street : "Newport Pkwy",
        city : "Jersey City",
        state : "NJ",
        zip : 07310,
        price : 62,
    }


    let newCar24 = {
        ownedBy : (user15._id).toString(),
        licensePlate : "YUI908",
        brand : "Cadillac",
        model : "XTS",
        makeYear : 2013,
        type : "Luxury",
        color : "Black",
        features : ["Cruise Control","Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 4,
        images : "",
        houseNo : "400",
        street : "Newport Pkwy",
        city : "Jersey City",
        state : "NJ",
        zip : 07310,
        price : 70,
    }

    let car1 = await cars.createCar(newCar1);
    let car2 = await cars.createCar(newCar2);
    let car3 = await cars.createCar(newCar3);
    let car4 = await cars.createCar(newCar4);
    let car5 = await cars.createCar(newCar5);
    let car6 = await cars.createCar(newCar6);
    let car7 = await cars.createCar(newCar7);
    let car8 = await cars.createCar(newCar8);
    let car9 = await cars.createCar(newCar9);
    let car10 = await cars.createCar(newCar10);
    let car11 = await cars.createCar(newCar11);
    let car12 = await cars.createCar(newCar12);
    let car13 = await cars.createCar(newCar13);
    let car14 = await cars.createCar(newCar14);
    let car15 = await cars.createCar(newCar15);
    let car16 = await cars.createCar(newCar16);
    let car17 = await cars.createCar(newCar17);
    let car18 = await cars.createCar(newCar18);
    let car19 = await cars.createCar(newCar19);
    let car20 = await cars.createCar(newCar20);
    let car21 = await cars.createCar(newCar21);
    let car22 = await cars.createCar(newCar22);
    let car23 = await cars.createCar(newCar23);
    let car24 = await cars.createCar(newCar24);


    //let rentInfo1 = await rentingInfo.create("startdat", "end",false,  "", "");
    await db.serverConfig.close();

    console.log('Done!');
}

main().catch((e) => {
    console.log(e);
})