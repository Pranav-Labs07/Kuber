import react from 'react';
const [selectedVehicle, setSelectedVehicle] = useState(null)


const Vehiclepanel =(props)=>{
  return(
    <div>
      <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={()=>{
          props.setVehiclePanelOpen(false)
        }} ><i className="text-3xl ri-arrow-drop-down-line text-gray-500"></i></h5>
        <h3 className='text-2xl font-semibold mb-5' >Choose a Vehicle</h3>

        <div onClick={() => setSelectedVehicle('uber-go')} className={`flex ${selectedVehicle === 'uber-go' ? 'border-2 border-black' : 'border-2 border-gray-300'} p-3 mb-2 rounded-xl w-full items-center justify-between cursor-pointer hover:border-black transition-colors`}>
        <img className='h-15 ' src='' ></img><div className='bg-greeen-500 w-1/2' >
          <h4 className='font-medium text-sm'>Uber Go<span><i className="ri-user-3-fill">   4 </i></span></h4>
          <h5 className='font-medium text-sm' >2 mins away</h5>
          <p className='font-medium text-sm text-gray-600' >Affordable, compact rides</p>
          </div>
        <h2 className='text-xl font-semibold' >₹202</h2>

        </div>

        <div onClick={() => setSelectedVehicle('Auto')} className={`flex ${selectedVehicle === 'Auto' ? 'border-2 border-black' : 'border-2 border-gray-300'} p-3 mb-2 rounded-xl w-full items-center justify-between cursor-pointer hover:border-black transition-colors`} >
        <img className='h-15' src='' ></img><div className='bg-greeen-500 w-1/2' >
          <h4 className='font-medium text-sm'>Auto<span><i className="ri-user-3-fill">  3</i></span></h4>
          <h5 className='font-medium text-sm' >2 mins away</h5>
          <p className='font-medium text-sm text-gray-600' >Affordable, compact rides</p>
          </div>
        <h2 className='text-xl font-semibold' >₹150</h2>

        </div>

        <div onClick={() => setSelectedVehicle('Moto')} className={`flex ${selectedVehicle === 'Moto' ? 'border-2 border-black' : 'border-2 border-gray-300'} p-3 mb-2 rounded-xl w-full items-center justify-between cursor-pointer hover:border-black transition-colors`} >
        <img className='h-15' src='/' ></img><div className='bg-greeen-500 w-1/2' >
          <h4 className='font-medium text-sm'>Moto<span><i className="ri-user-3-fill"> 1</i></span></h4>
          <h5 className='font-medium text-sm' >2 mins away</h5>
          <p className='font-medium text-sm text-gray-600' >Affordable, compact rides</p>
          </div>
        <h2 className='text-xl font-semibold' >₹178</h2>

        </div>


    </div>

  );
}
export default Vehiclepanel