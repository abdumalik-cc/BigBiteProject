import { useEffect, useState } from 'react'
import styles from './admin.module.css'

function Admin() {
  const [data, setData] = useState([])
  async function catchData() {
    const res = await fetch("https://68ada378a0b85b2f2cf41a59.mockapi.io/users/users");
    const data = await res.json();
    console.log(data);
    setData(data)
  }
  useEffect(() => {
    catchData()
  }, []);
  const cols= data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div>
      <table>
        <thead>
          <tr>
            {cols&& cols.map((item,index)=>{
              return <th key={index}>{item}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row,i)=>{
            return <tr key={i}>
              {cols.map((col,y)=>{
                return <td key={y}>
                  {
                    typeof row[col]==="object"
                    ? JSON.stringify
                    : row[col]
                  }
                </td>
              })}
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Admin