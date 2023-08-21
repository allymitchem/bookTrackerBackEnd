const client = require("./client")
const {addBook, getBooksByAuthor, getBookByTitle, updateBook, getBookById, deleteBook, getAllBooks} = require('./')

async function dropTables(){
    try{
        console.log("Dropping all tables...")
        await client.query(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS books;

        `)
        console.log("Finished dropping all tables...")
    } catch (error){
        throw error
    }
}


async function createTables(){
    try{
        console.log("Starting to build tables...")

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(300) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "tbrBooks" INTEGER[],
            "currentlyReadingBooks" INTEGER[],
            "readBooks" INTEGER[],
            "dnfBooks" INTEGER[]

        );

        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            "imageURL" VARCHAR(255),
            genre VARCHAR(255) NOT NULL,
            CONSTRAINT chk_genre CHECK (genre IN ('fantasy', 'mystery', 'classics', 'romance', 'youngAdult', 'non-fiction', 'fiction'))
        );
        `)

        console.log("Finished building tables...")
    }catch(error){
        console.log("Error building tables...")
        throw error
    }
}

async function populateBooks(){
    await addBook({
        title: "Pride and Prejudice", 
        author: "Jane Austen", 
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670137416/books/71_NGGc4GmS_huvf54.jpg",
        genre: "classics"
    })    
    await addBook({
        title: "1984", 
        author: "George Orwell", 
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670281721/books/15ec002794a8901dfd83b2351bff7610---orwell-computer-illustration_xk1w6b.jpg",
        genre: "classics"
    })   
    await addBook({
        title: "To Kill A Mockingbird", 
        author: "Harper Lee", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670282785/books/9781784870799-jacket-hsize_seqncw.jpg"
    });
    await addBook({
        title: "The Great Gatsby", 
        author: "F. Scott Fitzgerald", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670137039/books/81n1NYzXIxL_ks5njv.jpg"
    })
    await addBook({
        title: "The Catcher in the Rye", 
        author: "J.D. Salinger", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670134928/books/thecatcherintherye_yuvuok.jpg"
    })
    await addBook({
        title: "Catch-22", 
        author: "Joseph Heller", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670282588/books/1233220139-4d1d2600fc964e42dc2278685b5b855d_aunvzf.jpg"
    })
    await addBook({
        title: "Jane Eyre", 
        author: "Charlotte Bronte", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670283500/books/81udJdH-X8L_trh3gm.jpg"
    })
    await addBook({
        title: "Great Expectations", 
        author: "Charles Dickens", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670135296/books/9780143106272_uxx3ez.jpg"
    })
    await addBook({
        title: "Wuthering Heights", 
        author: "Emily Bronte", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670282486/books/flat_750x_075_f-pad_750x1000_f8f8f8_epm9uy.jpg"
    })
    await addBook({
        title: "Little Women", 
        author: "Louisa May Alcott", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670137208/books/9781847495877-385x600_ikxczt.jpg"
    })
    await addBook({
        title: "Animal Farm", 
        author: "George Orwell", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670282143/books/71emGmd0vtL_brkep3.jpg"
    })
    await addBook({
        title: "Anna Karenina", 
        author: "Leo Tolstoy", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670282075/books/54138478_qgltq2.jpg"
    })
    await addBook({
        title: "Crime & Punishment", 
        author: "Fyodor Dostoevsky", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670283227/books/41nLV5axVFL._SX321_BO1_204_203_200__ytqizh.jpg"
    })              
    await addBook({
        title: "Lord of The Flies", 
        author: "William Golding", 
        genre: "classics",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670281830/books/9783125738041-us_oe5zbq.jpg"
    })

    await addBook({
        title: "Moth", 
        author: "Amber McBride", 
        genre: "youngAdult", 
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670344572/Site%20Images/Extra%20Books/50498335_ikzz4s.jpg"
    })
    await addBook({
        title: "Firekeeper's Daughter", 
        author: "Angeline Boulley", 
        genre: "youngAdult",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670344435/Site%20Images/Extra%20Books/52346471_qixdsn.jpg"
    })
    await addBook({
        title: "The Gilded Ones", 
        author: "Namina Forna", 
        genre: "youngAdult",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670344315/Site%20Images/Extra%20Books/40024121._SY475__nfddet.jpg"
    })
    await addBook({
        title: "Shine", 
        author: "Lauren Myracle", 
        genre: "youngAdult",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670344192/Site%20Images/Extra%20Books/8928054_a5lec0.jpg"
    })
    await addBook({
        title: "One True Loves", 
        author: "Taylor Jenkins Reid", 
        genre: "romance",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670344023/Site%20Images/Extra%20Books/27189194._SY475__awgrtj.jpg"
    })
    await addBook({
        title: "A Court of Mist and Fury", 
        author: "Sarah J. Maas", 
        genre: "fantasy",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670344005/Site%20Images/Extra%20Books/50659468._SY475__cwmqhf.jpg"
    })
    await addBook({
        title: "The Silent Patient", 
        author: "Alex Michaelides", 
        genre: "mystery",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670362603/Site%20Images/Extra%20Books/40097951._SY475__lnnbdt.jpg"
    })
    await addBook({
        title: "Gone Girl", 
        author: "Gillian Flynn", 
        genre: "mystery",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670363557/Site%20Images/Extra%20Books/19288043_vbjvrz.jpg"
    })
    await addBook({
        title: "The Thirteenth Tale", 
        author: "Diane Setterfield", 
        genre: "mystery",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670376691/Site%20Images/Extra%20Books/40440_njrmar.jpg"
    })
    await addBook({
        title: "Ugly Love", 
        author: "Colleen Hoover", 
        genre: "romance",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670369508/Site%20Images/Extra%20Books/17788401._SY475__jesv2k.jpg"
    })
    await addBook({
        title: "The Seven Husbands of Evelyn Hugo", 
        author: "Taylor Jenkins Reid", 
        genre: "romance",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670374805/Site%20Images/Extra%20Books/32620332._SY475__daflpt.jpg"
    })
    await addBook({
        title: "The House in the Cerulean Sea", 
        author: "T.J. Klune", 
        genre: "fantasy",
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670375006/Site%20Images/Extra%20Books/45047384._SY475__zsjaiu.jpg"
    })
    await addBook({
        title: "Before I Let Go", 
        author: "Kennedy Ryan", 
        genre: "romance", 
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670375156/Site%20Images/Extra%20Books/60568471_orta18.jpg"
    })
    await addBook({
        title: "The Kiss Quotient", 
        author: "Helen Hoang", 
        genre: "romance", 
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670375363/Site%20Images/Extra%20Books/38224633._SY475__sfchqr.jpg"
    })
    await addBook({
        title: "Inspection", 
        author: "Josh Malerman",
        genre: "mystery", 
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670375755/Site%20Images/Extra%20Books/41058632._SY475__kf5bxs.jpg"
    })
    await addBook({
        title: "Pretty Girls", 
        author: "Karin Slaughter", 
        genre: "mystery", 
        imageURL: "https://res.cloudinary.com/fsa2/image/upload/v1670375596/Site%20Images/Extra%20Books/25574782._SY475__tv4vhx.jpg"
    })

};


async function rebuildDB(){
    try{
        await dropTables()
        await createTables()
        await populateBooks()
    }catch (error){
        console.error(error)
        throw error
    }
}

async function testDB(){
    console.log("Starting to test database...")

    try {

        const bookByAuthor = await getBooksByAuthor("Sarah J. Maas");
        console.log("Books By Author", bookByAuthor);

        const bookByTitle = await getBookByTitle("One True Loves");
        console.log("Book by Title", bookByTitle);

        const updatedBook = await updateBook({id: 1, genre: "romance" });
        const newBook = await getBookById(1);
        console.log("Updated book", newBook);

        const deletedBook = await deleteBook(2);
        console.log("Deleted Book", deletedBook);

        const allBooks = await getAllBooks();
        console.log("All Books", allBooks);
        
    } catch (error) {
        console.error(error)
        throw error        
    }

   


}

rebuildDB()
.then(testDB)
.catch(console.error)
    .finally(() => {
        client.end()
    })