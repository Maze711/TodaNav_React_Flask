import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import plusIcon from '../../assets/ico/plus_ico.svg'


export const PaymentMethods = () => {
  return (
    <MDBContainer className="overflow-hidden">
      <MDBRow className="align-items-center my-3">
        <MDBCol md="4">
          <h1>Payment Methods</h1>
        </MDBCol>
      </MDBRow>
      <hr />
      <MDBRow className="d-flex gap-4 mt-4">
        <button
          type="button"
          className="btn p-2 d-flex align-items-center"
          style={{ backgroundColor: "#b9b5b0" }}
        >
          <img src={plusIcon} height={50} style={{ marginRight: "10px" }} />
          <h3 className="text-dark m-0 flex-grow-1 text-center">Add Payment Method</h3>
        </button>
        <button
          type="button"
          className="btn p-2 d-flex align-items-center"
          style={{ backgroundColor: "#b9b5b0" }}
        >
          <img src={plusIcon} height={50} style={{ marginRight: "10px" }} />
          <h3 className="text-dark m-0 flex-grow-1 text-center">Add Gcash</h3>
        </button>
      </MDBRow>
      <BottomNav />
    </MDBContainer>
  );
};
