import axios from "axios";
import { toast } from "react-toastify";
const server = process.env.NEXT_PUBLIC_SERVER;

//Product related requests server
export async function getProductsPagination({ params, token}) {
  const res = await axios({
    method: "GET",
    url: `${server}/product/admin/all`,
    params: params,
    headers: { auth: token },
  });
  return res.data;
}

export async function getProductsByCategory({ uid, token, params}) {
  const res = await axios({
    method: "GET",
    url: `${server}/category/admin/${uid}`,
    headers: {
      auth: token,
    },
    params: params,
  });
  return res.data;
}

export async function getTopProducts() {
  const res = await axios({
    method: "GET",
    url: `${server}/product?page=1`,
  });
  return res.data;
}

export async function getMostSoldProducts() {
  const res = await axios({
    method: "GET",
    url: `${server}/product?page=2`,
  });
  return res.data;
}

export async function deleteProduct({
  _id,
  token,
  alert,
  callback,
  close,
  
}) {
  try {
    await axios({
      method: "DELETE",
      url: `${server}/product/${_id}`,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Mahsulot o'chirildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function createProduct({ data, token, alert, callback }) {
  try {
    await axios({
      method: "POST",
      url: `${server}/product`,
      headers: {
        auth: token,
      },
      data: data,
    });
    alert.success({ title: "Okay", text: "Mahsulot qo'shildi" });
    callback();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function updateProduct({
  data,
  _id,
  token,
  alert,
  callback,
  
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/product/${_id}`,
      headers: {
        auth: token,
      },
      data: data,
    });
    alert.success({ title: "Okay", text: "Mahsulot yangilandi" });
    callback();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function getRecentPurchases({ token }) {
  try {
    const result = await axios({
      method: "GET",
      url: `${server}/product/delivered`,
      headers: {
        auth: token,
      },
    });
    const filterFirst = result?.data?.products?.filter(
      (item) => item.length !== 0
    );
    const filter = filterFirst?.map((doc) => {
      return {
        qty: doc.total,
        name: doc?.product?.name,
        image: doc?.product?.image,
        price: doc?.product?.price,
        id: doc?.product?._id,
      };
    });

    return filter;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function getSingleProduct({  id }) {
  const res = await axios({
    method: "GET",
    url: `${server}/product/${id}`,
  });
  return res.data;
}

export async function searchProduct(payload) {
  const res = await axios({
    method: "get",
    url: `${server}/product?filter${payload}`,
  });

  return res.data;
}

//Product releated requests end

// Category related requests start

export async function getAllCategories({ token, params }) {
  const res = await axios({
    method: "get",
    url: `${server}/category/admin`,
    headers: {
      auth: token,
    },
    params,
  });

  return res.data;
}

export async function createCategory({
  data,
  token,
  alert,
  callback,
  close,
  
}) {
  try {
    await axios({
      method: "POST",
      url: `${server}/category/add`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Kategoriya yaratildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function updateCategory({
  data,
  uid,
  token,
  alert,
  callback,
  close,
  
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/category/${uid}`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Kategoriya yangilandi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function deleteCategory({
  uid,
  token,
  alert,
  callback,
  close,
  
}) {
  try {
    await axios({
      method: "DELETE",
      url: `${server}/category/${uid}`,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Kategoriya o'chirildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

// Category related requests end

// Profile related requests start alert

export async function sendSMSCode({ data, alert, router }) {
  console.log(server);
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/operator/auth/phone`,
      data: data,
    });
    router.push("/code");
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function confirmOTPCode({ data, alert }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/operator/auth/check`,
      data: data,
    });
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function getUserProfile({ token }) {
  const res = await axios({
    method: "get",
    url: `${server}/operator/profile`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function editUserProfile({ token, data }) {
  try {
    const res = await axios({
      method: "put",
      url: `${server}/operator/profile`,
      headers: {
        auth: token,
      },
      data,
    });
    toast.success("Profil yangilandi");
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik"
    );
    return error;
  }
}

export async function changeOrderStatus({ token, status, id, router }) {
  try {
    const res = await axios({
      method: "put",
      url: `${server}/operator/order/status/${id}`,
      headers: {
        auth: token,
      },
      data: { status },
    });
    toast.success("Buyurtma holati o'zgardi");
    router.back();
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik"
    );
    return error;
  }
}

// Profile related requests ends

// profile streams requests start
export async function createStream({ token, data, callback }) {
  const res = await axios({
    method: "POST",
    url: `${server}/stream`,
    data: data,
    headers: {
      auth: token,
    },
  });
  callback();
  return res.data;
}

export async function deleteStream(payload) {
  const res = await axios({
    method: "delete",
    url: `${server}/stream/${payload._id}`,
    headers: {
      auth: payload.token,
    },
  });

  payload.callBack();

  return res.data;
}

export async function getAllUserStreams(payload) {
  const res = await axios({
    method: "get",
    url: `${server}/stream/all`,
    headers: {
      auth: payload,
    },
  });

  return res.data;
}
// profile streams requests end
// user statistics start

export async function getUserStatistics(token) {
  const res = await axios({
    method: "GET",
    url: `${server}/stream`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function getStreamDetails({ id, token }) {
  try {
    const streamDetail = await axios({
      url: `${server}/stream/details/${id}`,
      method: "get",
      headers: {
        auth: token,
      },
    });
    return streamDetail.data;
  } catch (error) {
    console.log(error?.response);
  }
}

// User requests

export async function getUserRequestsAsync(token) {
  const res = await axios({
    method: "GET",
    url: `${server}/request`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

// konkurs uchun start

export async function getUserGame({  token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/konkurs`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function postDataGame({ token, data, alert, callBack }) {
  const res = await axios({
    method: "POST",
    url: `${server}/konkurs`,
    headers: {
      auth: token,
    },
    data,
  });

  if (res.status === 200) {
    alert.success({ title: "Konkurs", text: "Muvaffaqiyatli yaratildi!" });
    callBack();
  } else {
    alert.error({ title: "Konkurs", text: "Xatolik yuz berdi!" });
  }

  return res.data;
}

//Konkurs end

//Payment start

export async function getUserPayments({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/payment/user-payment`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function addUserPayment(payload) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/payment/add`,
      headers: {
        auth: `12345${payload.token}`,
      },
    });
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

//Payment end

// User orders request start

export async function getUserOrders(token) {
  const res = await axios({
    method: "get",
    url: `${server}/order/all`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function createOrder({ data, callback }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/order/add`,
      data: data,
    });

    console.log(res);
    callback(data.orderItems[0].productId);
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error.response.data.message
        : "Nomalum xatolik yuz berdi"
    );
  }
}

export async function getSingleOrder({ token, _id }) {
  const res = await axios({
    method: "get",
    url: `${server}/operator/order/my/${_id}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function getOrdersFromQr({ token }) {
  const res = await axios({
    url: `${server}/order/admin/ready`,
    method: "GET",
    headers: {
      auth: token,
    },
  });

  return res.data;
}

// User orders request end

//Black listed customers

export async function getBlackListedCustmers({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/blacklist`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function deleteFromBlackList({ token, callBack, id }) {
  const res = await axios({
    method: "DELETE",
    url: `${server}/blacklist/${id}`,
    headers: {
      auth: token,
    },
  });

  callBack(res.status == 200);

  return res.data;
}

export async function updateFromBlackList({
  token,
  
  callBack,
  data,
  id,
}) {
  const res = await axios({
    method: "PUT",
    url: `${server}/blacklist/${id}`,
    headers: {
      auth: token,
    },
    data,
  });

  callBack(res.status == 200);

  return res.data;
}

export async function addToBlockList({ token, data, callBack }) {
  const res = await axios({
    method: "post",
    url: `${server}/blacklist/add`,
    headers: {
      auth: token,
    },
    data: data,
  });

  callBack(res.status);

  return res.data;
}

// Customers actions

export async function getAdminCustomersList({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/user`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function editAdminCustomer({ token, params }) {
  const res = await axios({
    url: `${server}/user/admin/${params.id}`,
    method: "PUT",
    data: params.data,
    headers: {
      auth: token,
    },
  });

  params.callBack(res.status == 200);

  return res.data;
}

export async function getAdminCustomersStats({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/user/statistics?userId=${params.userId}&type=${params.type}&status=${params.status}&page=${params.page}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

//Operators actions

export async function getAdminOperatorsList({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/user/operator`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function getAdminOperatorStats({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/user/operator/statistics?userId=${params.userId}&type=${params.type}&status=${params.status}&page=${params.page}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function addOperatorAsync({
  token,
  values,
  alert,
  callBack,
  
}) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/user/admin/add-operator`,
      headers: {
        auth: token,
      },
      data: values,
    });
    callBack();
    alert.success({ title: "Okay", text: "Admin qo'shildi!" });
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message,
    });
  }
}

//Payments reducer

export async function getAdminPaymentsList({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/payment/admin-payment`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function updatePaymentStatus({
  token,
  
  data,
  handleClose,
  alert,
  callback,
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/payment/${data?.paymentId}`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "To'lov yangilandi!" });
    callback();
    handleClose();
  } catch (error) {
    handleClose();
    callback();
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

//Admin Orders Asyn Requests

export async function getAdminOrders({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin/filter-time`,
    headers: {
      auth: token,
    },
    params: { ...params },
  });
  return res.data;
}

export async function getAdminOrdersByStatus({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin/getall`,
    headers: {
      auth: token,
    },
    params: { ...params },
  });
  return res.data;
}

export async function changeOrderStatusFromArchived({ token, params }) {
  try {
    const res = await axios({
      url: `${server}/operator/order/${params.id}`,
      method: "PUT",
      data: params.data,
      headers: {
        auth: token,
      },
    });

    toast.success("Buyurtma holati saqlandi.");

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function changeManyOrders({ token, params }) {
  const res = await axios({
    url: `${server}/order/admin/many`,
    method: "PUT",
    data: params.data,
    headers: {
      auth: token,
    },
  });

  params.callBack(res.status == 200);

  return res.data;
}

export async function searchAdminOrders({ token, query }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin-search?filter=${query}`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

//Dashboard Async requests

export async function getDashboardOrderStatistics({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin-status`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function getDashboardWeeklyOrderCount({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin/week`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function getDashboardMostSoldProducts({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/product/delivered`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function getOrdersByCityId({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin/city`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

// printer data

export async function getDataForPrinter({ token }) {
  const res = await axios({
    url: `${server}/order/admin/getall?status=ready`,
    method: "get",
    headers: {
      auth: token,
    },
  });

  return res.data;
}

// printer data

export async function getAppSetting({ token }) {
  const res = await axios({
    url: `${server}/setting`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

//Site settings

export async function getSiteFulldata({ code, alert, callback }) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_CRM_API}/apps/${code}`,
      method: "GET",
    });
    if (!res.data) {
      alert.error({
        title: "Ooops",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Malumot topilmadi. Qaytadan urinib kuring",
      });
      return;
    }
    callback();
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Malumot topilmadi. Qaytadan urinib kuring",
    });
    return error;
  }
}

export async function updateWebApp({ token, data, alert }) {
  try {
    await axios({
      method: "POST",
      url: `${server}/setting`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "Sozlamalar saqlandi!" });
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

// bot settings

export async function getBotDetails({ token }) {
  const res = await axios({
    url: `${server}/botsettings`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function updateTelegramBot({ token, data, alert }) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/botsettings`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "Sozlamalar saqlandi!" });
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

// sms settings

export async function getSmsDetails({ token }) {
  const res = await axios({
    url: `${server}/sms-service`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function updateSmsSts({ token, data, alert }) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/sms-service`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "Sozlamalar saqlandi!" });
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

export async function getNewOrdersList({  token }) {
  const res = await axios({
    method: "get",
    url: `${server}/operator/order`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function saveOrder({ token, _id, callback }) {
  try {
    await axios({
      method: "put",
      url: `${server}/operator/order/taken/${_id}`,
      headers: {
        auth: token,
      },
    });
    toast.success("Buyurtma qabul qilindi");
    callback();
  } catch (error) {
    callback();
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Tizim taminotchilari bilan bog'laning"
    );
  }
}

//Orders by status
export async function getOrderByStatus({  token, status }) {
  var config = {
    method: "GET",
    url: `${server}/operator/order/my?status=${status}`,
    headers: {
      auth: token,
    },
  };
  const res = await axios(config);
  return res.data;
}

export async function updateOrder({ token, data, alert, id }) {
  try {
    const res = await axios({
      method: "PUT",
      url: `${server}/operator/order/${id}`,
      headers: {
        auth: token,
      },
      data: data,
    });
    alert("Buyurtmaga kiritilgan o'zgarishlar saqlandi!");
    return res.data;
  } catch (error) {
    alert(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Tizim taminotchilari bilan bog'laning"
    );
  }
}

export async function getSingleUserOrder({  token, id }) {
  var config = {
    method: "GET",
    url: `${server}/operator/order/my/${id}`,
    headers: {
      auth: token,
    },
  };
  const res = await axios(config);
  return res.data;
}

export async function searchOrder({  token, query, filter }) {
  var config = {
    method: "GET",
    url: `${server}/operator/order/search`,
    headers: {
      auth: token,
    },
    params: { query, filter },
  };
  const res = await axios(config);
  return res.data;
}

export async function getOperatorPayments({  token, params }) {
  var config = {
    method: "GET",
    url: `${server}/operator/payment`,
    headers: {
      auth: token,
    },
    params,
  };
  const res = await axios(config);
  return res.data;
}

export async function makePaymentRequest({ token, data, id }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/operator/payment`,
      headers: {
        auth: token,
      },
      data: data,
    });
    toast.success("To'lov uchun suo'rov jo'natildi!");
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Tizim taminotchilari bilan bog'laning"
    );
  }
}
