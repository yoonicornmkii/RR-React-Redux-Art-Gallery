import './App.css';
import { useDispatch, useSelector, connect } from 'react-redux';
import { fetchData, addID, reduceID, customID, clearData } from './features/dataSlice'
import { useEffect } from 'react'

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} /> 
    } else {
      return <p>image here</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])
  
  return (
    <div className='App'>
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(addID())}>Next</button>
        <button onClick={() => dispatch(reduceID())}>Back</button>
      </div>
      <input value={ data.objectId } onChange={(e) => {
        dispatch(customID(Number(e.target.value)))
      }} />
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})


export default connect (mapStateToProps) (App)
