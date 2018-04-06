/* eslint-disable */
var Mock = require('mockjs')

// 动态列表
Mock.mock('http://liansixin.win/momentList', {
    code: 0,
    meg: '',
    data: [
        {
            id: 1,
            label: '平台编辑',
            title: '全国成交走势',
            mode: 'cover',
            coveImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522840979045&di=a6354e049eb52ce19c58aadbfb02065c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa5c27d1ed21b0ef4fa1c44add7c451da80cb3e49.jpg',
            time: '2018-3-17 15:00',
            zan: 2
        },
        {
            id: 2,
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522840678638&di=d0569418ad85a5d6bbe2d0ef655e789d&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-05-14%2F051120936.jpg',
            name: '曹万贯',
            label: '地产大亨',
            title: '2017江北区地块走势预测',
            mode: 'pay',
            price: 100,
            time: '2018-3-17 15:00',
            zan: 9
        },
        {
            id: 3,
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522840656769&di=4c5ca8285b2ade085c13171e6606e9b0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D6ade238c064f78f0800b9afb49300a83%2F6cbb60d0f703918f31df8012543d269758eec47c.jpg',
            name: '曹万贯',
            label: '地产新手',
            title: '2017江北区地块走势预测',
            mode: 'overview',
            subTitle: '江干区(丁桥单元JG0405-12地块),杭州储出[2018] 4号地块',
            adress: '浙江 杭州 江干',
            subLabel: ['挂牌', '商用', '460平方米'],
            time: '2018-3-17 15:00',
            zan: 0
        }
    ]
})

// 动态详细内容（需支付）
Mock.mock('http://liansixin.win/momentDetail?id=2', {
    code: 0,
    meg: '',
    data: {
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522840678638&di=d0569418ad85a5d6bbe2d0ef655e789d&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-05-14%2F051120936.jpg',
        name: '曹万贯',
        label: '地产大亨',
        time: '2018-3-17 15:00',
        zan: 9,
        title: '2017江北区地块走势预测',
        content: '这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是'
    }
})