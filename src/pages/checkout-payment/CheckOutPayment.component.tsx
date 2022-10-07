import {Button, Result} from "antd";

const CheckOutPayment = () => {
    return (
        <>
            <Result
                status="success"
                title="Compró con éxito en Bodega Store! 😊🎉"
                subTitle="Número de pedido: 2017182818828182881 La configuración del servidor en la nube demora de 1 a 5 minutos, espere."
                extra={[
                    <Button key="buy">Ir a comprar</Button>,
                ]}
            />
        </>
    );
};

export default CheckOutPayment;
