import {Button, Result} from "antd";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {ResultMessage} from "../../domain/interfaces/Message";

const CheckOutPayment = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { message, order }  = location.state as {message: ResultMessage, order: any};

    return (
        <>
            {
                message ? (
                    <Result
                        status={message.STATUS}
                        title={message.TITLE}
                        subTitle={order ? message.SUB_TITLE.replace(':code', order.id) : message.SUB_TITLE}
                        extra={[
                            <Button key="buy" onClick={() => navigate('/')}>Seguir comprando</Button>,
                        ]}
                    />
                ) : <Navigate to="/" />
            }
        </>
    );
};

export default CheckOutPayment;
