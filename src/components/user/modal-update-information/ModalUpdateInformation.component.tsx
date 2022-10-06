import React from 'react';
import {Form, Input, message, Modal} from "antd";
import {User} from "../../../interfaces/user/User";
import {updateUser, userInformation} from "../../../data/rest/user.service";

interface Props {
    currentUser: User;
    fetchUserInformation: (user: User) => void;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const ModalUpdateInformation = ({currentUser, fetchUserInformation, isModalOpen, setIsModalOpen}: Props) => {

    const [form] = Form.useForm();

    const onFinish = async (user: Partial<User>) => {
        try {
            await updateUser(currentUser.id, user);
            const userInfo = await userInformation(currentUser.username);
            fetchUserInformation(userInfo);
            message.info(`Se guardaron los datos correctamente`);
        } catch (e) {
            message.error(`Error al actualizar datos`);
        } finally {
            form.resetFields();
        }
    }

    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <Modal title="Completar información" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                layout="horizontal"
                form={form} onFinish={onFinish}
            >
                <Form.Item label="Nombres" name="givenName">
                    <Input />
                </Form.Item>
                <Form.Item  label="Apellido paterno" name="lastName">
                    <Input />
                </Form.Item>
                <Form.Item  label="Apellido materno" name="surname">
                    <Input />
                </Form.Item>
                <Form.Item  label="Telefono" name="telephone">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalUpdateInformation
