const errHandler = (res, statusCode, errCode) => {
  let errMsg = '';
  const errContentInfo = {
    400: {
      40001: 'id 格式錯誤！',
      40002: '沒有該筆資料！',
      40003: '貼文內容為必填!',
      40004: '修改的貼文內容不能為空!'
    }
  }

  if (statusCode) errMsg = errContentInfo[statusCode];
  if (statusCode && errCode) errMsg = errContentInfo[statusCode][errCode];

  res.status(statusCode).json({
    status: 'false',
    message: errMsg,
  })
}

module.exports = errHandler;