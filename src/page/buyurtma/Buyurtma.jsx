import { useEffect, useState, useRef } from 'react'
import styles from './buy.module.css'
import { useNavigate } from 'react-router-dom';
import TypeIt from "typeit";

function Buyurtma({ cart }) {
  const jami = cart.reduce((total, item) => total + Number(item.price), 0);
  const navigate = useNavigate();

  const [main, setMain] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    addres: "",
    phone: "",
    pramokod: "",
    izoh: ""
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  function validate() {
    const newErr = {}
    if (!formData.name.trim()) { newErr.name = "Ismni to'g'ri kiriting" }
    if (!formData.addres.trim()) { newErr.addres = "Manzilni to'g'ri kiriting" }
    if (formData.phone.trim().length !== 9) { newErr.phone = "Telefon raqamni to'liq kiriting" }
    return newErr
  }

  async function saveUser() {
    try {
      const res = await fetch("https://68ada378a0b85b2f2cf41a59.mockapi.io/users/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formData, cart, jami })
      });

      const data = await res.json();
      console.log("API response:", data);

      setFormData({
        name: "",
        addres: "",
        phone: "",
        pramokod: "",
        izoh: ""
      });
      console.log("saveUser ishladi");
      setMain(false)
    } catch (error) {
      console.log("Xatolik:", error);
    }
  }

  function handleSub(e) {
    e.preventDefault();
    const errValidation = validate();
    console.log("handleSub ishladi");

    if (Object.keys(errValidation).length > 0) {
      setErrors(errValidation);
      return;
    };
    saveUser();
    alert("Buyurtmangiz qabul qilindi 40 daqiqa ichida yetkazib beriladi");
  }

  useEffect(() => {
    if (cart.length === 0) {
      alert("Savatchangiz bo'sh");
      navigate("/")
    }
  }, [cart]);




 

  return (
    <div>
      <main style={{ display: main == true ? "block" : "none" }}>
        <section className={styles.malumotSection}>
          <div className="container" id={styles.container}>
            <div className={styles.infDiv}>
              <h1>Buyurtma sahifasi</h1>
              <h1>Jami: <span>{jami} so'm</span></h1>
              {cart.map((item, index) => (
                <div key={index} className={styles.malumotDiv}>
                  <h2>{item.name} :</h2>
                  <h2><span>{item.price} so'm</span></h2>
                </div>
              ))}
            </div>

            <form className={styles.inputs} onSubmit={handleSub}>
              <div>
                {errors.addres && <p style={{ color: "red" }}>{errors.addres}</p>}
                <br />
                <input
                  type="text"
                  placeholder='Manzil misol(Tuman,kvartal,uy)'
                  name='addres'
                  value={formData.addres}
                  onChange={handleChange}
                />
              </div>

              <div>
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                <br />
                <input
                  type="text"
                  placeholder='Ism'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
                <br />
                <input
                  inputMode="numeric"
                  type="text"
                  placeholder='Telefon raqam'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <input
                type="text"
                placeholder='Pramokod'
                name='pramokod'
                value={formData.pramokod}
                onChange={handleChange}
              />

              <textarea
                placeholder='Izoh'
                name='izoh'
                value={formData.izoh}
                onChange={handleChange}>
              </textarea>

              <br />
              <button type='submit' >Yuborish</button>
            </form>
          </div>
        </section>
      </main>
      <div className={styles.waitDiv} style={{ display: main == true ? "none" : "block" }}>
        <div className="container" >
          <h1 ><span>Big-Bite</span></h1>
          <h1>Buyurtmangiz <span>40-50</span> daqiqa ichida yetkazib beriladi</h1>
          <h1>Kuryer siz blan <span>o'zi bog'lanadi</span></h1>
          <h1>Kuryerga <span>{jami}</span> s'om <span>naqt</span> berasiz</h1>
          <h1><span>Bizni</span> tanlaganingiz uchun rahmat😊</h1>
        </div>
      </div>
    </div>
  )
}

export default Buyurtma
