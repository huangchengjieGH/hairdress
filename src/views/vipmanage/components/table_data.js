export const table1Columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '微信号',
        align: 'center',
        key: 'nickname',
        editable: true
    },
    {
        title: '电话',
        align: 'center',
        key: 'phone',
        editable: true
    },
    {
        title: '余额',
        align: 'center',
        key: 'balance',
        editable: true
    },
    {
        title: '可用积分',
        align: 'center',
        key: 'totalPoints',
        editable: true
    },
    {
        title: '全部积分',
        align: 'center',
        key: 'availablePoints',
        editable: true
    },
    {
        title: '会员等级',
        align: 'center',
        key: 'range',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 300,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];
export const table2Columns = [
    {
        title: '序号',
        type: 'index',
        width: 85,
        align: 'center'
    },
    {
        title: '等级',
        align: 'center',
        width: 95,
        key: 'vipRank',
        editable: true
    },
    {
        title: '余额起点',
        align: 'center',
        width: 95,
        key: 'rechargeValue',
        editable: true
    },
    {
        title: '积分起点',
        align: 'center',
        width: 95,
        key: 'pointsValue',
        editable: true
    },
    {
        title: '会员折扣',
        align: 'center',
        width: 90,
        key: 'vipRate',
        editable: true
    },
    {
        title: '积分转化',
        align: 'center',
        width: 90,
        key: 'pointsRate',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['edit']
    }
];
export const table3Columns = [
    {
        title: '序号',
        type: 'index',
        width: 95,
        align: 'center'
    },
    {
        title: '充值金额',
        align: 'center',
        width: 100,
        key: 'rechargeValue',
        editable: true
    },
    {
        title: '优惠金额',
        align: 'center',
        width: 100,
        key: 'discountValue',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 200,
        ky: 'handle',
        handle: ['edit', 'delete']
    }
];
export const table1Data = [
    {
        nickname: 'Aresn',
        phone: '15888888888',
        balance: '300',
        points: '10000',
        range: '黄金'
    },
    {
        nickname: 'Bresn',
        phone: '15888888889',
        balance: '500',
        points: '100000',
        range: '紫金'
    },
    {
        nickname: 'Cresn',
        phone: '15888888889',
        balance: '1000',
        points: '200000',
        range: '钻石'
    }
];

export const editInlineColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '微信号',
        align: 'center',
        key: 'nickName',
        editable: true
    },
    {
        title: '电话',
        align: 'center',
        key: 'phone',
        editable: true
    },
    {
        title: '余额',
        align: 'center',
        key: 'accountPrice',
        editable: true
    },
    {
        title: '可用积分',
        align: 'center',
        key: 'totalPoints',
        editable: true
    },
    {
        title: '全部积分',
        align: 'center',
        key: 'availablePoints',
        editable: true
    },
    {
        title: '会员等级',
        align: 'center',
        key: 'vipRank',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 180,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const editInlineData = [
    {
        nickname: 'Aresn',
        phone: '15888888888',
        balance: '300',
        points: '10000',
        range: '黄金'
    },
    {
        nickname: 'Bresn',
        phone: '15888888889',
        balance: '500',
        points: '100000',
        range: '紫金'
    },
    {
        nickname: 'Cresn',
        phone: '15888888889',
        balance: '1000',
        points: '200000',
        range: '钻石'
    }
];

export const editIncellColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 120,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 160,
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];

export const editIncellData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const editInlineAndCellColumn = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 300,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 300,
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 200,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const editInlineAndCellData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const showCurrentColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 300,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 300,
        key: 'work',
        editable: true
    }
];

const tableData = {
    table1Columns: table1Columns,
    table2Columns: table2Columns,
    table3Columns: table3Columns,
    table1Data: table1Data,
    editInlineColumns: editInlineColumns,
    editInlineData: editInlineData,
    editIncellColumns: editIncellColumns,
    editIncellData: editIncellData,
    editInlineAndCellColumn: editInlineAndCellColumn,
    editInlineAndCellData: editInlineAndCellData,
    showCurrentColumns: showCurrentColumns
};

export default tableData;
