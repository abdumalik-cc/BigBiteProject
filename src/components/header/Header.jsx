import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css'

function Header({ cart, deleteFromCart }) {
  let [modal, setModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div>
          <h1>Big-Bite</h1>
          <button className={styles.y}>Yetkazib berish</button>
        </div>
        <div>
          <button className={styles.y} onClick={() => setModal(true)}><i className="fa-solid fa-cart-shopping"></i></button>


          <select id="">
            <option value="">uz</option>
            <option value="">ru</option>
          </select>


          <button className={styles.menu}><i className="fa-solid fa-bars"></i></button>
        </div>
      </header>
      {modal && (
        <div className={styles.modal} style={{ display: modal == true ? "block" : "none" }}>
          <button onClick={() => setModal(false)} className={styles.exitBtn}><i className="fa-solid fa-xmark"></i></button>
          {
            cart.length === 0 ? (
              <p>Savatcha bosh</p>
            ) : (
              cart.map((item, index) => (
                <div key={index}>
                  <h2>{item.name},</h2>
                  <h2>{item.price} so'm</h2>
                  <button className={styles.deleteBtn} onClick={() => deleteFromCart(index)}>olib tashlash</button>
                </div>
              ))

            )
          }
          <button className={styles.davomBtn}
            onClick={() => {
              if (cart.length === 0) {
                alert("Buyurtma qilish uchun savatga birornarsa qoshing")
              } else {
                navigate("/buyurtma")
                setModal(false)
              }
            }}>Buyurtma qilish</button>
        </div>)

      }
    </div>
  )
}

export default Header