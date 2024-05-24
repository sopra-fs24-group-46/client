import { Button } from "./Button";
import React, {useNavigate} from "react-router-dom";

const RuleLink = () => {

    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/rules");
    };

    return (
        <div style={{ position: "fixed", bottom: 0, left: 0, zIndex: 4 }}>
            <Button className="authentication link-button" onClick={handleLoginClick} style={{margin: 0, height: "30px"}}>
                Rules/Info
            </Button>
        </div>
    );
}

export default RuleLink