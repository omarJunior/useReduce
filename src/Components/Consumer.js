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
        const arr = []
        for(let x = 1; x <= resp.total_pages; x++){
            arr.push(x)
        }
        setCargar(arr)
    }

    const guardarLocal = (id, email, first_name, last_name)=>{
        const arr = []
        const usuarios = JSON.parse(localStorage.getItem("usuarios"))
        if(usuarios != null){
            //ya existe
            const findend = usuarios.find(item => item.id === id)
            if(findend === undefined){
                usuarios.push({
                    id, email, first_name, last_name
                })
                localStorage.setItem("usuarios", JSON.stringify(usuarios))
            }else{
                return alert("Ya ese dato existe en el localstorage")
            }
           
        }else{
            arr.push({id, email, first_name, last_name})
            localStorage.setItem("usuarios", JSON.stringify(arr))
        }
    }

    const eliminarLocal = (id)=>{
        const usuarios = JSON.parse(localStorage.getItem("usuarios"))
        if(usuarios != null){
            const filtro_existe = usuarios.filter(item => item.id === id)
            if(filtro_existe.length === 0){
                return alert("Ese dato no existe para eliminar")
            }
            const filtro = usuarios.filter(item => item.id !== id)
            localStorage.setItem("usuarios", JSON.stringify(filtro))
            return alert("Eliminado correctamente")
        }else{
            return alert("No hay ningun elemento para eliminar")
        }
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
                            <button onClick={()=> eliminarLocal(item.id)}>Eliminar</button> &nbsp;
                            <button onClick={()=> guardarLocal(item.id, item.email, item.first_name, item.last_name)}>Guardar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
