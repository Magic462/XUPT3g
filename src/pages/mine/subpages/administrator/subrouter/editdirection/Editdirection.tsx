import './Editdirection.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RichTextEditor from '@/components/RichTextEditor';
import { message } from '@/utils/message';
import { getAllDirection, postDirection } from '@/services/directions';
import { Direction } from '@/types/direction';

const Editdirection = () => {
  const [searchParams] = useSearchParams();
  const tid = searchParams.get('tid');

  const [articleHTML, setActiveHTML] = useState<string | null>(null);
  const [postDirectionInfo, setPostDirectionInfo] = useState<Direction>({
    brefInfo: '',
    name: '',
    trainPlan: '',
  });

  useEffect(() => {
    if (tid) {
      const fetchDirection = async () => {
        try {
          const response = await getAllDirection(Number(tid));
          console.log(response);
          setPostDirectionInfo(response[0]);
        } catch (err) {
          message.error('获取文章信息', err);
        }
      };

      fetchDirection();
    }
  }, [tid]);

  const handleSubmit = async () => {
    if (!articleHTML || articleHTML.trim() === '<p><br></p>')
      return message.warning('请输入活动培养方案');

    try {
      // 提交方向信息
      const result = await postDirection();

      console.log('方向添加/编辑成功:', result);
      message.success('方向添加/编辑成功');

      // 重置状态
      setPostDirectionInfo({ name: '', trainPlan: '', brefInfo: '' });
      setActiveHTML(null);
    } catch (err) {
      console.error('方向编辑失败', err);
    }
  };

  return (
    <div className="edit-diretion-container">
      <div className="each-func-name">
        <h2>
          <i className="each-func-icons iconfont icon-dongtai"></i>
          添加方向
        </h2>
      </div>

      <div className="edit-diretion-box">
        <div className="edit-diretion-baseinfo-box">
          <div className="edit-diretion-name-box">
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
            <div className="edit-diretion-btn" onClick={() => handleSubmit}>
              添加
            </div>
          </div>
        </div>
        <div className="edit-diretion-brefinfo-box">
          <textarea name="" id=""></textarea>
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
