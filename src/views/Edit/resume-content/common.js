export const cityList = [
    {
        value: "noShowCity",
        label: "不展示期望城市",
        children: [],
    },
    {
        value: "hotCity",
        label: "热门城市",
        children: [
            {
                value: "BJ",
                label: "北京",
            },
            {
                value: "SZ",
                label: "深圳",
            },
            {
                value: "SH",
                label: "上海",
            },
        ],
    },
];

export const salaryStartList = [
    {
        value: "10k",
        label: "10k",
    },
    {
        value: "12k",
        label: "12k",
    },
    {
        value: "14k",
        label: "14k",
    },
];

export const salaryEndList = [
    {
        value: "16k",
        label: "16k",
    },
    {
        value: "18k",
        label: "18k",
    },
    {
        value: "20k",
        label: "20k",
    },
];

// 富文本设置属性
export const tinymceSetting = {
    height: 300, // editor 高度
    menubar: false
}