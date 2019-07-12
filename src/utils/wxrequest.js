// 将wx.request 封装为 promise

function wxrequest(options) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: options.url,
      methed: options.methed || "GET",
      data: options.data || {},
      header: opthions.header || {},
      success: function(res) {
        reslove(res);
      },
      fail: function(error) {
        reject(error);
      }
    });
  });
}

export default wxrequest;
