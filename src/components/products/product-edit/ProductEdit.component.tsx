import React, {useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Select} from 'antd';
import {Product} from '../../../interfaces/Product';
import ImagePreview from '../../image-preview/ImagePreview.component';
import {saveProduct} from '../../../data/rest/product.service';
import {v4 as uuid} from 'uuid';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {selectAllCategories} from '../../../redux/product/product.selector';
import {Category} from '../../../interfaces/Category';
import {Helpers} from '../../../utils/helpers';

interface Props {
  isOpen: boolean;
  setIsOpenEdit: (value: boolean) => void;
  setSuccess: (value: boolean) => void;
  product?: Product;
  categories: Array<Category>;
}

const ProductEdit = ({isOpen, setIsOpenEdit, product, setSuccess, categories}: Props) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(product?.image ?? '');

  const onFinish = async (values: any) => {
    try {
      if (product) {
        values.id = product.id;
        values.image = image || product.image;
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
        <Form.Item label="Descripcion" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Precio" name="unitPrice">
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item label="Cantidad" name="quantity">
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item label="Categoria" name="categoryId">
          <Select
            options={Helpers.toSelect(categories, 'id', 'name')}
          />
        </Form.Item>
        <Form.Item label="Imagen" name="image">
          <Input onChange={handleChange}/>
        </Form.Item>
        <ImagePreview src={image} />
      </Form>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectAllCategories
});

export default connect(mapStateToProps)(ProductEdit);
