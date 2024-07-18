import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const OrdersHistory = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [refusedOrders, setRefusedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    if (selectedTab === "accepted") {
      getAcceptedOrders();
    } else if (selectedTab === "refused") {
      getRefusedOrders();
    } else if (selectedTab === "all") {
      getAllOrders();
    }
  }, [selectedTab]);

  const getAcceptedOrders = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get("/api/done/owner/done/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      console.log("완료 API 응답:", data);
      if (data.statusCode === 1 || data.statusCode === 2) {
        setAcceptedOrders(data.resultData);
        console.log("acceptedOrders:", data.resultData);
      } else {
        setAcceptedOrders([]);
      }
    } catch (error) {
      console.log("완료주문 에러: ", error);
      setAcceptedOrders([]);
    }
  };

  const getRefusedOrders = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get("/api/done/owner/cancel/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      console.log("거절 API 응답:", data);
      if (data.statusCode === 1 || data.statusCode === 2) {
        setRefusedOrders(data.resultData);
        console.log("refusedOrders:", data.resultData);
      } else {
        setRefusedOrders([]);
      }
    } catch (error) {
      console.error("거절 주문 에러", error);
      setRefusedOrders([]);
    }
  };

  const getAllOrders = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const [acceptedResponse, refusedResponse] = await Promise.all([
        axios.get("/api/done/owner/done/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        axios.get("/api/done/owner/cancel/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      ]);

      const acceptedData = acceptedResponse.data;
      const refusedData = refusedResponse.data;

      let allData = [];
      if (
        (acceptedData.statusCode === 1 || acceptedData.statusCode === 2) &&
        (refusedData.statusCode === 1 || refusedData.statusCode === 2)
      ) {
        allData = [...acceptedData.resultData, ...refusedData.resultData];
      } else if (
        acceptedData.statusCode === 1 ||
        acceptedData.statusCode === 2
      ) {
        allData = acceptedData.resultData;
      } else if (refusedData.statusCode === 1 || refusedData.statusCode === 2) {
        allData = refusedData.resultData;
      }

      allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllOrders(allData);
      console.log("allOrders:", allData);
    } catch (error) {
      console.error("전체 주문 에러", error);
      setAllOrders([]);
    }
  };

  const renderOrders = (orders, emptyMessage) => {
    return orders.length > 0 ? (
      orders.map(order => (
        <div className="ceo-orderList" key={order.doneOrderPk}>
          <div className="ceo-order-header">
            <div className="order-header-left">
              <div className="order-header-title">
                {new Date(order.createdAt).toLocaleDateString()} -{" "}
                <span>
                  {order.doneOrderState === 1 ? "주문완료" : "주문취소"}
                </span>
              </div>
              <div className="order-header-left-wrap">
                <div className="order-header-left-content">
                  <div className="order-header-left-content-title">
                    {order.resPk}번 가게
                  </div>
                  <div className="order-header-left-content-text">
                    {order.menuInfoDtos.map((menu, index) => (
                      <span key={index}>
                        {menu.menuName} {menu.menuPrice}원
                      </span>
                    ))}
                    <span>총 {order.orderPrice}원</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-header-right">
              <Link
                to={`/ceopage/orders/details/${order.doneOrderPk}`}
                className="btn"
              >
                주문상세
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div>{emptyMessage}</div>
    );
  };

  return (
    <div className="ceo-order-wrap">
      <h2 className="ceo-order-tab">주문내역</h2>
      <div className="ceo-order-tag">주문</div>
      <div className="ceo-order-content">
        <div className="orderListing">
          <ul className="tabforchoiceUl">
            <li>
              <button className="btn" onClick={() => setSelectedTab("all")}>
                전체 주문
              </button>
              <button
                className="btn"
                onClick={() => setSelectedTab("accepted")}
              >
                접수 주문
              </button>
              <button className="btn" onClick={() => setSelectedTab("refused")}>
                거절 주문
              </button>
            </li>
          </ul>
        </div>
        {selectedTab === "accepted" && (
          <div className="accepted">
            {renderOrders(acceptedOrders, "완료된 주문이 없습니다.")}
          </div>
        )}
        {selectedTab === "refused" && (
          <div className="refused">
            {renderOrders(refusedOrders, "거절된 주문이 없습니다.")}
          </div>
        )}
        {selectedTab === "all" && (
          <div className="all">
            {renderOrders(allOrders, "전체 주문이 없습니다.")}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersHistory;
