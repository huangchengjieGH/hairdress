export const table2excelData = [
    {
        'time': '2018-01-01 12:12:00',
        'num': '34873473974038749240',
        'totalPrice': 7302,
        'orderPrice': 5627,
        'discountPrice': 1563
    },
    {
        'time': '2018-01-01 12:12:00',
        'num': '34873473974038749240',
        'totalPrice': 7302,
        'orderPrice': 5627,
        'discountPrice': 1563
    },
    {
        'time': '2018-01-01 12:12:00',
        'num': '34873473974038749240',
        'totalPrice': 7302,
        'orderPrice': 5627,
        'discountPrice': 1563
    },
    {
        'time': '2018-01-01 12:12:00',
        'num': '34873473974038749240',
        'totalPrice': 7302,
        'orderPrice': 5627,
        'discountPrice': 1563
    },
    {
        'time': '2018-01-01 12:12:00',
        'num': '34873473974038749240',
        'totalPrice': 7302,
        'orderPrice': 5627,
        'discountPrice': 1563
    },
    {
        'time': '2018-01-01 12:12:00',
        'num': '34873473974038749240',
        'totalPrice': 7302,
        'orderPrice': 5627,
        'discountPrice': 1563
    }
];

export const excelColumns = [
    {
        'title': '时间',
        'key': 'time',
        'width': 160
    },
    {
        'title': '订单号',
        'key': 'num',
        'width': 200
        // 'sortable': true,
        // filters: [
        //     {
        //         label: '大于4000',
        //         value: 1
        //     },
        //     {
        //         label: '小于4000',
        //         value: 2
        //     }
        // ],
        // filterMultiple: false,
        // filterMethod (value, row) {
        //     if (value === 1) {
        //         return row.show > 4000;
        //     } else if (value === 2) {
        //         return row.show < 4000;
        //     }
        // }
    },
    {
        'title': '订单总额',
        'key': 'totalPrice',
        'sortable': true,
        'width': 150
    },
    {
        'title': '实收金额',
        'key': 'orderPrice',
        'sortable': true,
        'width': 150
    },
    {
        'title': '优惠金额',
        'key': 'discountPrice',
        'sortable': true,
        'width': 140
    },
    {
        'title': '订单类别',
        'key': 'orderType',
        'sortable': true,
        'width': 120
    }
];
