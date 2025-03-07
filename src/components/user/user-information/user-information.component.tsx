import React, {useState} from 'react';
import { Card, Timeline} from 'antd';
import {getSalesByUser} from '../../../data/rest/sale.service';
import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../../redux/user/user.selector';
import './user-information.component.scss';
import {useQuery} from '@tanstack/react-query';

const UserInformation = () => {

  const user = useSelector(selectCurrentUser);
  const {data: salesByUser, isSuccess} = useQuery({queryKey: ['salesByUser'], queryFn: () => getSalesByUser(user.id)});
  const [sales] = useState(salesByUser);

  const orderSales = () => {
    return sales.sort((a: any, b: any) => new Date(a.dateRegister).getTime() > new Date(b.dateRegister).getTime() ? -1 : 1)
  };

  return (
    <>
      <Card>
        <h1 className="text-center">
          Historial de compras
        </h1>
        <hr/>
        <Timeline style={{marginTop: '30px'}} mode="left">
          {
            isSuccess ? orderSales()
              .map((sale: any) => (
              <Timeline.Item label={new Date(sale.dateRegister).toLocaleString()}>
                <div className="flex-wrap justify-content-between">
                  <span className="mr-20"><span className="bold">Código: </span> {sale.code}</span>
                  <span><span className="bold">Precio total: </span>  S/. {sale.salePrice}</span>
                </div>
                <hr/>
                {
                  sale.saleDetail.map((detail: any) => (
                    <div className="sale-detail" >
                      <div className="flex-column">
                        <span className="bold">Producto </span>
                        <span className="">{detail.product?.name}</span>
                      </div>
                      <div className="flex-column">
                        <span className="bold">Cantidad</span>
                        <span className="">{detail.quantity}</span>
                      </div>
                      <div className="flex-column">
                        <span className="bold">Precio del producto </span>
                        <span className="">S/. {detail.price}</span>
                      </div>
                    </div>
                  ))
                }
              </Timeline.Item>
            )) : null
          }
        </Timeline>
      </Card>
    </>
  );
};

export default UserInformation;
