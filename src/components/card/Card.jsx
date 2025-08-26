import styles from './card.module.css'

function Card(props) {

    return (
        <div>
            <div className={styles.card}>
                <img src={props.mahsulot.image} alt="" />
                <div>
                    <h1>{props.mahsulot.price}</h1>
                    <h2>{props.mahsulot.name}</h2>
                </div>
                <button>Korish</button>
            </div>
        </div>
    )
}

export default Card