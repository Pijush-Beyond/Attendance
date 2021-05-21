import React from 'react'
import { useSelector } from 'react-redux'

export default function Laoding() {
  const loading = useSelector(state => state.loading)
  
  return loading && (
    <div className="d-flex justify-content-center align-items-center position-fixed start-0 end-0 top-0 bottom-0" style={{zIndex:100}}>
      <div className="spinner-border" role="status"></div>
    </div>
  )
}
