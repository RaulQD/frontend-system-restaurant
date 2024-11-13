import { useLocation, useNavigate } from "react-router-dom";

export default function EditOrderKitchen() {
    const location = useLocation();
    console.log(location.state);
    const navigate = useNavigate();
    console.log(navigate);
    
  return (
    <div>EditOrderKitchen</div>
  )
}
