import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MainStripe from "../stripe/MainStripe";
import { MdCheckCircle } from "react-icons/md";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";

export default function ClientModel({ data }) {
  const [open, setOpen] = useState(false);
  const { isProccessing } = useSelector((state) => state.stripeReducer);
  const dispatch = useDispatch();
  const { id, c_id } = useParams();
  const { push } = useHistory();

  const { image_url, price, name } = data;

  const handleClickOpen = async () => {
    // free class
    if (!price || price==0) {
      await axiosWithAuth().post(`/api/clients/${id}/classes`, { class_id: c_id })
      dispatch({ type: "PAYMENT_PROCCESSED" });
      push(`/account/client/${id}/schedule`);
    } 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    isProccessing && push(`/account/client/${id}/schedule`);
  };

  //   console.log("varible here ", isProccessing);
  return (
    <div id="ClientModel">
      <div id="add-to-cart-btn">
        <Button onClick={handleClickOpen}>Join class</Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {isProccessing && (
            <DialogActions>
              <div id="close-success-payment">
                <button onClick={handleClose}>x</button>
              </div>
            </DialogActions>
          )}
          {isProccessing ? (
            <div className="success-payment">
              <div className="success-icon">
                <MdCheckCircle />
              </div>
              <h3>payment was successfully</h3>
            </div>
          ) : (
            <div className="show-payment-info">
              <div className="show-payment-info-options">
                <div>
                  <h2>{name}</h2>
                  <p>{`$${price}`}</p>
                </div>

                <div id="close-btn">
                  <Button onClick={handleClose}>close</Button>
                </div>
              </div>
              <div className="show-payment-info-img">
                <img src={image_url} alt={name} />
              </div>
              <MainStripe />
            </div>
          )}
        </DialogContent>

        <div id="power-by-stripe">
          <p className="power-by">Powered by Stripe</p>
        </div>
      </Dialog>
    </div>
  );
}
