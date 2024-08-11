// 定义请求方法的类型
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD';

// 定义请求参数类型
interface RequestParams<T> {
  url: string;
  method?: Method;
  data?: T;
  header?: wx.RequestHeader;
  timeout?: number;
}

// 定义响应数据的泛型类型
interface ResponseData<T> {
  data: T;
  statusCode: number;
  header: wx.RequestHeader;
  cookies: string[];
  errMsg: string;
}

// 封装 wx.request 的函数
function request<T, U = any>(params: RequestParams<T>): Promise<ResponseData<U>> {
  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      method: params.method || 'GET',
      data: params.data,
      header: params.header,
      timeout: params.timeout,
      success: (res) => {
        resolve({
          data: res.data as U,
          statusCode: res.statusCode,
          header: res.header,
          cookies: res.cookies || [],
          errMsg: res.errMsg
        });
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

// 使用示例
request<{ name: string }, { success: boolean }>({
  url: 'https://example.com/api',
  method: 'POST',
  data: { name: 'John' },
  header: {
    'Content-Type': 'application/json'
  }
}).then(response => {
  console.log(response.data.success); // 处理成功响应
}).catch(error => {
  console.error(error); // 处理错误响应
});
