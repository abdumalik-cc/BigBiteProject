import { useEffect, useState } from 'react'
import styles from './buy.module.css'

function Buyurtma({ cart }) {
  const jami = cart.reduce((total, item) => total + Number(item.price), 0)
  const [data, setData] = useState(null)
  function catchData() {
    try {
      fetch("https://68ada378a0b85b2f2cf41a59.mockapi.io/users/users")
        .then(res = res.json())
        .then(data => setData(data))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    catchData()
  }, [])
  return (
    <div>
      <main>
        <section className={styles.malumotSection}>
          <div className="container" id={styles.container}>
            <div className={styles.infDiv}>
              <h1>Buyurtma sahifasi</h1>
              <h1>Jami: <span>{jami} so'm</span></h1>
              {
                cart.length === 0 ? (
                  alert("savatchangiz bo'sh")
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className={styles.malumotDiv}>
                      <h2>{item.name} :</h2>
                      <h2><span>{item.price} so'm</span></h2>
                    </div>
                  ))
                )
              }
            </div>
            <div className={styles.inputs}>
              <input type="text" placeholder='Manzil' />
              <input type="text" placeholder='Ism' />
              <input type="number" placeholder='Telefon raqam' />
              <textarea placeholder='Izoh qoldiring'></textarea>
              <br />
              <button>Yuborish</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Buyurtma