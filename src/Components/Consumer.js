import React, { Fragment, useEffect, useState } from 'react'

const ConstruirButton = ({pageNum, url, page, consumirApi})=>{
    console.log(pageNum)
    return (
        <button disabled={(page === pageNum) ? true : false} onClick={()=> consumirApi(url, page)}>pagina{page}</button>
    )
}
export const Consumer = () => {
    let url = "https://reqres.in/api/users"

    const [users, setUsers] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [vista, setVista] = useState(false)
    const [cargar, setCargar] = useState([])

    useEffect(()=>{
        consumirApi(url, page)
    }, [url, page])

    const consumirApi = async(url, page)=>{
        const data = await fetch(`${url}/?page=${page}`)
        const resp = await data.json()
        setUsers(resp.data)
        setTotalPage(resp.total_pages)
        setPage(resp.page)
        console.log("Consumo la api xd")
        const arr = []
        for(let x = 1; x <= resp.total_pages; x++){
            arr.push(x)
        }
        setCargar(arr)
    }

  return (
    <div>
        <h3>Total paginas: {totalPage} - <button onClick={()=> setVista(prev => !prev)}>{(vista) ? 'Ocultar' : 'Ver'}</button></h3>
        <h4>Pagina numero: {page}</h4>
      {vista && (
        <div className="buttones">
            {cargar.map((item, indice) => (
               <Fragment key={indice}>
                <ConstruirButton pageNum={page} url={url} page={item} consumirApi={consumirApi} />&nbsp;
               </Fragment>
            ))}
        </div>
      )}

        <table className='table'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>email</th>
                    <th>first_name</th>
                    <th>last_name</th>
                    <th>Avatar</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {users.map((item, index)=> (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td><img width="50px" src={item.avatar} alt="img.jpg" /></td>
                        <td>
                            <button onClick={()=> ""}>Eliminar</button> &nbsp;
                            <button onClick={()=> ""}>Guardar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
