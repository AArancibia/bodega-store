import React from 'react';
import {Form, Input, InputNumber, Modal} from "antd";
import {CreditCard} from "../../../interfaces/CreditCard";
import {saveSale} from "../../../data/rest/payment.service";
import {CartItem} from "../../../interfaces/CartItem";

interface Props {
    isModalPaymentOpen: boolean;
    setIsModalPaymentOpen: (value: boolean) => void;
    showLoader: () => void;
    hideLoader: () => void;
    cartItems: Array<CartItem>;
    total: number;
}

const ModalCheckOutPayment = ({isModalPaymentOpen, setIsModalPaymentOpen, showLoader, hideLoader, cartItems, total}: Props) => {

    const [form] = Form.useForm();

    const onFinish = async (values: CreditCard) => {
        try {
            showLoader();
            await saveSale(cartItems, total);
            hideLoader();
        } catch (e) {
            hideLoader();
        } finally {
            form.resetFields();
        }
    }

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
            <Form
                layout="horizontal"
                form={form} onFinish={onFinish}
            >
                <Form.Item label="Numero de tarjeta de crédito" name="creditCard">
                    <Input defaultValue="4557" maxLength={16} minLength={16}/>
                </Form.Item>
                <Form.Item  label="Códio de seguridad" name="securityCode">
                    <InputNumber maxLength={3} minLength={3} />
                </Form.Item>
                <Form.Item  label="Nombre del titular" name="names">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCheckOutPayment;
