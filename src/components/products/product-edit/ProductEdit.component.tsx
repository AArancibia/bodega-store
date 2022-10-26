import React, {useState} from 'react';
import {Form, Input, InputNumber, message, Modal} from 'antd';
import {Product} from '../../../interfaces/Product';
import ImagePreview from '../../image-preview/ImagePreview.component';
import {saveProduct} from '../../../data/rest/product.service';
import {v4 as uuid} from 'uuid';

interface Props {
  isOpen: boolean;
  setIsOpenEdit: (value: boolean) => void;
  setSuccess: (value: boolean) => void;
  product?: Product;
}

const ProductEdit = ({isOpen, setIsOpenEdit, product, setSuccess}: Props) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(product?.image || '');

  const onFinish = async (values: any) => {
    try {
      if (product) {
        values.id = product.id;
        values.image = image ? image : product.image;
        await saveProduct(values);
        message.success('Producto editado con éxito');
        setIsOpenEdit(false);
      } else {
        values.id = uuid();
        await saveProduct(values);
        message.success('Producto guardadp con éxito');
        setIsOpenEdit(false);
      }
      setSuccess(true);
    } catch (e) {
      message.error('No se pudo editar el producto');
      setSuccess(false);
    }
  }

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsOpenEdit(false);
    form.resetFields();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  }

  return (
    <Modal title={`${product ? "Editar producto" : "Agregar producto"}`} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        layout="horizontal"
        form={form} onFinish={onFinish}
        initialValues={product}
      >
        <Form.Item label="Nombre del producto" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Precio del producto" name="unitPrice">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Cantidad del producto" name="quantity">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Imagen del producto" name="image">
          <Input onChange={handleChange}/>
        </Form.Item>
        <ImagePreview src={image} />
      </Form>
    </Modal>
  );
};

export default ProductEdit;
