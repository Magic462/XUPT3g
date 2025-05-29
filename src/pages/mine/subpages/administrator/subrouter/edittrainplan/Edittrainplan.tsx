import RichTextEditor from '@/components/RichTextEditor';
import './Edittrainplan.scss';
import { useEffect, useState } from 'react';
import { getTrainPlan, postTrainPlan } from '@/services/trainplan';
import { message } from '@/utils/message';

const Edittrainplan = () => {
  const [articleHTML, setActiveHTML] = useState<string | null>(null);
  const [trainPlan, setTrainPlan] = useState<string>();

  useEffect(() => {
    const fetchTrainPlan = async () => {
      try {
        const response = await getTrainPlan();
        setTrainPlan(response);
      } catch (err) {
        message.error('获取培养方案失败');
        console.log('获取培养方案失败：', err);
      }
    };
    fetchTrainPlan();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await postTrainPlan();
      console.log(response);
      message.success('发布成功');
      await getTrainPlan();
    } catch (err) {
      message.error('发布失败');
      console.log('发布失败：', err);
    }
  };
  return (
    <div className="edit-direction-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-jiasupeiyangjihua`}></i>
          修改培养方案
        </h2>
      </div>
      <div className="edit-direction-box">
        <button onClick={() => handleSubmit}>发布</button>
      </div>
      {/* 引入富文本编辑 */}
      <RichTextEditor initHTML={trainPlan} onGetHTML={setActiveHTML} />
    </div>
  );
};

export default Edittrainplan;
