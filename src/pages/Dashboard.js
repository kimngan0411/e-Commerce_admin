import React, { useEffect, useState } from "react";
import { BsArrowDownRight, } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthlyData, getOrders, getYearlyData } from "../features/auth/authSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "TÊN",
    dataIndex: "name",
  },
  {
    title: "SẢN PHẨM",
    dataIndex: "product",
  },
  {
    title: "TỔNG TIỀN",
    dataIndex: "price",
  },
  {
    title: "TRẠNG THÁI",
    dataIndex: "staus",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlydataState= useSelector((state) => state?.auth?.monthlydata);
  const yearlydataState= useSelector((state) => state?.auth?.yearlydata);
  const orderState= useSelector((state) => state?.auth?.orders?.orders);
  const [dataMonthly, setDataMonthly]= useState([])
  const [dataMonthlySales, setDataMonthlySales]= useState([])
  const [orderData, setOrderData]=useState([])
  
  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData())
    dispatch(getOrders())
  }, []);
  console.log(monthlydataState);
  useEffect(() => {
    let monthNames= ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 12","Tháng 12"];
    let data=[];
    let monthlyOrderCount=[]
    for (let index = 0; index < monthlydataState?.length; index++) {
      const element = monthlydataState[index];
      data.push({type: monthNames[element?._id?.month],income:element?.amount})
      monthlyOrderCount.push({type: monthNames[element?._id?.month],sales:element?.count})
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
  data1.push({
    key: i,
    name: orderState[i]?.user?.firstname + orderState[i]?.user?.lastname,
    product: orderState[i]?.orderItems?.length,
    price: orderState[i]?.totalPrice,
    staus:  orderState[i]?.orderStaus,
  });
}
  setOrderData(data1)
    
  }, [monthlydataState, yearlydataState]);
  
  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Thống Kê</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between p-3 align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">{yearlydataState && yearlydataState?.[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
           
            <p className="mb-0  desc">Tổng Tiền Doanh thu cả Năm</p>
          </div>
        </div>
       
        <div className="d-flex justify-content-between p-3 align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">{yearlydataState && yearlydataState?.[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
           
            <p className="mb-0 desc">Số Đơn Hàng Cả Năm</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Sales Statics</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>

      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

