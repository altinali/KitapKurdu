import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { DELETE_TYPE, EDİT_TYPE, READ_TYPE } from "./ButtonTypes";

const BookCard = ({ bookInfo, deleteClick, readUptadeClick,handleEdit }) => {
  const [editMode, setEditMode] = useState(false);
  console.log(editMode);

  return (
    <div className="d-flex justify-content-between border p-3 shadow">
      <div>
        {editMode ? (
          <form className="d-flex gap-1" onSubmit={(e)=>{
            e.preventDefault()
            
            // Kitaplar dizisini günceller
            handleEdit(bookInfo,e.target[0].value)

            // Düzenleme Modunu Kapat
            setEditMode(false)
          }}>
            <input
            type="text"
            className="form-control shadow"
            defaultValue={bookInfo.bookTitle}
          />
          <button className="btn bg-success">Kaydet</button>
          </form>
        ) : (
          <h5 style={{ textDecoration: bookInfo.isRead ? "line-through" : "" }}>
            {bookInfo.bookTitle}
          </h5>
        )}
        <p>{bookInfo.date}</p>
      </div>
      <div>
        <div className="btn-group">
          {
            editMode ? null : <CustomButton
            title={"Sil"}
            type={DELETE_TYPE}
            onClick={deleteClick}
          />
          }
          <CustomButton
            title={editMode ? "İptal Et" : "Düzenle"}
            type={EDİT_TYPE}
            onClick={() => setEditMode(!editMode)}
          />
          {
            editMode ? null : <CustomButton
            title={bookInfo.isRead === false ? "Okunmadı" : "Okundu"}
            type={READ_TYPE}
            onClick={readUptadeClick}
          />
          }
        </div>
      </div>
    </div>
  );
};

export default BookCard;
