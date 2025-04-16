import { useState } from 'react';
import './Editdirection.scss';
import '@/assets/icons/font_38lh8lcfn7/iconfont.css';

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

const Renderdirectionitem = (
  item: {
    name: string;
    ifexit: number;
    bref_info: string;
  },
  toggleEdit: () => void
) => {
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
        <button
          className="direction-edit-btn"
          onClick={() => {
            toggleEdit();
          }}
        >
          编辑
        </button>
        <button className="direction-move-btn">移除</button>
      </div>
    </div>
  );
};

const Editdirection = () => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="edit-direction-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-guanli`}></i>
          编辑实验室方向
        </h2>
      </div>
      {/* 添加方向按钮 */}
      <div className="edit-diretion-add-btn">
        <button
          onClick={() => {
            setEdit(!edit);
          }}
          className={`${edit ? 'direction-add-active' : ''}`}
        >
          添加方向
        </button>
      </div>
      {/* 填写增加方向信息 */}
      {edit && (
        <>
          <div className="edit-direction-add-box-cover"></div>
          <div className="edit-direction-add-box">
            <div className="add-direction-item-left-box">
              <div className="add-direction-item">
                <label htmlFor="">方向名称:</label>
                <input type="text" />
              </div>
              <div className="add-direction-item">
                <label htmlFor="">方向简介:</label>
                <textarea name="" id=""></textarea>
              </div>
              <div className="add-direction-post-box">
                <button className="add-direction-sure">确认提交</button>
              </div>
            </div>
            <div className="add-direction-item-right-box">
              <div className="add-direction-item add-direvtion-plan-box">
                <label htmlFor="">方向培养:</label>
                <div className="">ballalblalblalblalblallblalbal</div>
              </div>
            </div>

            <div
              className="edit-direction-delete-box"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <i className="iconfont icon-chahao"></i>
            </div>
          </div>
        </>
      )}
      <div className="direction-item-container">
        {directionData.map((item) =>
          Renderdirectionitem(item, () => setEdit(!edit))
        )}
      </div>
    </div>
  );
};

export default Editdirection;
