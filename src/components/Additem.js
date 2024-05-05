

import React, { useEffect, useState } from 'react';

const Additem = ({ URL }) => {
    let [callfun, setCallfun] = useState(false);
    let [loading, setLoading] = useState(false);
    let [products, setProducts] = useState([]);
    let [error, setError] = useState(false);
    let [errormes, setErrormes] = useState('');
    let [count, setCount] = useState(0);
   
    let [disable, setdisable] = useState(false);


    useEffect(() => {
        const lode = async () => {
            try {
                setCallfun(false);
                setLoading(true);
                let response = await fetch(`${URL}?limit=10&skip=${count === 0 ? 0 : count * 10}`);
                let value = await response.json();

                if (value && value.products && value.products.length) {
                    setProducts((prevProducts) => [...prevProducts, ...value.products]);
                    setLoading(false);
                }
            } catch (e) {
                setCallfun(false);
                setError(true);
                setErrormes(e);
                setLoading(false);
            }
        };

        if (callfun) {
            lode();
        }
    }, [callfun, URL, count]); // Added URL and count as dependencies

    useEffect(() => {
        setCallfun(true);
    }, [count]);
    useEffect(()=>{
        console.log(products.length)
        if(products.length===50){
            setdisable(true)
        }

    },[products])

    if (loading) {
        return <div className='w-full text-center font-semibold text-white mt-5' >Loading...</div>;
    }
    if (error) {
        return <div className='w-full text-center font-semibold text-white mt-5'>{`Error ${errormes}`}</div>;
    }
    let lengthcheck=()=>{
        console.log(products)
        console.log(products.length)
     
    }


    return (
        <div className="container w-full h-full py-3 ">
            <div className="con-2 w-[100vw] flex flex-wrap  px-2 py-0 ">
                {products.length ? (
                    products.map((p) => (
                        <div className="box w-1/2 sm:w-1/5 h-[200px] sm:h-[200px] p-2 rounded" key={p.id}>
                            <img className="w-full h-full rounded" src={p.thumbnail} alt={p.title} />
                        </div>
                    ))
                ) : (
                    <p>No image</p>
                )}
            </div>
            {disable && <p className='t  text-white font-semibold'>You have reached to 50 Products</p>}
            <button disabled={disable} type="button" onClick={() => {setCount((prevCount) => prevCount + 1);lengthcheck()}} className=" px-2   bg-white text-black rounded mt-2 cursor-pointer mb-3 font-semibold">
                Lode More Products
            </button>
           
        </div>
    );
};

export default Additem;
