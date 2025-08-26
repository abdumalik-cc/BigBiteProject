import { useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import styles from './batafsil.module.css'
import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

function Batafsil({addToCart,cart,deleteFromCart}) {
    const {id}=useParams();

  let [mahsulot,setMahsulot]=useState(null);
  const[ load,setLoad]=useState(true);
    async function catchData() {
      try {
          const res = await fetch("https://689c78b458a27b18087e50d4.mockapi.io/menu/"+id);
        const data = await res.json();
      
        
        setMahsulot(data);
        setLoad(false);
      } catch (error) {
         console.log(error);
         
      }
    }
  useEffect(()=>{
     setLoad(true);
    catchData();
  },[id])
    

  return (
    <div>
      <Header cart={cart} deleteFromCart={deleteFromCart}/>
        <div className="container">
            {load&&<div className={styles.loader}>
                <FadeLoader
                size={550}
                aria-label="Loading Spinner"
                data-testid="loader"
                ></FadeLoader>
             </div>
            }
            {mahsulot && <div className={styles.batafsilBox}>
                <img src={mahsulot.image} alt="" />
                <div>
                    <h1>{mahsulot.name}</h1>
                    
                    <h2>Mavjud</h2>
                    <div className={styles.yetkazish}><h3>40 daqiqa ichida yetkazamiz</h3></div>
                    <p>{mahsulot.description}</p>
                    <div className={styles.narx} > 
                        <h1>{mahsulot.price}</h1>
                        <button onClick={
                          ()=>{addToCart(mahsulot);
                            alert(mahsulot.name+ " qoshildi!")
                          }
                        }
                        >Qo'shish</button>
                    </div>
                </div>
            </div>
            }
        </div>
    </div>
  )
}

export default Batafsil