import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ApiData,modelData } from '../model';
import "./index.css";
interface Props{
  showModel :boolean,
  setshowModel : React.Dispatch<React.SetStateAction<boolean>>,
  handleAction :(action: string, data:ApiData)=> void,
  modelBody :any
}

export const Popup = (props : Props) => {
    const  {showModel,setshowModel,handleAction,modelBody} = props 
    const [popupData,setpopupData] = useState<string>('')

    useEffect(()=>{
        if(modelBody?.action == 'edit'){
            setpopupData(modelBody.data['name'])
        }else if(modelBody?.action == 'delete'){
            setpopupData(modelBody.data['id'])
        }

    },[modelBody])


  return (
    <>
    <Modal
        size="sm"
        show={showModel}
        onHide={() => setshowModel(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>{modelBody['action'] == 'edit' ? <> 
        <h4 >Edit  {modelBody.data.id +1} </h4>
        <textarea name="text-area" rows={3} cols={30} value = {popupData} onChange={(e)=> setpopupData(e.target.value)}/>
        <div className='popup-button'>
        <Button onClick={() => setshowModel(false)} className="me-2">Cancel</Button>
        <Button onClick={()=>handleAction('edit',{...modelBody.data,name : popupData})} className="me-2">Save</Button>
        </div>
        </>
         : 
         <>
          <h4 >Delete {popupData +1} </h4>
          <div className='popup-button'>
        <Button onClick={() => setshowModel(false)} className="me-2">Cancel</Button>
        <Button onClick={()=>handleAction('delete',modelBody.data)} className="me-2">Delete</Button>
        </div>
         </>}</Modal.Body>
      </Modal>
    </>
  )
}
