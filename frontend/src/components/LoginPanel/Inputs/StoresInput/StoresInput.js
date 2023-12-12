



const StoresInput = () => {
    return ( 
        <div className='stores_input-cont input-cont cont'>
            {/* <label htmlFor='stores_input'>Точка</label> */}
            <select id='stores_input' tabIndex={3}>
                <option value='' disabled selected>Точка</option>
                <option value='1'>Test 1</option>
                <option value='2'>Test 2</option>
                <option value='3'>Test 3</option>
                <option value='4'>Test 4</option>
                <option value='5'>Test 5</option>
                <option value='6'>Test 6</option>
                <option value='7'>Test 7</option>
                <option value='8'>Test 8</option>
                <option value='9'>Test 9</option>
            </select>
            <i class="info-icon fa-solid fa-house-chimney"></i>
        </div>
     )
}
 
export default StoresInput