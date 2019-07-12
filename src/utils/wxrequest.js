// 将wx.request 封装为 promise

function wxrequest(options) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {},
      success: function(res) {
        reslove(res);
      },
      fail: function(error) {
        reject(error);
      }
    });
  });
}
// 暴露
export default wxrequest;
