import './Editdirection.scss';
const directionData = [
  {
    name: 'web',
    ifexit: 1,
    bref_info:
      'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
  },
  {
    name: 'iOS',
    ifexit: 1,
    bref_info:
      'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
  },
  {
    name: 'Andriod',
    ifexit: 1,
    bref_info:
      'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
  },
  {
    name: 'HarmonyOS',
    ifexit: 1,
    bref_info:
      'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
  },

  {
    name: 'PM',
    ifexit: 1,
    bref_info:
      'Web开发的魅力在于，你的每一行代码都可能改变数百万用户的体验。刚开始可能会觉得繁杂，但一旦上手，你会发现Web让你的创造力得到了最大化的发挥！',
  },
];

const Renderdirectionitem = (item: {
  name: string;
  ifexit: number;
  bref_info: string;
}) => {
  return (
    <div className="direction-item-box">
      <div className="direction-info-box">
        <div className="direction-info-top-box">
          <div className="direction-name">{item.name}</div>
          <div className="direction-status">
            {item.ifexit === 1 ? '现有' : '现无'}
          </div>
        </div>
        <div className="direction-brefinfo">简介: {item.bref_info}</div>
      </div>
      <div className="direction-edit-btns">
        <button className="direction-edit-btn">编辑</button>
        <button className="direction-move-btn">移除</button>
      </div>
    </div>
  );
};

const Editdirection = () => {
  return (
    <div className="edit-direction-container">
      <div className="each-func-title">
        <h2>编辑实验室方向</h2>
      </div>
      <div className="edit-diretion-add-btn">
        <button>添加方向</button>
      </div>
      <div className="direction-item-container">
        {directionData.map((item) => Renderdirectionitem(item))}
      </div>
    </div>
  );
};

export default Editdirection;
