import Spinner from '../assets/Spinner.gif'

function SpinnerItem() {
  return (
    <div className="w-100 mt-20">
        <img width={180} src={Spinner} alt="Loading..." className='text-center mx-auto' />
    </div>
  )
}

export default SpinnerItem