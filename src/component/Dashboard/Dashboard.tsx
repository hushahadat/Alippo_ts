import React from "react";
import { useLoaderData } from "react-router-dom";
import "./index.css";
import { useEffect,useState } from "react";
import { Popup } from "../Popup/Popup";
import { ApiData, modelData } from "../model";

export const Dashboard = () => {
  const [dashboardData,setdashboardData] = useState<ApiData[]>([])
  const [showModel, setshowModel]= useState<boolean>(false)
  const [modelBody,setmodelbody] = useState<modelData>({})
  const data:any = useLoaderData();

  useEffect(()=>{
    if(!dashboardData.length){
      let dashboard  = data.map((i:ApiData)=>{
      i.name = i.name ? i?.name : '-'
      i.age = i.age ? i?.age : '-'
      i.pinCode = i.pinCode ? i?.pinCode : '-'
      return {...i}
    })
    setdashboardData(dashboard)
  }
  },[data])

  const deleteData=(data :ApiData)=>{
    let obj: modelData ={
      action : 'delete',
      data : data,
    }
    setmodelbody(obj)
    setshowModel(true)
  }

  const editData=(data : ApiData)=>{
    let obj :modelData ={
      action : 'edit',
      data : data,
    }
    setmodelbody(obj)
    setshowModel(true)
  }

  const handleAction =(action : String,data :ApiData)=>{
    let dashboardinfo : ApiData[] =[]
    if(action == 'edit'){
      data['name'] = data?.name?.length ? data['name'] :'-'
      dashboardinfo = dashboardData?.map((item : any,index)=>{
        return index != data?.id ? {...item} : {...data}
      })
    }else if(action == 'delete'){
      dashboardinfo = dashboardData?.filter((item,index)=> index !=data.id)
    }
    setdashboardData(dashboardinfo)
    setshowModel(false)
  }
  
  return (
    <>
    <div className="dashboard-body">
      <h1 className="header">Dashboard</h1>
      <div className="container table-body card">
        <table className="table-striped table table-borderd  table-hover " id="table">
          <thead className="bg-dark text-white">
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="card-body">
            {dashboardData &&
              dashboardData.map((data :ApiData, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ textTransform: "capitalize" }}>{data?.name}</td>
                  <td>{data?.age}</td>
                  <td>{data?.city}</td>
                  <td>{data?.pinCode}</td>
                  <td><a className="btn btn-outline-info" onClick={()=>editData({...data,id:index})}>Edit</a> <a className="btn btn-outline-danger" onClick={()=>deleteData({...data,id:index})}>Delete</a></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
      <Popup showModel={showModel} setshowModel={setshowModel} handleAction={handleAction} modelBody={modelBody}/>
      
    </>
  );
};
