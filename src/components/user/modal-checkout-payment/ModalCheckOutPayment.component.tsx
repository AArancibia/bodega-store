import React from 'react';
import {Form, Modal} from "antd";

interface Props {
    isModalPaymentOpen: boolean;
    setIsModalPaymentOpen: (value: boolean) => void;
}

const ModalCheckOutPayment = ({isModalPaymentOpen, setIsModalPaymentOpen}: Props) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
        setIsModalPaymentOpen(false);
    };

    const handleCancel = () => {
        setIsModalPaymentOpen(false);
        form.resetFields();
    };

    return (
        <Modal title="Completar pago" open={isModalPaymentOpen} onOk={handleOk} onCancel={handleCancel}>
            <div>Modal Payment</div>
        </Modal>
    );
};

export default ModalCheckOutPayment;
