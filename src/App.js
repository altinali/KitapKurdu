import { useState } from "react";
import BookCard from "./components/BookCard";
import CustomButton from "./components/CustomButton";
import { ADD_TYPE } from "./components/ButtonTypes";
import { Toast, toast } from "react-toastify";


function App() {
  // Kitap ismini tutacak state
  const [bookName, setBookName] = useState("");
  // Kitapların tutuldugu dizi
  const [booklist, setBookList] = useState([]);


  // Kitap Ekleme İşlemi
  const addBook = (e) => {
    e.preventDefault();

    const newBook = {
      id: new Date().getTime(),
      bookTitle: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    setBookList([...booklist, newBook]);
    // console.log(booklist);

    setBookName("");

    // Bildirim
    toast.success("Kitap Başarıyla Eklendi");
  };

  // sil butonu
  const handleDelete = (deleteId) => {
    const filteredList = booklist.filter((book) => book.id !== deleteId);
    setBookList(filteredList);

    toast.error("Kitap Başarıyla Silindi")
  };

  // Okundu bilgisi degiştirme
  const handleReadChange=(book)=>{
    const uptadedBook ={...book, isRead: !book.isRead}

    const cloneBookList =[...booklist]

    const bookIndex=cloneBookList.findIndex((item)=>item.id===book.id)
    console.log(bookIndex)

    cloneBookList.splice(bookIndex,1,uptadedBook)

    setBookList(cloneBookList)
  }

  // Kitabı Düzenle

  const handleEdit=(book,newTitle)=>{
    // Kitabın isim degerini güncelleme
    const uptaded = {...book, bookTitle:newTitle}

   const newList = booklist.map((book)=> book.id !== uptaded.id ? book : uptaded)

  //  state i güncelleme
   setBookList(newList)

   // Bildirim
   toast.info("Kitap Güncellendi")
  }

  return (
    <div className="App">
      <header className="bg-dark text-light py-2 text-center fs-5">
        Kitap Kurdu
      </header>

      <div className="container border pb-5">
        <form className="form-control d-flex gap-3 mt-4" onSubmit={addBook}>
          <input
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="form-control shadow"
            type="text"
            placeholder="Kitap Adı Giriniz"
          />
          <CustomButton type={ADD_TYPE} title={'Ekle'}/>
        </form>
        <div className="d-flex flex-column gap-3">
          {booklist.length === 0 ? (
            <p className="px-3 mt-3 fw-bold ">Henüz Kitap Eklenmedi...</p>
          ) : (
            booklist.map((book, i) => {
              return (
                <BookCard
                  key={i}
                  handleEdit={handleEdit}
                  readUptadeClick={()=>handleReadChange(book)}
                  deleteClick={() => handleDelete(book.id)}
                  bookInfo={book}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
