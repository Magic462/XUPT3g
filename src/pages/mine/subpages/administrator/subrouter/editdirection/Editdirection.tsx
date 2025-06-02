import './Editdirection.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RichTextEditor from '@/components/RichTextEditor';
import { message } from '@/utils/message';
import {
  getAllDirection,
  postDirection,
  putDirection,
} from '@/services/directions';
import { Direction } from '@/types/direction';

const Editdirection = () => {
  const [searchParams] = useSearchParams();
  const [tid, setTid] = useState<number>();
  const name = searchParams.get('name');

  const [articleHTML, setActiveHTML] = useState<string | null>(null);
  const [postDirectionInfo, setPostDirectionInfo] = useState<Direction>({
    brefInfo: '',
    name: '',
    trainPlan: '',
  });

  useEffect(() => {
    if (name) {
      const fetchDirection = async () => {
        try {
          const response = await getAllDirection(name);
          console.log(response);
          setPostDirectionInfo(response[0]);
          setTid(response[0].tid);
        } catch (err) {
          message.error('获取文章信息', err);
        }
      };
      fetchDirection();
    }
  }, [name]);

  const handleSubmit = async () => {
    if (!postDirectionInfo.name.trim()) {
      return message.warning('请填写方向名称！');
    }
    if (postDirectionInfo.brefInfo.trim().length < 15) {
      return message.warning('方向简介不能少于15个字！');
    }
    if (!articleHTML || articleHTML.trim() === '<p><br></p>') {
      console.log(articleHTML);
      return message.warning('请输入活动培养方案');
    }
    setPostDirectionInfo({ ...postDirectionInfo, trainPlan: articleHTML });

    try {
      if (name) {
        // 编辑该方向
        console.log('现在是编辑方向接口');
        postDirectionInfo.tid = tid;
        const response = await putDirection(postDirectionInfo);

        console.log('方向编辑成功:', response);
        message.success('方向编辑成功');
      } else {
        // 新增方向
        const response = await postDirection(
          postDirectionInfo.name,
          postDirectionInfo.brefInfo,
          postDirectionInfo.trainPlan
        );

        console.log('方向添加:', response);
        message.success('方向添加成功');
      }

      // 重置状态
      setPostDirectionInfo({ name: '', trainPlan: '', brefInfo: '' });
      setActiveHTML(null);
    } catch (err) {
      console.error('方向编辑失败', err);
    }
  };

  return (
    <div className="edit-diretion-container">
      <div className="each-func-title">
        <h2>
          <i className="each-func-icons iconfont icon-dongtai"></i>
          添加方向
        </h2>
      </div>

      <div className="edit-diretion-box">
        <div className="edit-diretion-baseinfo-box">
          <div className="edit-diretion-title-box">
            <input
              type="text"
              placeholder="请输入方向名称..."
              value={postDirectionInfo.name}
              onChange={(e) =>
                setPostDirectionInfo({
                  ...postDirectionInfo,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="edit-diretion-btn-box">
            <div className="edit-diretion-btn" onClick={() => handleSubmit()}>
              添加
            </div>
          </div>
        </div>
        <div className="edit-diretion-brefinfo-box">
          <textarea
            name=""
            id=""
            placeholder="在这里编辑方向简介,少于15字..."
            value={postDirectionInfo.brefInfo}
            onChange={(e) =>
              setPostDirectionInfo({
                ...postDirectionInfo,
                brefInfo: e.target.value,
              })
            }
          ></textarea>
        </div>

        <RichTextEditor
          initHTML={postDirectionInfo.trainPlan}
          onGetHTML={setActiveHTML}
        />
      </div>
    </div>
  );
};

export default Editdirection;
