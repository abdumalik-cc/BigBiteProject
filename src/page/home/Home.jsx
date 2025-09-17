import { useEffect, useState } from 'react';
import Card from '../../components/card/Card'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import styles from './home.module.css'
import { FadeLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import AOS from"aos";
import "aos/dist/aos.css";

function Home({cart,deleteFromCart}) {

  let [data, setData] = useState([]);
  function getData() {
    try {
      fetch("https://689c78b458a27b18087e50d4.mockapi.io/menu")
        .then(res => res.json())
        .then(data => setData(data))
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getData();
  }, []);

 
  const [activeCategory, setActiveCategory] = useState("all");
  const filtredData = activeCategory === "all" ? data : data.filter((e) => e.category === activeCategory);

  function handleChange(e) {
    const select = e.target.value;

    if (select == "cheap") {
      const a = [...data].sort((o1, o2) => o1.price - o2.price);
      setData(a);
    } else if (select == "expensive") {
      const expensiveProduct = [...data].sort((o1, o2) => o2.price - o1.price)
      setData(expensiveProduct);
    } else if (select == "A-Y") {
      const A_Y = [...data].sort((o1, o2) =>
        o1.name.localeCompare(o2.name,))
      setData(A_Y)
    }
  }
  function handle(e){
    const input= e.target.value.toLowerCase()
    const qidirish=data.filter(i=>i.name.toLowerCase().includes(input));
    setData(qidirish)
  }






  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi (ms)
      once: true,     // faqat 1 marta ishlasin
    });
  }, []);
  return (
    <div>
      <Header cart={cart} deleteFromCart={deleteFromCart}/>
      <main>
        <div className="contaier">
          <img src="./aksiya.webp" alt="" className={styles.banner} />
        </div>
        <section className={styles.categories}>
          <div>
            <input type="text" placeholder='Qidirish' onChange={handle}/>
            <select onChange={handleChange}>
              <option value="Filter">Filter</option>
              <option value="A-Y">A dan Y gacha</option>
              <option value="cheap">Avval arzonroq</option>
              <option value="expensive">Avval qimmatroq</option>
            </select>
            <button onClick={() => setActiveCategory("all")}>Hammasi</button>
            <button onClick={() => setActiveCategory("lavash")}>Lavash</button>
            <button onClick={() => setActiveCategory("Shaurma va Arapita")}>Shaurma va Arapita</button>
            <button onClick={() => setActiveCategory("Burger")}>Burger</button>
            <button onClick={() => setActiveCategory("Murakkab taomlar")}>Murakkab taomlar</button>
            <button onClick={() => setActiveCategory("Hot dog")}>Hot-Dog</button>
            <button onClick={() => setActiveCategory("Souslar")}>Souslar</button>
            <button onClick={() => setActiveCategory("Ichimliklar")}>Salqin Ichimliklar</button>
            
          </div>
        </section>

        <section className={styles.menu}>
          {(!Array.isArray(data) || data.length == 0) &&
            <div className={styles.loader}>
              <FadeLoader
                size={550}
                aria-label="Loading Spinner"
                data-testid="loader"
              ></FadeLoader>
            </div>
          }
          {Array.isArray(data) && <div className="container" data-aos="fade-up">
            {filtredData.map((inf, i) => {
              return <Link key={i}to={`/batafsil/` + inf.id}><Card mahsulot={inf}></Card></Link>
            })}
          </div>
          }
        </section>
      </main>
    </div>
  )
}

export default Home