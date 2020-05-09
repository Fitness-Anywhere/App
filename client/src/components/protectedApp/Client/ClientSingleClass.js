import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { convertingTime } from "../../../helperFunctions/convertingTime";
import Sharednav from "../Sharednav";
import GoogleMap from "../googleMap";
import ClientModel from "./ClientModel";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";

const ClientSingleClass = () => {
  const { id, c_id } = useParams();
  const dispatch = useDispatch();
  const [currentClass, setCurrentClass] = useState();

  const fetchClass = async () => {
    const res = await axiosWithAuth().get(`/api/classes/${c_id}`);
    setCurrentClass(res.data);
  }

  useEffect(() => {
    dispatch({ type: "PROCCESSING_PAYMENT" });
    
    fetchClass();
  }, []);

  return (
    <> { currentClass && (
      <>    
        <Sharednav />
        <div className="InstructorSingleClass">
          <div className="wrapper-class">
            <div className="InstructorSingleClass-wrapper">
              <div className="img-wrapper">
                <img src={currentClass.image_url} alt={currentClass.name} />
              </div>
              <div className="right-side">
                <h2 className="name">
                  {currentClass.name}
                </h2>
                <p className="address">
                  Location:
                  <span>{currentClass.location}</span>
                </p>
                <p className="intensity">
                  Intensity:
                  <span>{currentClass.intensity}</span>
                </p>
                <p className="max-size">
                  Class Size:
                  <span>{currentClass.max_class_size}</span>
                </p>
                <p className="price">
                  Price:
                  <span>${currentClass.price}</span>
                </p>
                <p className="start">
                  Starts at:
                  <span>{currentClass.start_time}</span>
                </p>
                <p className="type">
                  Class type:
                  <span>{currentClass.type}</span>
                </p>
                <p className="duration">
                  Class duration:
                  <span>{currentClass.duration} mins</span>
                </p>
              </div>
            </div>
            <div className="bottom-description">
              <div className="InstructorSingleClass-description">
                <h4>description</h4>
                <p>{currentClass.description}</p>
              </div>
              <div id="buy-btn">
                <ClientModel data={currentClass} />
              </div>
            </div>
          </div>
        </div>
        <div className="googleMap-wrapper">
          <GoogleMap location={currentClass.location} />
        </div>
        {/* <div className="goback-btn">
          <Link to={`/account/client/${id}`}>Go back</Link>
        </div> */}
      </> 
    )}
    </>
  )
};

export default ClientSingleClass;
